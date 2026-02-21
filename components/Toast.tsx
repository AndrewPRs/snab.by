import React, { useEffect } from 'react';
import { ToastMessage } from '../types';

const Toast: React.FC<{ toasts: ToastMessage[]; removeToast: (id: number) => void }> = ({ toasts, removeToast }) => (
  <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-4 items-center pointer-events-none">
    {toasts.map(toast => <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />)}
  </div>
);

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: () => void }> = ({ toast, onRemove }) => {
  useEffect(() => { const timer = setTimeout(onRemove, 3500); return () => clearTimeout(timer); }, [onRemove]);
  const bgClass = { error: 'bg-red-600', success: 'bg-green-600', warning: 'bg-amber-500' }[toast.type];
  return (
    <div className={`${bgClass} text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 pointer-events-auto animate-bounce-in`}>
      <span className="text-xl">{toast.type === 'success' ? '✅' : '⚠️'}</span>
      <p className="font-black tracking-tight">{toast.message}</p>
    </div>
  );
};
export default Toast;