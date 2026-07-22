export type SiteKey = 'jike' | 'alpha'

export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]]

export type ProductSpec = Readonly<{
  label: string
  value: string
}>

export type DocumentBlock =
  | Readonly<{
      type: 'paragraph'
      text: string
    }>
  | Readonly<{
      type: 'table'
      rows: readonly (readonly string[])[]
    }>

export type Product = Readonly<{
  slug: string
  name: string
  category: string
  summary: string
  features: readonly string[]
  specs: readonly ProductSpec[]
  applications: readonly string[]
  document: readonly DocumentBlock[]
  packaging?: string
}>

export type FactoryImage = Readonly<{
  src: string
  fit: 'cover' | 'contain'
}>

export type CompanySite = Readonly<{
  key: SiteKey
  name: string
  shortName: string
  slogan: string
  logo: string
  heroImage: string
  intro: NonEmptyReadonlyArray<string>
  introDocument: readonly DocumentBlock[]
  strengths: NonEmptyReadonlyArray<SiteStrength>
  address: string
  contactName: string
  phone: string
  email: string
  /** ICP 备案号，展示于页脚并链接至工信部查询页 */
  icpBeian: string
  products: NonEmptyReadonlyArray<Product>
  factoryImages: NonEmptyReadonlyArray<FactoryImage>
}>

export type SiteStrength = Readonly<{
  title: string
  description: string
}>
