import { ArrowRight } from 'lucide-react'

import type { Product } from '@/data/types'

type ProductGridProps = Readonly<{
  products: readonly Product[]
}>

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.slug}>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
          <p>{product.summary}</p>
          <a className="text-link" href={`/products/${product.slug}/`}>
            查看详情 <ArrowRight aria-hidden="true" size={16} />
          </a>
        </article>
      ))}
    </div>
  )
}
