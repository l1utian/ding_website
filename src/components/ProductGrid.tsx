import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import type { Product } from '@/data/types'
import type { Locale } from '@/i18n/locales'
import { localePath } from '@/i18n/locales'
import type { Messages } from '@/i18n/messages'

type ProductGridProps = Readonly<{
  products: readonly Product[]
  locale: Locale
  messages: Messages
}>

const MAX_FEATURE_TAGS = 3

export function ProductGrid({ products, locale, messages }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <Reveal
          as="article"
          className="product-card"
          key={product.slug}
          delay={(index % 3) * 90}
        >
          <a
            className="product-card-link"
            href={localePath(locale, `/products/${product.slug}/`)}
          >
            <span className="card-molecule" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="product-category">{product.category}</span>
            <h3>{product.name}</h3>
            <p className="product-summary">{product.summary}</p>
            {product.features.length > 0 ? (
              <ul className="product-tags">
                {product.features.slice(0, MAX_FEATURE_TAGS).map((feature) => (
                  <li key={feature}>{shorten(feature, locale)}</li>
                ))}
              </ul>
            ) : null}
            <span className="text-link">
              {messages.products.viewDetails} <ArrowRight aria-hidden="true" size={16} />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  )
}

function shorten(feature: string, locale: Locale) {
  const trimmed = feature.replace(/[。；;，,]+$/u, '')
  const [head] = trimmed.split(/[，,。；;]/u)
  const limit = locale === 'en' ? 40 : 14

  return head.length > limit ? `${head.slice(0, limit)}…` : head
}
