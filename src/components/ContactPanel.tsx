import { MapPin, Phone, UserRound } from 'lucide-react'

import type { CompanySite } from '@/data/types'

type ContactPanelProps = Readonly<{
  site: CompanySite
}>

export function ContactPanel({ site }: ContactPanelProps) {
  return (
    <div className="contact-panel">
      <div className="contact-item">
        <MapPin aria-hidden="true" size={22} />
        <div>
          <span>公司地址</span>
          <strong>{site.address}</strong>
        </div>
      </div>
      <div className="contact-item">
        <UserRound aria-hidden="true" size={22} />
        <div>
          <span>联系人</span>
          <strong>{site.contactName}</strong>
        </div>
      </div>
      <div className="contact-item">
        <Phone aria-hidden="true" size={22} />
        <div>
          <span>联系电话</span>
          <strong>{site.phone}</strong>
        </div>
      </div>
    </div>
  )
}
