import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Check, 
  Printer,
  MapPin 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { DeliveryMethod } from '../types/shop';
import { getLocalizedProduct } from '../i18n/productTranslations';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    isB2BMode, 
    setIsB2BMode,
    totalCartNetto,
    totalCartBrutto,
    totalWeightKg,
    totalPallets,
    setCurrentView
  } = useShop();
  const { language, t } = useLanguage();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pallet');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [orderNumber, setOrderNumber] = useState('');

  // Checkout form
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [nip, setNip] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'proforma' | 'cod' | 'term_14d'>('proforma');

  if (!isCartOpen) return null;

  // Delivery costs
  let deliveryCostNetto = 0;
  if (deliveryMethod === 'pickup') {
    deliveryCostNetto = 0;
  } else if (deliveryMethod === 'courier') {
    deliveryCostNetto = 25.00;
  } else if (deliveryMethod === 'pallet') {
    deliveryCostNetto = Math.max(1, Math.ceil(totalPallets || 1)) * 190.00;
  } else if (deliveryMethod === 'ftl') {
    deliveryCostNetto = 1800.00;
  }
  const deliveryCostBrutto = deliveryCostNetto * 1.23;

  const finalTotalNetto = totalCartNetto + deliveryCostNetto;
  const finalTotalBrutto = totalCartBrutto + deliveryCostBrutto;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone || !street || !city) {
      alert('Proszę uzupełnić wszystkie wymagane pola adresowe.');
      return;
    }

    const orderId = `OPL-${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderId);
    setCheckoutStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === 'success') {
      setCheckoutStep('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Top Header - Fresh Emerald Theme */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/15 text-white border border-white/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-white">
                {checkoutStep === 'checkout' ? t.cart.checkoutTitle : t.cart.title}
              </h2>
              <p className="text-xs text-emerald-100">
                {cart.length} {t.cart.itemsCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick B2B / B2C toggle */}
            <button
              onClick={() => setIsB2BMode(!isB2BMode)}
              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-colors cursor-pointer"
            >
              {isB2BMode ? t.cart.viewNetto : t.cart.viewBrutto}
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          
          {checkoutStep === 'success' ? (
            /* Order Success State */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">
                {t.cart.orderSuccessTitle} #{orderNumber}
              </h3>
              <p className="text-slate-600 max-w-sm mx-auto text-xs sm:text-sm">
                {t.cart.orderSuccessDesc}: <strong>{email}</strong>.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-1.5 max-w-sm mx-auto">
                <p className="font-bold text-slate-800">Oplast-Recykling Sp. z o.o.:</p>
                <p className="text-slate-600">Winduga 6, 87-617 Bobrowniki, Polska</p>
                <p className="text-emerald-700 font-semibold pt-1">
                  Infolinia: +48 537 200 630
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            </div>
          ) : checkoutStep === 'checkout' ? (
            /* Checkout Form */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">1. {t.cart.customerData}:</p>
                
                <div className="space-y-2.5">
                  {isB2BMode && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-600 block mb-0.5">{t.inquiry.nipLabel}:</label>
                        <input
                          type="text"
                          value={nip}
                          onChange={e => setNip(e.target.value)}
                          placeholder="8911802345"
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-slate-600 block mb-0.5">{t.inquiry.companyLabel}:</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={e => setCompanyName(e.target.value)}
                          placeholder="Firma Sp. z o.o."
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-slate-600 block mb-0.5">{t.sampleBox.recipientLabel} *:</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="Jan Kowalski"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-600 block mb-0.5">{t.inquiry.phoneLabel} *:</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+48 500 123 456"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 block mb-0.5">{t.inquiry.emailLabel} *:</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="jan@firma.pl"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">2. {t.cart.addressData}:</p>
                <div className="space-y-2">
                  <div>
                    <label className="text-slate-600 block mb-0.5">{t.sampleBox.streetLabel} *:</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      placeholder="ul. Ogrodowa 10"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-slate-600 block mb-0.5">{t.sampleBox.postalLabel} *:</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        placeholder="87-617"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold text-center"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-slate-600 block mb-0.5">{t.sampleBox.cityLabel} *:</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Bobrowniki"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">3. {t.cart.paymentData}:</p>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'proforma'}
                      onChange={() => setPaymentMethod('proforma')}
                      className="text-emerald-600"
                    />
                    <span>{t.cart.proformaPay}</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-emerald-600"
                    />
                    <span>{t.cart.codPay}</span>
                  </label>
                  {isB2BMode && (
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'term_14d'}
                        onChange={() => setPaymentMethod('term_14d')}
                        className="text-emerald-600"
                      />
                      <span className="font-semibold text-emerald-800">{t.cart.termPay}</span>
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="text-slate-600 block mb-0.5">{t.cart.driverNotes}:</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="np. rozładunek wózkiem paletowym na utwardzonym podjeździe..."
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

            </form>
          ) : (
            /* Standard Cart Items View */
            <>
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 font-medium">{t.cart.emptyCart}</p>
                  <p className="text-slate-400 text-[11px]">{t.cart.emptyDesc}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => {
                    const price = isB2BMode ? item.effectiveUnitPriceNetto : item.effectiveUnitPriceBrutto;
                    const itemTotal = price * item.quantity;
                    const localizedItem = getLocalizedProduct(item.product, language);

                    return (
                      <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-tight">
                              {localizedItem.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {t.catalog.colorLabel}: <span className="font-semibold text-slate-700">{item.selectedColor.name.split(' ')[0]}</span> • <span className="font-semibold text-slate-700">{item.unitType === 'pallet' ? t.catalog.pallet : (item.unitType === 'm2' ? '1 m²' : t.catalog.piece)}</span>
                            </p>
                            {item.totalPieces > item.quantity && (
                              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                                ~{item.totalPieces} {t.catalog.piece.toLowerCase()} (~{(item.totalPieces * item.product.weightKg).toFixed(0)} kg)
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-1"
                            title="Usuń"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Stepper and Price */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-md bg-white border border-slate-300 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md bg-white border border-slate-300 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-extrabold text-slate-900 font-heading">
                              {itemTotal.toFixed(2)} zł
                            </span>
                            <p className="text-[10px] text-slate-500">
                              {price.toFixed(2)} zł {isB2BMode ? 'netto' : 'brutto'}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Weight & Pallet Metrics Indicator */}
                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-700" />
                      <span>{t.cart.weightTracker}:</span>
                    </div>
                    <span className="font-bold">
                      ~{totalWeightKg} kg ({totalPallets} {t.catalog.pallet.toLowerCase()})
                    </span>
                  </div>

                  {/* Local Partner Pickup Advice for Small Retail Quantities */}
                  {!isB2BMode && totalPallets < 1 && (
                    <div className="p-3 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs text-slate-700 flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-bold text-emerald-950">Kupujesz małą ilość do ogrodu lub na podjazd?</p>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Koszt wysyłki paletowej z fabryki kurierem wynosi 280 zł. Możesz kupić te same kratki od ręki w pobliskim składzie budowlanym lub centrum brukarskim bez kosztów transportu!
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCartOpen(false);
                            setCurrentView('partners');
                          }}
                          className="mt-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Znajdź najbliższego partnera w okolicy →</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Delivery Selection */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <p className="font-bold text-slate-900">{t.cart.deliveryTitle}:</p>
                    <div className="space-y-1.5 text-xs">
                      
                      <label className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer ${deliveryMethod === 'pallet' ? 'border-emerald-600 bg-white font-bold text-slate-900' : 'border-slate-200 bg-white text-slate-700'}`}>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'pallet'}
                            onChange={() => setDeliveryMethod('pallet')}
                            className="text-emerald-600"
                          />
                          <span>{t.cart.deliveryPallet}</span>
                        </div>
                        <span>{(isB2BMode ? deliveryCostNetto : deliveryCostBrutto).toFixed(2)} zł</span>
                      </label>

                      <label className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer ${deliveryMethod === 'pickup' ? 'border-emerald-600 bg-white font-bold text-slate-900' : 'border-slate-200 bg-white text-slate-700'}`}>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="delivery"
                            checked={deliveryMethod === 'pickup'}
                            onChange={() => setDeliveryMethod('pickup')}
                            className="text-emerald-600"
                          />
                          <span>{t.cart.deliveryPickup}</span>
                        </div>
                        <span className="text-emerald-700 font-extrabold">0.00 zł</span>
                      </label>

                      {totalPallets >= 4 && (
                        <label className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer ${deliveryMethod === 'ftl' ? 'border-emerald-600 bg-white font-bold text-slate-900' : 'border-slate-200 bg-white text-slate-700'}`}>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="delivery"
                              checked={deliveryMethod === 'ftl'}
                              onChange={() => setDeliveryMethod('ftl')}
                              className="text-emerald-600"
                            />
                            <span>{t.cart.deliveryFtl}</span>
                          </div>
                          <span>1 800.00 zł netto</span>
                        </label>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </>
          )}

        </div>

        {/* Footer actions and checkout trigger */}
        {cart.length > 0 && checkoutStep !== 'success' && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
            
            {/* Price breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{t.cart.summaryNetto}:</span>
                <span className="font-semibold text-slate-800">{totalCartNetto.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.cart.summaryVat}:</span>
                <span className="font-semibold text-slate-800">{(totalCartBrutto - totalCartNetto).toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.cart.summaryShipping}:</span>
                <span className="font-semibold text-slate-800">
                  {isB2BMode ? `${deliveryCostNetto.toFixed(2)} zł netto` : `${deliveryCostBrutto.toFixed(2)} zł brutto`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm">
                <span className="font-bold text-slate-900">
                  {t.cart.summaryTotal} ({isB2BMode ? 'netto' : 'brutto'}):
                </span>
                <span className="text-xl font-extrabold text-emerald-700 font-heading">
                  {isB2BMode 
                    ? `${finalTotalNetto.toFixed(2)} zł netto` 
                    : `${finalTotalBrutto.toFixed(2)} zł brutto`
                  }
                </span>
              </div>
            </div>

            {/* Buttons */}
            {checkoutStep === 'cart' ? (
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors cursor-pointer text-sm"
                >
                  <span>{t.cart.checkoutBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {t.cart.printBtn}
                  </button>
                  <button
                    onClick={clearCart}
                    className="py-2 px-3 rounded-lg text-slate-500 hover:text-red-600 text-xs font-semibold"
                  >
                    {t.cart.clearBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-white text-xs cursor-pointer"
                >
                  {t.cart.backToCart}
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-colors cursor-pointer text-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.cart.submitOrder}</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
