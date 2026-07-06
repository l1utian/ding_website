import type { CompanySite } from '@/data/types'

type SiteFooterProps = Readonly<{
  site: CompanySite
}>

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.name}</strong>
        <p>{site.address}</p>
      </div>
      <div>
        <span>联系人：{site.contactName}</span>
        <span>电话：{site.phone}</span>
      </div>
    </footer>
  )
}
