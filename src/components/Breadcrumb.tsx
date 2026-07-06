import { ChevronRight, Home } from 'lucide-react'

type BreadcrumbItem = Readonly<{
  label: string
  href?: string
}>

type BreadcrumbProps = Readonly<{
  items: readonly BreadcrumbItem[]
}>

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="面包屑导航">
      <a className="breadcrumb-home" href="/">
        <Home aria-hidden="true" size={15} /> 首页
      </a>
      {items.map((item) => (
        <span className="breadcrumb-item" key={item.label}>
          <ChevronRight aria-hidden="true" size={14} />
          {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
