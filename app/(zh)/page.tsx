import { CompanyIntro } from '@/components/CompanyIntro'
import { ContactPanel } from '@/components/ContactPanel'
import { CtaBand } from '@/components/CtaBand'
import { FactoryGallery } from '@/components/FactoryGallery'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { StrengthsMolecule } from '@/components/StrengthsMolecule'
import { getBuildSite } from '@/data/sites'
import { getMessages } from '@/i18n/messages'

export default function HomePage() {
  const site = getBuildSite('zh')
  const messages = getMessages('zh')

  return (
    <>
      <Hero site={site} messages={messages} />

      <section className="section section-decorated" id="about">
        <div className="deco-molecules" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow={messages.sections.about.eyebrow}
            title={messages.sections.about.title}
            summary={messages.sections.about.summary}
          />
        </Reveal>
        <CompanyIntro site={site} />
      </section>

      <section className="section band section-decorated" id="strengths">
        <div className="deco-gears" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow={messages.sections.strengths.eyebrow}
            title={messages.sections.strengths.title}
            summary={messages.sections.strengths.summary}
          />
        </Reveal>
        <StrengthsMolecule site={site} />
      </section>

      <section className="section section-decorated" id="products">
        <div className="deco-hexagons" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow={messages.sections.products.eyebrow}
            title={messages.sections.products.title}
            summary={messages.sections.products.summary}
          />
        </Reveal>
        <ProductGrid products={site.products} locale="zh" messages={messages} />
      </section>

      <section className="section band" id="factory">
        <Reveal>
          <SectionTitle
            eyebrow={messages.sections.factory.eyebrow}
            title={messages.sections.factory.title}
            summary={messages.sections.factory.summary}
          />
        </Reveal>
        <Reveal delay={80}>
          <FactoryGallery site={site} messages={messages} />
        </Reveal>
      </section>

      <CtaBand site={site} messages={messages} />

      <section className="section section-decorated" id="contact">
        <div className="deco-flow" aria-hidden="true" />
        <Reveal>
          <SectionTitle
            eyebrow={messages.sections.contact.eyebrow}
            title={messages.sections.contact.title}
          />
        </Reveal>
        <Reveal delay={80}>
          <ContactPanel site={site} messages={messages} />
        </Reveal>
        <Reveal delay={120}>
          <p className="contact-note">{messages.contact.note}</p>
        </Reveal>
      </section>
    </>
  )
}
