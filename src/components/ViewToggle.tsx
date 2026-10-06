import type { ViewMode } from '../types';

export default function ViewToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  return (
    <div className="flex gap-1 bg-accent/15 rounded-lg p-0.5">
      {(['grid', 'list'] as const).map(m => (
        <button key={m} onClick={() => onChange(m)}
          className={`px-3 py-1.5 text-xs rounded-md transition-all ${mode === m ? 'bg-white shadow-sm text-brown font-medium' : 'text-brown/40 hover:text-brown/60'}`}>
          {m === 'grid' ? '卡片檢視' : '列表檢視'}
        </button>
      ))}
    </div>
  );
}
