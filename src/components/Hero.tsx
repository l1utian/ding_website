import { ArrowRight, Factory, Leaf, ShieldCheck } from 'lucide-react'

import type { CompanySite } from '@/data/types'

type HeroProps = Readonly<{
  site: CompanySite
}>

export function Hero({ site }: HeroProps) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${site.heroImage})` }}>
      <div className="hero-inner">
        <p className="eyebrow hero-eyebrow">{site.shortName}</p>
        <h1 className="hero-title">{site.name}</h1>
        <p className="hero-slogan">{site.slogan}</p>
        <div className="hero-actions">
          <a className="button primary" href="#products">
            查看产品 <ArrowRight aria-hidden="true" size={18} />
          </a>
          <a className="button ghost" href="#contact">
            联系我们
          </a>
        </div>
        <div className="hero-points" aria-label="企业能力">
          <span>
            <Factory aria-hidden="true" size={18} /> 自有生产工厂
          </span>
          <span>
            <ShieldCheck aria-hidden="true" size={18} /> 环保合规助剂
          </span>
          <span>
            <Leaf aria-hidden="true" size={18} /> 绿色低碳材料
          </span>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">10+</span>
            <span className="hero-stat-label">年行业经验</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">200+</span>
            <span className="hero-stat-label">合作客户</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">6000㎡</span>
            <span className="hero-stat-label">生产基地</span>
          </div>
        </div>
      </div>
    </section>
  )
}
