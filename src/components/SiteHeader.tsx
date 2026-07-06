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
          width={42}
          height={42}
          priority
        />
        <span className="brand-name">{site.name}</span>
      </a>
    </header>
  )
}
