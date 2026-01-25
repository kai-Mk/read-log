import { Routes, Route } from 'react-router-dom';
import { TopPage } from './pages/TopPage';
import { LibraryPage } from './pages/LibraryPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="/library/:libraryId" element={<LibraryPage />} />
    </Routes>
  );
}
