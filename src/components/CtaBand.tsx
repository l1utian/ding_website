import { PhoneCall } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import type { CompanySite } from '@/data/types'

type CtaBandProps = Readonly<{
  site: CompanySite
}>

export function CtaBand({ site }: CtaBandProps) {
  return (
    <section className="cta-band" aria-label="合作咨询">
      <Reveal>
        <h2 className="cta-title">{site.slogan}</h2>
        <p className="cta-text">提供定制配方研发、现场工艺指导与样品测试，欢迎来电洽谈合作。</p>
        <div className="cta-actions">
          <a className="button cta-button" href={`tel:${site.phone}`}>
            <PhoneCall aria-hidden="true" size={18} /> {site.phone}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
