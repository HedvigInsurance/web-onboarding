import {
  InsurableLimit,
  InsurableLimitType,
  InsuranceTermType,
  NorwegianHomeContentsType,
  PerilV2,
  TypeOfContract,
  DanishHomeContentsType,
  ApartmentType,
  CurrentInsurer,
} from 'data/graphql'
import { InsuranceTerms, OfferData } from '../../pages/OfferNew/types'

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
  [
    InsuranceTermType.PreSaleInfoEuStandard,
    {
      displayName: 'Produktfaktablad',
      type: 'PRE_SALE_INFO_EU_STANDARD',
      url: 'https://www.hedvig.com/se/villkor',
      __typename: 'InsuranceTerm',
    },
  ],
  [
    InsuranceTermType.PrivacyPolicy,
    {
      displayName: 'Personuppgifter',
      type: 'PRIVACY_POLICY',
      url: 'https://www.hedvig.com/se/personuppgifter',
      __typename: 'InsuranceTerm',
    },
  ],
]) as InsuranceTerms

export const insuranceTermsNoHomeContentsMock = new Map([
  [
    InsuranceTermType.TermsAndConditions,
    {
      displayName: 'Forsikringsvilkår innboforsikring',
      type: 'TERMS_AND_CONDITIONS',
      url: 'https://www.hedvig.com/no/villkar/villkar/innbo.pdf',
      __typename: 'InsuranceTerm',
    },
  ],
  [
    InsuranceTermType.GeneralTerms,
    {
      displayName: 'Generelle vilkår',
      type: 'GENERAL_TERMS',
      url: 'https://www.hedvig.com/no/terms',
      __typename: 'InsuranceTerm',
    },
  ],
  [
    InsuranceTermType.PreSaleInfoEuStandard,
    {
      displayName: 'Informasjon før kjøpet iht. EU-standard',
      type: 'PRE_SALE_INFO_EU_STANDARD',
      url: 'https://www.hedvig.com/no/terms',
      __typename: 'InsuranceTerm',
    },
  ],
]) as InsuranceTerms

export const insuranceTermsNoTravelMock = new Map([
  [
    InsuranceTermType.TermsAndConditions,
    {
      displayName: 'Forsikringsvilkår reiseforsikring',
      type: 'TERMS_AND_CONDITIONS',
      url: 'https://www.hedvig.com/no/villkar/villkar/reise.pdf',
      __typename: 'InsuranceTerm',
    },
  ],
  [
    InsuranceTermType.GeneralTerms,
    {
      displayName: 'Generelle vilkår',
      type: 'GENERAL_TERMS',
      url: 'https://www.hedvig.com/no/terms',
      __typename: 'InsuranceTerm',
    },
  ],
  [
    InsuranceTermType.PreSaleInfoEuStandard,
    {
      displayName: 'Informasjon før kjøpet iht. EU-standard',
      type: 'PRE_SALE_INFO_EU_STANDARD',
      url: 'https://www.hedvig.com/no/terms',
      __typename: 'InsuranceTerm',
    },
  ],
]) as InsuranceTerms

