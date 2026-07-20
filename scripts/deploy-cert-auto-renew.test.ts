import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

const scriptPath = path.join(process.cwd(), 'scripts', 'deploy-cert-auto-renew.sh')
const remoteScriptPath = path.join(process.cwd(), 'scripts', 'deploy-cert-auto-renew-remote.sh')

function getBashPath() {
  if (process.platform !== 'win32') return 'bash'

  const gitExecPath = spawnSync('git', ['--exec-path'], { encoding: 'utf8' }).stdout.trim()
  const gitBashPath = path.resolve(gitExecPath, '..', '..', '..', 'bin', 'bash.exe')
  return existsSync(gitBashPath) ? gitBashPath : 'bash'
}

function readScript() {
  return [scriptPath, remoteScriptPath]
    .filter((filePath) => existsSync(filePath))
    .map((filePath) => readFileSync(filePath, 'utf8'))
    .join('\n')
}

describe('deploy-cert-auto-renew.sh', () => {
  it('has valid local and remote Bash scripts', () => {
    expect(existsSync(scriptPath)).toBe(true)
    expect(existsSync(remoteScriptPath)).toBe(true)

    for (const filePath of [scriptPath, remoteScriptPath]) {
      if (!existsSync(filePath)) continue
      const result = spawnSync(getBashPath(), ['-n', filePath], { encoding: 'utf8' })

      expect(result.status, result.stderr).toBe(0)
    }
  })

  it('uses the project archive and existing SSH conventions', () => {
    const script = readScript()

    expect(script).toContain('cert-apply-server-linux-x64.tar.gz')
    expect(script).toContain('SERVER_HOST="${SERVER_HOST:-106.55.178.107}"')
    expect(script).toContain('SSH_USER="${SSH_USER:-ubuntu}"')
    expect(script).toContain('SSH_PORT="${SSH_PORT:-22}"')
    expect(script).toContain('SSH_PASSWORD')
    expect(script).toContain('sshpass -e')
  })

  it('stages and validates the x64 package before replacing the installation', () => {
    const script = readScript()

    expect(script).toContain('uname -m')
    expect(script).toContain('x86_64')
    expect(script).toContain('-tzf "$ARCHIVE_PATH"')
    expect(script).toContain('--no-same-owner')
    expect(script).toContain('/opt/cert-apply')
    expect(script).toContain('PACKAGE_NAME="cert-apply-server-linux-x64"')
    expect(script).toContain('${PACKAGE_NAME}/node/bin/node')
    expect(script).toContain('${PACKAGE_NAME}/apply-cert.js')
    expect(script).toContain('BACKUP_DIR=')
  })

  it('preserves existing secrets and creates new configuration securely', () => {
    const script = readScript()

    expect(script).toContain('config.json')
    expect(script).toContain('Archive must not contain config.json')
    expect(script).toContain('output/.account-key.pem')
    expect(script).toContain('read -r -s')
    expect(script).toContain('const CONFIG_MODE = 0o600')
    expect(script).toContain('mode: CONFIG_MODE')
    expect(script).toContain('chmod "$CONFIG_MODE" "$CONFIG_PATH"')
    expect(script).toContain("postRenew: ''")
  })

  it('keeps only the wildcard domain in new and existing certificate configuration', () => {
    const remoteScript = readFileSync(remoteScriptPath, 'utf8')

    expect(remoteScript).toContain('readonly DEFAULT_DOMAINS="*.tech.gd.cn"')
    expect(remoteScript).not.toContain('*.tech.gd.cn,tech.gd.cn')
    expect(remoteScript).toContain('CERT_DOMAINS="$DEFAULT_DOMAINS"')
    expect(remoteScript).toContain('domains: [process.env.CERT_DOMAINS]')
    expect(remoteScript).toContain('certificates: [{ ...config.certificates[0]')
  })

  it('validates Nginx before reload and fails visibly', () => {
    const script = readScript()
    const syntaxCheck = script.indexOf('nginx -t')
    const reload = script.indexOf('systemctl reload nginx')

    expect(script).toContain('set -Eeuo pipefail')
    expect(script).toContain('run-renew.sh')
    expect(syntaxCheck).toBeGreaterThan(-1)
    expect(reload).toBeGreaterThan(syntaxCheck)
    expect(script).not.toContain('命令执行失败(证书本身不受影响)')
  })

  it('installs one marked weekly cron task with persistent logs', () => {
    const script = readScript()

    expect(script).toContain('# BEGIN ding_website cert auto renew')
    expect(script).toContain('# END ding_website cert auto renew')
    expect(script).toContain('0 3 * * 1')
    expect(script).toContain('/var/log/cert-apply.log')
    expect(script).toContain('crontab -l')
    expect(script).toContain('crontab "$NEW_CRONTAB"')
    expect(script).toContain('root-crontab.')
    expect(script).toContain('systemctl is-active --quiet cron')
    expect(script).toContain('-v entry="$CRON_ENTRY"')
    expect(script).toContain('$0 == entry { next }')
  })

  it('runs a normal certificate check without forced issuance', () => {
    const script = readScript()

    expect(script).toContain('"$RENEW_SCRIPT"')
    expect(script).not.toContain('--force')
  })

  it('suppresses only the known macOS extended-header warning', () => {
    const localScript = readFileSync(scriptPath, 'utf8')
    const remoteScript = readFileSync(remoteScriptPath, 'utf8')

    expect(localScript).toContain('TAR_WARNING_OPTION="--warning=no-unknown-keyword"')
    expect(remoteScript).toContain('TAR_WARNING_OPTION="--warning=no-unknown-keyword"')
    expect(localScript).not.toContain('2>/dev/null')
    expect(remoteScript).not.toContain('2>/dev/null')
  })

  it('passes the config path to Node without reassigning a readonly variable', () => {
    const remoteScript = readFileSync(remoteScriptPath, 'utf8')

    expect(remoteScript).not.toMatch(/^\s*CONFIG_PATH="\$CONFIG_PATH"/m)
    expect(remoteScript).toContain('CERT_CONFIG_PATH="$CONFIG_PATH"')
    expect(remoteScript).toContain('process.env.CERT_CONFIG_PATH')
  })

  it('restores exact pnpm links for the packaged direct dependencies', () => {
    const remoteScript = readFileSync(remoteScriptPath, 'utf8')

    expect(remoteScript).toContain('repair_dependency_links')
    expect(remoteScript).toContain("path.join(modulesDir, '.pnpm')")
    expect(remoteScript).toContain('.packaged-direct')
    expect(remoteScript).toContain('candidateContexts.length !== 1')
    expect(remoteScript).toContain('fs.symlinkSync')
    expect(remoteScript).toContain('"${INSTALL_DIR}/cert-apply" --help')
    expect(remoteScript).not.toContain('export NODE_PATH=')
  })
})
