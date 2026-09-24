import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  Building2, 
  LogIn, 
  ArrowRight,
  UserCheck,
  Lock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PartnerLoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginPartner, 
    setCurrentView 
  } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Wprowadź adres e-mail');
      return;
    }

    // Simple auth logic: if contains 'admin' -> admin, else -> partner
    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('oplast');
    loginPartner(
      email.trim(), 
      isAdmin ? 'admin' : 'partner',
      isAdmin ? 'Administrator Oplast' : 'Partner Handlowy'
    );
    setCurrentView('admin');
  };

  const handleQuickLogin = (role: 'admin' | 'partner') => {
    if (role === 'admin') {
      loginPartner('biuro@oplast.pl', 'admin', 'Administrator Oplast (Fabryka Winduga)');
    } else {
      loginPartner('sklad@probud.torun.pl', 'partner', 'PRO-BUD Toruń (Punkt Handlowy)', 'partner-1');
    }
    setCurrentView('admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setError(null);
            setIsLoginModalOpen(false);
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors cursor-pointer"
          aria-label="Zamknij"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-emerald-700/20 mb-3">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Strefa Partnera & CRM
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xs mx-auto">
            Logowanie dla punktów dystrybucyjnych oraz działu zarządzania siecią Oplast Garden.
          </p>
        </div>

        {/* Quick Demo Access Buttons */}
        <div className="mb-6 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2.5">
          <p className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
            Szybkie logowanie testowe (1-klik):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Admin Oplast (CRM)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('partner')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs shadow-2xs transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>Partner (Skład)</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center mb-5">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Lub wpisz dane
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Adres e-mail:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="np. biuro@oplast.pl lub partner@twojafirma.pl"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Hasło dostępowe:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-slate-50 focus:bg-white transition-all"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Dla kont demo dowolne hasło jest akceptowane.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Zaloguj się do panelu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>Nie masz jeszcze punktu? Skontaktuj się z nami w sprawie współpracy B2B.</span>
        </div>
      </div>
    </div>
  );
};
