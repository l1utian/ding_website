import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  getBuildSiteKey,
  getDocumentPlainText,
  getProductBySlug,
  getSite,
  getStaticProductSlugs,
  sites,
} from './sites'

const SHARED_FACTORY_IMAGES = [
  { src: '/assets/shared/factory/1.png', fit: 'cover' },
  { src: '/assets/shared/factory/11.png', fit: 'cover' },
  { src: '/assets/shared/factory/12.png', fit: 'contain' },
  { src: '/assets/shared/factory/13.png', fit: 'contain' },
] as const

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
    expect(getSite('jike').products).toHaveLength(6)
    expect(getSite('alpha').products).toHaveLength(9)
    expect(getProductBySlug(getSite('jike'), 'jk-100')).toBeDefined()
    expect(getProductBySlug(getSite('jike'), 'jk-619e')).toBeDefined()
    expect(getProductBySlug(getSite('jike'), 'jk-318')).toBeDefined()
    expect(getProductBySlug(getSite('jike'), 'jk-315')).toBeDefined()
    expect(getProductBySlug(getSite('jike'), 'aef-18')).toBeUndefined()
    expect(getProductBySlug(getSite('jike'), 'f-37')).toBeUndefined()
    expect(getProductBySlug(getSite('jike'), 'zinc-benzoate')).toBeUndefined()
    expect(getProductBySlug(getSite('alpha'), 'aef-18')).toBeDefined()
    expect(getProductBySlug(getSite('alpha'), 'f-37')).toBeDefined()
    expect(getProductBySlug(getSite('alpha'), 'zinc-benzoate')).toBeDefined()
    expect(getProductBySlug(getSite('alpha'), 'jk-100')).toBeUndefined()
  })

  it('exposes contact emails for both sites', () => {
    expect(getSite('jike').email).toBe('13155217718dd@gmail.com')
    expect(getSite('alpha').email).toBe('zest168@126.com')
  })

  it('provides unique static product routes for each site', () => {
    for (const site of sites) {
      const slugs = getStaticProductSlugs(site)
      expect(new Set(slugs).size).toBe(slugs.length)
      expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true)
    }
  })

  it('uses the updated shared factory images in both site builds', () => {
    for (const site of sites) {
      expect(site.factoryImages).toEqual(SHARED_FACTORY_IMAGES)
    }

    for (const image of SHARED_FACTORY_IMAGES) {
      const publicFile = path.join(process.cwd(), 'public', image.src.slice(1))
      expect(existsSync(publicFile), `${image.src} should exist`).toBe(true)
    }
  })

  it('keeps the alpha slogan consistent with its company introduction', () => {
    const alpha = getSite('alpha')

    expect(alpha.slogan).toBe('卓越品质，绿色赋能橡塑产业')
    expect(alpha.intro.join('\n')).toContain('“卓越品质、绿色赋能橡塑产业”')
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
    const jk619e = getProductBySlug(getSite('jike'), 'jk-619e')
    const jk318 = getProductBySlug(getSite('jike'), 'jk-318')
    const jk315 = getProductBySlug(getSite('jike'), 'jk-315')
    const aft180 = getProductBySlug(getSite('alpha'), 'aft-180')
    const f37 = getProductBySlug(getSite('alpha'), 'f-37')
    const zincBenzoate = getProductBySlug(getSite('alpha'), 'zinc-benzoate')

    expect(jk100).toBeDefined()
    expect(jk619e).toBeDefined()
    expect(jk318).toBeDefined()
    expect(jk315).toBeDefined()
    expect(aft180).toBeDefined()
    expect(f37).toBeDefined()
    expect(zincBenzoate).toBeDefined()
    expect(getDocumentPlainText(jk100!.document)).toContain('JK-100 环保热稳定剂产品说明书')
    expect(getDocumentPlainText(jk100!.document)).toContain('文档版本：V1.0生效日期：2026 年 07 月 02 日')
    expect(getDocumentPlainText(jk619e!.document)).toContain('JK-619E大口径管材环保稳定剂（TDS）')
    expect(getDocumentPlainText(jk619e!.document)).toContain('生效日期：2026年06月09日')
    expect(getDocumentPlainText(jk318!.document)).toContain('PVC注塑管件专用钙锌稳定剂JK-318基本介绍')
    expect(getDocumentPlainText(jk318!.document)).toContain('主要用于注塑管件、线盒等')
    expect(getDocumentPlainText(jk315!.document)).toContain('SPC地板专用钙锌稳定剂JK-315基本介绍')
    expect(getDocumentPlainText(jk315!.document)).toContain('主要用于SPC地板、大理石板、石塑墙板等')
    expect(getDocumentPlainText(aft180!.document)).toContain('粉体防团聚剂 AFT-180')
    expect(getDocumentPlainText(aft180!.document)).toContain('•   包装：内塑外编袋包装，净重 25kg。可将小包装于吨包内875KG/包。')
    expect(getDocumentPlainText(f37!.document)).toContain('F-37 高效复合离型润滑脱模助剂TDS')
    expect(getDocumentPlainText(f37!.document)).toContain('文件版本：V1.0     编制日期：2026-07-11')
    expect(getDocumentPlainText(zincBenzoate!.document)).toContain('苯甲酸锌说明书')
    expect(getDocumentPlainText(zincBenzoate!.document)).toContain('CAS号：553-72-0')
  })
})
