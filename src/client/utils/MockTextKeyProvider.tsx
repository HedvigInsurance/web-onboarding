import { TranslationsContext } from '@hedviginsurance/textkeyfy'
import React from 'react'

export interface MockTextKeyProviderProps {
  textKeys: { [key: string]: string }
}

export const MockTextKeyProvider: React.SFC<MockTextKeyProviderProps> = ({
  children,
  textKeys = {},
}) => (
  <TranslationsContext.Provider value={{ textKeys }}>
    {children}
  </TranslationsContext.Provider>
)
