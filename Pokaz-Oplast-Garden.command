#!/bin/bash

# ==============================================================================
#  🌿 Oplast Garden - Skrypt Prezentacyjny (Showcase / Live Demo)
#  Uruchamia serwis i przygotowuje prezentację na tym Macu oraz urządzeniach w sieci Wi-Fi.
# ==============================================================================

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

PROJECT_DIR="/Users/rafalwielgus/Documents/Projekty/oplast-garden"
PORT=5174

# Przejście do katalogu projektu
cd "$PROJECT_DIR" || {
  echo "❌ Błąd: Nie odnaleziono katalogu $PROJECT_DIR"
  read -p "Naciśnij Enter, aby zamknąć..."
  exit 1
}

# Wykrywanie lokalnego adresu IP w sieci Wi-Fi/LAN
IP_LAN=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
if [ -z "$IP_LAN" ]; then
  IP_LAN="127.0.0.1"
fi

clear
echo "=================================================================="
echo "  🌿 OPLAST GARDEN - POKAZ SERWISU Z TEGO KOMPUTERA"
echo "=================================================================="
echo ""
echo "💻 ADRES NA TYM KOMPUTERZE (otwiera się automatycznie):"
echo "   👉 http://localhost:$PORT"
echo ""
echo "📱 ADRES DLA TELEFONU / TABLETU / INNEGO KOMPUTERA (to samo Wi-Fi):"
echo "   👉 http://$IP_LAN:$PORT"
echo ""
echo "=================================================================="
echo "🎯 KLUCZOWE ELEMENTY DO POKAZANIA:"
echo "   • 🌐 3 Języki: Przełącznik PL 🇵🇱 / EN 🇬🇧 / DE 🇩🇪 w prawym górnym rogu"
echo "   • 💼 Tryb cen: Detal (Brutto) ⇄ Hurt B2B (Netto z rabatami paletowymi)"
echo "   • 🧮 Kalkulator m²: Dobór modelu H30/H40/H50, kruszywa, obrzeży i kotew"
echo "   • 📦 Strefa B2B: Zamówienie bezpłatnego 'Oplast Box' z próbkami"
echo "   • 🚚 Wycena FTL: Formularz dostaw całopojazdowych 24t na plac budowy"
echo "   • 🛒 Koszyk: Licznik wagi (kg) i palet, wybór transportu, wydruk proformy"
echo "=================================================================="
echo ""

# Sprawdzenie czy serwer już działa na porcie 5174
SERVER_ALREADY_RUNNING=0
if lsof -i :$PORT >/dev/null 2>&1 || curl -s --connect-timeout 1 "http://localhost:$PORT" >/dev/null 2>&1; then
  SERVER_ALREADY_RUNNING=1
fi

if [ $SERVER_ALREADY_RUNNING -eq 1 ]; then
  echo "✅ Serwer serwisu już działa w tle na porcie $PORT."
  echo "🚀 Otwieram stronę w Twojej domyślnej przeglądarce..."
  open "http://localhost:$PORT"
  echo ""
  echo "Wskazówka: Aby przejść w pełny ekran w przeglądarce, wciśnij: Fn + F lub Cmd + Ctrl + F"
  echo ""
  echo "------------------------------------------------------------------"
  echo "Wybierz opcję:"
  echo " [1] Otwórz stronę ponownie w nowej karcie"
  echo " [2] Zrestartuj serwer Vite"
  echo " [Q] Zakończ ten ekran"
  echo "------------------------------------------------------------------"
  read -p "Twój wybór [1/2/Q]: " CHOICE

  case "$CHOICE" in
    1)
      open "http://localhost:$PORT"
      ;;
    2)
      echo "Restartuję proces serwera na porcie $PORT..."
      PID_TO_KILL=$(lsof -ti :$PORT)
      if [ -n "$PID_TO_KILL" ]; then
        kill -9 $PID_TO_KILL 2>/dev/null
        sleep 1
      fi
      echo "Uruchamiam serwer na nowo..."
      (sleep 1.5 && open "http://localhost:$PORT") &
      npm run dev -- --host --port $PORT
      ;;
    *)
      echo "Miłej prezentacji!"
      exit 0
      ;;
  esac
else
  echo "🚀 Uruchamiam serwer deweloperski Vite na porcie $PORT..."
  echo "🖥️ Za chwilę otworzy się przeglądarka internetowa..."
  echo ""
  echo "💡 Aby zatrzymać prezentację, wciśnij w tym oknie: CTRL + C"
  echo ""

  # Automatyczne otwarcie przeglądarki po 1.5 sekundy
  (sleep 1.5 && open "http://localhost:$PORT") &

  # Uruchomienie Vite
  npm run dev -- --host --port $PORT
fi
