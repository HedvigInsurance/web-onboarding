import {
  QuoteBundleVariant,
  TypeOfContract,
  InsurableLimitType,
  InsuranceTermType,
  BundledQuote,
  QuoteBundle,
  SwedishApartmentQuoteDetails,
  SwedishAccidentDetails,
  NorwegianHomeContentsDetails,
  NorwegianHomeContentsType,
  DanishHomeContentsDetails,
  DanishHomeContentsType,
  SwedishApartmentType,
} from 'data/graphql'

import { perilsMock } from './offerDataMock'

export const possibleVariationsApartmentSE: QuoteBundleVariant[] = [
  {
    id:
      '55b885cd-0876-4e67-b4c4-3ba379c1978c+e564c6ba-0d43-473c-9960-c8d38aaa17f6',
    tag: 'Most popular',
    bundle: {
      displayName: 'Home Insurance & Accident Insurance',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '138.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '138.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: '55b885cd-0876-4e67-b4c4-3ba379c1978c',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '59',
            currency: 'SEK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Sven',
          lastName: 'Svensson',
          ssn: '199509291234',
          birthDate: '1995-09-29',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'sv@email.com',
          typeOfContract: TypeOfContract.SeApartmentRent,
          displayName: 'Home Insurance Renter',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Your things are insured at',
              limit: '1 000 000 SEK',
              description:
                'All your possessions are together insured up to 1 million SEK',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'The deductible is',
              limit: '1 500 SEK',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Travel insurance',
              limit: '45 days',
              description:
                'Travel insurance covers you during the first 45 days of your trip and is valid worldwide',
              type: InsurableLimitType.TravelDays,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Terms and pre-sale information',
              url:
                'https://promise.hedvig.com/villkor_hyresratt_boendeappen_f21dd48ebe.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'IPID',
              url: 'https://www.hedvig.com/se-en/terms',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Personal information',
              url: 'https://www.hedvig.com/se-en/privacy-policy',
              type: InsuranceTermType.PrivacyPolicy,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Storgatan 1',
            zipCode: '12345',
            householdSize: 1,
            livingSpace: 23,
            type: SwedishApartmentType.Rent,
            __typename: 'SwedishApartmentQuoteDetails',
          } as SwedishApartmentQuoteDetails,
          __typename: 'BundledQuote',
        } as BundledQuote,
        {
          id: 'e564c6ba-0d43-473c-9960-c8d38aaa17f6',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '79',
            currency: 'SEK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Sven',
          lastName: 'Svensson',
          ssn: '199509291234',
          birthDate: '1995-09-29',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'sv@email.com',
          typeOfContract: TypeOfContract.SeAccident,
          displayName: 'Accident Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Your insured amount is',
              limit: '1 000 000 SEK',
              description:
                'The amount applies as maximum compensation in the event of permanent injury and loss of fitness for work. In addition to the insurance amount, compensation depends on the degree of disability that the doctor assesses (in percent) for your injury. Example: If the permanent damage is determined to be 20%, we pay SEK 200,000 in compensation.',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Your deductible is',
              limit: '0 SEK',
              description: 'The insurance applies without deductible\n',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Terms and pre-sale information',
              url:
                'https://promise.hedvig.com/eng_terms_conditions_accident_0a5e1d2828.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'IPID',
              url:
                'https://promise.hedvig.com/Hedvig_OLYCKSFALL_SE_IPID_1_7e7640efa2.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Ärrtabell',
              url:
                'https://promise.hedvig.com/se_arrtabell_olycksfall_66dbff4975.pdf',
              type: InsuranceTermType.GeneralTerms,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            isStudent: false,
            __typename: 'SwedishAccidentDetails',
          } as SwedishAccidentDetails,
          __typename: 'BundledQuote',
        } as BundledQuote,
      ],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
  {
    id: '55b885cd-0876-4e67-b4c4-3ba379c1978c',
    tag: null,
    bundle: {
      displayName: 'Home Insurance Renter',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '59.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '59.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: '55b885cd-0876-4e67-b4c4-3ba379c1978c',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '59',
            currency: 'SEK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Sven',
          lastName: 'Svensson',
          ssn: '199509291234',
          birthDate: '1995-09-29',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'sv@email.com',
          typeOfContract: TypeOfContract.SeApartmentRent,
          displayName: 'Home Insurance Renter',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Your things are insured at',
              limit: '1 000 000 SEK',
              description:
                'All your possessions are together insured up to 1 million SEK',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'The deductible is',
              limit: '1 500 SEK',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Travel insurance',
              limit: '45 days',
              description:
                'Travel insurance covers you during the first 45 days of your trip and is valid worldwide',
              type: InsurableLimitType.TravelDays,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Terms and pre-sale information',
              url:
                'https://promise.hedvig.com/villkor_hyresratt_boendeappen_f21dd48ebe.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'IPID',
              url: 'https://www.hedvig.com/se-en/terms',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Personal information',
              url: 'https://www.hedvig.com/se-en/privacy-policy',
              type: InsuranceTermType.PrivacyPolicy,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Storgatan 1',
            zipCode: '12345',
            householdSize: 1,
            livingSpace: 23,
            type: SwedishApartmentType.Rent,
            __typename: 'SwedishApartmentQuoteDetails',
          } as SwedishApartmentQuoteDetails,
          __typename: 'BundledQuote',
        } as BundledQuote,
      ],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
]

