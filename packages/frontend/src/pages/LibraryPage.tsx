import { useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';

export function LibraryPage() {
  const { libraryId } = useParams<{ libraryId: string }>();

  if (!libraryId) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">マイ書庫</h1>
        <p className="text-gray-600">Library ID: {libraryId}</p>
        {/* TODO: 本の一覧を表示 */}
      </main>
    </div>
  );
}
