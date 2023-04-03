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
  optimizeExperimentId: 'mr_3juNyS1yRodkUannTjA',
  cookies: {
    variant: {
      name: 'HEDVIG_EXP_NEW_SITE',
    },
  },
}
