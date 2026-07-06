import { ContactPanel } from '@/components/ContactPanel'
import { FactoryGallery } from '@/components/FactoryGallery'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { WordDocument } from '@/components/WordDocument'
import { getBuildSite } from '@/data/sites'

export default function HomePage() {
  const site = getBuildSite()

  return (
    <>
      <Hero site={site} />

      <section className="section" id="about">
        <Reveal>
          <SectionTitle
            eyebrow="Company"
            title="公司简介"
            summary="聚焦环保助剂与高分子新材料应用，服务 PVC、CPVC 及相关橡塑产业。"
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="intro-text wide">
            {site.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section band" id="strengths">
        <Reveal>
          <SectionTitle eyebrow="Strengths" title="核心优势" summary="以品质与技术服务下游橡塑新材料产业。" />
        </Reveal>
        <div className="strength-grid">
          {site.strengths.map((strength, index) => (
            <Reveal as="article" className="strength-card" key={strength.title} delay={(index % 4) * 80}>
              <span className="strength-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{strength.title}</h3>
              <p>{strength.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="products">
        <Reveal>
          <SectionTitle eyebrow="Products" title="核心产品" summary="点击任意产品查看与原始资料一致的详细说明。" />
        </Reveal>
        <ProductGrid products={site.products} />
      </section>

      <section className="section band" id="factory">
        <Reveal>
          <SectionTitle eyebrow="Factory" title="生产车间" summary="标准化自动化生产车间与独立研发实验室。" />
        </Reveal>
        <Reveal delay={80}>
          <FactoryGallery site={site} />
        </Reveal>
      </section>

      <section className="section" id="contact">
        <Reveal>
          <SectionTitle eyebrow="Contact" title="联系方式" summary="欢迎咨询产品选型、定制配方与样品测试。" />
        </Reveal>
        <Reveal delay={80}>
          <ContactPanel site={site} />
        </Reveal>
      </section>
    </>
  )
}
