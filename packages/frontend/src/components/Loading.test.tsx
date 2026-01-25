import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('スピナーを表示する', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('メッセージを表示する', () => {
    render(<Loading message="読み込み中..." />);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('メッセージがない場合はテキストを表示しない', () => {
    render(<Loading />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('サイズによってスタイルが変わる', () => {
    const { rerender } = render(<Loading size="sm" />);
    expect(screen.getByTestId('loading-spinner')).toHaveClass('h-4', 'w-4');

    rerender(<Loading size="md" />);
    expect(screen.getByTestId('loading-spinner')).toHaveClass('h-8', 'w-8');

    rerender(<Loading size="lg" />);
    expect(screen.getByTestId('loading-spinner')).toHaveClass('h-12', 'w-12');
  });
});
