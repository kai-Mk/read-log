import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StatusDropdown } from './StatusDropdown';

describe('StatusDropdown', () => {
  it('現在のステータスが選択状態で表示される', () => {
    render(<StatusDropdown value="unread" onChange={vi.fn()} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('unread');
  });

  it('すべてのステータスオプションが表示される', () => {
    render(<StatusDropdown value="unread" onChange={vi.fn()} />);

    expect(screen.getByRole('option', { name: '積読' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '読みたい' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '読了' })).toBeInTheDocument();
  });

  it('ステータスを選択するとonChangeが呼ばれる', () => {
    const onChange = vi.fn();
    render(<StatusDropdown value="unread" onChange={onChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });

    expect(onChange).toHaveBeenCalledWith('completed');
  });

  it('disabled=trueの場合は操作できない', () => {
    render(<StatusDropdown value="unread" onChange={vi.fn()} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });
});
