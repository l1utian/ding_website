import type { Metadata } from 'next'

import { ContactPanel } from '@/components/ContactPanel'
import { SectionTitle } from '@/components/SectionTitle'
import { getBuildSite } from '@/data/sites'

export function generateMetadata(): Metadata {
  const site = getBuildSite()

  return {
    title: '联系我们',
    description: `${site.name}联系方式`,
  }
}

export default function ContactPage() {
  const site = getBuildSite()

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">{site.shortName}</p>
        <h1>联系我们</h1>
      </section>
      <section className="section">
        <SectionTitle eyebrow="Contact" title="业务联系" />
        <ContactPanel site={site} />
      </section>
    </>
  )
}
