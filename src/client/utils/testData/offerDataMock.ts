import {
  InsurableLimit,
  InsurableLimitType,
  InsuranceTerm,
  InsuranceTermType,
  NorwegianHomeContentsType,
  PerilV2,
  TypeOfContract,
  DanishHomeContentsType,
  ApartmentType,
  CurrentInsurer,
} from 'data/graphql'
import { OfferData } from '../../pages/OfferNew/types'

const insurableLimitMock = new Map([
  [
    InsurableLimitType.InsuredAmount,
    {
      description:
        'Alla dina ägodelar är sammanlagt försäkrade upp till 1 miljon kronor',
      label: 'Dina saker är försäkrade till totalt',
      limit: '1 000 000 kr',
      type: 'INSURED_AMOUNT',
      __typename: 'InsurableLimit',
    },
  ],
]) as ReadonlyMap<InsurableLimitType, InsurableLimit>

const insuranceTermsMock = new Map([
  [
    InsuranceTermType.TermsAndConditions,
    {
      displayName: 'Försäkringsvillkor',
      type: 'TERMS_AND_CONDITIONS',
      url: 'https://www.hedvig.com/villkor/villkor/bostadsratt.pdf',
      __typename: 'InsuranceTerm',
    },
  ],
]) as ReadonlyMap<InsuranceTermType, InsuranceTerm>

const perilsMock: PerilV2[] = [
  {
    title: 'Forsinkelser',
    description:
      'Hvis det blir forsinkelser når du er ute og reiser erstatter vi ekstrautgiftene dette medfører, for eksempel hvis bagasjen ikke dukker opp eller flyet er forsinket og du må overnatte en ekstra natt på et hotell.',
    covered: [
      'Bagasje (minst 4 timer): utgifter for toalettsaker mens bagasjen er borte, inntil 5000 kroner per person og 8000 kroner for familie',
      'Avreise grunnet værforhold, teknisk feil eller trafikkuhell: utgifter for nødvendig overnatting inntil 1500 kroner per person og 3000 kroner for familie, når reisen har begynt og transportmiddel allerede er betalt',
      'Ankomst grunnet værforhold, teknisk feil eller trafikuhell: ekstra utgifter (opptil 20 000 kroner per person og 50 000 kroner for familie) for å endre billetter eller kjøpe nye. ',
    ],
    exceptions: [
      'Bagasje på hjemreisen',
      'Flyforsinkelse, kansellering eller overbooking som omfattes av EU-direktiv 261/2004 og som flyselskapene selv har erstatningsansvaret',
      'Økonomisk tap eller skade som direkte/indirekte skyldes streik, arbeidskonflikt, lockout eller konkurs',
    ],
    info: '',
    icon: {
      variants: {
        light: {
          svgUrl: '/app-content-service/delayed_luggage.svg',
          pdfUrl: '',
          vectorDrawableUrl: '',
          __typename: 'IconVariant',
        },
        dark: {
          svgUrl: '/app-content-service/delayed_luggage.svg',
          pdfUrl: '',
          vectorDrawableUrl: '',
          __typename: 'IconVariant',
        },
        __typename: 'IconVariants',
      },
      svgUrl: '/app-content-service/delayed_luggage.svg',
      pdfUrl: '',
      vectorDrawableUrl: '',
      __typename: 'Icon',
    },
    iconName: '',
    shortDescription: '',
    __typename: 'PerilV2',
  },
]

export const currentInsurerMock: CurrentInsurer = {
  __typename: 'CurrentInsurer',
  displayName: 'Folksam',
  switchable: true,
}

export const seApartementBrf: OfferData = {
  person: {
    firstName: 'Bengt',
    lastName: 'Bengtsson',
    email: 'mail@test.com',
    ssn: '199509291234',
    birthDate: '1995-09-29',
    householdSize: 2,
    address: {
      street: 'Testgatan 23',
      zipCode: '12345',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      startDate: null,
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '12345',
        householdSize: 2,
        livingSpace: 42,
        type: ApartmentType.Rent,
        __typename: 'SwedishApartmentQuoteDetails',
      },
      dataCollectionId: null,
      currentInsurer: currentInsurerMock,
      contractType: TypeOfContract.SeApartmentBrf,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
  ],
  cost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '49.00',
      currency: 'SEK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '198.00',
      currency: 'SEK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '149.00',
      currency: 'SEK',
      __typename: 'MonetaryAmountV2',
    },
    __typename: 'InsuranceCost',
  },
}

