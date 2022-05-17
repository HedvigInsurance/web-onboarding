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
