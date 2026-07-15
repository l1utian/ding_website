'use client'

import { usePathname } from 'next/navigation'

import type { Locale } from '@/i18n/locales'
import { switchLocalePath } from '@/i18n/locales'
import type { Messages } from '@/i18n/messages'

type LanguageSwitcherProps = Readonly<{
  locale: Locale
  messages: Messages
}>

export function LanguageSwitcher({ locale, messages }: LanguageSwitcherProps) {
  const pathname = usePathname() || '/'
  const zhHref = switchLocalePath(pathname, 'zh')
  const enHref = switchLocalePath(pathname, 'en')

  return (
    <div className="lang-switch" role="group" aria-label={messages.language.switchAria}>
      <a
        className={`lang-switch-option${locale === 'zh' ? ' is-active' : ''}`}
        href={zhHref}
        hrefLang="zh-CN"
        aria-current={locale === 'zh' ? 'true' : undefined}
      >
        {messages.language.zh}
      </a>
      <a
        className={`lang-switch-option${locale === 'en' ? ' is-active' : ''}`}
        href={enHref}
        hrefLang="en"
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        {messages.language.en}
      </a>
    </div>
  )
}
