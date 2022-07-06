import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: false,
    fixturesFolder: false,
    specPattern: 'cypress/e2e/**/*.spec.{ts,tsx}',
    baseUrl: 'https://www.dev.hedvigit.com',
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
  },
})
