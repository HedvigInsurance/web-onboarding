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
  doEvent: () => void
}

declare var ADT: Adt
