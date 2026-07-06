import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductDetailView } from '@/components/ProductDetailView'
import { getBuildSite, getProductBySlug, getStaticProductSlugs } from '@/data/sites'

type ProductPageProps = Readonly<{
  params: Promise<{
    slug: string
  }>
}>

export const dynamicParams = false

export function generateStaticParams() {
  const site = getBuildSite()

  return getStaticProductSlugs(site).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const site = getBuildSite()
  const { slug } = await params
  const product = getProductBySlug(site, slug)

  if (!product) {
    return {
      title: '产品不存在',
    }
  }

  return {
    title: product.name,
    description: product.summary,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const site = getBuildSite()
  const { slug } = await params
  const product = getProductBySlug(site, slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">{site.shortName}</p>
        <h1>{product.name}</h1>
      </section>
      <section className="section">
        <ProductDetailView product={product} />
      </section>
    </>
  )
}
