import { ChevronRight, Home } from 'lucide-react'

import type { Locale } from '@/i18n/locales'
import { localePath } from '@/i18n/locales'
import type { Messages } from '@/i18n/messages'

type BreadcrumbItem = Readonly<{
  label: string
  href?: string
}>

type BreadcrumbProps = Readonly<{
  items: readonly BreadcrumbItem[]
  locale: Locale
  messages: Messages
}>

export function Breadcrumb({ items, locale, messages }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label={messages.breadcrumb.aria}>
      <a className="breadcrumb-home" href={localePath(locale, '/')}>
        <Home aria-hidden="true" size={15} /> {messages.breadcrumb.home}
      </a>
      {items.map((item) => (
        <span className="breadcrumb-item" key={item.label}>
          <ChevronRight aria-hidden="true" size={14} />
          {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
