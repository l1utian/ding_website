import type { CompanySite } from '@/data/types'

type SiteFooterProps = Readonly<{
  site: CompanySite
}>

export function SiteFooter({ site }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div>
          <p className="footer-brand">{site.name}</p>
          <p className="footer-desc">
            聚焦环保助剂与高分子新材料研发生产，以自有工厂与研发实验室为依托，为橡塑产业提供高品质解决方案。
          </p>
        </div>
        <div className="footer-copy">
          © {year} {site.shortName} · 版权所有
        </div>
      </div>
    </footer>
  )
}
