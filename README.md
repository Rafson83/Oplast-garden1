# 🌿 Oplast Garden – Sprzedaż Kratek Trawnikowo-Parkingowych & Platforma B2B

Oficjalny sklep internetowy i platforma kontraktacji B2B dla polskiego producenta kratek trawnikowych, parkingowych i elastycznych obrzeży ogrodowych **Oplast Garden** (część przedsiębiorstwa **Oplast-Recykling Sp. z o.o.** z siedzibą w Windudze 6, 87-617 Bobrowniki).

Platforma łączy szybkie zakupy detaliczne (B2C) z zaawansowaną strefą hurtową (B2B) dla generalnych wykonawców, składów budowlanych, brukarzy i architektów krajobrazu w Polsce i Europie.

---

## 🌍 Wielojęzyczność (Trzy Języki)

Projekt wspiera pełną obsługę 3 wersji językowych:
- 🇵🇱 **Polski (PL)** – natywny język rynku krajowego
- 🇬🇧 **English (EN)** – obsługa partnerów i inwestycji międzynarodowych w UE
- 🇩🇪 **Deutsch (DE)** – rynek DACH (Niemcy, Austria, Szwajcaria)

Przełącznik z flagami dostępny jest w prawym górnym rogu nagłówka oraz w menu mobilnym. Wybór języka jest trwale zapamiętywany w pamięci przeglądarki (`localStorage`).

---

## 🎨 Design i Kolorystyka

- **Nowoczesna, jasna kolorystyka**: biel, mięta, szmaragdowa zieleń (`emerald-600`) i subtelne szarości.
- **Uproszczone menu główne (5 pozycji)**:
  1. **Produkty** (`#produkty`)
  2. **Kalkulator m²**
  3. **Dla Firm & B2B** (`#b2b`)
  4. **Montaż** (`#montaz`)
  5. **Kontakt** (`#kontakt`)

---

## 🚀 Stack Technologiczny

- **Frontend**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/)
- **Stylowanie**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Ikony**: [Lucide React](https://lucide.dev/)
- **Zarządzanie stanem**: Context API (`ShopContext`, `LanguageContext`) + `localStorage`
- **Repozytorium GitHub**: [https://github.com/Rafson83/Oplast-garden1](https://github.com/Rafson83/Oplast-garden1)

---

## 🌟 Kluczowe Funkcjonalności

### 1. 🔄 Przełącznik Trybów: Detal (B2C) ⇄ Hurt (B2B)
- **Detal (Brutto)**: Ceny z 23% VAT, zakupy na sztuki i metry kwadratowe, kalkulator przydomowy, szybka dostawa paletowa z windą rozładunkową.
- **Hurt B2B (Netto)**: Prezentacja cen hurtowych netto, dynamiczne progi rabatowe na palety (do -24%), obsługa dostaw całopojazdowych FTL 24t oraz odroczone terminy płatności 14 dni.

### 2. 🧮 Interaktywny Kalkulator Powierzchni i Podbudowy
- Podanie powierzchni w m² lub wymiarów: **Długość × Szerokość**.
- Wybór obciążenia: *Ogród/ścieżki (H30)*, *Podjazdy osobowe (H40)*, *Transport ciężki / TIR / Drogi pożarowe (H50 Heavy)*, *Skarpy*.
- Automatyczne wyliczenie liczby kratek z naddatkiem 5%, objętości grysu/ziemi w m³ i tonach, obrzeży Eko-Bord, kotew mocujących i geowłókniny 150g/m².
- Możliwość dodania całego zestawu do koszyka jednym kliknięciem.

### 3. 📦 Bezpłatny „Oplast Box” (Wzornik Próbek dla Firm)
- Formularz zamówienia darmowego zestawu próbek kratek H30/H40/H50, obrzeży i katalogu technicznego z badaniami ITB z wysyłką 24h na koszt fabryki.

### 4. 🚚 Zapytania Ofertowe FTL 24t & Przetargi
- Dedykowany formularz dla zamówień inwestycyjnych z obsługą NIP, rozładunków HDS i dostaw całopojazdowych.

### 5. 🛒 Koszyk Zakupowy i Logistyka
- Obsługa zamówień na sztuki, m² i pełne palety.
- Licznik łącznej wagi zamówienia i liczby palet.
- Kalkulacja kosztu przesyłki (paleta z windą, transport dedykowany FTL, odbiór w Windudze).
- Opcja wydruku specyfikacji / oferty proforma.

---

## 🏁 Szybkie Uruchomienie (Pakiet Startowy)

W głównym folderze projektu znajdują się gotowe skrypty startowe dla systemu macOS:

| Plik | Opis działania |
|------|----------------|
| **`1-Uruchom-Lokalnie.command`** | **Podstawowy start (1 kliknięcie)** – uruchamia serwer deweloperski i automatycznie otwiera przeglądarkę pod adresem `http://localhost:5174`. |
| **`2-Zbuduj-Wersje-Produkcyjna.command`** | Kompiluje projekt i weryfikuje poprawność typów TypeScript (`npm run build`), generując paczkę do folderu `dist/`. |
| **`3-Wyslij-Na-GitHub.command`** | Automatycznie pobiera zmiany, tworzy commit i wypycha kod do repozytorium GitHub (`main`). |

### Uruchomienie z poziomu Terminala:
```bash
cd /Users/rafalwielgus/Documents/Projekty/oplast-garden
npm run dev -- --host --port 5174
```
Aplikacja będzie dostępna pod adresem:
👉 **http://localhost:5174**

---

## 🏭 Dane Producenta

**Oplast-Recykling Sp. z o.o. – Marka Oplast Garden**  
Winduga 6, 87-617 Bobrowniki  
woj. kujawsko-pomorskie, Polska  
- Telefon B2B: **+48 537 200 630**  
- Biuro: **+48 54 237 12 98**  
- E-mail: **biuro@oplast-garden.pl**
