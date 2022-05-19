export const BREAKPOINTS = {
  largeScreen: 1000,
  mediumLargeScreen: 840,
  mediumScreen: 800,
  mediumSmallScreen: 450,
  smallScreen: 375,
}

export const LARGE_SCREEN_MEDIA_QUERY = `@media screen and (min-width: ${BREAKPOINTS.largeScreen}px)`
export const MEDIUM_LARGE_SCREEN_MEDIA_QUERY = `@media screen and (min-width: ${BREAKPOINTS.mediumLargeScreen}px)`
export const MEDIUM_SCREEN_MEDIA_QUERY = `@media screen and (min-width: ${BREAKPOINTS.mediumScreen}px)`
export const MEDIUM_SMALL_SCREEN_MEDIA_QUERY = `@media screen and (min-width: ${BREAKPOINTS.mediumSmallScreen}px)`
export const SMALL_SCREEN_MEDIA_QUERY = `@media screen and (min-width: ${BREAKPOINTS.smallScreen}px)`

export const MEDIA_QUERIES: Record<keyof typeof BREAKPOINTS, string> = {
  largeScreen: LARGE_SCREEN_MEDIA_QUERY,
  mediumLargeScreen: MEDIUM_LARGE_SCREEN_MEDIA_QUERY,
  mediumScreen: MEDIUM_SCREEN_MEDIA_QUERY,
  mediumSmallScreen: MEDIUM_SMALL_SCREEN_MEDIA_QUERY,
  smallScreen: SMALL_SCREEN_MEDIA_QUERY,
}
