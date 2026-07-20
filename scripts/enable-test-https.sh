#!/usr/bin/env bash
set -Eeuo pipefail

readonly APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly SERVER_HOST="${SERVER_HOST:-106.55.178.107}"
readonly SSH_USER="${SSH_USER:-ubuntu}"
readonly SSH_PORT="${SSH_PORT:-22}"
readonly SSH_TARGET="${SSH_USER}@${SERVER_HOST}"
readonly LOCAL_CERT="${APP_ROOT}/certs/tech.gd.cn.crt"
readonly LOCAL_KEY="${APP_ROOT}/certs/tech.gd.cn.key"
readonly REMOTE_UPLOAD_DIR="/tmp/ding_website_test_https_upload"
readonly REMOTE_CERT="${REMOTE_UPLOAD_DIR}/tech.gd.cn.crt"
readonly REMOTE_KEY="${REMOTE_UPLOAD_DIR}/tech.gd.cn.key"
readonly REMOTE_SCRIPT="${REMOTE_UPLOAD_DIR}/configure.sh"
readonly LOCAL_REMOTE_SCRIPT="${TMPDIR:-/tmp}/ding_website_configure_test_https.sh"

trap 'rm -f "$LOCAL_REMOTE_SCRIPT"' EXIT

cat >"$LOCAL_REMOTE_SCRIPT" <<'REMOTE_SCRIPT'
#!/usr/bin/env bash
set -Eeuo pipefail

readonly UPLOAD_DIR="/tmp/ding_website_test_https_upload"
readonly UPLOADED_CERT="${UPLOAD_DIR}/tech.gd.cn.crt"
readonly UPLOADED_KEY="${UPLOAD_DIR}/tech.gd.cn.key"
readonly NGINX_CONF="/etc/nginx/conf.d/ding_website.conf"
readonly SSL_DIR="/etc/nginx/ssl/tech.gd.cn"
readonly SSL_CERT="${SSL_DIR}/tech.gd.cn.crt"
readonly SSL_KEY="${SSL_DIR}/tech.gd.cn.key"
readonly JIKE_ROOT="/var/www/ding_website/jike"
readonly ALPHA_ROOT="/var/www/ding_website/alpha"
readonly SSL_DIR_MODE="700"
readonly CERT_MODE="644"
readonly KEY_MODE="600"
readonly TIMESTAMP="$(date +%Y%m%d%H%M%S)"
readonly BACKUP_PATH="${NGINX_CONF}.bak.${TIMESTAMP}"

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
  require_command nginx
  require_command openssl
  require_command curl
  require_command systemctl
  require_command install
  [ -s "$UPLOADED_CERT" ] || fail "Missing uploaded certificate"
  [ -s "$UPLOADED_KEY" ] || fail "Missing uploaded private key"
  [ -f "$NGINX_CONF" ] || fail "Missing Nginx config: $NGINX_CONF"
  [ -f "${JIKE_ROOT}/index.html" ] || fail "Missing Jike site"
  [ -f "${ALPHA_ROOT}/index.html" ] || fail "Missing Alpha site"
}

validate_certificate() {
  local cert_public_key
  local key_public_key
  local subject_alt_names

  openssl x509 -checkend 0 -noout -in "$UPLOADED_CERT" || fail "Certificate is expired"
  subject_alt_names="$(openssl x509 -noout -ext subjectAltName -in "$UPLOADED_CERT")"
  printf '%s\n' "$subject_alt_names" | grep -Fq 'DNS:*.tech.gd.cn' || \
    fail "Certificate does not cover *.tech.gd.cn"
  cert_public_key="$(openssl x509 -in "$UPLOADED_CERT" -pubkey -noout | \
    openssl pkey -pubin -outform DER 2>/dev/null | openssl sha256)"
  key_public_key="$(openssl pkey -in "$UPLOADED_KEY" -pubout -outform DER 2>/dev/null | \
    openssl sha256)"
  [ "$cert_public_key" = "$key_public_key" ] || fail "Certificate and private key do not match"
  log "Certificate and private key are valid"
}

install_certificate() {
  install -d -m "$SSL_DIR_MODE" "$SSL_DIR"
  install -m "$CERT_MODE" "$UPLOADED_CERT" "$SSL_CERT"
  install -m "$KEY_MODE" "$UPLOADED_KEY" "$SSL_KEY"
  log "Certificate installed in ${SSL_DIR}"
}

backup_config() {
  cp -a "$NGINX_CONF" "$BACKUP_PATH"
  log "Nginx backup created: ${BACKUP_PATH}"
}