export const perilsMock: PerilV2[] = [
  {
    title: 'Fire',
    shortDescription: '',
    description:
      'We will cover fire damage, e.g. an over-heated mobile charger or a failed attempt to fry fries. In case of an apartment fire, we can reimburse you for fire and smoke damages.',
    covered: [
      'Fire due to open flames (not just glow)',
      'Explosion',
      'Lightning',
      'Corrosive gas created by unintentional burning of plastics',
      'Cleaning of soot caused by open fire',
      'Sudden damage caused by soot',
    ],
    exceptions: ['Explosive work', 'Soot from lit candles'],
    info: 'Be careful with candles and fires.',
    icon: {
      svgUrl: 'https://promise.hedvig.com/media/fire_97796e0790.svg',
      pdfUrl: 'https://promise.hedvig.com/media/fire_2b4db0c75f.pdf',
      vectorDrawableUrl: '',
      variants: {
        light: {
          svgUrl: 'https://promise.hedvig.com/media/fire_97796e0790.svg',
          pdfUrl: 'https://promise.hedvig.com/media/fire_2b4db0c75f.pdf',
          vectorDrawableUrl: '',
        },
        dark: {
          svgUrl: 'https://promise.hedvig.com/media/fire_dark_942da46f6f.svg',
          pdfUrl: 'https://promise.hedvig.com/media/fire_dark_b25d17c420.pdf',
          vectorDrawableUrl: '',
        },
      },
    },
  },
  {
    title: 'Behandlingskostnader',
    shortDescription: '',
    description:
      'We cover different types of water damages, for example if a washing machine leaks uncontrollably or if a bathroom is flooded. We can reimburse you for damages to the apartment and for other costs incurred during the reparations.',
    covered: [
      'Unexpected escape of liquid/steam from the pipework system, connected appliances or kitchen, laundry room and bathroom.',
      'Leaking fridge/freezer',
      'Leaking fire extinguisher',
      'Leaking sink',
      'Leaking aquarium',
    ],
    exceptions: [
      'Surface and water barrier installed by uncertified plumber',
      'Damage to the leaking unit itself',
      'Damage caused by roof gutters or external downspouts',
    ],
    info:
      'Make sure that faucets are sealed and turned off when not in use. Place drip trays that collect water below the fridge/freezer/washing machine. Make sure that the piping system and devices connected to it do not freeze. If you leave your apartment for more than seven days, shut the main water valve.',
    icon: {
      svgUrl: 'https://promise.hedvig.com/media/water_damage_e25b83cd0b.svg',
      pdfUrl: 'https://promise.hedvig.com/media/water_damage_40c8d05caa.pdf',
      vectorDrawableUrl: '',
      variants: {
        light: {
          svgUrl:
            'https://promise.hedvig.com/media/water_damage_e25b83cd0b.svg',
          pdfUrl:
            'https://promise.hedvig.com/media/water_damage_40c8d05caa.pdf',
          vectorDrawableUrl: '',
        },
        dark: {
          svgUrl:
            'https://promise.hedvig.com/media/water_damage_dark_227105c1de.svg',
          pdfUrl:
            'https://promise.hedvig.com/media/water_damage_dark_747fb516a1.pdf',
          vectorDrawableUrl: '',
        },
      },
    },
  },
  {
    title: 'Stöld och skadegörelse',
    shortDescription: '',
    description:
      'Vid stöld och skadegörelse av dina saker så täcks dem och ersätts av oss. Oavsett om du är hemma eller på resande fot kan du alltid känna dig trygg med oss.',
    covered: [
      'Stöld och skadegörelse i ditt hem',
      'Stöld ur gemensamhetsutrymme, t.ex. cykel- eller barnvagnsförråd',
      'Stöld och skadegörelse av saker du tar med dig till ditt arbete eller hotellrum',
      'Stöld och skadegörelse vid förvaring hos t.ex. Shurgard',
      'Stöld utanför bostaden',
      'Stöld ur bil när du är på resa',
    ],
    exceptions: [
      'För vissa typer av saker, t.ex. pengar, hemelektronik, mobiltelefoner, datorer, kameror, sprit och smycken gäller speciella regler beroende på var stölden inträffat.',
    ],
    info:
      'Ha alltid uppsikt över dina saker. Lämna inte värdesaker på t.ex. ett bord på ett café. Lås alltid bilen om du förvarar saker där och stöldbegärlig egendom (smycke, dator) ska alltid döljas. Och lås alltid din cykel.',
    icon: {
      svgUrl: 'https://promise.hedvig.com/media/theft_701fa78317.svg',
      pdfUrl: 'https://promise.hedvig.com/media/theft_a3509c7f24.pdf',
      vectorDrawableUrl: '',
      variants: {
        light: {
          svgUrl: 'https://promise.hedvig.com/media/theft_701fa78317.svg',
          pdfUrl: 'https://promise.hedvig.com/media/theft_a3509c7f24.pdf',
          vectorDrawableUrl: '',
        },
        dark: {
          svgUrl: 'https://promise.hedvig.com/media/theft_dark_71deb24845.svg',
          pdfUrl: 'https://promise.hedvig.com/media/theft_dark_8b98af07d7.pdf',
          vectorDrawableUrl: '',
        },
      },
    },
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
      displayName: 'Hemförsäkring Bostadsrätt',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'SEK',
      },
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '12345',
        householdSize: 2,
        livingSpace: 42,
        type: ApartmentType.Brf,
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

export const seApartmentBrfAccident: OfferData = {
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
      displayName: 'Hemförsäkring Bostadsrätt',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'SEK',
      },
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '12345',
        householdSize: 2,
        livingSpace: 42,

        type: ApartmentType.Brf,
        __typename: 'SwedishApartmentQuoteDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.SeApartmentBrf,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsMock,
    },
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf888',
      displayName: 'Olycksfall',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'SEK',
      },
      quoteDetails: {
        street: 'Testgatan 23',
        zipCode: '12345',
        householdSize: 2,
        livingSpace: 42,
        isStudent: false,
        __typename: 'SwedishAccidentDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.SeAccident,
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
      displayName: 'Reiseforsikring Ungdom',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'NOK',
      },
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
      insuranceTerms: insuranceTermsNoTravelMock,
    },
    {
      id: '86f0a15d-6aed-4051-9ec2-fee1daccfb29',
      displayName: 'Innboforsikring Ungdom',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'NOK',
      },
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
      insuranceTerms: insuranceTermsNoHomeContentsMock,
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
    birthDate: '1965-12-15',
    householdSize: 2,
    address: {
      street: 'Exampleveien 23',
      zipCode: '1234',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      displayName: 'Reiseforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'NOK',
      },
      quoteDetails: {
        coInsured: 0,
        isYouth: false,
        __typename: 'NorwegianTravelDetails',
      },
      dataCollectionId: null,
      currentInsurer: null,
      contractType: TypeOfContract.NoTravel,
      perils: perilsMock,
      insurableLimits: insurableLimitMock,
      insuranceTerms: insuranceTermsNoTravelMock,
    },
    {
      id: '86f0a15d-6aed-4051-9ec2-fee1daccfb29',
      displayName: 'Innboforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'NOK',
      },
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
      insuranceTerms: insuranceTermsNoHomeContentsMock,
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

