import { quoteDetailsDataMockRentalSE } from 'utils/testData/quoteDetailsDataMock'
import { renderHook } from '../test/utils'
import { getQuoteDetails } from './getQuoteDetails'
import { useTextKeys } from './textKeys'

describe('getQuoteDetails function', () => {
  it('returns an array with expected data - Swedish Apartment', () => {
    const textKeys = renderHook(() => useTextKeys())

    //const result = getQuoteDetails(quoteDetailsDataMockRentalSE, textKeys)
  })
})
