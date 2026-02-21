import React, { useState } from 'react';
import CategoryAccordion from './CategoryAccordion';

const RequestModal: React.FC<{ onClose: () => void; onSubmit: (data: any) => void; showToast: (m: string, t: any) => void }> = ({ onClose, onSubmit, showToast }) => {
  const [step, setStep] = useState<'form' | 'cats'>('form');
  const [selected, setSelected] = useState<string[]>([]);
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState('');

  const toggle = (name: string) => {
    if (selected.includes(name)) setSelected(p => p.filter(x => x !== name));
    else if (selected.length < 2) setSelected(p => [...p, name]);
    else showToast('⚠️ Вы не можете выбрать более 2 категорий!', 'error');
  };

  if (step === 'cats') return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"><div className="bg-white rounded-[2rem] w-full max-w-2xl h-[80vh] overflow-hidden shadow-2xl"><CategoryAccordion selectedSubcategories={selected} onToggle={toggle} onConfirm={() => setStep('form')} onCancel={() => setStep('form')} /></div></div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-8 top-8 text-2xl text-slate-300">✕</button>
        <h2 className="text-2xl font-black mb-8">Новая заявка</h2>
        <form onSubmit={e => { e.preventDefault(); if (!selected.length) return showToast('Выберите категорию', 'error'); onSubmit({ productName: product, quantity: qty, deadline: date, categories: selected }); }} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Категории (макс. 2)</label>
            <button type="button" onClick={() => setStep('cats')} className="w-full p-4 border-2 border-dashed rounded-2xl text-slate-400 font-bold hover:bg-slate-50 transition-all text-left">
              {selected.length ? selected.join(', ') : '+ Выбрать категории'}
            </button>
          </div>
          <input type="text" placeholder="Товар/услуга *" required value={product} onChange={e => setProduct(e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none ring-blue-50 focus:ring-4" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Количество *" required value={qty} onChange={e => setQty(e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" />
            <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100">Отправить заявку</button>
        </form>
      </div>
    </div>
  );
};
export default RequestModal;