#!/usr/bin/env sh
set -eou pipefail

echo "Attempting to download latest translations from Lokalise..."

if [ -z "${LOKALISE_TOKEN:-}" ]; then
  printf "Environment variable LOKALISE_TOKEN is unset. Enter Lokalise API token: "
  read -r token || exit 1
else
  echo "Using environment variable LOKALISE_TOKEN for Lokalise API token"
  token="$LOKALISE_TOKEN"
fi

if [ -z "$token" ]; then
  echo "No Lokalise API token provided"
  exit 1
fi

lokalise2 \
  -t "$token" \
  --project-id 743091915e9da969db9340.20943733 \
  file download \
  --format json \
  --export-sort first_added \
  --add-newline-eof \
  --original-filenames=false \
  --bundle-structure 'src/translations/%LANG_ISO%.json' \
  --include-tags web-onboarding \
  --indentation 2sp
