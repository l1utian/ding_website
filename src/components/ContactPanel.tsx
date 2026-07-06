import { MapPin, Phone, UserRound } from 'lucide-react'

import type { CompanySite } from '@/data/types'

type ContactPanelProps = Readonly<{
  site: CompanySite
}>

export function ContactPanel({ site }: ContactPanelProps) {
  return (
    <div className="contact-info">
      <div className="contact-info-item">
        <MapPin aria-hidden="true" size={20} />
        <span className="contact-info-label">公司地址</span>
        <span className="contact-info-value">{site.address}</span>
      </div>
      <div className="contact-info-item">
        <UserRound aria-hidden="true" size={20} />
        <span className="contact-info-label">联系人</span>
        <span className="contact-info-value">{site.contactName}</span>
      </div>
      <div className="contact-info-item">
        <Phone aria-hidden="true" size={20} />
        <span className="contact-info-label">联系电话</span>
        <a className="contact-info-value" href={`tel:${site.phone}`}>{site.phone}</a>
      </div>
    </div>
  )
}
