"use client";

import React, { useRef, useState } from 'react';
import { AlertCircle, Camera, CheckCircle, ImageIcon, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { heritageSites, type HeritageSite } from '@/lib/mock-data';
import { recognizedSiteResult, type MonumentRecognitionResult } from '@/lib/monument-recognition';

type ImageSignature = {
  cells: number[];
  histogram: number[];
  edge: number;
};

const signatureCache = new Map<string, Promise<ImageSignature | null>>();
const SIGNATURE_SIZE = 48;
const GRID_SIZE = 4;
const VISUAL_MATCH_THRESHOLD = 0.78;

function loadImage(src: string, options: { crossOrigin?: boolean } = {}) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    if (options.crossOrigin) image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image could not be loaded.'));
    image.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, size: number) {
  const scale = Math.max(size / image.naturalWidth, size / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const x = (size - width) / 2;
  const y = (size - height) / 2;
  ctx.drawImage(image, x, y, width, height);
}

function buildSignature(image: HTMLImageElement): ImageSignature {
  const canvas = document.createElement('canvas');
  canvas.width = SIGNATURE_SIZE;
  canvas.height = SIGNATURE_SIZE;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas is not available.');

  drawCover(ctx, image, SIGNATURE_SIZE);

  const { data } = ctx.getImageData(0, 0, SIGNATURE_SIZE, SIGNATURE_SIZE);
  const cellSide = SIGNATURE_SIZE / GRID_SIZE;
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE * 3 }, () => 0);
  const cellCounts = Array.from({ length: GRID_SIZE * GRID_SIZE }, () => 0);
  const histogram = Array.from({ length: 12 }, () => 0);
  const grays: number[] = [];

  for (let y = 0; y < SIGNATURE_SIZE; y += 1) {
    for (let x = 0; x < SIGNATURE_SIZE; x += 1) {
      const pixel = (y * SIGNATURE_SIZE + x) * 4;
      const r = data[pixel] / 255;
      const g = data[pixel + 1] / 255;
      const b = data[pixel + 2] / 255;
      const cell = Math.floor(y / cellSide) * GRID_SIZE + Math.floor(x / cellSide);

      cells[cell * 3] += r;
      cells[cell * 3 + 1] += g;
      cells[cell * 3 + 2] += b;
      cellCounts[cell] += 1;

      histogram[Math.min(3, Math.floor(r * 4))] += 1;
      histogram[4 + Math.min(3, Math.floor(g * 4))] += 1;
      histogram[8 + Math.min(3, Math.floor(b * 4))] += 1;
      grays.push((r + g + b) / 3);
    }
  }

  for (let index = 0; index < cellCounts.length; index += 1) {
    const count = cellCounts[index] || 1;
    cells[index * 3] /= count;
    cells[index * 3 + 1] /= count;
    cells[index * 3 + 2] /= count;
  }

  const pixelCount = SIGNATURE_SIZE * SIGNATURE_SIZE;
  for (let index = 0; index < histogram.length; index += 1) {
    histogram[index] /= pixelCount;
  }

  let edgeTotal = 0;
  let edgeCount = 0;
  for (let y = 0; y < SIGNATURE_SIZE - 1; y += 1) {
    for (let x = 0; x < SIGNATURE_SIZE - 1; x += 1) {
      const current = grays[y * SIGNATURE_SIZE + x];
      edgeTotal += Math.abs(current - grays[y * SIGNATURE_SIZE + x + 1]);
      edgeTotal += Math.abs(current - grays[(y + 1) * SIGNATURE_SIZE + x]);
      edgeCount += 2;
    }
  }

  return { cells, histogram, edge: edgeTotal / edgeCount };
}

function signatureSimilarity(a: ImageSignature, b: ImageSignature) {
  const cellDistance = Math.sqrt(
    a.cells.reduce((total, value, index) => total + (value - b.cells[index]) ** 2, 0) / a.cells.length,
  );
  const histogramDistance = a.histogram.reduce(
    (total, value, index) => total + Math.abs(value - b.histogram[index]),
    0,
  );
  const edgeDistance = Math.abs(a.edge - b.edge);

  const cellScore = Math.max(0, 1 - cellDistance / 0.45);
  const histogramScore = Math.max(0, 1 - histogramDistance / 2);
  const edgeScore = Math.max(0, 1 - edgeDistance / 0.25);

  return cellScore * 0.58 + histogramScore * 0.32 + edgeScore * 0.1;
}

async function signatureFromFile(file: File) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(objectUrl);
    return buildSignature(image);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function signatureFromSite(site: HeritageSite) {
  if (!signatureCache.has(site.id)) {
    signatureCache.set(
      site.id,
      loadImage(site.imageUrl, { crossOrigin: true })
        .then(buildSignature)
        .catch(() => null),
    );
  }

  return signatureCache.get(site.id)!;
}

