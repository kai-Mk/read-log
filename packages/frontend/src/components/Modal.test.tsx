import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('isOpen=trueの時に表示される', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>モーダルの内容</p>
      </Modal>
    );
    expect(screen.getByText('モーダルの内容')).toBeInTheDocument();
  });

  it('isOpen=falseの時は表示されない', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>モーダルの内容</p>
      </Modal>
    );
    expect(screen.queryByText('モーダルの内容')).not.toBeInTheDocument();
  });

  it('タイトルを表示する', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="テストタイトル">
        <p>内容</p>
      </Modal>
    );
    expect(screen.getByText('テストタイトル')).toBeInTheDocument();
  });

  it('閉じるボタンでonCloseを呼ぶ', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="テスト">
        <p>内容</p>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('閉じる'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('背景クリックでonCloseを呼ぶ', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>内容</p>
      </Modal>
    );

    // Find the backdrop (the div with bg-black class)
    const backdrop = document.querySelector('.bg-black.bg-opacity-50');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('Escapeキーでoncloseを呼ぶ', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>内容</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
