import type { CompanySite } from '@/data/types'
import type { Locale } from '@/i18n/locales'
import { localePath } from '@/i18n/locales'
import type { Messages } from '@/i18n/messages'

type SiteFooterProps = Readonly<{
  site: CompanySite
  locale: Locale
  messages: Messages
}>

export function SiteFooter({ site, locale, messages }: SiteFooterProps) {
  const year = new Date().getFullYear()
  const home = localePath(locale, '/')
  const links = [
    { href: `${home}#about`, label: messages.nav.about },
    { href: `${home}#strengths`, label: messages.nav.strengths },
    { href: `${home}#products`, label: messages.nav.products },
    { href: `${home}#factory`, label: messages.nav.factory },
    { href: `${home}#contact`, label: messages.nav.contact },
  ] as const

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-about">
          <p className="footer-brand">{site.name}</p>
          <p className="footer-desc">{messages.footer.about}</p>
        </div>
        <nav className="footer-col footer-nav" aria-label={messages.footer.navAria}>
          <p className="footer-heading">{messages.footer.quickNav}</p>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer-col footer-contact">
          <p className="footer-heading">{messages.footer.contactHeading}</p>
          <p>
            {messages.contact.personPrefix}
            {site.contactName}
          </p>
          <p>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>{site.address}</p>
        </div>
      </div>
      <div className="footer-divider">
        <p className="footer-copy">
          © {year} {site.shortName} · {messages.footer.copyright}
          {' · '}
          <a
            className="footer-beian"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.icpBeian}
          </a>
        </p>
      </div>
    </footer>
  )
}