write_nginx_config() {
  cat >"$NGINX_CONF" <<'NGINX'
server {
    listen 80;
    server_name jike.tech.gd.cn alpha.tech.gd.cn;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name jike.tech.gd.cn;

    ssl_certificate /etc/nginx/ssl/tech.gd.cn/tech.gd.cn.crt;
    ssl_certificate_key /etc/nginx/ssl/tech.gd.cn/tech.gd.cn.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    root /var/www/ding_website/jike;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /assets/ {
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public";
    }
}

server {
    listen 443 ssl;
    server_name alpha.tech.gd.cn;

    ssl_certificate /etc/nginx/ssl/tech.gd.cn/tech.gd.cn.crt;
    ssl_certificate_key /etc/nginx/ssl/tech.gd.cn/tech.gd.cn.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    root /var/www/ding_website/alpha;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /assets/ {
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public";
    }
}
NGINX
}

rollback() {
  local reason="$1"

  printf '[remote][ERROR] %s\n' "$reason" >&2
  cp -a "$BACKUP_PATH" "$NGINX_CONF"
  nginx -t || fail "Rollback restored a config that does not pass nginx -t"
  systemctl reload nginx || fail "Rollback config restored but Nginx reload failed"
  fail "Original Nginx config restored from ${BACKUP_PATH}"
}

apply_nginx_config() {
  write_nginx_config
  nginx -t || rollback "New Nginx configuration is invalid"
  systemctl reload nginx || rollback "Nginx reload failed"
  log "Nginx HTTPS configuration loaded"
}

expect_status() {
  local expected="$1"
  local url="$2"
  local status

  status="$(curl -k -sS -o /dev/null -w '%{http_code}' "$url")"
  [ "$status" = "$expected" ] || fail "Expected ${expected} from ${url}, received ${status}"
}

verify_sites() {
  expect_status 301 "http://jike.tech.gd.cn"
  expect_status 301 "http://alpha.tech.gd.cn"
  expect_status 200 "https://jike.tech.gd.cn"
  expect_status 200 "https://alpha.tech.gd.cn"
  log "HTTP redirects and HTTPS responses verified"
}

cleanup_uploads() {
  rm -f "$UPLOADED_CERT" "$UPLOADED_KEY" "${UPLOAD_DIR}/configure.sh"
  rmdir "$UPLOAD_DIR"
}

main() {
  validate_environment
  validate_certificate
  install_certificate
  backup_config
  apply_nginx_config
  verify_sites
  cleanup_uploads
  log "Test HTTPS setup completed"
}

main "$@"
REMOTE_SCRIPT

log_info() {
  printf '[INFO] %s\n' "$1"
}

log_success() {
  printf '[SUCCESS] %s\n' "$1"
}

log_error() {
  printf '[ERROR] %s\n' "$1" >&2
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || { log_error "Missing required command: $1"; exit 1; }
}

has_sshpass_password() {
  [ -n "${SSH_PASSWORD:-}" ] && command -v sshpass >/dev/null 2>&1
}

run_remote() {
  if has_sshpass_password; then
    SSHPASS="$SSH_PASSWORD" sshpass -e ssh -t -p "$SSH_PORT" "$SSH_TARGET" "$@"
    return
  fi

  ssh -t -p "$SSH_PORT" "$SSH_TARGET" "$@"
}

copy_to_remote() {
  local source_path="$1"
  local target_path="$2"

  if has_sshpass_password; then
    SSHPASS="$SSH_PASSWORD" sshpass -e scp -P "$SSH_PORT" "$source_path" "${SSH_TARGET}:${target_path}"
    return
  fi

  scp -P "$SSH_PORT" "$source_path" "${SSH_TARGET}:${target_path}"
}

validate_local_files() {
  [ -s "$LOCAL_CERT" ] || { log_error "Missing certificate: $LOCAL_CERT"; exit 1; }
  [ -s "$LOCAL_KEY" ] || { log_error "Missing private key: $LOCAL_KEY"; exit 1; }
  bash -n "$LOCAL_REMOTE_SCRIPT"
}

main() {
  require_command bash
  require_command ssh
  require_command scp
  validate_local_files

  log_info "Preparing secure upload directory on ${SSH_TARGET}"
  run_remote "umask 077; mkdir -p '$REMOTE_UPLOAD_DIR'; chmod 700 '$REMOTE_UPLOAD_DIR'"
  log_info "Uploading test certificate and remote setup script"
  copy_to_remote "$LOCAL_CERT" "$REMOTE_CERT"
  copy_to_remote "$LOCAL_KEY" "$REMOTE_KEY"
  copy_to_remote "$LOCAL_REMOTE_SCRIPT" "$REMOTE_SCRIPT"
  log_info "Configuring test HTTPS on ${SSH_TARGET}"
  run_remote "sudo bash '$REMOTE_SCRIPT'"

  log_success "Test HTTPS configuration completed"
  log_success "Jike:  https://jike.tech.gd.cn"
  log_success "Alpha: https://alpha.tech.gd.cn"
  log_info "Browsers will warn because this is a staging certificate"
}

main "$@"
