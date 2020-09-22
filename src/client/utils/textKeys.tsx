import React, { useEffect, useState } from 'react'
import enTextKeys from '../../translations/en.json'

const placeholderRegex = new RegExp('({[a-zA-Z0-9_]+})', 'g')
const placeholderKeyRegex = new RegExp('([a-zA-Z0-9_]+)', 'g')

interface TextKeyResolver {
  (replacements: Replacements): string[]
  (): string
}

type TextKeys = Record<string, string>
type Locale = 'en' | 'en_SE' | 'en_NO' | 'sv_SE' | 'nb_NO'
export type Replacements = Record<string, string | number>
export type TextKeyMap = Record<string, TextKeyResolver>

export const TextKeyContext = React.createContext<TextKeys | null>(null)

export const replacePlaceholders = (
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

export const makeTextKeyResolver = (textKeys: TextKeys | null) => {
  if (typeof Proxy === 'undefined') {
    if (!textKeys) {
      return {}
    }

    return Object.entries(textKeys).reduce<Record<string, any>>(
      (acc, [key, value]) => ({
        ...acc,
        [key]: (replacements?: Replacements) =>
          replacePlaceholders(value, replacements),
      }),
      {},
    )
  }

  return new Proxy<TextKeyMap>(
    {},
    {
      get: (_, key: string) => (replacements?: Replacements) => {
        if (!textKeys) {
          return ''
        }

        const resolvedKey = textKeys[key] || key
        return replacePlaceholders(resolvedKey, replacements)
      },
    },
  )
}

export const useTextKeys = () => {
  const context = React.useContext(TextKeyContext)

  return React.useMemo(() => makeTextKeyResolver(context), [context])
}

export const TextKeyProvider: React.FC<{ locale: Locale }> = ({
  locale,
  children,
}) => {
  const [textKeys, setTextKeys] = useState<TextKeys | null>(null)

  useEffect(() => {
    let textKeyMap: Promise<{ default: TextKeys }>

    switch (locale) {
      case 'en_SE':
        textKeyMap = import(
          /* webpackChunkName: 'translations-en_se' */ '../../translations/en_SE.json'
        )
        break
      case 'sv_SE':
        textKeyMap = import(
          /* webpackChunkName: 'translations-sv_se'*/ '../../translations/sv_SE.json'
        )
        break
      case 'en_NO':
        textKeyMap = import(
          /* webpackChunkName: 'translations-en_no'*/ '../../translations/en_NO.json'
        )
        break
      case 'nb_NO':
        textKeyMap = import(
          /* webpackChunkName: 'translations-nb_no'*/ '../../translations/nb_NO.json'
        )
        break
      case 'en':
      default:
        textKeyMap = import(
          /* webpackChunkName: 'translations-en'*/ '../../translations/en.json'
        )
        break
    }

    textKeyMap.then((m) => setTextKeys(m.default))
  }, [locale])

  return (
    <TextKeyContext.Provider value={textKeys}>
      {children}
    </TextKeyContext.Provider>
  )
}

export const StaticTextKeyProvider: React.FC = ({ children }) => {
  const staticEnTextKeys: TextKeys = Object.keys(enTextKeys).reduce(
    (acc, key) => ({ ...acc, [key]: key }),
    {},
  )

  return (
    <TextKeyContext.Provider value={staticEnTextKeys}>
      {children}
    </TextKeyContext.Provider>
  )
}
