import {
  QuoteBundleVariant,
  TypeOfContract,
  InsurableLimitType,
  InsuranceTermType,
  ApartmentType,
  BundledQuote,
  QuoteBundle,
} from 'data/graphql'

import { perilsMock } from './offerDataMock'

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
            type: ApartmentType.Brf,
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
            type: ApartmentType.Brf,
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
