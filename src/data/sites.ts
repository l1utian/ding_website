import { alphaSite } from './alpha'
import { jikeSite } from './jike'
import type { CompanySite, DocumentBlock, SiteKey } from './types'

const VALID_SITE_KEYS: readonly SiteKey[] = ['jike', 'alpha']

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

export function getSite(siteKey: SiteKey): CompanySite {
  const site = sites.find((item) => item.key === siteKey)

  if (!site) {
    throw new Error(`Unknown site key: ${siteKey}`)
  }

  return site
}

export function getBuildSite(): CompanySite {
  return getSite(getBuildSiteKey(process.env))
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