export const noComboYouth: OfferData = {
  person: {
    firstName: 'Judith',
    lastName: 'Moen',
    email: 'mail@test.com',
    ssn: '15120133427',
    birthDate: '2001-12-15',
    householdSize: 1,
    address: {
      street: 'Exampleveien 23',
      zipCode: '1234',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      startDate: null,
      quoteDetails: {
        coInsured: 0,
        isYouth: true,
        __typename: 'NorwegianTravelDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.NoTravelYouth,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
    {
      id: '86f0a15d-6aed-4051-9ec2-fee1daccfb29',
      startDate: null,
      quoteDetails: {
        coInsured: 0,
        livingSpace: 34,
        street: 'Testveien 23',
        type: NorwegianHomeContentsType.Rent,
        zipCode: '1234',
        isYouth: true,
        __typename: 'NorwegianHomeContentsDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.NoHomeContentYouthRent,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
  ],
  cost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '49.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '198.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '149.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    __typename: 'InsuranceCost',
  },
}

export const noCombo: OfferData = {
  person: {
    firstName: 'Judith',
    lastName: 'Moen',
    email: 'mail@test.com',
    ssn: '15126533427',
    birthDate: '2965-12-15',
    householdSize: 2,
    address: {
      street: 'Exampleveien 23',
      zipCode: '1234',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      startDate: null,
      quoteDetails: {
        coInsured: 2,
        isYouth: false,
        __typename: 'NorwegianTravelDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.NoTravel,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
    {
      id: '86f0a15d-6aed-4051-9ec2-fee1daccfb29',
      startDate: null,
      quoteDetails: {
        coInsured: 0,
        livingSpace: 34,
        street: 'Testveien 23',
        type: NorwegianHomeContentsType.Rent,
        zipCode: '1234',
        isYouth: false,
        __typename: 'NorwegianHomeContentsDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.NoHomeContentRent,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
  ],
  cost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '49.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '198.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '149.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    __typename: 'InsuranceCost',
  },
}

export const dkHomeContentOwn: OfferData = {
  person: {
    firstName: 'Judith',
    lastName: 'Madsson',
    email: 'mail@test.com',
    ssn: '15126533427',
    birthDate: '2965-12-15',
    householdSize: 2,
    address: {
      street: 'Testgatan 23',
      zipCode: '1214',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      startDate: null,
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '1214',
        coInsured: 2,
        livingSpace: 24,
        type: DanishHomeContentsType.Own,
        isStudent: false,
        __typename: 'DanishHomeContentsDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.DkHomeContentOwn,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
  ],
  cost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '49.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '198.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '149.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    __typename: 'InsuranceCost',
  },
}

export const dkHomeContentAccident: OfferData = {
  person: {
    firstName: 'Judith',
    lastName: 'Madsson',
    email: 'mail@test.com',
    ssn: '15126533427',
    birthDate: '2965-12-15',
    householdSize: 2,
    address: {
      street: 'Testgatan 23',
      zipCode: '1214',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      startDate: null,
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '1214',
        coInsured: 2,
        livingSpace: 24,
        type: DanishHomeContentsType.Own,
        isStudent: false,
        __typename: 'DanishHomeContentsDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.DkHomeContentOwn,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
    {
      id: '86f0a15d-6aed-4051-9ec2-fee1daccfb29',
      startDate: null,
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '1214',
        coInsured: 2,
        isStudent: false,
        __typename: 'DanishAccidentDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.DkAccident,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
  ],
  cost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '49.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '198.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '149.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    __typename: 'InsuranceCost',
  },
}

export const dkHomeContentAccidentTravel: OfferData = {
  person: {
    firstName: 'Judith',
    lastName: 'Madsson',
    email: 'mail@test.com',
    ssn: '15126533427',
    birthDate: '2965-12-15',
    householdSize: 2,
    address: {
      street: 'Testgatan 23',
      zipCode: '1214',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      startDate: null,
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '1214',
        coInsured: 2,
        livingSpace: 24,
        type: DanishHomeContentsType.Own,
        isStudent: false,
        __typename: 'DanishHomeContentsDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.DkHomeContentOwn,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
    {
      id: '86f0a15d-6aed-4051-9ec2-fee1daccfb29',
      startDate: null,
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '1214',
        coInsured: 2,
        isStudent: false,
        __typename: 'DanishAccidentDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.DkAccident,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
    {
      id: '86f0a15d-6aed-4051-9ec2-fee1daccfb29',
      startDate: null,
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '1214',
        coInsured: 2,
        isStudent: false,
        __typename: 'DanishTravelDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.DkTravel,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
  ],
  cost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '49.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '198.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '149.00',
      currency: 'DKK',
      __typename: 'MonetaryAmountV2',
    },
    __typename: 'InsuranceCost',
  },
}
