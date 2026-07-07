import type { CompanySite } from '@/data/types'

type SiteFooterProps = Readonly<{
  site: CompanySite
}>

const FOOTER_LINKS = [
  { href: '#about', label: '关于我们' },
  { href: '#strengths', label: '核心优势' },
  { href: '#products', label: '产品中心' },
  { href: '#factory', label: '生产基地' },
  { href: '#contact', label: '联系我们' },
] as const

export function SiteFooter({ site }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-about">
          <p className="footer-brand">{site.name}</p>
          <p className="footer-desc">
            聚焦环保助剂与高分子新材料研发生产，以自有工厂与研发实验室为依托，为橡塑产业提供高品质解决方案。
          </p>
        </div>
        <nav className="footer-col footer-nav" aria-label="页脚导航">
          <p className="footer-heading">快捷导航</p>
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <div className="footer-col footer-contact">
          <p className="footer-heading">联系方式</p>
          <p>联系人：{site.contactName}</p>
          <p>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
          </p>
          <p>{site.address}</p>
        </div>
      </div>
      <div className="footer-divider">
        <p className="footer-copy">
          © {year} {site.shortName} · 版权所有
        </p>
      </div>
    </footer>
  )
}
