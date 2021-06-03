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
} from 'utils/testData/offerDataMock'
import { getQuoteDetailsFormData } from './utils'

describe('getQuoteDetailsFormData function', () => {
  const mockedNoTravelQuoteDetails =
    mockedNoTravelOfferData.quotes[0].quoteDetails

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
      quoteDetails: mockedNoTravelQuoteDetails,
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

  const mockedNoHomeQuoteDetails = mockedNoComboOfferData.quotes.find(
    ({ quoteDetails }) => {
      return quoteDetails.__typename === 'NorwegianHomeContentsDetails'
    },
  )?.quoteDetails

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

  const mockedSeApartmentQuoteDetails =
    mockedSeApartmentOfferData.quotes[0].quoteDetails

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

  it('returns the correct updated quote details properties for Swedish apartment quote form', () => {
    const swedishApartmentDetailsFormData = getQuoteDetailsFormData({
      form: swedishApartmentForm,
      offerData: mockedSeApartmentOfferData,
      quoteDetails: mockedSeApartmentQuoteDetails,
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

  const mockedDkHomeAccidentQuoteDetails =
    mockedDkHomeAccidentOfferData.quotes[0].quoteDetails

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
      type: DanishHomeContentsType.Own,
    },
  }

  it('returns the correct updated quote details properties for Danish home & accident bundle quote form', () => {
    const danishHomeAccidentDetailsFormData = getQuoteDetailsFormData({
      form: danishHomeAccidentForm,
      offerData: mockedDkHomeAccidentOfferData,
      quoteDetails: mockedDkHomeAccidentQuoteDetails,
    })
    const hasStreet = 'street' in danishHomeAccidentDetailsFormData!
    const hasCoInsured = 'coInsured' in danishHomeAccidentDetailsFormData!

    expect(danishHomeAccidentDetailsFormData).toBeTruthy()
    expect(Object.keys(danishHomeAccidentDetailsFormData!).length).toBe(6)
    expect(hasStreet).toBe(true)
    expect(hasCoInsured).toBe(true)
    expect(
      (danishHomeAccidentDetailsFormData as EditDanishHomeContentsInput)?.type,
    ).toBe(DanishHomeContentsType.Own)
  })
})
