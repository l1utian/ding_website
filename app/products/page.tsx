import type { Metadata } from 'next'

import { ProductGrid } from '@/components/ProductGrid'
import { SectionTitle } from '@/components/SectionTitle'
import { getBuildSite } from '@/data/sites'

export function generateMetadata(): Metadata {
  const site = getBuildSite()

  return {
    title: '产品中心',
    description: `${site.shortName}产品中心`,
  }
}

export default function ProductsPage() {
  const site = getBuildSite()

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">{site.shortName}</p>
        <h1>产品中心</h1>
      </section>
      <section className="section">
        <SectionTitle eyebrow="Products" title="产品列表" summary="产品信息来自当前项目资料。" />
        <ProductGrid products={site.products} />
      </section>
    </>
  )
}
