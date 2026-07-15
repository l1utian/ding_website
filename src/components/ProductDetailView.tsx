import { ArrowLeft, Mail, Package, Phone } from 'lucide-react'

import { WordDocument } from '@/components/WordDocument'
import type { CompanySite, Product } from '@/data/types'
import type { Locale } from '@/i18n/locales'
import { localePath } from '@/i18n/locales'
import type { Messages } from '@/i18n/messages'

type ProductDetailViewProps = Readonly<{
  site: CompanySite
  product: Product
  locale: Locale
  messages: Messages
}>

export function ProductDetailView({ site, product, locale, messages }: ProductDetailViewProps) {
  return (
    <div className="detail-layout">
      <article className="detail-main">
        <WordDocument blocks={product.document} />
        <div className="detail-actions">
          <a className="button primary" href="#contact-card">
            {messages.products.consult} <Phone aria-hidden="true" size={16} />
          </a>
          <a className="button muted" href={`${localePath(locale, '/')}#products`}>
            <ArrowLeft aria-hidden="true" size={16} /> {messages.products.backToList}
          </a>
        </div>
      </article>

      <aside className="detail-aside">
        {product.specs.length > 0 ? (
          <div className="spec-panel">
            <h3 className="aside-title">{messages.products.keySpecs}</h3>
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
            <h3 className="aside-title">{messages.products.applications}</h3>
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
              <Package aria-hidden="true" size={16} /> {messages.products.packaging}
            </h3>
            <p>{product.packaging}</p>
          </div>
        ) : null}

        <div className="spec-panel contact-card" id="contact-card">
          <h3 className="aside-title">{messages.products.business}</h3>
          <p className="contact-line">{site.contactName}</p>
          <a className="contact-phone" href={`tel:${site.phone}`}>
            <Phone aria-hidden="true" size={16} /> {site.phone}
          </a>
          <a className="contact-phone" href={`mailto:${site.email}`}>
            <Mail aria-hidden="true" size={16} /> {site.email}
          </a>
        </div>
      </aside>
    </div>
  )
}
