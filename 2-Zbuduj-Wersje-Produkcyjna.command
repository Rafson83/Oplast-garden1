#!/bin/bash

# ==============================================================================
#  🛠️ Oplast Garden - Budowanie Wersji Produkcyjnej (Build)
# ==============================================================================

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR" || exit 1

clear
echo "=================================================================="
echo "  🛠️ OPLAST GARDEN - KOMPILACJA WERSJI PRODUKCYJNEJ"
echo "=================================================================="
echo "Katalog: $PROJECT_DIR"
echo "Kompilacja TypeScript + Vite -> katalog dist/"
echo "=================================================================="
echo ""

npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "=================================================================="
  echo "  ✅ Sukces! Wersja produkcyjna gotowa w katalogu: dist/"
  echo "=================================================================="
else
  echo ""
  echo "❌ Wystąpił błąd podczas budowania projektu."
fi

echo ""
read -p "Naciśnij Enter, aby zamknąć to okno..."