export const possibleVariationsHomeAccidentSE: QuoteBundleVariant[] = [
  {
    id:
      '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46+ecaecdd3-5e23-4cea-8f4e-981df29e4f73',
    tag: 'Mest populär',
    bundle: {
      displayName: 'Hemförsäkring & Olycksfallsförsäkring',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '298.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '298.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '179',
            currency: 'SEK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'El',
          lastName: 'El Kettani',
          ssn: '198806251297',
          birthDate: '1988-06-25',
          startDate: null,
          expiresAt: '2021-11-18',
          email: 'mehdi.elkettani@hedvig.com',
          typeOfContract: TypeOfContract.SeApartmentBrf,
          displayName: 'Hemförsäkring Bostadsrätt',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Din lägenhet är försäkrad till',
              limit: 'Fullvärde',
              description:
                'Om din lägenhet blir skadad så betalar Hedvig för reparation eller återställande utan någon beloppsbegränsning',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Dina saker är försäkrade till totalt',
              limit: '1 000 000',
              description:
                'Alla dina ägodelar är sammanlagt försäkrade upp till 1 miljon kronor',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Självrisken är',
              limit: '1 500 kr',
              description:
                'Självrisk är den kostnad vid en skada du själv behöver stå för. För vissa skador gäller en högre självrisk, t.ex. översvämning och frysskador.',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Reseskydd',
              limit: '45 dagar',
              description:
                'Reseskyddet täcker dig under de 45 första dagarna av din resa och gäller över hela världen',
              type: InsurableLimitType.TravelDays,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Villkor och förköpsinformation',
              url:
                'https://promise.hedvig.com/se_villkor_brf_v_1_1_090edfe81d.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Personuppgifter',
              url: 'https://www.hedvig.com/se/personuppgifter',
              type: InsuranceTermType.PrivacyPolicy,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Produktfaktablad',
              url: 'https://www.hedvig.com/se/villkor',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'JAKOBSDALSVÄGEN 14',
            zipCode: '12654',
            householdSize: 2,
            livingSpace: 88,
            type: SwedishApartmentType.Brf,
            __typename: 'SwedishApartmentQuoteDetails',
          },
          __typename: 'BundledQuote',
        } as BundledQuote,
        {
          id: 'ecaecdd3-5e23-4cea-8f4e-981df29e4f73',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '119',
            currency: 'SEK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'El',
          lastName: 'El Kettani',
          ssn: '198806251297',
          birthDate: '1988-06-25',
          startDate: null,
          expiresAt: '2021-11-18',
          email: 'mehdi.elkettani@hedvig.com',
          typeOfContract: TypeOfContract.SeAccident,
          displayName: 'Olycksfallsförsäkring',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Ditt försäkringsbelopp är',
              limit: '1 000 000 kr',
              description:
                'Beloppet gäller som maximal ersättning vid bestående skada och förlorad arbetsförmåga. Förutom försäkringsbeloppet styrs ersättning av den invaliditetsgrad i procent som läkaren fastställer för din skada. Exempel: Om den bestående skadan fastställs till 20% betalar vi ut 200.000 kr i ersättning.',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Din självrisk är',
              limit: '0 kr',
              description: 'Försäkringen gäller utan självrisk',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Produktfaktablad',
              url:
                'https://promise.hedvig.com/info/se-hedvig-forsakring/Hedvig-OLYCKSFALL-SE-IPID.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Villkor och förköpsinformation',
              url:
                'https://promise.hedvig.com/se_villkor_olycksfall_v1_dfd68cfcaf.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            isStudent: false,
            __typename: 'SwedishAccidentDetails',
          },
          __typename: 'BundledQuote',
        } as BundledQuote,
      ],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
  {
    id: '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46',
    tag: null,
    bundle: {
      displayName: 'Hemförsäkring Bostadsrätt',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '179.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '179.00',
          currency: 'SEK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '179',
            currency: 'SEK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'El',
          lastName: 'El Kettani',
          ssn: '198806251297',
          birthDate: '1988-06-25',
          startDate: null,
          expiresAt: '2021-11-18',
          email: 'mehdi.elkettani@hedvig.com',
          typeOfContract: TypeOfContract.SeApartmentBrf,
          displayName: 'Hemförsäkring Bostadsrätt',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Din lägenhet är försäkrad till',
              limit: 'Fullvärde',
              description:
                'Om din lägenhet blir skadad så betalar Hedvig för reparation eller återställande utan någon beloppsbegränsning',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Dina saker är försäkrade till totalt',
              limit: '1 000 000',
              description:
                'Alla dina ägodelar är sammanlagt försäkrade upp till 1 miljon kronor',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Självrisken är',
              limit: '1 500 kr',
              description:
                'Självrisk är den kostnad vid en skada du själv behöver stå för. För vissa skador gäller en högre självrisk, t.ex. översvämning och frysskador.',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Reseskydd',
              limit: '45 dagar',
              description:
                'Reseskyddet täcker dig under de 45 första dagarna av din resa och gäller över hela världen',
              type: InsurableLimitType.TravelDays,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Villkor och förköpsinformation',
              url:
                'https://promise.hedvig.com/se_villkor_brf_v_1_1_090edfe81d.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Personuppgifter',
              url: 'https://www.hedvig.com/se/personuppgifter',
              type: InsuranceTermType.PrivacyPolicy,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'Produktfaktablad',
              url: 'https://www.hedvig.com/se/villkor',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'JAKOBSDALSVÄGEN 14',
            zipCode: '12654',
            householdSize: 2,
            livingSpace: 88,
            type: SwedishApartmentType.Brf,
            __typename: 'SwedishApartmentQuoteDetails',
          },
          __typename: 'BundledQuote',
        },
      ],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
]

