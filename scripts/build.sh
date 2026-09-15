#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
UPSTREAM_SHA="${UPSTREAM_SHA:-d505845f918e946ec300af7b36efc107e2f66e9e}"
PNPM_VERSION="${PNPM_VERSION:-9.11.0}"
WORK_DIR="$ROOT_DIR/.build/it-tools"
ARCHIVE="$ROOT_DIR/.build/upstream.tar.gz"

rm -rf "$ROOT_DIR/.build" "$ROOT_DIR/dist"
mkdir -p "$WORK_DIR"

printf '%s\n' "[ITJK] Fetching IT-Tools upstream ${UPSTREAM_SHA}..."
curl -fL "https://github.com/CorentinTh/it-tools/archive/${UPSTREAM_SHA}.tar.gz" -o "$ARCHIVE"
tar -xzf "$ARCHIVE" --strip-components=1 -C "$WORK_DIR"

printf '%s\n' "[ITJK] Applying branding and Chinese defaults..."
node "$ROOT_DIR/scripts/apply-branding.mjs" "$WORK_DIR" "$ROOT_DIR/overrides"

cd "$WORK_DIR"

printf '%s\n' "[ITJK] Using pnpm ${PNPM_VERSION} explicitly..."
npx --yes "pnpm@${PNPM_VERSION}" --version

printf '%s\n' "[ITJK] Installing dependencies with frozen lockfile..."
npx --yes "pnpm@${PNPM_VERSION}" install --frozen-lockfile

printf '%s\n' "[ITJK] Building production bundle..."
VITE_TRACKER_ENABLED=false \
VITE_SHOW_BANNER=false \
VITE_SHOW_SPONSOR_BANNER=false \
VITE_VERCEL_ENV=production \
npx --yes "pnpm@${PNPM_VERSION}" build

cp -R "$WORK_DIR/dist" "$ROOT_DIR/dist"
printf '%s\n' "[ITJK] Build complete: $ROOT_DIR/dist"
