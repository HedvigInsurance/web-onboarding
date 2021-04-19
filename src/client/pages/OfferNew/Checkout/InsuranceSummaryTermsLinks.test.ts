import {
  noCombo,
  insuranceTermsNoHomeContentsMock,
  insuranceTermsNoTravelMock,
} from '../../../utils/testData/offerDataMock'
import { getInsuranceTerms } from './InsuranceSummaryTermsLinks'

describe('getInsuranceTerms function', () => {
  describe('with bundle quotes', () => {
    const termsCombo = getInsuranceTerms({ offerData: noCombo })
    const termsComboDisplayNames = termsCombo.map(({ data }) => {
      return data.displayName
    })
    const termsComboUrls = termsCombo.map(({ data }) => {
      return data.url
    })

    it('returns an array of insurance terms objects where all insurance terms from every quotes exist', () => {
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

    it('returns an array of insurance terms objects without duplicates', () => {
      const duplicates = termsCombo.filter(({ data }) => {
        const { displayName, url } = data

        const occurences = termsCombo.filter(({ data }) => {
          return data.displayName === displayName && data.url === url
        })

        return occurences.length > 1
      })

      expect(duplicates).toHaveLength(0)
    })
  })
})
