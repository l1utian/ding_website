import { afterEach, describe, expect, it, vi } from 'vitest'

const ORIGINAL_SITE_KEY = process.env.SITE_KEY

describe('next config', () => {
  afterEach(() => {
    process.env.SITE_KEY = ORIGINAL_SITE_KEY
    vi.resetModules()
  })

  it('uses a separate Next build directory for each site', async () => {
    await expectDistDirForSite('jike', '.next-jike')
    await expectDistDirForSite('alpha', '.next-alpha')
  })

  it('rejects missing or unknown site keys', async () => {
    await expect(expectConfigLoadWithSiteKey(undefined)).rejects.toThrow('SITE_KEY')
    await expect(expectConfigLoadWithSiteKey('demo')).rejects.toThrow('SITE_KEY')
  })
})

async function expectDistDirForSite(siteKey: string, expectedDistDir: string) {
  const configModule = await expectConfigLoadWithSiteKey(siteKey)

  expect(configModule.default.distDir).toBe(expectedDistDir)
}

async function expectConfigLoadWithSiteKey(siteKey: string | undefined) {
  if (siteKey === undefined) {
    delete process.env.SITE_KEY
  } else {
    process.env.SITE_KEY = siteKey
  }

  vi.resetModules()

  return import('./next.config')
}
