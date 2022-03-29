import * as Sentry from '@sentry/node'
import Axios from 'axios'
import Router from 'koa-router'
import { ServerCookieStorage } from 'utils/storage/ServerCookieStorage'
import { ONBOARDING_QUOTE_CART_COOKIE_KEY } from 'shared/sessionStorage'
import { locales } from '../../client/l10n/locales'
import { GIRAFFE_HOST } from '../config'
import { WithLoggerState } from '../middleware/enhancers'
import { getLocaleParamFromPath } from '../../client/l10n/useCurrentLocale'

const GIRAFFE_URL = `${GIRAFFE_HOST}/graphql`

const httpClient = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const readLocaleFromUrl = (path: string) => {
  try {
    return getLocaleParamFromPath(path)
  } catch (error) {
    return null
  }
}

const isQuoteCartActive = async (id: string, market: string) => {
  try {
    const response = await httpClient.post(GIRAFFE_URL, {
      operationName: 'QuoteCartStatus',
      query: `
        query QuoteCartStatus($id: ID!) {
          quoteCart(id: $id) {
            market
            checkout {
              status
              statusText
            }
          }
        }
      `,
      variables: { id },
    })

    if (response.status !== 200) {
      throw new Error(`Giraffe returned status ${response.status}`)
    }

    const quoteCart = response.data.data.quoteCart
    return quoteCart.market === market && quoteCart.checkout === null
  } catch (error) {
    Sentry.captureException(error)
    return false
  }
}

export const quoteCartSessionMiddleware: Router.IMiddleware<
  WithLoggerState,
  any
> = async (ctx, next) => {
  const locale = readLocaleFromUrl(ctx.originalUrl)
  if (locale === null) return await next()
  const { apiMarket, isoLocale } = locales[locale]

  const storage = new ServerCookieStorage(ctx)
  const quoteCartId = storage.getItem(ONBOARDING_QUOTE_CART_COOKIE_KEY)

  const performReset = ctx.query.reset === 'true'
  if (
    !performReset &&
    quoteCartId &&
    (await isQuoteCartActive(quoteCartId, apiMarket))
  ) {
    ctx.state.getLogger('quoteCart').info(`Found quote cart id ${quoteCartId}`)
    return await next()
  }

  try {
    ctx.state.getLogger('quoteCart').info('Creating quote cart')
    const result = await httpClient.post(GIRAFFE_URL, {
      operationName: 'CreateQuoteCart',
      query: `
          mutation CreateQuoteCart($market: Market!, $locale: String!) {
            onboardingQuoteCart_create(input: { market: $market, locale: $locale }) {
              id
            }
          }
        `,
      variables: { market: apiMarket, locale: isoLocale },
    })

    if (result.status !== 200) {
      throw new Error(`Unable to create new quote cart ${result.status}`)
    }

    const quoteCartId = result.data.data.onboardingQuoteCart_create.id
    ctx.state.getLogger('quoteCart').info(`Created quote cart ${quoteCartId}`)
    storage.setItem(ONBOARDING_QUOTE_CART_COOKIE_KEY, quoteCartId)
    await next()
  } catch (e) {
    Sentry.captureException(e)
    ctx.state.getLogger('quoteCart').error(e.message)
    throw e
  }
}
