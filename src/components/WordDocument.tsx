import type { DocumentBlock } from '@/data/types'

type WordDocumentProps = Readonly<{
  blocks: readonly DocumentBlock[]
}>

export function WordDocument({ blocks }: WordDocumentProps) {
  return (
    <div className="word-document">
      {blocks.map((block, index) => {
        if (block.type === 'table') {
          return <WordTable key={`table-${index}`} rows={block.rows} />
        }

        const className = index === 0 ? 'word-paragraph word-title' : 'word-paragraph'

        return (
          <p className={className} key={`${index}-${block.text}`}>
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

function WordTable({ rows }: Readonly<{ rows: readonly (readonly string[])[] }>) {
  const [header, ...bodyRows] = rows

  if (!header) {
    return null
  }

  return (
    <div className="word-table-scroll">
      <table className="word-table">
        <thead>
          <tr>
            {header.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={`${rowIndex}-${row.join('|')}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
