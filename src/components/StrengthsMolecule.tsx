import { Reveal } from '@/components/Reveal'
import type { CompanySite } from '@/data/types'

type StrengthsMoleculeProps = Readonly<{
  site: CompanySite
}>

export function StrengthsMolecule({ site }: StrengthsMoleculeProps) {
  return (
    <div className="molecule-diagram">
      <Reveal className="molecule-core">
        <span className="molecule-core-ring ring-a" aria-hidden="true" />
        <span className="molecule-core-ring ring-b" aria-hidden="true" />
        {site.strengths.slice(0, 4).map((strength, index) => (
          <span className={`molecule-bond bond-${index + 1}`} key={strength.title} aria-hidden="true" />
        ))}
        <span className="molecule-core-label">{site.shortName}</span>
      </Reveal>
      {site.strengths.map((strength, index) => (
        <Reveal
          as="article"
          className={`molecule-node node-${index + 1}`}
          key={strength.title}
          delay={140 + index * 110}
        >
          <span className="molecule-atom">
            <span className="molecule-orbit" aria-hidden="true" />
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3>{strength.title}</h3>
          <p>{strength.description}</p>
        </Reveal>
      ))}
    </div>
  )
}
