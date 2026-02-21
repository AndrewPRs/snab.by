import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../constants';

interface Props { selectedSubcategories: string[]; onToggle: (name: string) => void; onConfirm: () => void; onCancel: () => void; }

const CategoryAccordion: React.FC<Props> = ({ selectedSubcategories, onToggle, onConfirm, onCancel }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const toggle = (id: string) => setExpandedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b flex justify-between items-center bg-slate-50">
        <h3 className="text-lg font-black text-slate-800">Выберите категории (макс. 2)</h3>
        <button onClick={onCancel} className="text-2xl text-slate-400">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {CATEGORIES_DATA.map(cat => (
          <div key={cat.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <button onClick={() => toggle(cat.id)} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 font-bold text-slate-700">
              <span className="flex items-center gap-3"><span>{cat.icon}</span> {cat.name}</span>
              <span className={`transition-transform ${expandedIds.includes(cat.id) ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {expandedIds.includes(cat.id) && (
              <div className="p-5 pt-0 grid grid-cols-1 gap-3 bg-slate-50/50">
                {cat.subcategories.map(sub => (
                  <label key={sub.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedSubcategories.includes(sub.name)} onChange={() => onToggle(sub.name)} className="w-5 h-5 rounded border-slate-300 text-blue-600" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">{sub.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-6 border-t flex justify-end gap-3 bg-white">
        <button onClick={onCancel} className="px-6 py-3 font-bold text-slate-400">Отмена</button>
        <button onClick={onConfirm} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-blue-100">Подтвердить ({selectedSubcategories.length})</button>
      </div>
    </div>
  );
};
export default CategoryAccordion;