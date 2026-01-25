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
    expect(screen.getByText('ID: test-id')).toBeInTheDocument();
  });
});
