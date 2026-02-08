import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewTabs } from './ViewTabs';

describe('ViewTabs', () => {
  it('すべて、積読、読みたい、読了の4つのタブが表示される', () => {
    render(<ViewTabs activeView="all" onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'すべて' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '積読' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '読みたい' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '読了' })).toBeInTheDocument();
  });

  it('アクティブなタブがハイライトされる', () => {
    render(<ViewTabs activeView="unread" onChange={vi.fn()} />);

    const activeTab = screen.getByRole('tab', { name: '積読' });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');

    const inactiveTab = screen.getByRole('tab', { name: 'すべて' });
    expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
  });

  it('タブをクリックするとonChangeが呼ばれる', () => {
    const onChange = vi.fn();
    render(<ViewTabs activeView="all" onChange={onChange} />);

    fireEvent.click(screen.getByRole('tab', { name: '積読' }));

    expect(onChange).toHaveBeenCalledWith('unread');
  });

  it('読みたいタブをクリックするとwishlistでonChangeが呼ばれる', () => {
    const onChange = vi.fn();
    render(<ViewTabs activeView="all" onChange={onChange} />);

    fireEvent.click(screen.getByRole('tab', { name: '読みたい' }));

    expect(onChange).toHaveBeenCalledWith('wishlist');
  });

  it('読了タブをクリックするとcompletedでonChangeが呼ばれる', () => {
    const onChange = vi.fn();
    render(<ViewTabs activeView="all" onChange={onChange} />);

    fireEvent.click(screen.getByRole('tab', { name: '読了' }));

    expect(onChange).toHaveBeenCalledWith('completed');
  });

  it('すべてタブをクリックするとallでonChangeが呼ばれる', () => {
    const onChange = vi.fn();
    render(<ViewTabs activeView="unread" onChange={onChange} />);

    fireEvent.click(screen.getByRole('tab', { name: 'すべて' }));

    expect(onChange).toHaveBeenCalledWith('all');
  });
});
