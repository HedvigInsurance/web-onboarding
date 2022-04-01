import tracer from 'dd-trace'
import { APP_ENVIRONMENT, HEROKU_SLUG_COMMIT } from './config'

tracer.init({
  env: APP_ENVIRONMENT,
  version: HEROKU_SLUG_COMMIT,
  service: 'web-onboarding',
  plugins: false,
})

tracer.use('koa')

export default tracer
