import Image from 'next/image'

import type { CompanySite } from '@/data/types'

type SiteHeaderProps = Readonly<{
  site: CompanySite
}>

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label={`${site.name}首页`}>
        <Image
          className="brand-logo"
          src={site.logo}
          alt={`${site.name} LOGO`}
          width={44}
          height={44}
          priority
        />
        <span className="brand-name">{site.shortName}</span>
      </a>
      <nav className="site-nav" aria-label="主导航">
        <a className="nav-link" href="#about">关于我们</a>
        <a className="nav-link" href="#strengths">核心优势</a>
        <a className="nav-link" href="#products">产品中心</a>
        <a className="nav-link" href="#factory">生产基地</a>
        <a className="nav-link" href="#contact">联系我们</a>
      </nav>
    </header>
  )
}
