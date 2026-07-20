#!/usr/bin/env bash
set -Eeuo pipefail

readonly APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly SERVER_HOST="${SERVER_HOST:-106.55.178.107}"
readonly SSH_USER="${SSH_USER:-ubuntu}"
readonly SSH_PORT="${SSH_PORT:-22}"
readonly SSH_TARGET="${SSH_USER}@${SERVER_HOST}"
readonly LOCAL_ARCHIVE="${APP_ROOT}/cert-apply-server-linux-x64.tar.gz"
readonly REMOTE_SOURCE="${APP_ROOT}/scripts/deploy-cert-auto-renew-remote.sh"
readonly REMOTE_UPLOAD_DIR="/tmp/ding_website_cert_apply_upload"
readonly REMOTE_ARCHIVE="${REMOTE_UPLOAD_DIR}/cert-apply-server-linux-x64.tar.gz"
readonly REMOTE_SCRIPT="${REMOTE_UPLOAD_DIR}/install.sh"
readonly REMOTE_DIR_MODE="700"
readonly TAR_WARNING_OPTION="--warning=no-unknown-keyword"

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
  command -v "$1" >/dev/null 2>&1 || {
    log_error "Missing required command: $1"
    exit 1
  }
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
    SSHPASS="$SSH_PASSWORD" sshpass -e scp -P "$SSH_PORT" "$source_path" \
      "${SSH_TARGET}:${target_path}"
    return
  fi
  scp -P "$SSH_PORT" "$source_path" "${SSH_TARGET}:${target_path}"
}

validate_local_files() {
  [ -s "$LOCAL_ARCHIVE" ] || {
    log_error "Missing archive: $LOCAL_ARCHIVE"
    exit 1
  }
  [ -s "$REMOTE_SOURCE" ] || {
    log_error "Missing remote installer: $REMOTE_SOURCE"
    exit 1
  }
  tar "$TAR_WARNING_OPTION" -tzf "$LOCAL_ARCHIVE" >/dev/null
  bash -n "$REMOTE_SOURCE"
}

main() {
  require_command bash
  require_command tar
  require_command ssh
  require_command scp
  validate_local_files

  log_info "Preparing secure upload directory on ${SSH_TARGET}"
  run_remote "umask 077; mkdir -p '$REMOTE_UPLOAD_DIR'; chmod '$REMOTE_DIR_MODE' '$REMOTE_UPLOAD_DIR'"
  log_info "Uploading certificate renewal package"
  copy_to_remote "$LOCAL_ARCHIVE" "$REMOTE_ARCHIVE"
  copy_to_remote "$REMOTE_SOURCE" "$REMOTE_SCRIPT"
  log_info "Installing certificate auto-renew task on ${SSH_TARGET}"
  run_remote "sudo bash '$REMOTE_SCRIPT'"
  log_success "Certificate auto-renew deployment completed"
  log_info "Schedule: every Monday at 03:00"
  log_info "Remote log: /var/log/cert-apply.log"
}

main "$@"
