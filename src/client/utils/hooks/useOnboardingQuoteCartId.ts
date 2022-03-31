import { CookieStorage } from 'cookie-storage'
import { ONBOARDING_QUOTE_CART_COOKIE_KEY } from 'shared/sessionStorage'

const cookieStorage = new CookieStorage()

export const useOnboardingQuoteCartId = () => {
  const quoteCartId = cookieStorage.getItem(ONBOARDING_QUOTE_CART_COOKIE_KEY)

  if (quoteCartId === null) throw new Error('No quote cart id found')

  return quoteCartId
}
