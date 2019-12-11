import { TranslationsContext } from '@hedviginsurance/textkeyfy'
import * as React from 'react'

export const useTextKey = (key: string) => {
  const context = React.useContext(TranslationsContext)
  return context.textKeys[key]
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
