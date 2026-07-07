import { IntroArt, type IntroArtKind } from '@/components/IntroArt'
import { Reveal } from '@/components/Reveal'
import type { CompanySite } from '@/data/types'

type CompanyIntroProps = Readonly<{
  site: CompanySite
}>

function artKindFor(index: number, total: number): IntroArtKind {
  if (index === 0) {
    return 'lab'
  }

  return index === total - 1 ? 'eco' : 'factory'
}

export function CompanyIntro({ site }: CompanyIntroProps) {
  const total = site.intro.length

  return (
    <div className="intro-rows">
      {site.intro.map((paragraph, index) => (
        <Reveal
          as="article"
          className={`intro-row${index % 2 === 1 ? ' is-reversed' : ''}`}
          key={paragraph}
          delay={80}
        >
          <div className="intro-art" aria-hidden="true">
            <IntroArt kind={artKindFor(index, total)} />
          </div>
          <div className="intro-text">
            <span className="intro-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p>{paragraph}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
