import {
  noCombo as mockedOfferDataNoCombo,
  seApartementBrf as mockedOfferDataSeApartment,
  dkHomeContentAccidentTravel as mockedOfferDataDkHomeAccidentTravel,
} from 'utils/testData/offerDataMock'
import { getAddress } from './InsuranceSummaryDetails'

describe('getAddress function', () => {
  describe('with Swedish quote', () => {
    it('returns only street name and street number when quote is Swedish', () => {
      const swedishApartmentQuoteDetails =
        mockedOfferDataSeApartment.quotes[0].quoteDetails

      const address = getAddress(swedishApartmentQuoteDetails)
      expect(address).toBe('Testgatan 23')
    })
  })

  describe('with Norwegian quotes', () => {
    it('returns only street name and street number when quote is Norwegian Home Contents quote', () => {
      const norwegianHomeContentsQuote = mockedOfferDataNoCombo.quotes[1]

      const norwegianHomeContentsQuoteDetails =
        norwegianHomeContentsQuote.quoteDetails

      const address = getAddress(norwegianHomeContentsQuoteDetails)
      expect(address).toBe('Testveien 23')
    })

    it('returns null when quote is Norwegian Travel quote', () => {
      const norwegianTravelQuote = mockedOfferDataNoCombo.quotes[0]

      const norwegianTravelQuoteDetails = norwegianTravelQuote.quoteDetails

      const address = getAddress(norwegianTravelQuoteDetails)
      expect(address).toBe(null)
    })
  })

  describe('with Danish quotes', () => {
    const danishHomeContentsQuote =
      mockedOfferDataDkHomeAccidentTravel.quotes[0]

    it('returns floor and apartment in addition to street name and street number when those properties exist', () => {
      const danishHomeContentsQuoteDetails =
        danishHomeContentsQuote.quoteDetails

      const address = getAddress(danishHomeContentsQuoteDetails)
      expect(address).toBe('Theodore Roosevelts Vej 1, 2. tv')
    })

    it('returns only street name and street number when no other properties exist', () => {
      const danishHomeContentsQuoteDetailsWithoutFloorAndApartment = {
        ...danishHomeContentsQuote.quoteDetails,
        floor: null,
        apartment: null,
      }

      const address = getAddress(
        danishHomeContentsQuoteDetailsWithoutFloorAndApartment,
      )
      expect(address).toBe('Theodore Roosevelts Vej 1')
    })

    it('returns street name, street number and floor when apartment property does not exist', () => {
      const danishHomeContentsQuoteDetailsWithoutApartment = {
        ...danishHomeContentsQuote.quoteDetails,
        apartment: null,
      }

      const address = getAddress(danishHomeContentsQuoteDetailsWithoutApartment)
      expect(address).toBe('Theodore Roosevelts Vej 1, 2.')
    })
  })
})
