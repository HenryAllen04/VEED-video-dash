// Purpose: Unit tests for utility functions
import { cn } from './utils';

describe('cn utility function', () => {
  test('should merge class names correctly', () => {
    const result = cn('flex items-center', 'justify-between');
    expect(result).toBe('flex items-center justify-between');
  });

  test('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  test('should handle Tailwind conflicts correctly', () => {
    // twMerge should handle conflicting Tailwind classes
    const result = cn('p-4 p-6'); // p-6 should override p-4
    expect(result).toBe('p-6');
  });

  test('should handle empty inputs', () => {
    const result = cn('', null, undefined, false);
    expect(result).toBe('');
  });

  test('should handle arrays of classes', () => {
    const result = cn(['flex', 'items-center'], 'justify-between');
    expect(result).toBe('flex items-center justify-between');
  });

  test('should handle object syntax', () => {
    const result = cn({
      'flex': true,
      'items-center': true,
      'hidden': false
    });
    expect(result).toBe('flex items-center');
  });
});
