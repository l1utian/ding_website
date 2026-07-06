import { WordDocument } from '@/components/WordDocument'
import type { Product } from '@/data/types'

type ProductDetailViewProps = Readonly<{
  product: Product
}>

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <article className="word-detail">
      <WordDocument blocks={product.document} />
      <div className="detail-actions">
        <a className="button primary" href="/contact/">
          咨询产品
        </a>
        <a className="button muted" href="/products/">
          返回产品中心
        </a>
      </div>
    </article>
  )
}
