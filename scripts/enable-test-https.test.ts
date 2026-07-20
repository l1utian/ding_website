import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

const scriptPath = path.join(process.cwd(), 'scripts', 'enable-test-https.sh')

function getBashPath() {
  if (process.platform !== 'win32') return 'bash'

  const gitExecPath = spawnSync('git', ['--exec-path'], { encoding: 'utf8' }).stdout.trim()
  const gitBashPath = path.resolve(gitExecPath, '..', '..', '..', 'bin', 'bash.exe')
  return existsSync(gitBashPath) ? gitBashPath : 'bash'
}

function readScript() {
  return existsSync(scriptPath) ? readFileSync(scriptPath, 'utf8') : ''
}

describe('enable-test-https.sh', () => {
  it('exists as a standalone HTTPS setup script', () => {
    expect(existsSync(scriptPath)).toBe(true)
  })

  it('has valid Bash syntax', () => {
    if (!existsSync(scriptPath)) return

    const result = spawnSync(getBashPath(), ['-n', scriptPath], { encoding: 'utf8' })

    expect(result.status, result.stderr).toBe(0)
  })

  it('uploads the expected certificate for both domains', () => {
    const script = readScript()

    expect(script).toContain('certs/tech.gd.cn.crt')
    expect(script).toContain('certs/tech.gd.cn.key')
    expect(script).toContain('jike.tech.gd.cn')
    expect(script).toContain('alpha.tech.gd.cn')
  })

  it('configures HTTPS, redirect, validation, backup, and rollback', () => {
    const script = readScript()

    expect(script).toContain('return 301 https://$host$request_uri;')
    expect(script).toContain('listen 443 ssl;')
    expect(script).toContain('ssl_certificate /etc/nginx/ssl/tech.gd.cn/tech.gd.cn.crt;')
    expect(script).toContain('ssl_certificate_key /etc/nginx/ssl/tech.gd.cn/tech.gd.cn.key;')
    expect(script).toContain('openssl x509 -checkend')
    expect(script).toContain('openssl pkey')
    expect(script).toContain('BACKUP_PATH=')
    expect(script).toContain('nginx -t')
    expect(script).toContain('systemctl reload nginx')
    expect(script).toContain('curl -k')
    expect(script).toContain('rollback')
  })
})
