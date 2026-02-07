import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditBookForm } from './EditBookForm';
import type { Book } from '@read-log/shared';

describe('EditBookForm', () => {
  const mockBook: Book = {
    id: 'book-uuid',
    libraryId: 'library-uuid',
    title: 'リーダブルコード',
    author: 'Dustin Boswell',
    isbn: '9784873115658',
    coverImage: 'https://example.com/cover.jpg',
    pageCount: 237,
    status: 'unread',
    category: 'tech',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const defaultProps = {
    book: mockBook,
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
    isSubmitting: false,
  };

  it('初期値が表示される', () => {
    render(<EditBookForm {...defaultProps} />);

    expect(screen.getByLabelText('タイトル')).toHaveValue('リーダブルコード');
    expect(screen.getByLabelText('著者')).toHaveValue('Dustin Boswell');
    expect(screen.getByLabelText('表紙画像URL')).toHaveValue('https://example.com/cover.jpg');
    expect(screen.getByLabelText('ページ数')).toHaveValue(237);
    expect(screen.getByLabelText('カテゴリ')).toHaveValue('tech');
  });

  it('タイトルを編集できる', async () => {
    const user = userEvent.setup();
    render(<EditBookForm {...defaultProps} />);

    const titleInput = screen.getByLabelText('タイトル');
    await user.clear(titleInput);
    await user.type(titleInput, '新しいタイトル');

    expect(titleInput).toHaveValue('新しいタイトル');
  });

  it('著者を編集できる', async () => {
    const user = userEvent.setup();
    render(<EditBookForm {...defaultProps} />);

    const authorInput = screen.getByLabelText('著者');
    await user.clear(authorInput);
    await user.type(authorInput, '新しい著者');

    expect(authorInput).toHaveValue('新しい著者');
  });

  it('表紙画像URLを編集できる', async () => {
    const user = userEvent.setup();
    render(<EditBookForm {...defaultProps} />);

    const coverImageInput = screen.getByLabelText('表紙画像URL');
    await user.clear(coverImageInput);
    await user.type(coverImageInput, 'https://example.com/new-cover.jpg');

    expect(coverImageInput).toHaveValue('https://example.com/new-cover.jpg');
  });

  it('ページ数を編集できる', async () => {
    const user = userEvent.setup();
    render(<EditBookForm {...defaultProps} />);

    const pageCountInput = screen.getByLabelText('ページ数');
    await user.clear(pageCountInput);
    await user.type(pageCountInput, '300');

    expect(pageCountInput).toHaveValue(300);
  });

  it('カテゴリを編集できる', async () => {
    const user = userEvent.setup();
    render(<EditBookForm {...defaultProps} />);

    await user.selectOptions(screen.getByLabelText('カテゴリ'), 'novel');

    expect(screen.getByLabelText('カテゴリ')).toHaveValue('novel');
  });

  it('送信時にonSubmitが呼ばれる', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EditBookForm {...defaultProps} onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: '保存' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'リーダブルコード',
      author: 'Dustin Boswell',
      coverImage: 'https://example.com/cover.jpg',
      pageCount: 237,
      category: 'tech',
    });
  });

  it('キャンセル時にonCancelが呼ばれる', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<EditBookForm {...defaultProps} onCancel={onCancel} />);

    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    expect(onCancel).toHaveBeenCalled();
  });

  it('isSubmittingがtrueの場合はボタンが無効化される', () => {
    render(<EditBookForm {...defaultProps} isSubmitting={true} />);

    expect(screen.getByRole('button', { name: '保存中...' })).toBeDisabled();
  });

  it('タイトルが空の場合は送信できない', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<EditBookForm {...defaultProps} onSubmit={onSubmit} />);

    const titleInput = screen.getByLabelText('タイトル');
    await user.clear(titleInput);
    await user.click(screen.getByRole('button', { name: '保存' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
