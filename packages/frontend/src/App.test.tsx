import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

vi.mock('./features/library/hooks/useLibrary', () => ({
  useLibrary: vi.fn(() => ({
    data: {
      id: 'test-id',
      name: 'テスト書庫',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    isLoading: false,
    error: undefined,
  })),
}));

vi.mock('./features/library/hooks/useCreateLibrary', () => ({
  useCreateLibrary: vi.fn(() => ({
    createLibrary: vi.fn(),
    isLoading: false,
    error: null,
  })),
}));

vi.mock('./features/books/hooks/useBooks', () => ({
  useBooks: vi.fn(() => ({
    data: [],
    isLoading: false,
    error: undefined,
    mutate: vi.fn(),
  })),
}));

vi.mock('./features/books/hooks/useCreateBook', () => ({
  useCreateBook: vi.fn(() => ({
    createBook: vi.fn(),
    isLoading: false,
    error: null,
  })),
}));

vi.mock('./features/books/hooks/useIsbnSearch', () => ({
  useIsbnSearch: vi.fn(() => ({
    search: vi.fn(),
    isSearching: false,
    error: null,
  })),
}));

describe('App', () => {
  it('トップページを表示する', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Read Log')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'マイ書庫を作成' })).toBeInTheDocument();
  });

  it('ライブラリページを表示する', () => {
    render(
      <MemoryRouter initialEntries={['/library/test-id']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('テスト書庫')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '本を追加' })).toBeInTheDocument();
  });
});
