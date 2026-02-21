import React, { useState, useEffect } from 'react';
import { Page, User, UserRole, ProcurementRequest, ToastMessage, RequestStatus } from './types';
import { MOCK_REQUESTS, TARIFFS } from './constants';
import RequestModal from './components/RequestModal';
import Toast from './components/Toast';

const DateTimeDisplay = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) + ' г.';
  return (
    <div className="bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className="text-right">
        <p className="text-xl font-black text-slate-900 leading-none mb-1">{timeString}</p>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{dateString}</p>
      </div>
      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 text-xl border border-slate-100 shadow-inner">🕒</div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [user, setUser] = useState<User | null>({ id: '1', name: 'Николай Богдаль', email: 'client@test.by', role: 'buyer', tariff: 'Профессиональный' });
  const [requests, setRequests] = useState<ProcurementRequest[]>(MOCK_REQUESTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToast = (message: string, type: 'error' | 'success' | 'warning' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleCreateRequest = (data: any) => {
    const newRequest: ProcurementRequest = {
      id: `№${requests.length + 1}`,
      date: new Date().toLocaleDateString('ru-RU'),
      status: 'new',
      ...data
    };
    setRequests(prev => [newRequest, ...prev]);
    setIsModalOpen(false);
    addToast('Заявка успешно создана!', 'success');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="w-80 bg-white border-r fixed h-full z-40 p-8 flex flex-col shadow-sm">
        <div className="text-3xl font-black mb-12 tracking-tight flex items-center gap-2">
           OMTS<span className="text-blue-600">.PRO</span>
           <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black">v2.0</span>
        </div>
        <div className="flex items-center gap-4 mb-10 p-5 bg-slate-50/50 rounded-3xl border border-slate-100">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">👤</div>
          <div>
            <p className="font-black text-slate-900 text-sm leading-none mb-1">{user?.name}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID {user?.id} · Покупатель</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1 overflow-y-auto hide-scrollbar">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 ml-4">ОСНОВНОЕ</p>
          <NavItem label="Панель управления" icon="🗂️" />
          <NavItem label="Компания" icon="🏢" />
          <NavItem label="Сотрудники" icon="👥" count={3} />
          <NavItem label="Мои заявки" icon="📑" active count={requests.length} />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] my-6 ml-4">ФИНАНСЫ</p>
          <NavItem label="Тариф и подписка" icon="💰" />
          <NavItem label="История оплат" icon="💳" />
          <NavItem label="Лимиты и статус" icon="📊" />
        </nav>
      </aside>
      <main className="flex-1 ml-80 p-12 max-w-[1400px] mx-auto w-full">
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Мои заявки</h1>
              <p className="text-slate-400 font-medium text-sm">Управление заявками и обращениями</p>
            </div>
            <DateTimeDisplay />
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsModalOpen(true)} className="bg-[#10b981] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-green-100">+ Новая заявка</button>
             <input type="text" placeholder="Поиск по номеру или товару..." className="flex-1 bg-white border border-slate-100 rounded-[1.5rem] px-8 py-4 outline-none font-bold text-slate-900" />
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
                  <th className="py-6 px-4">НОМЕР</th>
                  <th className="py-6 px-4">ДАТА</th>
                  <th className="py-6 px-4">КАТЕГОРИЯ</th>
                  <th className="py-6 px-4">ТОВАР</th>
                  <th className="py-6 px-4">КОЛ-ВО</th>
                  <th className="py-6 px-4">СТАТУС</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="py-6 px-4 font-black">{req.id}</td>
                    <td className="py-6 px-4 text-slate-400 text-xs">{req.date}</td>
                    <td className="py-6 px-4 text-[11px] font-bold text-slate-400">{req.categories.join(', ')}</td>
                    <td className="py-6 px-4 font-black text-sm uppercase">{req.productName}</td>
                    <td className="py-6 px-4 font-bold">{req.quantity}</td>
                    <td className="py-6 px-4"><span className="bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase">Новая</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {isModalOpen && <RequestModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreateRequest} showToast={addToast} />}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

const NavItem: React.FC<{ label: string; icon: string; active?: boolean; count?: number }> = ({ label, icon, active, count }) => (
  <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${active ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
    <span>{icon}</span><span className="text-sm">{label}</span>
    {count !== undefined && <span className={`ml-auto px-2 py-0.5 rounded-lg text-[10px] ${active ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>{count}</span>}
  </button>
);

export default App;