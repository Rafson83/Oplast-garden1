import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Clock, 
  Store,
  Layers
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';

export const PartnerInquiryModal: React.FC = () => {
  const { 
    isPartnerInquiryOpen, 
    setIsPartnerInquiryOpen, 
    selectedPartner, 
    addPartnerInquiry,
    partnerProductFilter,
    setIsPrivacyPolicyOpen
  } = useShop();
  const { t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requestedProduct, setRequestedProduct] = useState('');
  const [estimatedQuantity, setEstimatedQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [rodoConsent, setRodoConsent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set default product when opened
  useEffect(() => {
    if (isPartnerInquiryOpen) {
      setIsSuccess(false);
      if (partnerProductFilter) {
        const p = PRODUCTS.find(prod => prod.id === partnerProductFilter);
        if (p) {
          setRequestedProduct(p.name);
        }
      } else if (selectedPartner && selectedPartner.stockedProducts.length > 0) {
        const firstProd = PRODUCTS.find(prod => prod.id === selectedPartner.stockedProducts[0]);
        if (firstProd) {
          setRequestedProduct(firstProd.name);
        }
      }
    }
  }, [isPartnerInquiryOpen, partnerProductFilter, selectedPartner]);

  if (!isPartnerInquiryOpen || !selectedPartner) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !email) return;
    if (!rodoConsent) {
      alert('Proszę zaakceptować zgodę RODO przed wysłaniem zapytania.');
      return;
    }

    addPartnerInquiry({
      partnerId: selectedPartner.id,
      partnerName: selectedPartner.name,
      customerName,
      phone,
      email,
      requestedProduct: requestedProduct || 'Kratka Oplast',
      estimatedQuantity: estimatedQuantity || 'Brak sprecyzowanej ilości',
      message,
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsPartnerInquiryOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label={t.partners.inquiryClose}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-4 h-4" />
            <span>{selectedPartner.badge || t.partners.authorizedBadge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            {selectedPartner.name}
          </h3>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300 mt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {selectedPartner.address.street}, {selectedPartner.address.postalCode} {selectedPartner.address.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {selectedPartner.openingHours.weekdays}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-slate-900 font-heading">
                  {t.partners.inquirySentSuccess}
                </h4>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  {t.partners.inquirySentDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto text-left space-y-2">
                <p className="text-xs font-bold text-emerald-950 uppercase">
                  Możesz również zadzwonić od razu do punktu:
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800">{selectedPartner.name}</span>
                  <a
                    href={`tel:${selectedPartner.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1 text-sm font-extrabold text-emerald-700 hover:text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-300 shadow-xs"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{selectedPartner.phone}</span>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl text-sm transition-all cursor-pointer"
                >
                  {t.partners.inquiryClose}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <p className="text-sm font-bold text-slate-900">
                  {t.partners.inquiryModalTitle}
                </p>
                <p className="text-xs text-slate-500">
                  {t.partners.inquiryModalSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.partners.inquiryName}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="np. Jan Kowalski"
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.partners.inquiryPhone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+48 ___ ___ ___"
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.partners.inquiryEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj-email@domena.pl"
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.partners.inquiryQuantity}
                  </label>
                  <input
                    type="text"
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    placeholder="np. 40 m² / 180 szt."
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>{t.partners.inquiryProduct}</span>
                  <span className="text-[11px] text-emerald-700 font-normal flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Asortyment Oplast
                  </span>
                </label>
                <select
                  value={requestedProduct}
                  onChange={(e) => setRequestedProduct(e.target.value)}
                  className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
                >
                  {PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name} ({prod.category === 'kratki' ? `${prod.heightMm} mm` : prod.dimensions})
                    </option>
                  ))}
                  <option value="Inny asortyment / Kompleksowe zamówienie">
                    Inny asortyment / Cały zestaw z obrzeżami i kotwami
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.partners.inquiryMessage}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Kiedy planujesz odbiór? Czy potrzebujesz kruszywa lub transportu z rozładunkiem HDS?"
                  className="w-full text-xs font-normal px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50 resize-none"
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

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`tel:${selectedPartner.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedPartner.phone}</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    disabled={!rodoConsent}
                    className={`flex items-center gap-2 font-bold py-2.5 px-5 rounded-xl text-xs shadow-md transition-all ${
                      rodoConsent
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.partners.inquirySend}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
