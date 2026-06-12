import { describe, expect, it } from 'vitest';
import { heritageSites } from './mock-data';
import {
  findSiteByIdOrName,
  identifySiteFromText,
  normalizeRecognitionText,
  recognizedSiteResult,
  unrecognizedResult,
} from './monument-recognition';

describe('monument recognition utilities', () => {
  it('normalizes recognition text for predictable matching', () => {
    expect(normalizeRecognitionText('Char-Minar!!.jpg')).toBe('char minar jpg');
  });

  it('identifies supported monuments from file names and aliases', () => {
    expect(identifySiteFromText('family-trip-golkonda-fort.png')?.name).toBe(
      'Golconda Fort'
    );
    expect(identifySiteFromText('qutub tombs visit')).toMatchObject({
      name: 'Qutb Shahi Tombs',
    });
    expect(identifySiteFromText('')).toBeNull();
    expect(identifySiteFromText('unknown-modern-building.jpg')).toBeNull();
  });

  it('finds sites by id or normalized name', () => {
    expect(findSiteByIdOrName('site_1')?.name).toBe('Charminar');
    expect(findSiteByIdOrName(null, 'Salar Jung Museum')?.id).toBe('site_5');
    expect(findSiteByIdOrName('missing', 'missing')).toBeNull();
  });

  it('builds recognized and unrecognized API payloads', () => {
    const recognized = recognizedSiteResult(
      heritageSites[0],
      'charminar.jpg',
      'filename',
      0.91,
      'Matched by alias.'
    );

    expect(recognized).toMatchObject({
      recognized: true,
      name: 'Charminar',
      confidence: '91%',
    });

    expect(unrecognizedResult('unknown.jpg', 'No match.')).toMatchObject({
      recognized: false,
      confidenceScore: 0,
      source: 'none',
    });
  });
});
