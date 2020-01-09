import { Replacements, TranslationsContext } from '@hedviginsurance/textkeyfy'
import { TextKeys } from '@hedviginsurance/textkeyfy/dist/translations/types'
import * as React from 'react'

const placeholderRegex = new RegExp('({[a-zA-Z0-9_]+})', 'g')
const placeholderKeyRegex = new RegExp('([a-zA-Z0-9_]+)', 'g')

interface TextKeyResolver {
  (replacements: Replacements): string[]
  (): string
}

export type TextKeyMap = Record<string, TextKeyResolver>

const replacePlaceholders = (
  resolvedKey: string,
  replacements?: Replacements,
) => {
  if (!replacements) {
    return resolvedKey
  }
  const matches = resolvedKey.split(placeholderRegex).filter((value) => value)

  return matches.map((placeholder) => {
    if (!placeholderKeyRegex.test(placeholder)) {
      return placeholder
    }
    const k = placeholder.match(placeholderKeyRegex)![0]

    const value = replacements[k]

    return value?.toString() ?? placeholder
  })
}

export const makeTextKeyResolver = (textKeys: TextKeys) => {
  if (typeof Proxy === 'undefined') {
    return Object.entries(textKeys).reduce<Record<string, any>>(
      (acc, [key, value]) => ({
        ...acc,
        [key!]: (replacements?: Replacements) =>
          replacePlaceholders(value, replacements),
      }),
      {},
    )
  }

  return new Proxy<TextKeyMap>(
    {},
    {
      get: (_, key: string) => (replacements?: Replacements) => {
        const resolvedKey = textKeys[key] || key
        return replacePlaceholders(resolvedKey, replacements)
      },
    },
  )
}

export const useTextKeys = () => {
  const context = React.useContext(TranslationsContext)

  return React.useMemo(() => makeTextKeyResolver(context.textKeys), [
    context.textKeys,
  ])
}
