import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  it('初期状態はcopied=false, error=null', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('テキストをクリップボードにコピーする', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current.copy('テスト');
      expect(success).toBe(true);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('テスト');
    expect(result.current.copied).toBe(true);
  });

  it('コピー後に指定時間でcopiedがfalseに戻る', async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));

    await act(async () => {
      await result.current.copy('テスト');
    });

    expect(result.current.copied).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.copied).toBe(false);
  });

  it('コピー失敗時はerrorがセットされる', async () => {
    const error = new Error('Copy failed');
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current.copy('テスト');
      expect(success).toBe(false);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.copied).toBe(false);
  });
});
