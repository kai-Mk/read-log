import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function TopPage() {
  const navigate = useNavigate();
  const [libraryId, setLibraryId] = useState('');

  const handleCreateLibrary = () => {
    // TODO: API呼び出しでマイ書庫を作成
    navigate('/library/new-library-id');
  };

  const handleGoToLibrary = (e: React.FormEvent) => {
    e.preventDefault();
    if (libraryId.trim()) {
      navigate(`/library/${libraryId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Read Log</h1>
          <p className="text-xl text-gray-600 mb-8">積読本・読みたい本・読了本を管理するアプリ</p>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">マイ書庫を作成</h2>
            <p className="text-gray-600 mb-6">新しいマイ書庫を作成して、本の管理を始めましょう</p>
            <Button onClick={handleCreateLibrary}>マイ書庫を作成</Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">既存のマイ書庫にアクセス</h2>
            <form onSubmit={handleGoToLibrary} className="flex gap-4">
              <Input
                type="text"
                placeholder="マイ書庫IDを入力"
                value={libraryId}
                onChange={(e) => setLibraryId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="secondary">
                アクセス
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