async function recognizeFromReferenceImages(file: File): Promise<MonumentRecognitionResult | null> {
  const uploadedSignature = await signatureFromFile(file);
  const referenceSignatures = await Promise.all(
    heritageSites.map(async (site) => ({ site, signature: await signatureFromSite(site) })),
  );

  const matches = referenceSignatures
    .filter((entry): entry is { site: HeritageSite; signature: ImageSignature } => Boolean(entry.signature))
    .map(({ site, signature }) => ({
      site,
      score: signatureSimilarity(uploadedSignature, signature),
    }))
    .sort((a, b) => b.score - a.score);

  const best = matches[0];
  const second = matches[1];

  if (!best || best.score < VISUAL_MATCH_THRESHOLD || (second && best.score - second.score < 0.025)) {
    return null;
  }

  return recognizedSiteResult(
    best.site,
    file.name,
    'visual',
    Math.min(0.92, best.score),
    'Matched against the app monument reference photos.',
  );
}

export function ImageRecognizer() {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<MonumentRecognitionResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const previewObjectUrlRef = useRef<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');
    setResult(null);

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError('Please select a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError('Please select an image smaller than 8 MB.');
      return;
    }

    if (previewObjectUrlRef.current) URL.revokeObjectURL(previewObjectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlRef.current = objectUrl;
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please upload a monument photo first.');
      inputRef.current?.click();
      return;
    }

    setIsUploading(true);
    setResult(null);
    setError('');

    try {
      // Try local client-side visual signature match first
      const visualMatch = await recognizeFromReferenceImages(selectedFile);
      if (visualMatch) {
        setResult(visualMatch);
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/recognize', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Could not analyze this photo.');
      }

      setResult(payload as MonumentRecognitionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not analyze this photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    if (previewObjectUrlRef.current) URL.revokeObjectURL(previewObjectUrlRef.current);
    previewObjectUrlRef.current = null;
    setSelectedFile(null);
    setResult(null);
    setPreviewUrl(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Card className="w-full max-w-md mx-auto glass border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Camera className="h-5 w-5 text-primary" /> AI Monument Recognition
        </CardTitle>
        <CardDescription>Upload a photo of a supported monument to identify it.</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        <div 
          className="border-2 border-dashed border-border/50 rounded-xl p-4 min-h-56 flex flex-col items-center justify-center text-center hover:bg-accent/30 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium">Analyzing monument photo...</p>
            </div>
          ) : previewUrl ? (
            <div className="w-full space-y-3">
              <div className="relative overflow-hidden rounded-lg border border-border bg-background">
                <img src={previewUrl} alt="Uploaded monument preview" className="h-44 w-full object-cover" />
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    clearSelection();
                  }}
                  className="absolute right-2 top-2 rounded-full bg-background/90 p-1 text-foreground shadow"
                  aria-label="Remove uploaded image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-foreground/60">
                <ImageIcon className="h-4 w-4" />
                <span className="max-w-[220px] truncate">{selectedFile?.name}</span>
              </div>
            </div>
          ) : result ? (
            <div className="flex flex-col items-center text-green-500">
              <CheckCircle className="h-12 w-12 mb-2" />
              <p className="font-semibold text-foreground">Analysis Complete</p>
            </div>
          ) : (
            <>
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">Click to Upload</h3>
              <p className="text-xs text-foreground/60">Supports JPG, PNG, WebP</p>
            </>
          )}
        </div>

        {error && <p className="text-sm text-destructive text-center">{error}</p>}

        <Button className="w-full" onClick={handleAnalyze} disabled={isUploading}>
          {selectedFile ? 'Analyze Uploaded Photo' : 'Choose Photo to Analyze'}
        </Button>

        {result && (
          <div className="bg-accent/40 rounded-xl p-4 border border-border space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className={`flex items-center gap-2 rounded-lg border p-3 ${
              result.recognized
                ? 'border-green-500/30 bg-green-500/10 text-green-600'
                : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-600'
            }`}>
              {result.recognized ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <div className="min-w-0">
                <p className="text-sm font-bold">
                  {result.recognized ? 'Monument recognized' : 'Not confidently recognized'}
                </p>
                <p className="text-xs text-foreground/60">{result.note}</p>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-sm text-foreground/70">Uploaded</span>
              <span className="max-w-[180px] truncate text-sm font-medium">{result.uploadedFile}</span>
            </div>
            {result.recognized && (
              <>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-sm text-foreground/70">Monument</span>
                  <span className="font-bold text-primary">{result.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-sm text-foreground/70">Era</span>
                  <span className="font-medium text-right">{result.historicalEra}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-sm text-foreground/70">Style</span>
                  <Badge variant="outline">{result.architectureStyle}</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <span className="text-sm text-foreground/70">Location</span>
                  <span className="max-w-[180px] text-right text-sm font-medium">{result.location}</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm text-foreground/70">Confidence</span>
              <Badge className={result.recognized ? 'bg-green-600 hover:bg-green-600' : 'bg-yellow-600 hover:bg-yellow-600'}>
                {result.confidence}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
