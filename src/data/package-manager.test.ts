import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

type PackageJson = Readonly<{
  packageManager?: string
  scripts: Readonly<Record<string, string>>
}>

describe('package manager setup', () => {
  it('uses pnpm for project scripts and metadata', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8')) as PackageJson
    const scripts = Object.values(packageJson.scripts).join('\n')

    expect(packageJson.packageManager).toMatch(/^pnpm@/)
    expect(packageJson.scripts['build:all']).toContain('pnpm build:jike')
    expect(scripts).not.toMatch(/\bnpm\s+run\b/)
  })
})
