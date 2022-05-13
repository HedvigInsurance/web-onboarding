interface Adt {
  Tag: AdtTag
}

interface AdtTag {
  t: number
  c: string
  tp: number
  am: number
  ti: string
  xd: string
  cpn?: string
  pc?: string // TODO: Make this required when we remove the old non-quoteCart adTraction tracking
  doEvent: () => void
}

declare let ADT: Adt
