import { alphaSite } from './alpha'
import { alphaSiteEn } from './alpha.en'
import { jikeSite } from './jike'
import { jikeSiteEn } from './jike.en'
import type { CompanySite, DocumentBlock, SiteKey } from './types'
import type { Locale } from '@/i18n/locales'
import { DEFAULT_LOCALE } from '@/i18n/locales'

const VALID_SITE_KEYS: readonly SiteKey[] = ['jike', 'alpha']

const sitesByLocale: Record<Locale, Record<SiteKey, CompanySite>> = {
  zh: { jike: jikeSite, alpha: alphaSite },
  en: { jike: jikeSiteEn, alpha: alphaSiteEn },
}

/** All zh sites (backward-compatible for tests that iterate brands). */
export const sites = [jikeSite, alphaSite] as const

export function getBuildSiteKey(
  env: Readonly<Record<string, string | undefined>>,
): SiteKey {
  const siteKey = env.SITE_KEY

  if (isSiteKey(siteKey)) {
    return siteKey
  }

  throw new Error('SITE_KEY must be one of: jike, alpha')
}

export function getSite(siteKey: SiteKey, locale: Locale = DEFAULT_LOCALE): CompanySite {
  const site = sitesByLocale[locale][siteKey]

  if (!site) {
    throw new Error(`Unknown site key: ${siteKey}`)
  }

  return site
}

export function getBuildSite(locale: Locale = DEFAULT_LOCALE): CompanySite {
  return getSite(getBuildSiteKey(process.env), locale)
}

export function getProductBySlug(site: CompanySite, slug: string) {
  return site.products.find((product) => product.slug === slug)
}

export function getStaticProductSlugs(site: CompanySite) {
  return site.products.map((product) => product.slug)
}

export function getDocumentPlainText(document: readonly DocumentBlock[]) {
  return document
    .map((block) => (block.type === 'paragraph' ? block.text : tablePlainText(block.rows)))
    .join('\n')
}

function tablePlainText(rows: readonly (readonly string[])[]) {
  return rows.map((row) => row.join('\t')).join('\n')
}

function isSiteKey(value: string | undefined): value is SiteKey {
  return VALID_SITE_KEYS.includes(value as SiteKey)
}
