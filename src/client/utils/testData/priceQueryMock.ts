import { Locale } from 'data/graphql'

export const mockedQuoteCartId = 'abc123'

const getLocaleDisplayName = (locale: Locale) => {
  switch (locale) {
    case 'en_SE':
      return 'Home Insurance Renter'
    case 'sv_SE':
      return 'Hemförsäkring Hyresrätt'
    case 'nb_NO':
      return 'Innboforsikring'
    case 'da_DK':
      return 'Indboforsikring'
    default:
      return 'Home Insurance'
  }
}

export const getMockedPriceQueryResponse = (locale: Locale) => {
  return {
    data: {
      quoteCart: {
        id: mockedQuoteCartId,
        bundle: {
          possibleVariations: [
            {
              bundle: {
                quotes: [
                  {
                    id: mockedQuoteCartId,
                    displayName: getLocaleDisplayName(locale),
                    price: {
                      amount: '79',
                      currency: 'NOK',
                      __typename: 'MonetaryAmountV2',
                    },
                    __typename: 'BundledQuote',
                  },
                ],
                __typename: 'QuoteBundle',
              },
              __typename: 'QuoteBundleVariant',
            },
          ],
          bundleCost: {
            monthlyGross: {
              amount: '79.00',
              __typename: 'MonetaryAmountV2',
            },
            monthlyNet: {
              amount: '69.00',
              __typename: 'MonetaryAmountV2',
            },
            monthlyDiscount: {
              amount: '10.00',
              __typename: 'MonetaryAmountV2',
            },
            freeUntil: null,
            __typename: 'InsuranceCost',
          },
          __typename: 'QuoteBundle',
        },
        campaign: {
          incentive: {
            amount: {
              amount: '10.00',
              currency: 'NOK',
              __typename: 'MonetaryAmountV2',
            },
            percentageDiscount: 0,
            quantityMonths: 0,
            __typename: 'MonthlyCostDeduction',
          },
          code: 'meletis4ever',
          ownerName: 'Hedvig',
          expiresAt: null,
          displayValue: 'NOK 10.00/mnd i rabatt via Hedvig Forever',
          __typename: 'Campaign',
        },
        __typename: 'QuoteCart',
      },
    },
  }
}
