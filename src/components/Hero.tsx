import { Factory, Leaf, ShieldCheck } from 'lucide-react'

import { Typewriter } from '@/components/Typewriter'
import type { CompanySite } from '@/data/types'
import type { Messages } from '@/i18n/messages'

type HeroProps = Readonly<{
  site: CompanySite
  messages: Messages
}>

export function Hero({ site, messages }: HeroProps) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${site.heroImage})` }}>
      <div className="hero-inner">
        <h1 className="hero-slogan">
          <Typewriter text={site.slogan} />
        </h1>
        <div className="hero-points" aria-label={messages.hero.capabilitiesAria}>
          <span>
            <Factory aria-hidden="true" size={18} /> {messages.hero.ownedFactory}
          </span>
          <span>
            <ShieldCheck aria-hidden="true" size={18} /> {messages.hero.ecoAdditives}
          </span>
          <span>
            <Leaf aria-hidden="true" size={18} /> {messages.hero.greenMaterials}
          </span>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">10+</span>
            <span className="hero-stat-label">{messages.hero.yearsLabel}</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">200+</span>
            <span className="hero-stat-label">{messages.hero.clientsLabel}</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">6000㎡</span>
            <span className="hero-stat-label">{messages.hero.baseLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
