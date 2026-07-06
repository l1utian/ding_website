import type { Metadata } from 'next'

import { FactoryGallery } from '@/components/FactoryGallery'
import { SectionTitle } from '@/components/SectionTitle'
import { WordDocument } from '@/components/WordDocument'
import { getBuildSite } from '@/data/sites'

export function generateMetadata(): Metadata {
  const site = getBuildSite()

  return {
    title: '公司介绍',
    description: site.intro[0],
  }
}

export default function AboutPage() {
  const site = getBuildSite()

  return (
    <>
      <section className="page-hero compact">
        <p className="eyebrow">{site.shortName}</p>
        <h1>公司介绍</h1>
      </section>
      <section className="section">
        <SectionTitle eyebrow="About" title={site.name} />
        <WordDocument blocks={site.introDocument} />
      </section>
      <section className="section band">
        <SectionTitle eyebrow="Factory" title="工厂与车间" />
        <FactoryGallery site={site} />
      </section>
    </>
  )
}
