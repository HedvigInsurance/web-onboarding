import { match } from 'matchly'
import React from 'react'
import { matchPath, useLocation } from 'react-router'
import { Locale } from 'data/graphql'
import { localePathPattern } from 'l10n/localePathPattern'

export type LocalePath = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en'

export const getIsoLocale = (locale: string): Locale => {
  switch (locale) {
    case 'dk':
      return Locale.DaDk
    case 'dk-en':
      return Locale.EnDk
    case 'no':
      return Locale.NbNo
    case 'no-en':
      return Locale.EnNo
    case 'se':
      return Locale.SvSe
    case 'se-en':
      return Locale.EnSe
    default:
      throw new Error(`Illegal locale "${locale}"`)
  }
}

const getLocaleFromPath = (path: string) => {
  const localeMatch = matchPath<WithLocale>(path, {
    path: localePathPattern + '/*',
  })
  return localeMatch?.params?.locale?.toLowerCase() || ''
}

export interface WithLocale {
  locale: string
}
type RenderProp = (props: { currentLocale: string }) => React.ReactNode

export const CurrentLocale: React.ComponentType<{
  children: RenderProp
}> = ({ children }) => {
  const location = useLocation()
  return (
    <>{children({ currentLocale: getLocaleFromPath(location.pathname) })}</>
  )
}

export const useCurrentLocale = () => {
  const location = useLocation()
  return getLocaleFromPath(location.pathname)
}

export enum Market {
  Se = 'SE',
  No = 'NO',
  Dk = 'DK',
}
export const useMarket = (): Market => {
  const currentLocale = useCurrentLocale()

  return match([
    ['se', Market.Se],
    ['se-en', Market.Se],
    ['no', Market.No],
    ['no-en', Market.No],
    ['dk', Market.Dk],
    ['dk-en', Market.Dk],
  ])(currentLocale)!
}
