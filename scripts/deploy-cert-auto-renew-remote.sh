#!/usr/bin/env bash
set -Eeuo pipefail
export LC_ALL=C

readonly UPLOAD_DIR="/tmp/ding_website_cert_apply_upload"
readonly ARCHIVE_PATH="${UPLOAD_DIR}/cert-apply-server-linux-x64.tar.gz"
readonly INSTALL_DIR="/opt/cert-apply"
readonly PACKAGE_NAME="cert-apply-server-linux-x64"
readonly TIMESTAMP="$(date +%Y%m%d%H%M%S)"
readonly STAGING_DIR="/tmp/ding_website_cert_apply_staging.${TIMESTAMP}"
readonly PACKAGE_DIR="${STAGING_DIR}/${PACKAGE_NAME}"
readonly BACKUP_DIR="${INSTALL_DIR}.bak.${TIMESTAMP}"
readonly CONFIG_PATH="${INSTALL_DIR}/config.json"
readonly RENEW_SCRIPT="${INSTALL_DIR}/run-renew.sh"
readonly LOG_PATH="/var/log/cert-apply.log"
readonly CRON_BEGIN="# BEGIN ding_website cert auto renew"
readonly CRON_END="# END ding_website cert auto renew"
readonly CRON_SCHEDULE="0 3 * * 1"
readonly CRON_ENTRY="${CRON_SCHEDULE} ${RENEW_SCRIPT} >> ${LOG_PATH} 2>&1"
readonly CRON_WORK_DIR="/tmp/ding_website_cert_apply_cron.${TIMESTAMP}"
readonly OLD_CRONTAB="${CRON_WORK_DIR}/old"
readonly NEW_CRONTAB="${CRON_WORK_DIR}/new"
readonly CRON_ERROR="${CRON_WORK_DIR}/error"
readonly CRON_BACKUP="/opt/cert-apply-backups/root-crontab.${TIMESTAMP}"
readonly PRIVATE_DIR_MODE="700"
readonly CONFIG_MODE="600"
readonly EXECUTABLE_MODE="750"
readonly DEFAULT_EMAIL="402090261@qq.com"
readonly DEFAULT_DOMAINS="*.tech.gd.cn"
readonly DEFAULT_OUTPUT_DIR="/etc/nginx/ssl/tech.gd.cn"
readonly TAR_WARNING_OPTION="--warning=no-unknown-keyword"

log() {
  printf '[remote] %s\n' "$1"
}

