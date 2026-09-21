import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Hammer, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const InstallationGuide: React.FC = () => {
  const { setIsCalculatorOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'cross_section' | 'steps' | 'mistakes'>('cross_section');

  return (
    <section id="montaz" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5" />
            Poradnik Techniczny Oplast
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Prawidłowy montaż i przekrój warstw podbudowy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Kratka parkingowa Oplast osiąga pełną nośność do 450 t/m² tylko przy poprawnie wykonanej podbudowie przepuszczalnej. Zobacz zalecany profil inżynieryjny.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 border border-slate-200 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('cross_section')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'cross_section'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Przekrój Warstw Podbudowy
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'steps'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Instrukcja Krok po Kroku
            </button>
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'mistakes'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Najczęstsze Błędy Wykonawcze
            </button>
          </div>
        </div>

        {/* Tab 1: Cross-Section Diagram */}
        {activeTab === 'cross_section' && (
          <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
            
            {/* Visual Cross-Section Layers Stack */}
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900 mb-4 font-heading flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Schemat profilu nawierzchni ekologicznej:
              </h3>

              {/* Layer 1: Top filler */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Warstwa 1 (Nawierzchniowa)</span>
                  <p className="font-bold text-sm">Wypełnienie: Kruszywo ozdobne 8-16 mm LUB Trawnik</p>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-md font-bold">W komorach</span>
              </div>

              {/* Layer 2: Oplast Grid */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-white shadow-sm flex items-center justify-between border-2 border-emerald-400">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Warstwa 2 (Konstrukcyjna)</span>
                  <p className="font-bold text-sm">Kratka Trawnikowo-Parkingowa Oplast H40 / H50</p>
                  <p className="text-[11px] text-slate-400">System zamków Quick-Lock + obrzeża Eko-Bord na krawędziach</p>
                </div>
                <span className="text-xs bg-emerald-600 px-2 py-1 rounded-md font-bold">3 - 5 cm</span>
              </div>

              {/* Layer 3: Bedding layer */}
              <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Warstwa 3</span>
                  <p className="font-bold text-xs">Podsypka wyrównująca (grys 2-5 mm lub piasek płukany)</p>
                </div>
                <span className="text-xs font-bold text-amber-800">gr. 3-4 cm</span>
              </div>

              {/* Layer 4: Geotextile */}
              <div className="p-2.5 rounded-xl bg-slate-200 border-2 border-dashed border-slate-400 text-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Warstwa 4</span>
                  <p className="font-bold text-xs">Geowłóknina drenażowo-separacyjna 150g/m²</p>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Separacja warstw</span>
              </div>

              {/* Layer 5: Main Sub-base */}
              <div className="p-4 rounded-xl bg-slate-300 border border-slate-400 text-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Warstwa 5</span>
                  <p className="font-bold text-xs">Podbudowa nośna z tłucznia kamiennego (frakcja 0-31.5 mm)</p>
                  <p className="text-[11px] text-slate-600">Zagęszczona mechanicznie zagęszczarką płytową</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold block">15-20 cm (osobowe)</span>
                  <span className="text-[10px] text-slate-600 block">30-40 cm (ciężarowe)</span>
                </div>
              </div>

              {/* Layer 6: Native Soil */}
              <div className="p-3 rounded-xl bg-amber-900/10 border border-amber-900/20 text-amber-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Podłoże</span>
                  <p className="font-bold text-xs">Grunt rodzimy ze spadkiem 1-2% do odprowadzania wód</p>
                </div>
                <span className="text-xs font-bold">Koryto</span>
              </div>

            </div>

            {/* Practical Advice Beside Diagram */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">
                Kluczowe parametry dla inwestorów i wykonawców:
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Dlaczego geowłóknina jest kluczowa?</strong>
                    Zapobiega wciskaniu się kruszywa w grunt rodzimy pod obciążeniem kół samochodu. Eliminuje powstawanie zapadlisk i kolein na lata.
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Frakcja kruszywa do wypełnienia:</strong>
                    Zalecamy grys płukany 8-16 mm lub 4-8 mm (np. granit, bazalt, porfir). Drobny piasek nie jest zalecany, gdyż może być wymywany podczas ulew.
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Obrzeża Oplast Eko-Bord:</strong>
                    Zabezpieczają krawędzie przed rozsuwaniem się kratek. Montowane za pomocą kotew tworzywowych (3-5 szt./mb).
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>Przelicz grubość warstw w kalkulatorze</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Step-by-step instructions */}
        {activeTab === 'steps' && (
          <div className="grid md:grid-cols-4 gap-6">
            
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center font-heading">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Korytowanie gruntu</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wybranie gruntu na głębokość ok. 25-35 cm (dla aut osobowych) lub 40-50 cm (dla transportu ciężkiego). Wyrównanie dna wykopu ze spadkiem 1-2%.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center font-heading">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Podbudowa i Geowłóknina</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ułożenie i mechaniczne zagęszczenie tłucznia. Rozłożenie geowłókniny Oplast 150g/m² z 10-15 cm zakładkami, a na niej podsypki wyrównującej (3-4 cm).
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center font-heading">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Układanie kratek Oplast</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Łączenie modułów za pomocą zintegrowanych zaczepów zatrzaskowych. Docinanie krawędzi szlifierką kątową lub piłą ręczną. Zamknięcie obrzeżem Eko-Bord.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center font-heading">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Wypełnienie i zagęszczenie</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wypełnienie oczek grysem lub ziemią z nasionami traw. W przypadku trawnika: obfite podlewanie przez pierwsze 3-4 tygodnie do ukorzenienia darni.
              </p>
            </div>

          </div>
        )}

        {/* Tab 3: Common Mistakes */}
        {activeTab === 'mistakes' && (
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-5 bg-red-50/70 border border-red-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Brak podbudowy nośnej</span>
              </div>
              <p className="text-xs text-red-900 leading-relaxed">
                Układanie kratki bezpośrednio na miękkiej ziemi lub piasku. Przy nacisku kół kratka ugnie się wraz z gruntem, powodując nierówności.
              </p>
            </div>

            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Brak dylatacji brzegowej</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Tworzywo sztuczne pracuje termicznie (rozszerzalność w lecie). Należy zostawić ok. 2-3 cm luzu dylatacyjnego przy krawężnikach i murach.
              </p>
            </div>

            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Zbyt gruby grys wypełniający</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Użycie otoczaków lub kruszywa o frakcji &gt;20 mm, które nie klinuje się prawidłowo w komórkach kratki, powodując jego wykruszanie.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
