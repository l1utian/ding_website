import { PhoneCall } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import type { CompanySite } from '@/data/types'
import type { Messages } from '@/i18n/messages'

type CtaBandProps = Readonly<{
  site: CompanySite
  messages: Messages
}>

export function CtaBand({ site, messages }: CtaBandProps) {
  return (
    <section className="cta-band" aria-label={messages.cta.aria}>
      <Reveal>
        <h2 className="cta-title">{site.slogan}</h2>
        <p className="cta-text">{messages.cta.text}</p>
        <div className="cta-actions">
          <a className="button cta-button" href={`tel:${site.phone}`}>
            <PhoneCall aria-hidden="true" size={18} /> {site.phone}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