export const possibleVariationsNoCombo: QuoteBundleVariant[] = [
  {
    id: 'ca85b0df-243b-4877-a5e3-06d188d20d37',
    tag: null,
    bundle: {
      displayName: 'Home Insurance',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'NOK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '89.00',
          currency: 'NOK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '89.00',
          currency: 'NOK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: 'ca85b0df-243b-4877-a5e3-06d188d20d37',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '89',
            currency: 'NOK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Ole',
          lastName: 'Olsen',
          ssn: null,
          birthDate: '1959-11-23',
          startDate: null,
          expiresAt: '2021-12-25',
          email: 'ole.olsen@hedvig.com',
          typeOfContract: TypeOfContract.NoHomeContentRent,
          displayName: 'Home Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Your things are insured at',
              limit: '1 000 000 NOK',
              description:
                'All your possessions are together insured up to 1 million NOK',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Deductible for all-risk claims',
              limit: '2 000 NOK',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage. For all-risk claims the deductible is 2 000 NOK',
              type: InsurableLimitType.DeductibleAllRisk,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Deductible for nature damage claims',
              limit: '8 000 NOK',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage. For natural damage claims the deductible is 8 000 NOK',
              type: InsurableLimitType.DeductibleNatureDamage,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Deductible for all other claims',
              limit: '4 000 NOK',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage. For general claims (all claims except all-risk or natural damage claims) the deductible is 4 000 NOK',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Insurance terms home insurance',
              url:
                'https://promise.hedvig.com/no_vilkar_innbo_v1_1_02e0459561.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'EU standard pre-sale information',
              url: 'https://www.hedvig.com/no-en/terms',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'General terms',
              url: 'https://www.hedvig.com/no-en/terms',
              type: InsuranceTermType.GeneralTerms,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            coInsured: 0,
            livingSpace: 44,
            street: 'Gulebøjsveien 1',
            type: NorwegianHomeContentsType.Rent,
            zipCode: '1234',
            isYouth: false,
            __typename: 'NorwegianHomeContentsDetails',
          } as NorwegianHomeContentsDetails,
          __typename: 'BundledQuote',
        } as BundledQuote,
      ],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
]

