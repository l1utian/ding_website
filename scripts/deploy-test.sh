#!/usr/bin/env bash
set -Eeuo pipefail

readonly APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly SERVER_HOST="${SERVER_HOST:-106.55.178.107}"
readonly SSH_USER="${SSH_USER:-ubuntu}"
readonly SSH_PORT="${SSH_PORT:-22}"
readonly SSH_TARGET="${SSH_USER}@${SERVER_HOST}"
readonly REMOTE_ARCHIVE="/tmp/ding_website_dist.tar.gz"
readonly REMOTE_SCRIPT="/tmp/ding_website_deploy_test.sh"
readonly LOCAL_ARCHIVE="${TMPDIR:-/tmp}/ding_website_dist.tar.gz"
readonly LOCAL_REMOTE_SCRIPT="${TMPDIR:-/tmp}/ding_website_deploy_test.sh"

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
  if ! command -v "$1" >/dev/null 2>&1; then
    log_error "Missing required command: $1"
    exit 1
  fi
}

has_sshpass_password() {
  [ -n "${SSH_PASSWORD:-}" ] && command -v sshpass >/dev/null 2>&1
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

run_remote_script() {
  if has_sshpass_password; then
    SSHPASS="$SSH_PASSWORD" sshpass -e ssh -t -p "$SSH_PORT" "$SSH_TARGET" "$@"
    return
  fi

  ssh -t -p "$SSH_PORT" "$SSH_TARGET" "$@"
}

ask_first_deploy() {
  if [ -n "${FIRST_DEPLOY:-}" ]; then
    return
  fi

  read -r -p "是否首次部署测试环境？首次会写入 8080/8081 Nginx 配置，默认 no [y/N]: " answer
  case "$answer" in
    y | Y | yes | YES) FIRST_DEPLOY="yes" ;;
    *) FIRST_DEPLOY="no" ;;
  esac
}

build_project() {
  cd "$APP_ROOT"
  pnpm install
  pnpm build:all

  [ -f "${APP_ROOT}/dist/jike/index.html" ] || { log_error "Missing dist/jike/index.html"; exit 1; }
  [ -f "${APP_ROOT}/dist/alpha/index.html" ] || { log_error "Missing dist/alpha/index.html"; exit 1; }
}

create_archive() {
  tar -czf "$LOCAL_ARCHIVE" -C "${APP_ROOT}/dist" \
    --exclude='._*' \
    --exclude='.DS_Store' \
    --exclude='Thumbs.db' \
    jike alpha
}

create_remote_script() {
  cat >"$LOCAL_REMOTE_SCRIPT" <<'REMOTE_SCRIPT'
#!/usr/bin/env bash
set -Eeuo pipefail

readonly DEPLOY_ROOT="/var/www/ding_website"
readonly ARCHIVE_PATH="/tmp/ding_website_dist.tar.gz"
readonly STAGING_ROOT="/tmp/ding_website_deploy_staging"
readonly STAGING_DIST="${STAGING_ROOT}/dist"
readonly TEST_CONF="/etc/nginx/conf.d/ding_website_test.conf"
readonly TIMESTAMP="$(date +%Y%m%d%H%M%S)"
readonly FIRST_DEPLOY="${FIRST_DEPLOY:-no}"

log() {
  printf '[remote] %s\n' "$1"
}

ensure_nginx() {
  if command -v nginx >/dev/null 2>&1; then
    return
  fi

  apt-get update
  apt-get install -y nginx
}

prepare_staging() {
  if [ -e "$STAGING_ROOT" ]; then
    mv "$STAGING_ROOT" "${STAGING_ROOT}.${TIMESTAMP}.old"
  fi

  mkdir -p "$STAGING_DIST"
  tar -xzf "$ARCHIVE_PATH" -C "$STAGING_DIST"
}

verify_staging() {
  [ -f "${STAGING_DIST}/jike/index.html" ] || { echo "Missing jike/index.html" >&2; exit 1; }
  [ -f "${STAGING_DIST}/alpha/index.html" ] || { echo "Missing alpha/index.html" >&2; exit 1; }
}

replace_site() {
  local site_key="$1"
  local source_dir="${STAGING_DIST}/${site_key}"
  local target_dir="${DEPLOY_ROOT}/${site_key}"

  case "$target_dir" in
    "${DEPLOY_ROOT}/"*) ;;
    *) echo "Refusing to replace unsafe path: $target_dir" >&2; exit 1 ;;
  esac

  mkdir -p "$DEPLOY_ROOT"
  rm -rf "$target_dir"
  mv "$source_dir" "$target_dir"
  find "$target_dir" -type d -exec chmod 755 {} \;
  find "$target_dir" -type f -exec chmod 644 {} \;
  chown -R www-data:www-data "$target_dir" 2>/dev/null || true
  log "Updated ${target_dir}"
}

write_test_config() {
  cat >"$TEST_CONF" <<'NGINX'
server {
    listen 8080;
    server_name _;
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
    listen 8081;
    server_name _;
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

configure_nginx_if_needed() {
  if [ "$FIRST_DEPLOY" != "yes" ]; then
    log "Skipped Nginx config because FIRST_DEPLOY=${FIRST_DEPLOY}"
    return
  fi

  ensure_nginx
  write_test_config
  systemctl enable --now nginx
  nginx -t
  systemctl reload nginx
  log "Test Nginx config enabled"
}

main() {
  prepare_staging
  verify_staging
  replace_site jike
  replace_site alpha
  configure_nginx_if_needed
  log "Test deployment completed"
}

main "$@"
REMOTE_SCRIPT
}

main() {
  require_command pnpm
  require_command tar
  require_command ssh
  require_command scp
  ask_first_deploy

  log_info "Building static sites"
  build_project
  log_info "Creating archive"
  create_archive
  create_remote_script
  log_info "Uploading files to ${SSH_TARGET}"
  copy_to_remote "$LOCAL_ARCHIVE" "$REMOTE_ARCHIVE"
  copy_to_remote "$LOCAL_REMOTE_SCRIPT" "$REMOTE_SCRIPT"
  log_info "Running remote deployment"
  run_remote_script "sudo env FIRST_DEPLOY='$FIRST_DEPLOY' bash '$REMOTE_SCRIPT'"

  log_success "Test deployment completed"
  log_success "Jike:  http://${SERVER_HOST}:8080"
  log_success "Alpha: http://${SERVER_HOST}:8081"
}

main "$@"
