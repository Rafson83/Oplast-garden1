import React, { useState } from 'react';
import { X, Box, Check, Truck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const SampleBoxModal: React.FC = () => {
  const { isSampleBoxOpen, setIsSampleBoxOpen, addSampleBoxOrder, setIsPrivacyPolicyOpen } = useShop();
  const { t } = useLanguage();

  const [companyName, setCompanyName] = useState('');
  const [nip, setNip] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState<'architect' | 'paving_contractor' | 'construction_company' | 'gardener' | 'distributor' | 'other'>('paving_contractor');
  const [selectedModels, setSelectedModels] = useState<string[]>([
    'Kratka H40 (Bestseller)',
    'Kratka H50 Heavy',
    'Obrzeże Eko-Bord 45',
    'Katalog z KDWU'
  ]);
  const [comments, setComments] = useState('');
  const [rodoConsent, setRodoConsent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isSampleBoxOpen) return null;

  const toggleModel = (model: string) => {
    setSelectedModels(prev =>
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !phone || !email || !street || !city) {
      alert('Proszę wypełnić wymagane pola formularza.');
      return;
    }
    if (!rodoConsent) {
      alert('Proszę zaakceptować zgodę RODO, aby zamówić pakiet próbek.');
      return;
    }

    addSampleBoxOrder({
      companyName,
      nip,
      recipientName,
      phone,
      email,
      street,
      postalCode,
      city,
      profession,
      selectedModels,
      comments,
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsSampleBoxOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-white border border-white/10">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                {t.sampleBox.title}
              </h2>
              <p className="text-emerald-200 text-xs sm:text-sm">
                {t.sampleBox.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              {t.sampleBox.successTitle}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {t.sampleBox.successDesc}: <strong>{street}, {city}</strong>
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors cursor-pointer"
              >
                {t.sampleBox.close}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
            
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-emerald-900 leading-snug">
                {t.sampleBox.notice}
              </p>
            </div>

            {/* Form Fields Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.sampleBox.companyLabel} *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="np. Bruk-Bud Sp. z o.o."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.sampleBox.nipLabel}</label>
                <input
                  type="text"
                  value={nip}
                  onChange={e => setNip(e.target.value)}
                  placeholder="np. 8911802345"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.sampleBox.recipientLabel} *</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  placeholder="Jan Kowalski"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.sampleBox.professionLabel} *</label>
                <select
                  value={profession}
                  onChange={e => setProfession(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="paving_contractor">Brukarz / Wykonawca</option>
                  <option value="architect">Architekt / Projektant</option>
                  <option value="construction_company">Generalny Wykonawca</option>
                  <option value="gardener">Firma Ogrodnicza</option>
                  <option value="distributor">Hurtownia / Skład</option>
                  <option value="other">Inna działalność</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.sampleBox.phoneLabel} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+48 600 000 000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.sampleBox.emailLabel} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="biuro@firma.pl"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Address */}
            <div className="pt-2 border-t border-slate-200">
              <p className="font-bold text-slate-900 mb-2">{t.cart.addressData}:</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-slate-600 block mb-1">{t.sampleBox.streetLabel} *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="ul. Przemysłowa 12"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">{t.sampleBox.postalLabel} & {t.sampleBox.cityLabel} *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="00-000"
                      className="w-20 px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs text-center"
                    />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Miasto"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Selected models */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">{t.sampleBox.selectItemsLabel}:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Kratka H30 Ogrodowa (3 cm)',
                  'Kratka H40 Parkingowa (4 cm)',
                  'Kratka H50 Drogowa Heavy (5 cm)',
                  'Obrzeże Trawnikowe Eko-Bord 45/58',
                  'Kotwy mocujące 18/24 cm',
                  'Znaczniki parkingowe białe/żółte',
                  'Drukowany katalog z badaniami ITB'
                ].map(item => (
                  <label key={item} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(item)}
                      onChange={() => toggleModel(item)}
                      className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                    />
                    <span className="text-slate-800 text-[11px] font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-600 block mb-1">{t.sampleBox.commentsLabel}:</label>
              <textarea
                rows={2}
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder="np. planujemy parking pod biurowiec ok. 1200 m2 na wiosnę..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs"
              />
            </div>

            {/* RODO Consent Checkbox */}
            <div className="pt-2 border-t border-slate-200">
              <label className="flex items-start gap-2.5 text-[11px] text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={rodoConsent}
                  onChange={e => setRodoConsent(e.target.checked)}
                  className="mt-0.5 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer shrink-0"
                />
                <span>
                  {t.rodo.consentCheckbox}{' '}
                  <button
                    type="button"
                    onClick={() => setIsPrivacyPolicyOpen(true)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer inline-flex items-center gap-0.5"
                  >
                    {t.rodo.policyLink}
                  </button>
                  .
                </span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                {t.sampleBox.cancel}
              </button>
              <button
                type="submit"
                disabled={!rodoConsent}
                className={`font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors text-xs flex items-center gap-2 ${
                  rodoConsent
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>{t.sampleBox.submit}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
