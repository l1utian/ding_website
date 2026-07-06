import { ArrowLeft, Package, Phone } from 'lucide-react'

import { WordDocument } from '@/components/WordDocument'
import type { CompanySite, Product } from '@/data/types'

type ProductDetailViewProps = Readonly<{
  site: CompanySite
  product: Product
}>

export function ProductDetailView({ site, product }: ProductDetailViewProps) {
  return (
    <div className="detail-layout">
      <article className="detail-main">
        <WordDocument blocks={product.document} />
        <div className="detail-actions">
          <a className="button primary" href="#contact-card">
            咨询产品 <Phone aria-hidden="true" size={16} />
          </a>
          <a className="button muted" href="/#products">
            <ArrowLeft aria-hidden="true" size={16} /> 返回产品列表
          </a>
        </div>
      </article>

      <aside className="detail-aside">
        {product.specs.length > 0 ? (
          <div className="spec-panel">
            <h3 className="aside-title">关键指标</h3>
            <dl>
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {product.applications.length > 0 ? (
          <div className="spec-panel">
            <h3 className="aside-title">应用领域</h3>
            <ul className="check-list">
              {product.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {product.packaging ? (
          <div className="spec-panel packaging">
            <h3 className="aside-title">
              <Package aria-hidden="true" size={16} /> 包装规格
            </h3>
            <p>{product.packaging}</p>
          </div>
        ) : null}

        <div className="spec-panel contact-card" id="contact-card">
          <h3 className="aside-title">业务咨询</h3>
          <p className="contact-line">{site.contactName}</p>
          <a className="contact-phone" href={`tel:${site.phone}`}>
            <Phone aria-hidden="true" size={16} /> {site.phone}
          </a>
        </div>
      </aside>
    </div>
  )
}
