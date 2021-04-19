import {
  noCombo,
  insuranceTermsNoHomeContentsMock,
  insuranceTermsNoTravelMock,
} from '../../../utils/testData/offerDataMock'
import { getInsuranceTerms } from './InsuranceSummaryTermsLinks'

describe('getInsuranceTerms function', () => {
  describe('bundle insurance terms', () => {
    const termsCombo = getInsuranceTerms({ offerData: noCombo })
    const termsComboDisplayNames = termsCombo.map(({ data }) => {
      return data.displayName
    })
    const termsComboUrls = termsCombo.map(({ data }) => {
      return data.url
    })

    it('returns an array with insurance terms objects where all insurance terms from every quotes exist', () => {
      const termsNoTravel = [...insuranceTermsNoTravelMock].map(
        ([termType, data]) => {
          return { termType, data }
        },
      )
      const termsNoHomeContents = [...insuranceTermsNoHomeContentsMock].map(
        ([termType, data]) => {
          return { termType, data }
        },
      )
      const homeContentsTermsMissingFromComboTerms = termsNoHomeContents.filter(
        ({ data }) => {
          return (
            !termsComboDisplayNames.includes(data.displayName) ||
            !termsComboUrls.includes(data.url)
          )
        },
      )
      const travelTermsMissingFromComboTerms = termsNoTravel.filter(
        ({ data }) => {
          return (
            !termsComboDisplayNames.includes(data.displayName) ||
            !termsComboUrls.includes(data.url)
          )
        },
      )
      expect(homeContentsTermsMissingFromComboTerms).toHaveLength(0)
      expect(travelTermsMissingFromComboTerms).toHaveLength(0)
    })
  })
})
