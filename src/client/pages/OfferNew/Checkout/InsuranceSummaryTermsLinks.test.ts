import {
  noCombo,
  seApartementBrf,
  insuranceTermsNoHomeContentsMock,
  insuranceTermsNoTravelMock,
} from 'utils/testData/offerDataMock'
import { InsuranceTerm, InsuranceTermType } from 'data/graphql'
import { getInsuranceTerms } from './InsuranceSummaryTermsLinks'

const getPrivacyPolicyTerms = (terms: Terms) => {
  return terms.filter(
    ({ termType }) => termType === InsuranceTermType.PrivacyPolicy,
  )
}

const getDuplicates = (terms: Terms) => {
  return terms.filter(({ data }) => {
    const { displayName, url } = data
    const occurences = terms.filter(
      ({ data }) => data.displayName === displayName && data.url === url,
    )

    return occurences.length > 1
  })
}

type Terms = {
  termType: InsuranceTermType
  data: InsuranceTerm
}[]

describe('getInsuranceTerms function', () => {
  const termsCombo = getInsuranceTerms({ offerData: noCombo })
  const termsSwedishApartment = getInsuranceTerms({
    offerData: seApartementBrf,
  })

  it('returns array of insurance terms objects excluding privacy policy', () => {
    const privacyPolicyComboTerms = getPrivacyPolicyTerms(termsCombo)
    const privacyPolicySwedishApartmentTerms = getPrivacyPolicyTerms(
      termsSwedishApartment,
    )

    expect(privacyPolicyComboTerms).toHaveLength(0)
    expect(privacyPolicySwedishApartmentTerms).toHaveLength(0)
  })

  it('returns array of insurance terms objects without duplicates', () => {
    const duplicatesInBundleTerms = getDuplicates(termsCombo)
    const duplicatesInSingleQuoteTerms = getDuplicates(termsSwedishApartment)

    expect(duplicatesInBundleTerms).toHaveLength(0)
    expect(duplicatesInSingleQuoteTerms).toHaveLength(0)
  })

  describe('with bundle quotes', () => {
    it('returns array where every insurance term from all quotes exist, excluding privacy policy', () => {
      const termsComboDisplayNames = termsCombo.map(({ data }) => {
        return data.displayName
      })
      const termsComboUrls = termsCombo.map(({ data }) => {
        return data.url
      })

      const termsNoTravelMock = [...insuranceTermsNoTravelMock].map(
        ([termType, data]) => {
          return { termType, data }
        },
      )
      const termsNoHomeContentsMock = [...insuranceTermsNoHomeContentsMock].map(
        ([termType, data]) => {
          return { termType, data }
        },
      )

      const homeContentsTermsMissingFromComboTerms = termsNoHomeContentsMock.filter(
        ({ data }) => {
          return (
            !termsComboDisplayNames.includes(data.displayName) ||
            !termsComboUrls.includes(data.url)
          )
        },
      )
      const travelTermsMissingFromComboTerms = termsNoTravelMock.filter(
        ({ data }) => {
          return (
            !termsComboDisplayNames.includes(data.displayName) ||
            !termsComboUrls.includes(data.url)
          )
        },
      )

      const hasPrivacyPolicyInHomeContentTerms = insuranceTermsNoHomeContentsMock.has(
        InsuranceTermType.PrivacyPolicy,
      )
      const hasPrivacyPolicyInTravelTerms = insuranceTermsNoTravelMock.has(
        InsuranceTermType.PrivacyPolicy,
      )
      const privacyPolicyInHomeContentTerms = homeContentsTermsMissingFromComboTerms.find(
        ({ termType }) => termType === InsuranceTermType.PrivacyPolicy,
      )
      const privacyPolicyInTravelTerms = travelTermsMissingFromComboTerms.find(
        ({ termType }) => termType === InsuranceTermType.PrivacyPolicy,
      )

      expect(homeContentsTermsMissingFromComboTerms).toHaveLength(
        hasPrivacyPolicyInHomeContentTerms ? 1 : 0,
      )
      expect(travelTermsMissingFromComboTerms).toHaveLength(
        hasPrivacyPolicyInTravelTerms ? 1 : 0,
      )
      expect(privacyPolicyInHomeContentTerms?.termType).toBe(
        hasPrivacyPolicyInHomeContentTerms
          ? InsuranceTermType.PrivacyPolicy
          : undefined,
      )
      expect(privacyPolicyInTravelTerms?.termType).toBe(
        hasPrivacyPolicyInTravelTerms
          ? InsuranceTermType.PrivacyPolicy
          : undefined,
      )
    })
  })

  describe('with single quote', () => {
    it('returns array that has the same length as the size of "insuranceTerms" property on quote', () => {
      const hasPrivacyPolicy = seApartementBrf.quotes[0].insuranceTerms.has(
        InsuranceTermType.PrivacyPolicy,
      )
      const sizeOfTermsInQuote = seApartementBrf.quotes[0].insuranceTerms.size

      expect(termsSwedishApartment).toHaveLength(
        hasPrivacyPolicy ? sizeOfTermsInQuote - 1 : sizeOfTermsInQuote,
      )
    })
  })
})
