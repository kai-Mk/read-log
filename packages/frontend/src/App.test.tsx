import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

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
    expect(screen.getByText('マイ書庫')).toBeInTheDocument();
    expect(screen.getByText('Library ID: test-id')).toBeInTheDocument();
  });
});
