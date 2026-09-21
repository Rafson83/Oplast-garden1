import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  MessageSquare,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { addB2BInquiry } = useShop();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addB2BInquiry({
      companyName: name,
      nip: '',
      contactPerson: name,
      phone: phone || '-',
      email,
      city: 'Wiadomość z formularza kontaktowego',
      postalCode: '',
      investmentType: subject || 'Zapytanie ogólne',
      estimatedM2: 0,
      preferredProduct: 'Kontakt bezpośredni',
      requiresTransport: false,
      notes: message,
    });

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 5000);
  };

  return (
    <section id="kontakt" className="py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            {t.contact.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Cards & Form Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Info Columns */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-heading">{t.contact.addressTitle}</h3>
                  <p className="text-xs text-slate-500">Oplast-Recykling Sp. z o.o. • Marka Oplast Garden</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <p className="font-semibold text-slate-900 text-sm">
                  Winduga 6, 87-617 Bobrowniki
                </p>
                <p className="text-slate-500">
                  {t.contact.plantLabel}
                </p>
                <div className="flex items-center gap-2 text-slate-600 pt-1">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{t.contact.hoursLabel}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
                {t.contact.phonesTitle}
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">{t.contact.b2bSalesLabel}:</span>
                    <a href="tel:+48537200630" className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                      +48 537 200 630
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">{t.contact.retailLabel}:</span>
                    <a href="tel:+48542371298" className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                      +48 54 237 12 98
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">{t.contact.emailLabel}:</span>
                    <a href="mailto:biuro@oplast-garden.pl" className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                      biuro@oplast-garden.pl
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Directions Notice */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                {t.contact.tirAccessTitle}:
              </p>
              <p className="text-slate-700 leading-relaxed">
                {t.contact.tirAccessDesc}
              </p>
            </div>

          </div>

          {/* Right Fast Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-lg mb-1">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>{t.contact.formTitle}</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                {t.contact.formSubtitle}
              </p>

              {isSent ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{t.contact.formSentTitle}</h4>
                  <p className="text-xs text-slate-600">
                    {t.contact.formSentDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.contact.formName} *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Jan Kowalski"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.contact.formPhone}</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+48 500 000 000"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.contact.formEmail} *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="jan@domena.pl"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{t.contact.formSubject}</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="Wycena / Inquiry / Anfrage"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.contact.formMsg} *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors cursor-pointer text-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.contact.formSend}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>{t.contact.adminNotice}</span>
              <span className="text-emerald-700 font-semibold">RODO / BDO: 000014298</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
