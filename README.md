# 🌿 Oplast Garden – Sprzedaż Kratek Trawnikowo-Parkingowych & Platforma B2B

Oficjalny, nowoczesny sklep internetowy i platforma kontraktacji B2B dla polskiego producenta kratek trawnikowych, parkingowych i obrzeży ogrodowych **Oplast Garden** (część przedsiębiorstwa **Oplast-Recykling Sp. z o.o.** z siedzibą w Windudze 6, 87-617 Bobrowniki).

Platforma łączy szybkie zakupy detaliczne (B2C) z zaawansowaną strefą hurtową (B2B) dla generalnych wykonawców, hurtowni, brukarzy i architektów krajobrazu.

---

## 🚀 Stack Technologiczny

- **Frontend**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/)
- **Stylowanie**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Ikony**: [Lucide React](https://lucide.dev/)
- **Zarządzanie stanem**: React Context API (`ShopContext`) + synchronizacja z `localStorage`

---

## 🌟 Kluczowe Funkcjonalności

### 1. 🔄 Przełącznik Trybów: Detal (B2C) ⇄ Hurt (B2B)
- **Detal (Brutto)**: Ceny z 23% VAT, zakupy na sztuki i metry kwadratowe, kalkulator przydomowy, szybka dostawa paletowa z windą rozładunkową.
- **Hurt B2B (Netto)**: Prezentacja cen hurtowych netto, dynamiczne progi rabatowe zależne od liczby palet (do -25%), obsługa dostaw całopojazdowych FTL 24t oraz opcja fakturowania z odroczonym terminem 14 dni.

### 2. 🧮 Interaktywny Kalkulator Powierzchni i Podbudowy
- Podanie powierzchni bezpośrednio w m² lub poprzez wymiary (Długość × Szerokość).
- Wybór obciążenia: Ruch pieszy/ogród, Podjazdy osobowe, Transport ciężki/TIR/Drogi pożarowe, Skarpy.
- Automatyczny dobór modelu kratki (**Oplast H30**, **H40** lub **H50 Heavy**).
- Dokładne wyliczenie:
  - Liczby kratek z uwzględnieniem 5% naddatku montażowego,
  - Liczby palet przemysłowych i wagi całkowitej,
  - Objętości kruszywa lub ziemi w m³ (i tonach),
  - Długości obrzeży Eko-Bord i liczby kotew mocujących,
  - Ilości rolek geowłókniny 150g/m².
- Możliwość dodania całego zestawu do koszyka jednym kliknięciem.

### 3. 📦 Bezpłatny „Oplast Box” (Wzornik Próbek dla Firm)
- Formularz zamówienia darmowego zestawu próbek kratek H30/H40/H50, obrzeży i katalogu z badaniami ITB dla biur projektowych, wykonawców i deweloperów.
- Zapis zgłoszeń w pamięci podręcznej i potwierdzenie natychmiastowej wysyłki kurierem 24h.

### 4. 🚚 Moduł Zapytań Ofertowych FTL & Przetargi
- Formularz do kalkulacji dostaw całopojazdowych 24t (do 24 palet / 4 800 szt. kratek) prosto na plac budowy.
- Obsługa NIP, specyfikacji inwestycji, rozładunków HDS i wymogów technicznych KDWU/ITB.

### 5. 🛒 Koszyk Zakupowy i Dynamiczny Wybór Dostawy
- Obsługa zamówień na sztuki, m² i pełne palety.
- Licznik łącznej wagi zamówienia i liczby palet.
- Kalkulacja kosztu przesyłki (kurier, paleta z windą, transport dedykowany FTL, darmowy odbiór w Windudze).
- Opcja wydruku specyfikacji / oferty proforma.

### 6. 📐 Przewodnik Montażu i Przekrój Warstw Inżynieryjnych
- Wizualny przekrój warstw: Grunt rodzimy &rarr; Geowłóknina &rarr; Podbudowa tłuczniowa &rarr; Podsypka &rarr; Kratka Oplast &rarr; Wypełnienie.
- Instrukcja krok po kroku oraz omówienie najczęstszych błędów wykonawczych.

---

## 🏁 Szybkie Uruchomienie

### Sposób 1: Skrót na macOS (Zalecany)
Dwuklik na plik:
```bash
Uruchom-Oplast-Garden.command
```
Skrypt automatycznie uruchamia serwer i otwiera przeglądarkę pod adresem `http://localhost:5174`.

### Sposób 2: Przez Terminal
```bash
cd /Users/rafalwielgus/Documents/Projekty/oplast-garden
npm run dev -- --port 5174
```

### Budowanie Wersji Produkcyjnej
```bash
npm run build
```

---

## 🏭 Dane Producenta

**Oplast-Recykling Sp. z o.o. – Marka Oplast Garden**  
Winduga 6, 87-617 Bobrowniki  
woj. kujawsko-pomorskie, Polska  
- Telefon B2B: **+48 537 200 630**  
- Biuro: **+48 54 237 12 98**  
- E-mail: **biuro@oplast-garden.pl**
