import { CookieStorage } from 'cookie-storage'
import { ONBOARDING_QUOTE_CART_COOKIE_KEY } from 'shared/sessionStorage'

export const useOnboardingQuoteCartId = () => {
  const cookieStorage = new CookieStorage()
  const quoteCartId = cookieStorage.getItem(ONBOARDING_QUOTE_CART_COOKIE_KEY)

  if (quoteCartId === null) throw new Error('No quote cart id found')

  return quoteCartId
}
