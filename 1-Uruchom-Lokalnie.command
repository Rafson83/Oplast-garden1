#!/bin/bash

# ==============================================================================
#  🌿 Oplast Garden - Skrypt Szybkiego Startu (macOS)
#  Uruchamia serwer deweloperski i automatycznie otwiera aplikację w przeglądarce.
# ==============================================================================

# Ścieżki do Node.js i narzędzi systemowych
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

# Przejście do katalogu projektu
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR" || {
  echo "❌ Błąd: Nie odnaleziono katalogu $PROJECT_DIR"
  read -p "Naciśnij Enter, aby zamknąć..."
  exit 1
}

clear
echo "=================================================================="
echo "  🌿 OPLAST GARDEN - SERWIS B2B & DETAL (Kratki i Obrzeża)"
echo "=================================================================="
echo "📁 Katalog:     $PROJECT_DIR"
echo "🌐 Adres:       http://localhost:5174"
echo "🌍 Języki:      Polski (PL) | English (EN) | Deutsch (DE)"
echo "💼 Tryby:       Detal (Brutto) | Hurt B2B (Netto z rabatami)"
echo "=================================================================="
echo ""

# Sprawdzenie obecności Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Błąd: Nie znaleziono Node.js w systemie."
  echo "Zainstaluj Node.js ze strony: https://nodejs.org/"
  read -p "Naciśnij Enter, aby zamknąć..."
  exit 1
fi

# Sprawdzenie node_modules
if [ ! -d "node_modules" ]; then
  echo "📦 Instalacja pakietów npm (może to zająć chwilę)..."
  npm install
fi

echo "🚀 Uruchamiam serwer podglądu Vite na porcie 5174..."
echo "🖥️ Za chwilę otworzy się Twoja przeglądarka internetowa..."
echo ""
echo "💡 Aby zatrzymać serwer, wciśnij w tym oknie: CTRL + C"
echo "=================================================================="
echo ""

# Automatyczne otwarcie przeglądarki po wystartowaniu serwera
(sleep 1.5 && open "http://localhost:5174") &

# Start serwera Vite
npm run dev -- --host --port 5174
