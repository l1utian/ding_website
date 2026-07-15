import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumb } from '@/components/Breadcrumb'
import { ProductDetailView } from '@/components/ProductDetailView'
import { getBuildSite, getProductBySlug, getStaticProductSlugs } from '@/data/sites'
import { localePath } from '@/i18n/locales'
import { getMessages } from '@/i18n/messages'

type ProductPageProps = Readonly<{
  params: Promise<{
    slug: string
  }>
}>

export const dynamicParams = false

export function generateStaticParams() {
  const site = getBuildSite('zh')

  return getStaticProductSlugs(site).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const site = getBuildSite('zh')
  const messages = getMessages('zh')
  const { slug } = await params
  const product = getProductBySlug(site, slug)

  if (!product) {
    return {
      title: messages.products.notFound,
    }
  }

  return {
    title: product.name,
    description: product.summary,
    alternates: {
      languages: {
        'zh-CN': localePath('zh', `/products/${slug}/`),
        en: localePath('en', `/products/${slug}/`),
      },
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const site = getBuildSite('zh')
  const messages = getMessages('zh')
  const { slug } = await params
  const product = getProductBySlug(site, slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <section className="page-hero product-hero">
        <Breadcrumb
          locale="zh"
          messages={messages}
          items={[
            { label: messages.products.breadcrumb, href: `${localePath('zh', '/')}#products` },
            { label: product.name },
          ]}
        />
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="page-hero-summary">{product.summary}</p>
      </section>
      <section className="section detail-section">
        <ProductDetailView site={site} product={product} locale="zh" messages={messages} />
      </section>
    </>
  )
}
