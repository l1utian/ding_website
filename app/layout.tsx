import type { Metadata } from 'next'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getBuildSite } from '@/data/sites'

import './globals.css'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export function generateMetadata(): Metadata {
  const site = getBuildSite()

  return {
    title: {
      default: `${site.name}｜环保助剂与新材料门户`,
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
  const site = getBuildSite()

  return (
    <html lang="zh-CN">
      <body data-site={site.key}>
        <SiteHeader site={site} />
        <main>{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  )
}
