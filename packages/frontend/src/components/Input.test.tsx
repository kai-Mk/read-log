import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('入力値を表示する', () => {
    render(<Input value="テスト" onChange={() => {}} />);
    expect(screen.getByDisplayValue('テスト')).toBeInTheDocument();
  });

  it('入力変更イベントを発火する', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '新しい値' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('ラベルを表示する', () => {
    render(<Input label="名前" />);
    expect(screen.getByLabelText('名前')).toBeInTheDocument();
  });

  it('エラーメッセージを表示する', () => {
    render(<Input error="入力エラー" />);
    expect(screen.getByText('入力エラー')).toBeInTheDocument();
  });

  it('エラー時は赤いボーダーを表示する', () => {
    render(<Input error="エラー" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  it('disabled時は入力できない', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('placeholderを表示する', () => {
    render(<Input placeholder="入力してください" />);
    expect(screen.getByPlaceholderText('入力してください')).toBeInTheDocument();
  });
});