export const noTravel: OfferData = {
  person: {
    firstName: 'Judith',
    lastName: 'Moen',
    email: 'mail@test.com',
    ssn: '15126533427',
    birthDate: '1965-12-15',
    householdSize: 2,
    address: {
      street: 'Exampleveien 23',
      zipCode: '1234',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      displayName: 'Reiseforsikring',
      startDate: '2021-04-16',
      price: {
        amount: '109.00',
        currency: 'NOK',
      },
      quoteDetails: {
        coInsured: 1,
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
  ],
  cost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '0.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '109.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '109.00',
      currency: 'NOK',
      __typename: 'MonetaryAmountV2',
    },
  },
}

export const dkHomeContentOwn: OfferData = {
  person: {
    firstName: 'Judith',
    lastName: 'Madsson',
    email: 'mail@test.com',
    ssn: '15126533427',
    birthDate: '1965-12-15',
    householdSize: 2,
    address: {
      street: 'Testgatan 23',
      zipCode: '1214',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      displayName: 'Indboforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'DKK',
      },
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
    birthDate: '1965-12-15',
    householdSize: 2,
    address: {
      street: 'Testgatan 23',
      zipCode: '1214',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      displayName: 'Indboforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'DDK',
      },
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
      displayName: 'Ulykkesforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'DDK',
      },
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
    birthDate: '1965-12-15',
    householdSize: 2,
    address: {
      street: 'Testgatan 23',
      zipCode: '1214',
    },
  },
  quotes: [
    {
      id: '187b050d-2096-4c0e-9afb-f3f20bcaf887',
      displayName: 'Indboforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'DDK',
      },
      quoteDetails: {
        street: 'Theodore Roosevelts Vej 1',
        zipCode: '2450',
        city: 'København SV',
        floor: '2',
        apartment: 'tv',
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
      displayName: 'Ulykkesforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'DDK',
      },
      quoteDetails: {
        street: 'Theodore Roosevelts Vej 1',
        zipCode: '2450',
        city: 'København SV',
        floor: '2',
        apartment: 'tv',
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
      displayName: 'Rejseforsikring',
      startDate: null,
      price: {
        amount: '149.00',
        currency: 'DDK',
      },
      quoteDetails: {
        street: 'Theodore Roosevelts Vej 1',
        zipCode: '2450',
        city: 'København SV',
        floor: '2',
        apartment: 'tv',
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
