import { describe, expect, it } from 'vitest';
import { cn } from '../lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2', 'py-2')).toBe('px-2 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('px-2', true && 'py-2', false && 'mt-2')).toBe('px-2 py-2');
  });

  it('handles tailwind conflicts', () => {
    expect(cn('px-2 py-2', 'p-4')).toBe('p-4');
  });

  it('handles undefined and null', () => {
    expect(cn('px-2', undefined, null)).toBe('px-2');
  });
});
