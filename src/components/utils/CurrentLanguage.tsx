import * as React from 'react'
import { matchPath, RouteComponentProps, withRouter } from 'react-router'
import { LANGUAGE_PATH_PATTERN } from '../../routes'

export const getLanguageIsoCode = (language: string) => {
  switch (language) {
    case 'en':
      return 'en_SE'
    case '':
    default:
      return 'sv_SE'
  }
}
const getLanguageFromPath = (path: string) => {
  const match = matchPath<WithLanguage>(path, {
    path: LANGUAGE_PATH_PATTERN + '/*',
  })
  return (
    (match && match.params.language && match.params.language.toLowerCase()) ||
    ''
  )
}

export interface WithLanguage {
  language: string
}
type RenderProp = (props: { currentLanguage: string }) => React.ReactNode

export const CurrentLanguage: React.ComponentType<{
  children: RenderProp
}> = withRouter<RouteComponentProps<WithLanguage> & { children: RenderProp }>(
  ({ children, location }) => (
    <>{children({ currentLanguage: getLanguageFromPath(location.pathname) })}</>
  ),
)
