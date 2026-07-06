import Image from 'next/image'

import type { CompanySite } from '@/data/types'

type SiteHeaderProps = Readonly<{
  site: CompanySite
}>

const NAV_ITEMS = [
  { href: '/', label: '首页' },
  { href: '/about/', label: '公司介绍' },
  { href: '/products/', label: '产品中心' },
  { href: '/contact/', label: '联系我们' },
] as const

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label={`${site.name}首页`}>
        <Image
          className="brand-logo"
          src={site.logo}
          alt={`${site.name} LOGO`}
          width={42}
          height={42}
          priority
        />
        <span className="brand-name">{site.name}</span>
      </a>
      <nav className="site-nav" aria-label="主导航">
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
