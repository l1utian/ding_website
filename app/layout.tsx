import type { Metadata } from 'next'

import { getBuildSite } from '@/data/sites'
import { getMessages } from '@/i18n/messages'

import './globals.css'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export function generateMetadata(): Metadata {
  const site = getBuildSite('zh')
  const messages = getMessages('zh')

  return {
    title: {
      default: `${site.name}｜${messages.metaPortalSuffix}`,
      template: `%s｜${site.shortName}`,
    },
    description: site.intro[0],
    icons: {
      icon: site.logo,
      shortcut: site.logo,
    },
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  const site = getBuildSite('zh')

  return (
    <html lang="zh-CN">
      <body data-site={site.key}>{children}</body>
    </html>
  )
}
