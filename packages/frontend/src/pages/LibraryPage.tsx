import { useParams, Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { useLibrary } from '../features/library/hooks/useLibrary';

export function LibraryPage() {
  const { libraryId } = useParams<{ libraryId: string }>();
  const { data: library, isLoading, error } = useLibrary(libraryId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loading message="読み込み中..." />
      </div>
    );
  }

  if (error || !library) {
    return (
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">マイ書庫が見つかりません</h1>
            <p className="text-gray-600 mb-6">
              指定されたマイ書庫は存在しないか、削除されています。
            </p>
            <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
              トップページへ戻る
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{library.name}</h1>
        <p className="text-gray-600 mb-8">ID: {library.id}</p>
        {/* TODO: 本の一覧を表示 */}
      </main>
    </div>
  );
}
