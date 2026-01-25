import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('テキストを表示する', () => {
    render(<Button>クリック</Button>);
    expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument();
  });

  it('クリックイベントを発火する', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled時はクリックできない', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        クリック
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('isLoading時は読み込み中を表示する', () => {
    render(<Button isLoading>クリック</Button>);
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('variantによってスタイルが変わる', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600');
  });

  it('sizeによってスタイルが変わる', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6');
  });
});
