import { ArrowRight, Factory, ShieldCheck } from 'lucide-react'

import type { CompanySite } from '@/data/types'

type HeroProps = Readonly<{
  site: CompanySite
}>

export function Hero({ site }: HeroProps) {
  const [heroImage] = site.factoryImages

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <p className="eyebrow">{site.shortName}</p>
        <h1>{site.name}</h1>
        <p className="hero-copy">{site.intro[0]}</p>
        <div className="hero-actions">
          <a className="button primary" href="/products/">
            查看产品 <ArrowRight aria-hidden="true" size={18} />
          </a>
          <a className="button secondary" href="/contact/">
            联系我们
          </a>
        </div>
        <div className="hero-points" aria-label="企业能力">
          <span>
            <Factory aria-hidden="true" size={18} /> 生产与研发配套
          </span>
          <span>
            <ShieldCheck aria-hidden="true" size={18} /> 环保助剂方案
          </span>
        </div>
      </div>
    </section>
  )
}
