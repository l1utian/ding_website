import { describe, expect, it } from 'vitest'

import {
  getBuildSiteKey,
  getDocumentPlainText,
  getProductBySlug,
  getSite,
  getStaticProductSlugs,
  sites,
} from './sites'

describe('site data', () => {
  it('selects a site only from an explicit SITE_KEY', () => {
    expect(getBuildSiteKey({ SITE_KEY: 'jike' })).toBe('jike')
    expect(getBuildSiteKey({ SITE_KEY: 'alpha' })).toBe('alpha')
  })

  it('rejects missing or unknown SITE_KEY values', () => {
    expect(() => getBuildSiteKey({})).toThrow('SITE_KEY')
    expect(() => getBuildSiteKey({ SITE_KEY: 'demo' })).toThrow('SITE_KEY')
  })

  it('keeps the two company product catalogs isolated', () => {
    expect(getSite('jike').products).toHaveLength(3)
    expect(getSite('alpha').products).toHaveLength(6)
    expect(getProductBySlug(getSite('jike'), 'jk-100')).toBeDefined()
    expect(getProductBySlug(getSite('jike'), 'aef-18')).toBeUndefined()
    expect(getProductBySlug(getSite('alpha'), 'aef-18')).toBeDefined()
    expect(getProductBySlug(getSite('alpha'), 'jk-100')).toBeUndefined()
  })

  it('provides unique static product routes for each site', () => {
    for (const site of sites) {
      const slugs = getStaticProductSlugs(site)
      expect(new Set(slugs).size).toBe(slugs.length)
      expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true)
    }
  })

  it('uses the exact Word company introduction text as page content', () => {
    const jikeIntro = getDocumentPlainText(getSite('jike').introDocument)
    const alphaIntro = getDocumentPlainText(getSite('alpha').introDocument)

    expect(jikeIntro).toContain('深圳市积科科技有限公司坐落于深圳，是一家专注于高分子环保助剂研发、生产、销售与技术服务一体化的现代化精细化工企业。')
    expect(jikeIntro).toContain('秉持 “科技赋能绿色橡塑，品质铸就长久合作” 的经营理念')
    expect(alphaIntro).toContain('阿尔法（深圳）环保新材料有限公司扎根深圳，是专注 PVC 制品配套环保功能性助剂研发、生产与技术服务的高新技术新材料企业')
    expect(alphaIntro).toContain('未来公司将持续深耕单一功能助剂技术创新')
  })

  it('uses Word product documents for product detail content', () => {
    const jk100 = getProductBySlug(getSite('jike'), 'jk-100')
    const aft180 = getProductBySlug(getSite('alpha'), 'aft-180')

    expect(jk100).toBeDefined()
    expect(aft180).toBeDefined()
    expect(getDocumentPlainText(jk100!.document)).toContain('JK-100 环保热稳定剂产品说明书')
    expect(getDocumentPlainText(jk100!.document)).toContain('文档版本：V1.0生效日期：2026 年 07 月 02 日')
    expect(getDocumentPlainText(aft180!.document)).toContain('粉体防团聚剂 AFT-180')
    expect(getDocumentPlainText(aft180!.document)).toContain('•   包装：内塑外编袋包装，净重 25kg。可将小包装于吨包内875KG/包。')
  })
})
