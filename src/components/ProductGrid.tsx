import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import type { Product } from '@/data/types'

type ProductGridProps = Readonly<{
  products: readonly Product[]
}>

const MAX_FEATURE_TAGS = 3

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <Reveal
          as="article"
          className="product-card"
          key={product.slug}
          delay={(index % 3) * 90}
        >
          <a className="product-card-link" href={`/products/${product.slug}/`}>
            <span className="product-category">{product.category}</span>
            <h3>{product.name}</h3>
            <p className="product-summary">{product.summary}</p>
            {product.features.length > 0 ? (
              <ul className="product-tags">
                {product.features.slice(0, MAX_FEATURE_TAGS).map((feature) => (
                  <li key={feature}>{shorten(feature)}</li>
                ))}
              </ul>
            ) : null}
            <span className="text-link">
              查看详情 <ArrowRight aria-hidden="true" size={16} />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  )
}

function shorten(feature: string) {
  const trimmed = feature.replace(/[。；;，,]+$/u, '')
  const [head] = trimmed.split(/[，,。；;]/u)

  return head.length > 14 ? `${head.slice(0, 14)}…` : head
}
