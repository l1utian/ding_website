import { ContactPanel } from '@/components/ContactPanel'
import { FactoryGallery } from '@/components/FactoryGallery'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { SectionTitle } from '@/components/SectionTitle'
import { WordDocument } from '@/components/WordDocument'
import { getBuildSite } from '@/data/sites'

const FEATURED_PRODUCT_COUNT = 3

export default function HomePage() {
  const site = getBuildSite()
  const featuredProducts = site.products.slice(0, FEATURED_PRODUCT_COUNT)

  return (
    <>
      <Hero site={site} />
      <section className="section">
        <SectionTitle
          eyebrow="Company"
          title="公司简介"
          summary="聚焦环保助剂与高分子新材料应用，服务 PVC、CPVC 及相关橡塑产业。"
        />
        <WordDocument blocks={site.introDocument} />
      </section>
      <section className="section band">
        <SectionTitle eyebrow="Products" title="核心产品" summary="从原始资料整理的产品信息。" />
        <ProductGrid products={featuredProducts} />
      </section>
      <section className="section">
        <SectionTitle eyebrow="Factory" title="生产车间" />
        <FactoryGallery site={site} />
      </section>
      <section className="section band">
        <SectionTitle eyebrow="Contact" title="联系方式" />
        <ContactPanel site={site} />
      </section>
    </>
  )
}
