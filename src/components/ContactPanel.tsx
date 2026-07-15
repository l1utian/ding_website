import { Mail, MapPin, Phone, UserRound } from 'lucide-react'

import type { CompanySite } from '@/data/types'

type ContactPanelProps = Readonly<{
  site: CompanySite
}>

export function ContactPanel({ site }: ContactPanelProps) {
  return (
    <div className="contact-info">
      <div className="contact-info-item">
        <span className="contact-icon" aria-hidden="true">
          <MapPin size={22} />
        </span>
        <div className="contact-info-text">
          <span className="contact-info-label">公司地址</span>
          <span className="contact-info-value">{site.address}</span>
        </div>
      </div>
      <div className="contact-info-item">
        <span className="contact-icon" aria-hidden="true">
          <UserRound size={22} />
        </span>
        <div className="contact-info-text">
          <span className="contact-info-label">联系人</span>
          <span className="contact-info-value">{site.contactName}</span>
        </div>
      </div>
      <div className="contact-info-item">
        <span className="contact-icon" aria-hidden="true">
          <Phone size={22} />
        </span>
        <div className="contact-info-text">
          <span className="contact-info-label">联系电话</span>
          <a className="contact-info-value" href={`tel:${site.phone}`}>{site.phone}</a>
        </div>
      </div>
      <div className="contact-info-item">
        <span className="contact-icon" aria-hidden="true">
          <Mail size={22} />
        </span>
        <div className="contact-info-text">
          <span className="contact-info-label">邮箱</span>
          <a className="contact-info-value" href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </div>
  )
}
