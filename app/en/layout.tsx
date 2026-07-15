import type { Metadata } from 'next'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getBuildSite } from '@/data/sites'
import { getMessages } from '@/i18n/messages'

type EnLayoutProps = Readonly<{
  children: React.ReactNode
}>

export function generateMetadata(): Metadata {
  const site = getBuildSite('en')
  const messages = getMessages('en')

  return {
    title: {
      default: `${site.name} | ${messages.metaPortalSuffix}`,
      template: `%s | ${site.shortName}`,
    },
    description: site.intro[0],
  }
}

export default function EnLayout({ children }: EnLayoutProps) {
  const site = getBuildSite('en')
  const messages = getMessages('en')

  return (
    <div lang="en">
      <SiteHeader site={site} locale="en" messages={messages} />
      <main>{children}</main>
      <SiteFooter site={site} locale="en" messages={messages} />
    </div>
  )
}
