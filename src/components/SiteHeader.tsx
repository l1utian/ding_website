import Image from 'next/image'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import type { CompanySite } from '@/data/types'
import type { Locale } from '@/i18n/locales'
import { localePath } from '@/i18n/locales'
import type { Messages } from '@/i18n/messages'

type SiteHeaderProps = Readonly<{
  site: CompanySite
  locale: Locale
  messages: Messages
}>

export function SiteHeader({ site, locale, messages }: SiteHeaderProps) {
  const home = localePath(locale, '/')
  const nav = [
    { href: `${home}#about`, label: messages.nav.about },
    { href: `${home}#strengths`, label: messages.nav.strengths },
    { href: `${home}#products`, label: messages.nav.products },
    { href: `${home}#factory`, label: messages.nav.factory },
    { href: `${home}#contact`, label: messages.nav.contact },
  ] as const

  return (
    <header className="site-header">
      <a className="brand" href={home} aria-label={`${site.name}${messages.brandHomeAria}`}>
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
      <div className="header-actions">
        <nav className="site-nav" aria-label={messages.nav.aria}>
          {nav.map((item) => (
            <a className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} messages={messages} />
      </div>
    </header>
  )
}
