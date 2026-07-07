import { CompanyIntro } from '@/components/CompanyIntro'
import { ContactPanel } from '@/components/ContactPanel'
import { CtaBand } from '@/components/CtaBand'
import { FactoryGallery } from '@/components/FactoryGallery'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { StrengthsMolecule } from '@/components/StrengthsMolecule'
import { getBuildSite } from '@/data/sites'

export default function HomePage() {
  const site = getBuildSite()

  return (
    <>
      <Hero site={site} />

      <section className="section section-decorated" id="about">
        <div className="deco-molecules" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow="About Us"
            title="公司简介"
            summary="聚焦环保助剂与高分子新材料应用，服务 PVC、CPVC 及相关橡塑产业。"
          />
        </Reveal>
        <CompanyIntro site={site} />
      </section>

      <section className="section band section-decorated" id="strengths">
        <div className="deco-gears" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow="Core Strengths"
            title="核心优势"
            summary="以自有工厂和独立研发实验室为依托，服务橡塑新材料产业。"
          />
        </Reveal>
        <StrengthsMolecule site={site} />
      </section>

      <section className="section section-decorated" id="products">
        <div className="deco-hexagons" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow="Products"
            title="产品中心"
            summary="点击任意产品查看与原始资料一致的详细说明。"
          />
        </Reveal>
        <ProductGrid products={site.products} />
      </section>

      <section className="section band" id="factory">
        <Reveal>
          <SectionTitle
            eyebrow="Production Base"
            title="生产基地"
            summary="标准化自动化生产车间与独立研发实验室，保障产品品质稳定。"
          />
        </Reveal>
        <Reveal delay={80}>
          <FactoryGallery site={site} />
        </Reveal>
      </section>

      <CtaBand site={site} />

      <section className="section section-decorated" id="contact">
        <div className="deco-flow" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow="Contact Us"
            title="联系我们"
          />
        </Reveal>
        <Reveal delay={80}>
          <ContactPanel site={site} />
        </Reveal>
        <Reveal delay={120}>
          <p className="contact-note">欢迎咨询产品选型、定制配方与样品测试。</p>
        </Reveal>
      </section>
    </>
  )
}
