import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: false,
    fixturesFolder: false,
    baseUrl: 'https://www.dev.hedvigit.com',
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 10000,
  },
})
