import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/types';
import { ChevronDown, Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (compact) {
    // Segmented / pill toggle for mobile or compact bars
    return (
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
        {languages.map((item) => (
          <button
            key={item.code}
            onClick={() => handleSelect(item.code)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              language === item.code
                ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
            title={item.label}
          >
            <span>{item.flag}</span>
            <span className="uppercase">{item.code}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-xs hover:border-emerald-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-sm">{currentLang.flag}</span>
        <span className="uppercase font-bold tracking-wide">{currentLang.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
            Language / Język
          </div>
          {languages.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <span>{item.label}</span>
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