fail() {
  printf '[remote][ERROR] %s\n' "$1" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

validate_environment() {
  [ "$(id -u)" -eq 0 ] || fail "Remote script must run as root"
  [ "$(uname -m)" = "x86_64" ] || fail "The archive requires an x86_64 server"
  for command_name in tar awk grep sed install crontab nginx systemctl curl; do
    require_command "$command_name"
  done
  [ -s "$ARCHIVE_PATH" ] || fail "Missing uploaded archive: $ARCHIVE_PATH"
  systemctl is-active --quiet cron || fail "Cron service is not active"
}

validate_archive() {
  local entries="${STAGING_DIR}/entries.txt"
  local invalid_entry

  mkdir -p "$STAGING_DIR"
  tar "$TAR_WARNING_OPTION" -tzf "$ARCHIVE_PATH" >"$entries"
  invalid_entry="$(awk '$0 ~ /^\// || $0 ~ /(^|\/)\.\.($|\/)/ { print }' "$entries" | sed -n '1p')"
  [ -z "$invalid_entry" ] || fail "Unsafe archive entry: $invalid_entry"
  grep -Fxq "${PACKAGE_NAME}/cert-apply" "$entries" || fail "Missing cert-apply launcher"
  grep -Fxq "${PACKAGE_NAME}/node/bin/node" "$entries" || fail "Missing bundled Node"
  grep -Fxq "${PACKAGE_NAME}/apply-cert.js" "$entries" || fail "Missing apply-cert.js"
  if grep -Fxq "${PACKAGE_NAME}/config.json" "$entries"; then
    fail "Archive must not contain config.json"
  fi
}

extract_package() {
  tar "$TAR_WARNING_OPTION" --no-same-owner -xzf "$ARCHIVE_PATH" -C "$STAGING_DIR"
  [ -f "${PACKAGE_DIR}/cert-apply" ] || fail "Invalid package launcher"
  [ -x "${PACKAGE_DIR}/node/bin/node" ] || fail "Bundled Node is not executable"
  [ -f "${PACKAGE_DIR}/apply-cert.js" ] || fail "Invalid certificate application"
}

preserve_existing_state() {
  if [ -f "${INSTALL_DIR}/config.json" ]; then
    install -m "$CONFIG_MODE" "${INSTALL_DIR}/config.json" "${PACKAGE_DIR}/config.json"
  fi
  if [ -f "${INSTALL_DIR}/output/.account-key.pem" ]; then
    install -d -m "$PRIVATE_DIR_MODE" "${PACKAGE_DIR}/output"
    install -m "$CONFIG_MODE" "${INSTALL_DIR}/output/.account-key.pem" \
      "${PACKAGE_DIR}/output/.account-key.pem"
  fi
}

install_package() {
  if [ -e "$INSTALL_DIR" ]; then
    mv "$INSTALL_DIR" "$BACKUP_DIR"
    log "Previous installation backed up to ${BACKUP_DIR}"
  fi
  mv "$PACKAGE_DIR" "$INSTALL_DIR"
  chmod "$EXECUTABLE_MODE" "${INSTALL_DIR}/cert-apply" "${INSTALL_DIR}/node/bin/node"
}

repair_dependency_links() {
  CERT_APP_DIR="$INSTALL_DIR" "${INSTALL_DIR}/node/bin/node" <<'NODE'
const fs = require('fs')
const path = require('path')
const appDir = process.env.CERT_APP_DIR
const modulesDir = path.join(appDir, 'node_modules')
const storeDir = path.join(modulesDir, '.pnpm')
const backupRoot = path.join(modulesDir, '.packaged-direct')
const manifest = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'))
const contexts = fs.readdirSync(storeDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

for (const dependency of Object.keys(manifest.dependencies || {})) {
  const parts = dependency.split('/')
  const rootDir = path.join(modulesDir, ...parts)
  const rootStat = fs.lstatSync(rootDir)
  if (rootStat.isSymbolicLink()) continue
  const rootMeta = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'))
  const prefix = `${dependency.replaceAll('/', '+')}@${rootMeta.version}`
  const exactContexts = contexts.filter((context) => context === prefix)
  const peerContexts = contexts.filter((context) => context.startsWith(`${prefix}_`))
  const candidateContexts = exactContexts.length ? exactContexts : peerContexts
  if (candidateContexts.length !== 1) {
    throw new Error(`Expected one pnpm context for ${dependency}@${rootMeta.version}`)
  }
  const candidateDir = path.join(storeDir, candidateContexts[0], 'node_modules', ...parts)
  const candidateMeta = JSON.parse(fs.readFileSync(path.join(candidateDir, 'package.json'), 'utf8'))
  if (candidateMeta.name !== dependency || candidateMeta.version !== rootMeta.version) {
    throw new Error(`pnpm context mismatch for ${dependency}`)
  }
  const backupDir = path.join(backupRoot, ...parts)
  fs.mkdirSync(path.dirname(backupDir), { recursive: true })
  if (fs.existsSync(backupDir)) throw new Error(`Dependency backup exists: ${dependency}`)
  fs.renameSync(rootDir, backupDir)
  fs.symlinkSync(path.relative(path.dirname(rootDir), candidateDir), rootDir, 'dir')
  console.log(`[remote] Restored pnpm link: ${dependency}@${rootMeta.version}`)
}
NODE
}

validate_runtime() {
  "${INSTALL_DIR}/cert-apply" --help >/dev/null
  log "Bundled Node dependency graph is loadable"
}

prompt_value() {
  local variable_name="$1"
  local prompt="$2"
  local default_value="$3"
  local value

  read -r -p "${prompt} [default ${default_value}]: " value
  printf -v "$variable_name" '%s' "${value:-$default_value}"
}

create_config() {
  local email secret_id secret_key output_dir

  prompt_value email "Email" "$DEFAULT_EMAIL"
  read -r -s -p "DNSPod SecretId: " secret_id
  printf '\n'
  read -r -s -p "DNSPod SecretKey: " secret_key
  printf '\n'
  prompt_value output_dir "Certificate output directory" "$DEFAULT_OUTPUT_DIR"
  [ -n "$secret_id" ] || fail "DNSPod SecretId is required"
  [ -n "$secret_key" ] || fail "DNSPod SecretKey is required"
  CERT_EMAIL="$email" CERT_SECRET_ID="$secret_id" CERT_SECRET_KEY="$secret_key" \
    CERT_DOMAINS="$DEFAULT_DOMAINS" CERT_OUTPUT_DIR="$output_dir" write_config
}

write_config() {
  CERT_CONFIG_PATH="$CONFIG_PATH" "${INSTALL_DIR}/node/bin/node" <<'NODE'
const fs = require('fs')
const CONFIG_MODE = 0o600
const RENEW_DAYS = 30
const CHECK_INTERVAL_HOURS = 24
const domains = process.env.CERT_DOMAINS.split(/[\s,;]+/).filter(Boolean)
if (!domains.length || !process.env.CERT_OUTPUT_DIR.startsWith('/')) process.exit(1)
const config = {
  email: process.env.CERT_EMAIL,
  secretId: process.env.CERT_SECRET_ID,
  secretKey: process.env.CERT_SECRET_KEY,
  staging: false,
  renewDays: RENEW_DAYS,
  checkIntervalHours: CHECK_INTERVAL_HOURS,
  postRenew: '',
  certificates: [{ domains, outputDir: process.env.CERT_OUTPUT_DIR }],
}
fs.writeFileSync(process.env.CERT_CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`, {
  mode: CONFIG_MODE,
})
NODE
}

normalize_config() {
  CERT_CONFIG_PATH="$CONFIG_PATH" CERT_DOMAINS="$DEFAULT_DOMAINS" \
    "${INSTALL_DIR}/node/bin/node" <<'NODE'
const fs = require('fs')
const CONFIG_MODE = 0o600
const config = JSON.parse(fs.readFileSync(process.env.CERT_CONFIG_PATH, 'utf8'))
if (!config.email || !config.secretId || !config.secretKey) process.exit(1)
if (!Array.isArray(config.certificates) || !config.certificates.length) process.exit(1)
const normalized = {
  ...config,
  postRenew: '',
  certificates: [{ ...config.certificates[0],
    domains: [process.env.CERT_DOMAINS], postRenew: '' }],
}
fs.writeFileSync(process.env.CERT_CONFIG_PATH, `${JSON.stringify(normalized, null, 2)}\n`, {
  mode: CONFIG_MODE,
})
NODE
  chmod "$CONFIG_MODE" "$CONFIG_PATH"
}

configure_secrets() {
  if [ ! -f "$CONFIG_PATH" ]; then
    log "No existing configuration found; starting secure setup"
    create_config
  fi
  normalize_config
}

install_renew_script() {
  cat >"$RENEW_SCRIPT" <<'RENEW_SCRIPT'
#!/usr/bin/env bash
set -Eeuo pipefail
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
readonly APP_DIR="/opt/cert-apply"

"${APP_DIR}/cert-apply"
nginx -t
systemctl reload nginx
RENEW_SCRIPT
  chmod "$EXECUTABLE_MODE" "$RENEW_SCRIPT"
}

read_current_crontab() {
  mkdir -p "$CRON_WORK_DIR"
  if crontab -l >"$OLD_CRONTAB" 2>"$CRON_ERROR"; then
    return
  fi
  grep -Fqi 'no crontab for' "$CRON_ERROR" || fail "Unable to read root crontab"
  : >"$OLD_CRONTAB"
}

write_crontab() {
  install -d -m "$PRIVATE_DIR_MODE" "$(dirname "$CRON_BACKUP")"
  install -m "$CONFIG_MODE" "$OLD_CRONTAB" "$CRON_BACKUP"
  awk -v begin="$CRON_BEGIN" -v end="$CRON_END" -v entry="$CRON_ENTRY" '
    $0 == begin { skipping = 1; next }
    $0 == end { skipping = 0; next }
    $0 == entry { next }
    !skipping { print }
    END { if (skipping) exit 2 }
  ' "$OLD_CRONTAB" >"$NEW_CRONTAB" || fail "Existing cron marker is incomplete"
  printf '\n%s\n%s\n%s\n' "$CRON_BEGIN" "$CRON_ENTRY" "$CRON_END" >>"$NEW_CRONTAB"
  crontab "$NEW_CRONTAB"
  [ "$(crontab -l | grep -Fxc "$CRON_ENTRY")" = "1" ] || fail "Cron verification failed"
}

verify_sites() {
  curl -fsS -o /dev/null https://jike.tech.gd.cn/
  curl -fsS -o /dev/null https://alpha.tech.gd.cn/
}

cleanup_upload() {
  rm -f "$ARCHIVE_PATH" "${UPLOAD_DIR}/install.sh"
  rmdir "$UPLOAD_DIR"
}

main() {
  validate_environment
  validate_archive
  extract_package
  preserve_existing_state
  install_package
  repair_dependency_links
  validate_runtime
  configure_secrets
  install_renew_script
  touch "$LOG_PATH"
  chmod "$CONFIG_MODE" "$LOG_PATH"
  "$RENEW_SCRIPT"
  read_current_crontab
  write_crontab
  verify_sites
  cleanup_upload
  log "Certificate auto-renew deployment completed"
  log "Schedule: every Monday at 03:00; log: ${LOG_PATH}"
}

main "$@"
