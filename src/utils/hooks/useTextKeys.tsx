import { TranslationsContext } from '@hedviginsurance/textkeyfy'
import * as React from 'react'

const placeholderRegex = new RegExp('({[a-zA-Z0-9_]+})', 'g')
const placeholderKeyRegex = new RegExp('([a-zA-Z0-9_]+)', 'g')

String.prototype.withReplacements = function(replacements) {
  const matches = this.split(placeholderRegex).filter((value) => value)

  return matches.map((placeholder, _) => {
    if (!placeholderKeyRegex.test(placeholder)) {
      return placeholder
    }
    const key = placeholder.match(placeholderKeyRegex)![0]

    const value = replacements[key]

    if (value) {
      return value.toString()
    }

    return placeholder
  })
}

export const useTextKeys = () => {
  const context = React.useContext(TranslationsContext)

  return React.useMemo(
    () =>
      new Proxy(context.textKeys, {
        get: (textKeys, key: string) => textKeys[key] || key,
      }),
    [context.textKeys],
  )
}
