type CookieConfig = {
  name: string
}

export type AbTestConfig = {
  optimizeExperimentId: string
  cookies: {
    variant: CookieConfig
  }
}

export const newSiteAbTest: AbTestConfig = {
  optimizeExperimentId: 'wmRyD1ofQYSQ5LL5BEH9nw',
  cookies: {
    variant: {
      name: 'HEDVIG_EXP_NEW_SITE',
    },
  },
}
