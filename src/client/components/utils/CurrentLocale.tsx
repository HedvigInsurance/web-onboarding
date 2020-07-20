import { Locale } from 'data/graphql'
import { match } from 'matchly'
import React from 'react'
import { matchPath, useLocation } from 'react-router'
import { LOCALE_PATH_PATTERN } from 'shared/locale'

export const getLocaleIsoCode = (locale: string): Locale => {
  switch (locale) {
    case 'se-en':
      return Locale.EnSe
    case 'no':
      return Locale.NbNo
    case 'no-en':
      return Locale.EnNo
    case 'se':
      return Locale.SvSe
    default:
      throw new Error(`Illegal locale "${locale}"`)
  }
}

const getLocaleFromPath = (path: string) => {
  const localeMatch = matchPath<WithLocale>(path, {
    path: LOCALE_PATH_PATTERN + '/*',
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
}
export const useMarket = (): Market => {
  const currentLocale = useCurrentLocale()

  return match([
    ['se', Market.Se],
    ['se-en', Market.Se],
    ['no', Market.No],
    ['no-en', Market.No],
  ])(currentLocale)!
}

export const getPickedLocaleFromCurrentLocale = (
  currentLocale: string,
): Locale =>
  match<string, Locale>([
    ['sv_SE', Locale.SvSe],
    ['en_SE', Locale.EnSe],
    ['nb_NO', Locale.NbNo],
    ['en_NO', Locale.EnNo],
  ])(getLocaleIsoCode(currentLocale))!
