import {
  ApartmentType,
  DanishHomeContentsType,
  EditDanishHomeContentsInput,
  EditNorwegianHomeContentsInput,
  EditNorwegianTravelInput,
  EditQuoteInput,
  EditSwedishApartmentInput,
  NorwegianHomeContentsType,
} from 'data/graphql'
import {
  noTravel as mockedNoTravelOfferData,
  seApartementBrf as mockedSeApartmentOfferData,
  dkHomeContentAccident as mockedDkHomeAccidentOfferData,
  noCombo as mockedNoComboOfferData,
  noComboYouth as mockedNoComboYouthOfferData,
} from 'utils/testData/offerDataMock'
import { getQuoteDetailsFormData, getEditQuoteInput } from './utils'

const mockedNoHomeQuoteDetails = mockedNoComboOfferData.quotes.find(
  ({ quoteDetails }) => {
    return quoteDetails.__typename === 'NorwegianHomeContentsDetails'
  },
)?.quoteDetails

const mockedNoTravelQuoteDetails = mockedNoTravelOfferData.quotes.find(
  ({ quoteDetails }) => {
    return quoteDetails.__typename === 'NorwegianTravelDetails'
  },
)?.quoteDetails

const mockedNoHomeYouthQuote = mockedNoComboYouthOfferData.quotes.find(
  ({ quoteDetails }) => {
    return quoteDetails.__typename === 'NorwegianHomeContentsDetails'
  },
)

const mockedNoTravelYouthQuote = mockedNoComboYouthOfferData.quotes.find(
  ({ quoteDetails }) => {
    return quoteDetails.__typename === 'NorwegianTravelDetails'
  },
)

const norwegianComboForm: EditQuoteInput = {
  id: '111',
  firstName: 'Karl Ove',
  lastName: 'Knausgård',
  birthDate: '1968-12-06',
  norwegianHomeContents: {
    street: 'Gate 1',
    zipCode: '1111',
    coInsured: 2,
    livingSpace: 111,
    isYouth: false,
    type: NorwegianHomeContentsType.Own,
  },
}

const mockedSeApartmentQuote = mockedSeApartmentOfferData.quotes[0]

const swedishApartmentForm: EditQuoteInput = {
  id: '222',
  firstName: 'Anna',
  lastName: 'Odell',
  swedishApartment: {
    street: 'Gatan 1',
    zipCode: '11111',
    householdSize: 2,
    livingSpace: 100,
    type: ApartmentType.Brf,
  },
}

const mockedDkHomeQuote = mockedDkHomeAccidentOfferData.quotes.find(
  ({ quoteDetails }) => {
    return quoteDetails.__typename === 'DanishHomeContentsDetails'
  },
)

const mockedDkAccidentQuote = mockedDkHomeAccidentOfferData.quotes.find(
  ({ quoteDetails }) => {
    return quoteDetails.__typename === 'DanishAccidentDetails'
  },
)

const danishHomeAccidentForm: EditQuoteInput = {
  id: '333',
  firstName: 'Mads',
  lastName: 'Mikkelsen',
  birthDate: '1965-11-22',
  danishHomeContents: {
    street: 'Gade. 1',
    zipCode: '1111',
    coInsured: 1,
    livingSpace: 100,
    isStudent: false,
    type: DanishHomeContentsType.Rent,
  },
}

