export interface Peril {
  title: string
  description: string
  covered: string[]
  exceptions: string[]
  info?: string
  icon: JSX.Element
}
