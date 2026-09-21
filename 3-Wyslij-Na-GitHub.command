#!/bin/bash

# ==============================================================================
#  🚀 Oplast Garden - Synchronizacja i Wypchnięcie do GitHub
# ==============================================================================

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR" || exit 1

clear
echo "=================================================================="
echo "  🚀 OPLAST GARDEN - SYNCHRONIZACJA Z GITHUB"
echo "=================================================================="
echo "Repozytorium: $(git remote get-url origin)"
echo "Gałąź:        main"
echo "=================================================================="
echo ""

echo "1. Sprawdzanie zmian..."
git status -s

echo ""
echo "2. Dodawanie plików i tworzenie commita..."
git add .

read -p "Podaj opis zmian (Enter dla domyślnego 'update'): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

git commit -m "$COMMIT_MSG" 2>/dev/null || echo "Brak nowych zmian do zatwierdzenia."

echo ""
echo "3. Wypychanie do zdalnego repozytorium GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "=================================================================="
  echo "  ✅ Sukces! Zmiany zostały opublikowane na GitHubie:"
  echo "  👉 https://github.com/Rafson83/Oplast-garden1"
  echo "=================================================================="
else
  echo ""
  echo "❌ Wystąpił błąd podczas wysyłania do GitHuba."
  echo "Upewnij się, że masz połączenie z Internetem."
fi

echo ""
read -p "Naciśnij Enter, aby zamknąć to okno..."
