import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookForm } from './BookForm';

describe('BookForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('フォームフィールドが表示される', () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('タイトル')).toBeInTheDocument();
    expect(screen.getByLabelText('著者')).toBeInTheDocument();
    expect(screen.getByLabelText('ISBN')).toBeInTheDocument();
    expect(screen.getByLabelText('ステータス')).toBeInTheDocument();
    expect(screen.getByLabelText('カテゴリ')).toBeInTheDocument();
  });

  it('初期値がある場合は入力欄に表示される', () => {
    const initialValues = {
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      isbn: '9784873115658',
      coverImage: 'https://example.com/cover.jpg',
      pageCount: 237,
    };

    render(
      <BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} initialValues={initialValues} />
    );

    expect(screen.getByLabelText('タイトル')).toHaveValue('リーダブルコード');
    expect(screen.getByLabelText('著者')).toHaveValue('Dustin Boswell');
    expect(screen.getByLabelText('ISBN')).toHaveValue('9784873115658');
  });

  it('必須フィールドが空の場合は送信できない', async () => {
    const user = userEvent.setup();
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('フォームを送信するとonSubmitが呼ばれる', async () => {
    const user = userEvent.setup();
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText('タイトル'), 'テスト本');
    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'テスト本',
      })
    );
  });

  it('キャンセルボタンをクリックするとonCancelが呼ばれる', async () => {
    const user = userEvent.setup();
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('送信中はボタンが無効になる', () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} isSubmitting />);

    expect(screen.getByRole('button', { name: '登録中...' })).toBeDisabled();
  });
});
