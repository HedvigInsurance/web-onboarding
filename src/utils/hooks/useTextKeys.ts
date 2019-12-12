import { Replacements, TranslationsContext } from '@hedviginsurance/textkeyfy'
import { TextKeys } from '@hedviginsurance/textkeyfy/dist/translations/types'
import * as React from 'react'

const placeholderRegex = new RegExp('({[a-zA-Z0-9_]+})', 'g')
const placeholderKeyRegex = new RegExp('([a-zA-Z0-9_]+)', 'g')

interface TextKeyResolver {
  (replacements: Replacements): string[]
  (): string
}

export const makeTextKeyResolver = (textKeys: TextKeys) =>
  new Proxy<{
    [key: string]: TextKeyResolver
  }>(
    {},
    {
      get: (_, key: string) => (replacements?: Replacements) => {
        const resolvedKey = textKeys[key] || key
        if (!replacements) {
          return resolvedKey
        }
        const matches = resolvedKey
          .split(placeholderRegex)
          .filter((value) => value)

        return matches.map((placeholder) => {
          if (!placeholderKeyRegex.test(placeholder)) {
            return placeholder
          }
          const k = placeholder.match(placeholderKeyRegex)![0]

          const value = replacements[k]

          if (value) {
            return value.toString()
          }

          return placeholder
        })
      },
    },
  )

export const useTextKeys = () => {
  const context = React.useContext(TranslationsContext)

  return React.useMemo(() => makeTextKeyResolver(context.textKeys), [
    context.textKeys,
  ])
}
