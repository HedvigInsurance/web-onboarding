export const mockedQuoteCartId = 'ecbe985f-e93d-45b5-afe9-5e5104eb7372'

export const mockedPriceQueryResponse = {
  data: {
    quoteCart: {
      id: mockedQuoteCartId,
      bundle: {
        possibleVariations: [
          {
            bundle: {
              quotes: [
                {
                  id: '2c16f198-09be-4329-ad00-62d44e8b2080',
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
