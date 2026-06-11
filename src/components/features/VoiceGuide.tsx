"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, languages } from '@/lib/language';
import type { LanguageCode } from '@/lib/language';

type VoiceGuideProps = {
  text: string;
  title: string;
  localizedText?: Partial<Record<LanguageCode, string>>;
};

type VoiceLanguageCode = LanguageCode;
type PlaybackStatus = "idle" | "loading" | "playing" | "paused";

const speechLanguage: Record<VoiceLanguageCode, string> = {
  en: "en-US",
  te: "te-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  kn: "kn-IN",
};

const ttsLanguage: Record<VoiceLanguageCode, string> = {
  en: "en",
  te: "te",
  hi: "hi",
  ta: "ta",
  kn: "kn",
};

const remoteTtsHosts = ["translate.google.com", "translate.google.co.in"];

function pickVoice(voices: SpeechSynthesisVoice[], lang: string) {
  const languageRoot = lang.split("-")[0];
  return (
    voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase()) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith(`${languageRoot}-`)) ??
    voices.find((voice) => voice.lang.toLowerCase().includes(languageRoot))
  );
}

export function VoiceGuide({ text, title, localizedText }: VoiceGuideProps) {
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>("idle");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const audioIndexRef = useRef(0);
  const remoteHostIndexRef = useRef(0);
  const playbackIdRef = useRef(0);
  const userPausedRef = useRef(false);
  const browserSpeechStartTimerRef = useRef<number | null>(null);
  const isPlaying = playbackStatus === "playing";
  const isPaused = playbackStatus === "paused";
  const isLoadingAudio = playbackStatus === "loading";
  
  const { language } = useLanguage();
  const guideLanguage: VoiceLanguageCode = language;
  const selectedLanguageName = languages.find((lang) => lang.code === language)?.name ?? "English";
  const guideTextForLanguage = localizedText?.[guideLanguage] ?? text;

  const resetPlaybackState = () => {
    setPlaybackStatus("idle");
  };

  const clearBrowserSpeechStartTimer = () => {
    if (browserSpeechStartTimerRef.current !== null) {
      window.clearTimeout(browserSpeechStartTimerRef.current);
      browserSpeechStartTimerRef.current = null;
    }
  };

  const stopRemoteAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    audioQueueRef.current = [];
    audioIndexRef.current = 0;
    remoteHostIndexRef.current = 0;
  };

  const getMatchingVoice = () => {
    if (!synthRef.current) return undefined;

    const lang = speechLanguage[guideLanguage];
    const availableVoices = voices.length ? voices : synthRef.current.getVoices();
    return pickVoice(availableVoices, lang);
  };

  const playBrowserSpeech = (
    guideText: string,
    playbackId: number,
    options: { onError?: () => void } = {},
  ) => {
    if (!synthRef.current) return false;

    const lang = speechLanguage[guideLanguage];
    const matchingVoice = getMatchingVoice();

    const utterance = new SpeechSynthesisUtterance(guideText);
    utterance.lang = lang;
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;
      clearBrowserSpeechStartTimer();
      setPlaybackStatus("playing");
    };

    utterance.onend = () => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;
      clearBrowserSpeechStartTimer();
      resetPlaybackState();
    };

    utterance.onerror = () => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;
      clearBrowserSpeechStartTimer();

      if (options.onError) {
        options.onError();
        return;
      }

      resetPlaybackState();
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    browserSpeechStartTimerRef.current = window.setTimeout(() => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;

      synthRef.current?.cancel();
      clearBrowserSpeechStartTimer();

      if (options.onError) {
        options.onError();
        return;
      }

      resetPlaybackState();
    }, 2500);
    return true;
  };

  const splitForTts = (guideText: string) => {
    const sentences = guideText
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?।])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
    const chunks: string[] = [];

    for (const sentence of sentences.length ? sentences : [guideText]) {
      if (sentence.length <= 170) {
        chunks.push(sentence);
        continue;
      }

      for (let index = 0; index < sentence.length; index += 150) {
        chunks.push(sentence.slice(index, index + 150));
      }
    }

    return chunks;
  };

  const playSameLanguageBrowserFallback = (playbackId: number) => {
    if (playbackId !== playbackIdRef.current || userPausedRef.current) return;

    const playedNativeText = playBrowserSpeech(guideTextForLanguage, playbackId, {
      onError: () => {
        resetPlaybackState();
      },
    });

    if (!playedNativeText) {
      resetPlaybackState();
    }
  };

  const getRemoteTtsUrl = (chunk: string) => {
    const host = remoteTtsHosts[remoteHostIndexRef.current] ?? remoteTtsHosts[0];
    const params = new URLSearchParams({
      ie: "UTF-8",
      client: "tw-ob",
      tl: ttsLanguage[guideLanguage],
      q: chunk,
      _: `${Date.now()}-${audioIndexRef.current}`,
    });

    return `https://${host}/translate_tts?${params.toString()}`;
  };

  const playRemoteTtsChunk = (playbackId: number) => {
    if (playbackId !== playbackIdRef.current || userPausedRef.current) return;

    const chunk = audioQueueRef.current[audioIndexRef.current];

    if (!chunk) {
      stopRemoteAudio();
      resetPlaybackState();
      return;
    }

    const audio = new Audio(getRemoteTtsUrl(chunk));
    audio.preload = "auto";

    audioRef.current = audio;
    audio.onplaying = () => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;
      setPlaybackStatus("playing");
    };
    audio.onended = () => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;
      audioIndexRef.current += 1;
      remoteHostIndexRef.current = 0;
      playRemoteTtsChunk(playbackId);
    };
    audio.onerror = () => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;

      if (remoteHostIndexRef.current < remoteTtsHosts.length - 1) {
        remoteHostIndexRef.current += 1;
        playRemoteTtsChunk(playbackId);
        return;
      }

      stopRemoteAudio();
      playSameLanguageBrowserFallback(playbackId);
    };

    audio.play().catch(() => {
      if (playbackId !== playbackIdRef.current || userPausedRef.current) return;

      if (remoteHostIndexRef.current < remoteTtsHosts.length - 1) {
        remoteHostIndexRef.current += 1;
        playRemoteTtsChunk(playbackId);
        return;
      }

      stopRemoteAudio();
      playSameLanguageBrowserFallback(playbackId);
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => setVoices(window.speechSynthesis.getVoices());

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      playbackIdRef.current += 1;
      userPausedRef.current = false;
      clearBrowserSpeechStartTimer();
      stopRemoteAudio();
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    playbackIdRef.current += 1;
    userPausedRef.current = false;
    clearBrowserSpeechStartTimer();
    stopRemoteAudio();
    if (synthRef.current && (isPlaying || isPaused)) {
      synthRef.current.cancel();
      resetPlaybackState();
    }
    // The guide restarts with fresh localized text when the current monument changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideTextForLanguage]);

  const handlePlay = () => {
    if (isPaused) {
      userPausedRef.current = false;
      if (audioRef.current) {
        const playbackId = playbackIdRef.current;
        audioRef.current.play().catch(() => {
          if (playbackId !== playbackIdRef.current || userPausedRef.current) return;
          stopRemoteAudio();
          playSameLanguageBrowserFallback(playbackId);
        });
        setPlaybackStatus("playing");
        return;
      }

      if (synthRef.current) {
        synthRef.current.resume();
        setPlaybackStatus("playing");
      }
      return;
    }

    stopRemoteAudio();
    synthRef.current?.cancel();
    clearBrowserSpeechStartTimer();
    playbackIdRef.current += 1;
    userPausedRef.current = false;

    audioQueueRef.current = splitForTts(guideTextForLanguage);
    audioIndexRef.current = 0;
    remoteHostIndexRef.current = 0;
    setPlaybackStatus("loading");

    const playbackId = playbackIdRef.current;
    if (getMatchingVoice()) {
      const startedBrowserSpeech = playBrowserSpeech(guideTextForLanguage, playbackId, {
        onError: () => {
          if (playbackId !== playbackIdRef.current || userPausedRef.current) return;
          playRemoteTtsChunk(playbackId);
        },
      });

      if (startedBrowserSpeech) return;
    }

    playRemoteTtsChunk(playbackId);
  };

  const handlePause = () => {
    if (audioRef.current) {
      userPausedRef.current = true;
      audioRef.current.pause();
      setPlaybackStatus("paused");
      return;
    }

    if (synthRef.current && (synthRef.current.speaking || synthRef.current.pending || isPlaying || isLoadingAudio)) {
      userPausedRef.current = true;
      synthRef.current.pause();
      setPlaybackStatus("paused");
    }
  };

  const handleStop = () => {
    playbackIdRef.current += 1;
    userPausedRef.current = false;
    clearBrowserSpeechStartTimer();
    stopRemoteAudio();
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    resetPlaybackState();
  };

  return (
    <div className="flex items-center gap-4 bg-accent/50 p-4 rounded-xl border border-border mt-4">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary">
        {isPlaying || isLoadingAudio ? <Volume2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{title} Audio Guide</h4>
        <p className="text-xs text-foreground/60">
          {isLoadingAudio
            ? `Loading ${selectedLanguageName} audio...`
            : isPlaying
            ? `Playing in ${selectedLanguageName}...`
            : isPaused
            ? 'Paused'
            : `Ready in ${selectedLanguageName}`}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={handlePlay}
          disabled={isPlaying || isLoadingAudio}
          title={isPaused ? "Resume audio guide" : "Play audio guide"}
          aria-label={isPaused ? "Resume audio guide" : "Play audio guide"}
        >
          <Play className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={handlePause}
          disabled={!isPlaying && !isLoadingAudio}
          title="Pause audio guide"
          aria-label="Pause audio guide"
        >
          <Pause className="h-4 w-4" />
        </Button>
        {(isPlaying || isLoadingAudio || isPaused) && (
          <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={handleStop} title="Stop audio guide" aria-label="Stop audio guide">
            <Square className="h-4 w-4 fill-current" />
          </Button>
        )}
      </div>
    </div>
  );
}