export const possibleVariationsDkHome: QuoteBundleVariant[] = [
  {
    id: '97d05f94-d981-408b-8cbd-774366a47522',
    tag: null,
    bundle: {
      displayName: 'Home Contents Insurance',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '159.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '159.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: '97d05f94-d981-408b-8cbd-774366a47522',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '159',
            currency: 'DKK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Helle',
          lastName: 'Hansen',
          ssn: null,
          birthDate: '1988-08-08',
          startDate: null,
          expiresAt: '2021-12-25',
          email: 'helle.hansen@hedvig.com',
          typeOfContract: TypeOfContract.DkHomeContentOwn,
          displayName: 'Home Contents Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Max insurable sum',
              limit: 'DKK 1,000,000',
              description:
                'All your possessions are together insured up to 1 million DKK.',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Deductible',
              limit: 'DKK 500',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage. For claims the deductible is 500 DKK.',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Bike, max',
              limit: 'DKK 10,000',
              description:
                'You will be compensated for the value of the bike and parts up to 10 000 DKK minus the deductible of 500 DKK.',
              type: InsurableLimitType.Bike,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Luggage, max',
              limit: 'DKK 30,000',
              description:
                'Luggage you bring with you on a trip are together insured up to 30 000 DKK.',
              type: InsurableLimitType.LostLuggage,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Insurance Terms Home Contents',
              url:
                'https://promise.hedvig.com/Terms_Home_Contents_V1_0_ed5623acc8.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'EU standard pre-sale information',
              url: 'https://cdn.hedvig.com/info/dk/Indbo_IPID.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Theodore Roosevelts Vej 1',
            floor: '2',
            apartment: 'tv',
            zipCode: '2100',
            livingSpace: 34,
            type: DanishHomeContentsType.Rent,
            coInsured: 0,
            isStudent: false,
            __typename: 'DanishHomeContentsDetails',
          } as DanishHomeContentsDetails,
          __typename: 'BundledQuote',
        } as BundledQuote,
      ],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
]

export const possibleVariationsDkHomeAccident: QuoteBundleVariant[] = [
  {
    id:
      '2486df36-4e44-11ec-81d3-0242ac130003+2cef79da-4e44-11ec-81d3-0242ac130003',
    tag: null,
    bundle: {
      displayName: 'CONTRACT_BUNDLE',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '238.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '238.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: '2486df36-4e44-11ec-81d3-0242ac130003',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '159',
            currency: 'DKK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Helle',
          lastName: 'Hansen',
          ssn: null,
          birthDate: '1988-08-08',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'john@email.com',
          typeOfContract: TypeOfContract.DkHomeContentOwn,
          displayName: 'Home Contents Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Max insurable sum',
              limit: 'DKK 1,000,000',
              description:
                'All your possessions are together insured up to 1 million DKK.',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Deductible',
              limit: 'DKK 500',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage. For claims the deductible is 500 DKK.',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Bike, max',
              limit: 'DKK 10,000',
              description:
                'You will be compensated for the value of the bike and parts up to 10 000 DKK minus the deductible of 500 DKK.',
              type: InsurableLimitType.Bike,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Luggage, max',
              limit: 'DKK 30,000',
              description:
                'Luggage you bring with you on a trip are together insured up to 30 000 DKK.',
              type: InsurableLimitType.LostLuggage,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Insurance Terms Home Contents',
              url:
                'https://promise.hedvig.com/Terms_Home_Contents_V1_0_ed5623acc8.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'EU standard pre-sale information',
              url: 'https://cdn.hedvig.com/info/dk/Indbo_IPID.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Theodore Roosevelts Vej 1',
            floor: '2',
            apartment: 'tv',
            zipCode: '2100',
            livingSpace: 34,
            danishHomeType: 'OWN',
            coInsured: 0,
            isStudent: false,
            __typename: 'DanishHomeContentsDetails',
          },
          __typename: 'BundledQuote',
        },
        {
          id: '2cef79da-4e44-11ec-81d3-0242ac130003',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '79',
            currency: 'DKK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Helle',
          lastName: 'Hansen',
          ssn: null,
          birthDate: '1988-08-08',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'john@email.com',
          typeOfContract: TypeOfContract.DkAccident,
          displayName: 'Accident Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Deductible',
              limit: 'DKK 0',
              description:
                'Deductible is the amount you normally have to pay yourself in the event of a damage. For accidnet claims the deductible is 0 DKK',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Permanent injury',
              limit: 'DKK 1,000,000',
              description:
                'The insurance provides coverage up to 1 000 000 DKK if you suffer a permanent injury as the result of an accident.',
              type: InsurableLimitType.PermanentInjury,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Treatment costs',
              limit: 'DKK 5,000',
              description:
                'The insurance provides coverage for treatments as the result of an accident up to 5 000 DKK.',
              type: InsurableLimitType.Treatment,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Dental injury',
              limit: 'Covered',
              description:
                'The insurance provides coverage to a reasonable and necessary costs if you suffer a dental injury as the result of an accident.',
              type: InsurableLimitType.DentalTreatment,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Insurance Terms Accident',
              url:
                'https://promise.hedvig.com/Terms_Accident_V1_0_727551a6af.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'EU standard pre-sale information',
              url: 'https://cdn.hedvig.com/info/dk/Ulykke_IPID.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Theodore Roosevelts Vej 1',
            zipCode: '2100',
            coInsured: 0,
            isStudent: false,
            __typename: 'DanishAccidentDetails',
          },
          __typename: 'BundledQuote',
        },
      ],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
]

