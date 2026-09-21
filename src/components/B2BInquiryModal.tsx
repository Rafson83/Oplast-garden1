import React, { useState, useEffect } from 'react';
import { X, Check, FileSpreadsheet, Phone, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const B2BInquiryModal: React.FC = () => {
  const { 
    isInquiryOpen, 
    setIsInquiryOpen, 
    inquiryPreselectedProduct,
    addB2BInquiry 
  } = useShop();

  const [companyName, setCompanyName] = useState('');
  const [nip, setNip] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [investmentType, setInvestmentType] = useState('parking_commercial');
  const [estimatedM2, setEstimatedM2] = useState<number>(500);
  const [preferredProduct, setPreferredProduct] = useState(inquiryPreselectedProduct || 'Kratka Oplast H40 (Parkingowa)');
  const [requiresTransport] = useState(true);
  const [transportType, setTransportType] = useState('ftl_24t');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    if (inquiryPreselectedProduct) {
      setPreferredProduct(inquiryPreselectedProduct);
    }
  }, [inquiryPreselectedProduct]);

  if (!isInquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !phone || !email || !city) {
      alert('Proszę uzupełnić dane kontaktowe firmy.');
      return;
    }

    const id = `FTL-${Date.now().toString().slice(-6)}`;
    setGeneratedId(id);

    addB2BInquiry({
      companyName,
      nip,
      contactPerson,
      phone,
      email,
      city,
      postalCode,
      investmentType,
      estimatedM2,
      preferredProduct,
      requiresTransport,
      notes: `${notes} [Transport: ${transportType}]`,
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsInquiryOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                Zapytanie Ofertowe B2B / Przetargi / FTL 24t
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Indywidualna kalkulacja kosztów z dostawą całopojazdową bezpośrednio na plac budowy
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Zapytanie ofertowe zostało zarejestrowane!
            </h3>
            <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 py-1.5 px-4 rounded-lg inline-block">
              Numer oferty: #{generatedId}
            </p>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Nasz doradca techniczno-handlowy ds. inwestycji skontaktuje się z Państwem telefonicznie lub mailowo pod adresem <strong>{email}</strong> w ciągu 2-4 godzin roboczych z kompletną ofertą cenową i harmonogramem dostaw.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-xs text-left space-y-1.5">
              <p className="font-bold text-slate-800">Potrzebujesz wyceny natychmiast?</p>
              <p className="text-slate-600">Zadzwoń bezpośrednio do działu inwestycyjnego:</p>
              <p className="font-bold text-emerald-700 text-sm flex items-center gap-1.5 pt-1">
                <Phone className="w-4 h-4" /> +48 537 200 630 (Dział B2B Winduga)
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={handleClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Zamknij okno
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
            
            {/* Grid Data */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nazwa firmy / Wykonawcy *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="np. Skanska / Budimex / Bruk-Pol"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">NIP spółki / działalności</label>
                <input
                  type="text"
                  value={nip}
                  onChange={e => setNip(e.target.value)}
                  placeholder="np. 8911802345"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Osoba kontaktowa (Kierownik budowy / Kupiec) *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  placeholder="Inż. Tomasz Nowak"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Telefon bezpośredni *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+48 600 123 456"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Adres E-mail do oferty *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="t.nowak@inwestycje.pl"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Miejscowość realizacji inwestycji *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    placeholder="Kod"
                    className="w-20 px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs text-center"
                  />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="np. Warszawa / Poznań"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs"
                  />
                </div>
              </div>

            </div>

            {/* Scope of Investment */}
            <div className="pt-3 border-t border-slate-200 grid sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Rodzaj inwestycji:</label>
                <select
                  value={investmentType}
                  onChange={e => setInvestmentType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs font-semibold"
                >
                  <option value="parking_commercial">Parking komercyjny / Park handlowy</option>
                  <option value="logistics">Centrum logistyczne / Droga TIR</option>
                  <option value="fire_road">Droga pożarowa (obciążenie 20t/oś)</option>
                  <option value="housing">Osiedle mieszkaniowe (deweloper)</option>
                  <option value="public_park">Park miejski / Tereny zielone</option>
                  <option value="wholesaler_stock">Zatowarowanie hurtowni / magazynu</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Szacowany metraż (m²):</label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={estimatedM2}
                  onChange={e => setEstimatedM2(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Wybór asortymentu:</label>
                <select
                  value={preferredProduct}
                  onChange={e => setPreferredProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs font-semibold"
                >
                  <option value="Kratka Oplast H40 (Parkingowa)">Kratka Oplast H40 (Parkingi)</option>
                  <option value="Kratka Oplast H50 Heavy (Drogowa/Pożarowa)">Kratka Oplast H50 Heavy (TIR/Straż)</option>
                  <option value="Kratka Oplast H30 (Ogrodowa)">Kratka Oplast H30 (Lekka)</option>
                  <option value="Obrzeża Oplast Eko-Bord (45/58/78 mm)">Obrzeża Oplast Eko-Bord</option>
                  <option value="Komplet: Kratki + Obrzeża + Geowłóknina">Kompletny pakiet z geowłókniną</option>
                </select>
              </div>
            </div>

            {/* Logistics & Delivery Selection */}
            <div className="pt-3 border-t border-slate-200">
              <label className="font-bold text-slate-700 block mb-2">Preferowana forma logistyki i rozładunku:</label>
              <div className="grid sm:grid-cols-3 gap-2">
                <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer ${transportType === 'ftl_24t' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="transport"
                    checked={transportType === 'ftl_24t'}
                    onChange={() => setTransportType('ftl_24t')}
                    className="text-emerald-600"
                  />
                  <span>Dostawa całopojazdowa FTL 24t</span>
                </label>

                <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer ${transportType === 'hds' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="transport"
                    checked={transportType === 'hds'}
                    onChange={() => setTransportType('hds')}
                    className="text-emerald-600"
                  />
                  <span>Dostawa z rozładunkiem HDS</span>
                </label>

                <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer ${transportType === 'pickup_winduga' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="transport"
                    checked={transportType === 'pickup_winduga'}
                    onChange={() => setTransportType('pickup_winduga')}
                    className="text-emerald-600"
                  />
                  <span>Odbiór własny: Zakład Winduga</span>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-slate-600 block mb-1">Dodatkowe wytyczne projektowe / numer SIWZ / harmonogram etapów:</label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="np. Wymagana deklaracja KDWU oraz badania ITB na nośność 450t/m2 pod odbiór inspektora..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Odpowiedź handlowa i wycena w 2-4h</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors cursor-pointer text-xs flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Wyślij zapytanie ofertowe</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
