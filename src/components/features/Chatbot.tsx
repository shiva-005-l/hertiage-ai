"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Message = { role: 'user' | 'ai'; content: string };

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: '🙏 Namaste! I am your AI Heritage Guide. Ask me anything about Charminar, Golconda Fort, the Nizam dynasty, entry fees, timings, or crowd levels!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I am having trouble right now. Please try again!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="chatbot-toggle-btn"
          style={{
            position: 'fixed', bottom: '24px', right: '24px',
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'var(--primary)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(212,175,55,0.35)',
            zIndex: 9999, transition: 'transform 0.2s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Bot style={{ width: '26px', height: '26px', color: '#000' }} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          style={{
            position: 'fixed', bottom: '24px', right: '24px',
            width: '360px', height: '520px',
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            display: 'flex', flexDirection: 'column', zIndex: 9999,
            overflow: 'hidden',
            animation: 'chatSlideIn 0.25s ease'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), #b8860b)',
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bot style={{ width: '20px', height: '20px', color: '#fff' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: '#000', fontSize: '15px' }}>AI Heritage Guide</p>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(0,0,0,0.6)' }}>● Online — RAG Powered</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'rgba(0,0,0,0.2)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X style={{ width: '16px', height: '16px', color: '#000' }} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                  background: msg.role === 'user' ? 'var(--accent)' : 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {msg.role === 'user'
                    ? <User style={{ width: '15px', height: '15px', color: 'var(--foreground)' }} />
                    : <Bot style={{ width: '15px', height: '15px', color: '#000' }} />}
                </div>
                <div style={{
                  maxWidth: '78%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  background: msg.role === 'user' ? 'var(--primary)' : 'var(--accent)',
                  color: msg.role === 'user' ? '#000' : 'var(--foreground)',
                  fontSize: '13px', lineHeight: '1.5'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot style={{ width: '15px', height: '15px', color: '#000' }} />
                </div>
                <div style={{ padding: '12px 16px', background: 'var(--accent)', borderRadius: '4px 18px 18px 18px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <span key={i} style={{
                      width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)',
                      display: 'inline-block', animation: `bounce 1s ${delay}s infinite`
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '0 12px 8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Who built Charminar?', 'Entry fees?', 'Crowd levels?'].map(q => (
              <button key={q} onClick={() => { setInput(q); }}
                style={{
                  fontSize: '11px', padding: '4px 10px', borderRadius: '20px',
                  border: '1px solid var(--border)', background: 'var(--accent)',
                  color: 'var(--foreground)', cursor: 'pointer'
                }}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
            <input
              id="chatbot-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about monuments, history..."
              style={{
                flex: 1, border: '1px solid var(--border)', borderRadius: '25px',
                padding: '10px 16px', fontSize: '13px', background: 'var(--accent)',
                color: 'var(--foreground)', outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              id="chatbot-send-btn"
              style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: input.trim() ? 'var(--primary)' : 'var(--border)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s ease', flexShrink: 0
              }}
            >
              <Send style={{ width: '17px', height: '17px', color: '#000' }} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
