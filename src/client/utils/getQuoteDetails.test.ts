import { quoteDetailsDataMockHouseSE } from 'utils/testData/quoteDetailsDataMock'
import { typeOfResidenceTextKeys } from 'pages/OfferNew/utils'
import { getQuoteDetails } from './getQuoteDetails'

describe('getQuoteDetails function', () => {
  describe('with Swedish House quote', () => {
    const swedishHouseQuoteDetails = getQuoteDetails({
      quoteDetailsData: quoteDetailsDataMockHouseSE,
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
      expect(isSubleted.value.textKey).toBe('CHECKOUT_DETAILS_IS_NOT_SUBLETED')
    })
  })
})
