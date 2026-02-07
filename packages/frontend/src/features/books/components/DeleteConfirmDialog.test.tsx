import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

describe('DeleteConfirmDialog', () => {
  const defaultProps = {
    isOpen: true,
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
    bookTitle: 'リーダブルコード',
    isLoading: false,
  };

  it('確認メッセージが表示される', () => {
    render(<DeleteConfirmDialog {...defaultProps} />);

    expect(screen.getByText('本の削除')).toBeInTheDocument();
    expect(screen.getByText(/「リーダブルコード」を削除しますか？/)).toBeInTheDocument();
  });

  it('「キャンセル」をクリックするとonCancelが呼ばれる', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<DeleteConfirmDialog {...defaultProps} onCancel={onCancel} />);

    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    expect(onCancel).toHaveBeenCalled();
  });

  it('「削除する」をクリックするとonConfirmが呼ばれる', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<DeleteConfirmDialog {...defaultProps} onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: '削除する' }));

    expect(onConfirm).toHaveBeenCalled();
  });

  it('isLoadingがtrueの場合はボタンが無効化される', () => {
    render(<DeleteConfirmDialog {...defaultProps} isLoading={true} />);

    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '削除中...' })).toBeDisabled();
  });

  it('isOpenがfalseの場合は表示されない', () => {
    render(<DeleteConfirmDialog {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('本の削除')).not.toBeInTheDocument();
  });
});