describe('getQuoteDetailsFormData function', () => {
  const norwegianTravelForm: EditQuoteInput = {
    id: '111',
    firstName: 'Karl Ove',
    lastName: 'Knausgård',
    birthDate: '1968-12-06',
    norwegianTravel: {
      coInsured: 1,
      isYouth: false,
    },
  }

  it('returns the correct quote details properties for Norwegian travel quote form', () => {
    const norwegianTravelDetailsFormData = getQuoteDetailsFormData({
      form: norwegianTravelForm,
      offerData: mockedNoTravelOfferData,
      quoteDetails: mockedNoTravelQuoteDetails!,
    })
    const hasCoInsured = 'coInsured' in norwegianTravelDetailsFormData!
    const hasIsYouth = 'isYouth' in norwegianTravelDetailsFormData!

    expect(norwegianTravelDetailsFormData).toBeTruthy()
    expect(Object.keys(norwegianTravelDetailsFormData!).length).toBe(2)
    expect(hasCoInsured).toBe(true)
    expect(hasIsYouth).toBe(true)
    expect(
      (norwegianTravelDetailsFormData as EditNorwegianTravelInput)?.coInsured,
    ).toBe(1)
  })

  it('returns the correct quote details properties for Norwegian combo quote form', () => {
    const norwegianComboDetailsFormData = getQuoteDetailsFormData({
      form: norwegianComboForm,
      offerData: mockedNoComboOfferData,
      quoteDetails: mockedNoHomeQuoteDetails!,
    })
    const hasStreet = 'street' in norwegianComboDetailsFormData!
    const hasCoInsured = 'coInsured' in norwegianComboDetailsFormData!

    expect(norwegianComboDetailsFormData).toBeTruthy()
    expect(Object.keys(norwegianComboDetailsFormData!).length).toBe(6)
    expect(hasStreet).toBe(true)
    expect(hasCoInsured).toBe(true)
    expect(
      (norwegianComboDetailsFormData as EditNorwegianHomeContentsInput)
        ?.livingSpace,
    ).toBe(111)
  })

  it('returns the correct updated quote details properties for Swedish apartment quote form', () => {
    const swedishApartmentDetailsFormData = getQuoteDetailsFormData({
      form: swedishApartmentForm,
      offerData: mockedSeApartmentOfferData,
      quoteDetails: mockedSeApartmentQuote.quoteDetails,
    })
    const hasStreet = 'street' in swedishApartmentDetailsFormData!
    const hasHouseholdSize = 'householdSize' in swedishApartmentDetailsFormData!

    expect(swedishApartmentDetailsFormData).toBeTruthy()
    expect(Object.keys(swedishApartmentDetailsFormData!).length).toBe(5)
    expect(hasStreet).toBe(true)
    expect(hasHouseholdSize).toBe(true)
    expect(
      (swedishApartmentDetailsFormData as EditSwedishApartmentInput)?.type,
    ).toBe(ApartmentType.Brf)
  })

  it('returns the correct updated quote details properties for Danish home & accident bundle quote form', () => {
    const danishHomeAccidentDetailsFormData = getQuoteDetailsFormData({
      form: danishHomeAccidentForm,
      offerData: mockedDkHomeAccidentOfferData,
      quoteDetails: mockedDkHomeQuote!.quoteDetails,
    })
    const hasStreet = 'street' in danishHomeAccidentDetailsFormData!
    const hasCoInsured = 'coInsured' in danishHomeAccidentDetailsFormData!

    expect(danishHomeAccidentDetailsFormData).toBeTruthy()
    expect(Object.keys(danishHomeAccidentDetailsFormData!).length).toBe(6)
    expect(hasStreet).toBe(true)
    expect(hasCoInsured).toBe(true)
    expect(
      (danishHomeAccidentDetailsFormData as EditDanishHomeContentsInput)?.type,
    ).toBe(DanishHomeContentsType.Rent)
  })
})

describe('getEditQuoteInput function', () => {
  it('returns input with the correct updates to pass to editQuoteMutation with a Norwegian combo bundle', () => {
    const editHomeQuoteInput = getEditQuoteInput({
      quote: mockedNoHomeYouthQuote!,
      form: norwegianComboForm,
      offerData: mockedNoComboYouthOfferData,
    })
    const editTravelQuoteInput = getEditQuoteInput({
      form: norwegianComboForm,
      quote: mockedNoTravelYouthQuote!,
      offerData: mockedNoComboYouthOfferData,
    })

    const hasCorrectHomeContentsType =
      'norwegianHomeContents' in editHomeQuoteInput
    const hasCorrectTravelType = 'norwegianTravel' in editTravelQuoteInput

    expect(hasCorrectHomeContentsType).toBe(true)
    expect(hasCorrectTravelType).toBe(true)
    expect(editTravelQuoteInput.norwegianTravel?.isYouth).toBe(false)
    expect(editTravelQuoteInput.norwegianTravel?.coInsured).toBe(
      editHomeQuoteInput.norwegianHomeContents?.coInsured,
    )
  })

  it('returns input with the correct updates to pass to editQuoteMutation with a Swedish apartment quote', () => {
    const editSwedishApartmentQuoteInput = getEditQuoteInput({
      quote: mockedSeApartmentQuote!,
      form: swedishApartmentForm,
      offerData: mockedSeApartmentOfferData,
    })

    const hasCorrectType = 'swedishApartment' in editSwedishApartmentQuoteInput

    expect(hasCorrectType).toBe(true)
    expect(editSwedishApartmentQuoteInput.firstName).toBe('Anna')
  })

  it('returns input with the correct updates to pass to editQuoteMutation with a Danish home & accident bundle', () => {
    const editHomeInput = getEditQuoteInput({
      quote: mockedDkHomeQuote!,
      form: danishHomeAccidentForm,
      offerData: mockedDkHomeAccidentOfferData,
    })
    const editAccidentInput = getEditQuoteInput({
      quote: mockedDkAccidentQuote!,
      form: danishHomeAccidentForm,
      offerData: mockedDkHomeAccidentOfferData,
    })

    const hasCorrectHomeContentsType = 'danishHomeContents' in editHomeInput
    const hasCorrectAccidentType = 'danishAccident' in editAccidentInput

    expect(hasCorrectHomeContentsType).toBe(true)
    expect(hasCorrectAccidentType).toBe(true)
    expect(editAccidentInput.danishAccident?.street).toBe(
      editHomeInput.danishHomeContents?.street,
    )
    expect(editHomeInput.danishHomeContents?.type).toBe(
      DanishHomeContentsType.Rent,
    )
  })
})