export const possibleVariationsDkHomeAccidentTravel: QuoteBundleVariant[] = [
  {
    id:
      '516e3330-4e46-11ec-81d3-0242ac130003+556e128e-4e46-11ec-81d3-0242ac130003+5a6ea640-4e46-11ec-81d3-0242ac130003',
    tag: null,
    bundle: {
      displayName: 'CONTRACT_BUNDLE',
      bundleCost: {
        freeUntil: null,
        monthlyDiscount: {
          amount: '0.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyGross: {
          amount: '327.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        monthlyNet: {
          amount: '327.00',
          currency: 'DKK',
          __typename: 'MonetaryAmountV2',
        },
        __typename: 'InsuranceCost',
      },
      quotes: [
        {
          id: '516e3330-4e46-11ec-81d3-0242ac130003',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '159',
            currency: 'DKK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Helle',
          lastName: 'Hansen',
          ssn: null,
          birthDate: '1988-08-08',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'test@email.com',
          typeOfContract: TypeOfContract.DkHomeContentOwn,
          displayName: 'Home Contents Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Max insurable sum',
              limit: 'DKK 1,000,000',
              description:
                'All your possessions are together insured up to 1 million DKK.',
              type: InsurableLimitType.InsuredAmount,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Deductible',
              limit: 'DKK 500',
              description:
                'Deductible is the amount you have to pay yourself in the event of a damage. For claims the deductible is 500 DKK.',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Bike, max',
              limit: 'DKK 10,000',
              description:
                'You will be compensated for the value of the bike and parts up to 10 000 DKK minus the deductible of 500 DKK.',
              type: InsurableLimitType.Bike,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Luggage, max',
              limit: 'DKK 30,000',
              description:
                'Luggage you bring with you on a trip are together insured up to 30 000 DKK.',
              type: InsurableLimitType.LostLuggage,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Insurance Terms Home Contents',
              url:
                'https://promise.hedvig.com/Terms_Home_Contents_V1_0_ed5623acc8.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'EU standard pre-sale information',
              url: 'https://cdn.hedvig.com/info/dk/Indbo_IPID.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Theodore Roosevelts Vej 1',
            floor: '2',
            apartment: 'tv',
            zipCode: '2100',
            livingSpace: 34,
            danishHomeType: 'OWN',
            coInsured: 0,
            isStudent: false,
            __typename: 'DanishHomeContentsDetails',
          },
          __typename: 'BundledQuote',
        },
        {
          id: '556e128e-4e46-11ec-81d3-0242ac130003',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '79',
            currency: 'DKK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Helle',
          lastName: 'Hansen',
          ssn: null,
          birthDate: '1988-08-08',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'test@email.com',
          typeOfContract: TypeOfContract.DkAccident,
          displayName: 'Accident Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Deductible',
              limit: 'DKK 0',
              description:
                'Deductible is the amount you normally have to pay yourself in the event of a damage. For accidnet claims the deductible is 0 DKK',
              type: InsurableLimitType.Deductible,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Permanent injury',
              limit: 'DKK 1,000,000',
              description:
                'The insurance provides coverage up to 1 000 000 DKK if you suffer a permanent injury as the result of an accident.',
              type: InsurableLimitType.PermanentInjury,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Treatment costs',
              limit: 'DKK 5,000',
              description:
                'The insurance provides coverage for treatments as the result of an accident up to 5 000 DKK.',
              type: InsurableLimitType.PermanentInjury,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Dental injury',
              limit: 'Covered',
              description:
                'The insurance provides coverage to a reasonable and necessary costs if you suffer a dental injury as the result of an accident.',
              type: InsurableLimitType.DentalTreatment,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Insurance Terms Accident',
              url:
                'https://promise.hedvig.com/Terms_Accident_V1_0_727551a6af.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'EU standard pre-sale information',
              url: 'https://cdn.hedvig.com/info/dk/Ulykke_IPID.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Theodore Roosevelts Vej 1',
            zipCode: '2100',
            coInsured: 0,
            isStudent: false,
            __typename: 'DanishAccidentDetails',
          },
          __typename: 'BundledQuote',
        },
        {
          id: '5a6ea640-4e46-11ec-81d3-0242ac130003',
          dataCollectionId: null,
          currentInsurer: null,
          price: {
            amount: '89',
            currency: 'DKK',
            __typename: 'MonetaryAmountV2',
          },
          firstName: 'Helle',
          lastName: 'Hansen',
          ssn: null,
          birthDate: '1988-08-08',
          startDate: null,
          expiresAt: '2021-12-26',
          email: 'test@email.com',
          typeOfContract: TypeOfContract.DkTravel,
          displayName: 'Travel Insurance',
          contractPerils: perilsMock,
          insurableLimits: [
            {
              label: 'Illness, injury and transportation home',
              limit: 'No limit',
              description:
                'If you are travelling outside of Denmark and get hurt or become ill, we cover necessary and reasonable medical costs in order for you to get the needed treatment.',
              type: InsurableLimitType.TravelIllnessInjuryTransportationHome,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Delayed on trip',
              limit: '5.000 DKK/person',
              description:
                'Delays for more than 8 hours due to mechanical failure or unexpected weather conditions.',
              type: InsurableLimitType.TravelDelayedOnTrip,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Delayed luggage',
              limit: '5.000 DKK/person',
              description:
                'If your luggage gets delayed when you travel you are eligible for compensation for stuff you need to purchase. How much you get depends on how long your luggage is delayed.',
              type: InsurableLimitType.TravelDelayedLuggage,
              __typename: 'InsurableLimit',
            },
            {
              label: 'Cancellation',
              limit: '75.000 DKK/household',
              description:
                'Before leaving for a planned trip, unexpected events can happen. We will take care of the cancellation costs so you can take care of what’s important.',
              type: InsurableLimitType.TravelCancellation,
              __typename: 'InsurableLimit',
            },
          ],
          insuranceTerms: [
            {
              displayName: 'Insurance Terms Travel Insurance',
              url:
                'https://promise.hedvig.com/Terms_Travel_V1_0_a0a9c0e672.pdf',
              type: InsuranceTermType.TermsAndConditions,
              __typename: 'InsuranceTerm',
            },
            {
              displayName: 'EU standard pre-sale information',
              url: 'https://cdn.hedvig.com/info/dk/IPID_Rejse.pdf',
              type: InsuranceTermType.PreSaleInfoEuStandard,
              __typename: 'InsuranceTerm',
            },
          ],
          quoteDetails: {
            street: 'Theodore Roosevelts Vej 1',
            zipCode: '2100',
            coInsured: 0,
            isStudent: false,
            __typename: 'DanishTravelDetails',
          },
          __typename: 'BundledQuote',
        },
      ] as BundledQuote[],
      __typename: 'QuoteBundle',
    } as QuoteBundle,
    __typename: 'QuoteBundleVariant',
  },
]
