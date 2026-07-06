import type { CompanySite } from '@/data/types'

type SiteFooterProps = Readonly<{
  site: CompanySite
}>

export function SiteFooter({ site }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <span className="footer-brand">{site.name}</span>
      <span className="footer-copy">
        © {year} {site.shortName}· 环保助剂与高分子新材料
      </span>
    </footer>
  )
}
