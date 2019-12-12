declare module '*.json' {
  const contents: any
  export default contents
}

declare type GlobalFetch = any

interface String {
  fill: (replacements: {
    [key: string]: string | number | null | undefined
  }) => string[]
}
