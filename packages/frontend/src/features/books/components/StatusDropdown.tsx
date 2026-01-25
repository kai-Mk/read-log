import type { BookStatus } from '@read-log/shared';

type StatusDropdownProps = {
  value: BookStatus;
  onChange: (status: BookStatus) => void;
  disabled?: boolean;
};

const STATUS_OPTIONS: { value: BookStatus; label: string }[] = [
  { value: 'unread', label: '積読' },
  { value: 'wishlist', label: '読みたい' },
  { value: 'completed', label: '読了' },
];

export function StatusDropdown({ value, onChange, disabled = false }: StatusDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as BookStatus)}
      disabled={disabled}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
