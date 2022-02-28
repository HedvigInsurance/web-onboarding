import {
  quoteDetailsDataMockHouseSe,
  quoteDetailsDataMockRentalSe,
  quoteDetailsDataMockHomeContentStudentOwnDk,
} from 'utils/testData/quoteDetailsDataMock'
import { typeOfResidenceTextKeys } from 'pages/OfferNew/utils'
import { getQuoteDetails, getAddressValue } from './getQuoteDetails'

describe('getQuoteDetails function', () => {
  describe('with Swedish House quote', () => {
    const swedishHouseQuoteDetails = getQuoteDetails({
      quoteDetailsData: quoteDetailsDataMockHouseSe,
    })
    it('returns the correct amount of data', () => {
      expect(swedishHouseQuoteDetails.length).toBe(3)
      expect(swedishHouseQuoteDetails[0].length).toBe(8)
      expect(swedishHouseQuoteDetails[1].length).toBe(3)
      expect(swedishHouseQuoteDetails[2].length).toBe(1)
    })
    it('returns textKey strings instead of raw values for typeOfResidence and isSubleted', () => {
      const typeOfResidenceData = swedishHouseQuoteDetails[0][3]
      const isSubleted = swedishHouseQuoteDetails[0][7]

      expect(typeOfResidenceData.value.value).toBe(undefined)
      expect(typeOfResidenceData.value.textKey).toBe(
        typeOfResidenceTextKeys.SE_HOUSE,
      )
      expect(isSubleted.value.value).toBe(undefined)
      expect(isSubleted.value.textKey).toBe('NO')
    })
  })
})

describe('getAddressValue function', () => {
  describe('with Swedish quote', () => {
    it('returns street name and street number', () => {
      const address = getAddressValue(quoteDetailsDataMockRentalSe[0])
      expect(address).toBe('Hyresvägen 1')
    })
  })

  describe('with Danish quote', () => {
    it('returns floor and apartment in addition to street name and street number when those properties exist', () => {
      const address = getAddressValue(
        quoteDetailsDataMockHomeContentStudentOwnDk[0],
      )
      expect(address).toBe('Theodore Roosevelts Vej 3, 2. tv')
    })

    it('returns only street name and street number when no other properties exist', () => {
      const danishHomeContentsQuoteDetailsWithoutFloorAndApartment = {
        ...quoteDetailsDataMockHomeContentStudentOwnDk[0],
        floor: null,
        apartment: null,
      }

      const address = getAddressValue(
        danishHomeContentsQuoteDetailsWithoutFloorAndApartment,
      )
      expect(address).toBe('Theodore Roosevelts Vej 3')
    })

    it('returns street name, street number and floor when apartment property does not exist', () => {
      const danishHomeContentsQuoteDetailsWithoutApartment = {
        ...quoteDetailsDataMockHomeContentStudentOwnDk[0],
        apartment: null,
      }

      const address = getAddressValue(
        danishHomeContentsQuoteDetailsWithoutApartment,
      )
      expect(address).toBe('Theodore Roosevelts Vej 3, 2.')
    })
  })
})
