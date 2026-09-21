#!/bin/bash

# Skrypt do wypchnięcia zmian do repozytorium GitHub
cd "$(dirname "$0")" || exit 1

echo "========================================================"
echo "  🚀 Wypychanie projektu Oplast Garden do GitHub"
echo "========================================================"
echo "Zdalne repozytorium: $(git remote get-url origin)"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Sukces! Kod został opublikowany na GitHubie."
else
  echo ""
  echo "⚠️ Jeśli repozytorium jeszcze nie istnieje na GitHubie:"
  echo "1. Wejdź na: https://github.com/new"
  echo "2. Nazwij repozytorium: oplast-garden"
  echo "3. Pozostaw repozytorium puste (bez README/gitignore)"
  echo "4. Kliknij 'Create repository' i uruchom ten skrypt ponownie."
fi

echo "========================================================"
read -p "Naciśnij Enter, aby zamknąć..."
