export type ViewType = 'all' | 'unread' | 'wishlist' | 'completed';

type ViewTabsProps = {
  activeView: ViewType;
  onChange: (view: ViewType) => void;
};

const TABS: { value: ViewType; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'unread', label: '積読' },
  { value: 'wishlist', label: '読みたい' },
  { value: 'completed', label: '読了' },
];

export function ViewTabs({ activeView, onChange }: ViewTabsProps) {
  return (
    <div role="tablist" className="mb-6 flex gap-2 border-b border-gray-200">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeView === tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeView === tab.value
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
