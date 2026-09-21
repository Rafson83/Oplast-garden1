#!/bin/bash

# Ustawienie PATH dla środowisk macOS (Homebrew, nvm, standard)
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:$PATH"

# Przejście do właściwego katalogu projektu Oplast Garden
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$PROJECT_DIR" || {
  echo "Błąd: Nie odnaleziono katalogu $PROJECT_DIR"
  read -p "Naciśnij Enter, aby zamknąć..."
  exit 1
}

echo "========================================================"
echo "  🌿 Oplast Garden - Kratki Parkingowe & Obrzeża B2B/B2C"
echo "========================================================"
echo "Katalog projektu: $PROJECT_DIR"
echo "Adres lokalny:    http://localhost:5174"
echo "Otwieram przeglądarkę..."
echo "========================================================"
echo ""

# Otwórz przeglądarkę po 1.5 sekundy
(sleep 2 && open "http://localhost:5174") &

# Uruchomienie deweloperskiego serwera Vite
npm run dev -- --host --port 5174
