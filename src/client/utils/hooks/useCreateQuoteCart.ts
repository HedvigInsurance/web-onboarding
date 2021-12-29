import { useCallback } from 'react'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useCreateOnboardingQuoteCartMutation } from 'data/graphql'
import { useStorage } from './../StorageContainer'

export const useCreateQuoteCart = () => {
  const storage = useStorage()
  const { apiMarket, isoLocale } = useCurrentLocale()
  const [createQuoteCart, result] = useCreateOnboardingQuoteCartMutation({
    variables: { market: apiMarket, locale: isoLocale },
  })

  const handleCreateQuoteCart = useCallback(async () => {
    storage.session.clearSession()
    return await createQuoteCart()
  }, [createQuoteCart, storage])

  return [handleCreateQuoteCart, result] as const
}
