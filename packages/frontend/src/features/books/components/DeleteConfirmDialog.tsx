import { Modal } from '../../../components/Modal';

type DeleteConfirmDialogProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  bookTitle: string;
  isLoading: boolean;
};

export function DeleteConfirmDialog({
  isOpen,
  onCancel,
  onConfirm,
  bookTitle,
  isLoading,
}: DeleteConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="本の削除" size="sm">
      <p className="text-gray-600">「{bookTitle}」を削除しますか？</p>
      <p className="mt-2 text-sm text-gray-500">この操作は取り消せません。</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400"
        >
          {isLoading ? '削除中...' : '削除する'}
        </button>
      </div>
    </Modal>
  );
}
