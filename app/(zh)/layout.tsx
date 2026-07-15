import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getBuildSite } from '@/data/sites'
import { getMessages } from '@/i18n/messages'

type ZhLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function ZhLayout({ children }: ZhLayoutProps) {
  const site = getBuildSite('zh')
  const messages = getMessages('zh')

  return (
    <>
      <SiteHeader site={site} locale="zh" messages={messages} />
      <main>{children}</main>
      <SiteFooter site={site} locale="zh" messages={messages} />
    </>
  )
}
