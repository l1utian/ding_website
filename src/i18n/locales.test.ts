import { describe, expect, it } from 'vitest'

import { localeFromPathname, localePath, switchLocalePath } from './locales'

describe('locale paths', () => {
  it('builds zh paths without a prefix', () => {
    expect(localePath('zh', '/')).toBe('/')
    expect(localePath('zh', '/products/jk-100')).toBe('/products/jk-100/')
  })

  it('builds en paths with /en prefix', () => {
    expect(localePath('en', '/')).toBe('/en/')
    expect(localePath('en', '/products/jk-100/')).toBe('/en/products/jk-100/')
  })

  it('switches locale while preserving product slug', () => {
    expect(switchLocalePath('/products/jk-100/', 'en')).toBe('/en/products/jk-100/')
    expect(switchLocalePath('/en/products/jk-100/', 'zh')).toBe('/products/jk-100/')
    expect(switchLocalePath('/en/', 'zh')).toBe('/')
    expect(switchLocalePath('/', 'en')).toBe('/en/')
  })

  it('detects locale from pathname', () => {
    expect(localeFromPathname('/en/products/a/')).toBe('en')
    expect(localeFromPathname('/products/a/')).toBe('zh')
  })
})
