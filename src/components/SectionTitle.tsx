type SectionTitleProps = Readonly<{
  eyebrow: string
  title: string
  summary?: string
}>

export function SectionTitle({ eyebrow, title, summary }: SectionTitleProps) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {summary ? <p>{summary}</p> : null}
    </div>
  )
}
