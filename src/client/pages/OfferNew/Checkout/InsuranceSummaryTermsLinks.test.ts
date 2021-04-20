import {
  noCombo,
  seApartementBrf,
  insuranceTermsNoHomeContentsMock,
  insuranceTermsNoTravelMock,
} from 'utils/testData/offerDataMock'
import { InsuranceTerm, InsuranceTermType } from 'data/graphql'
import { InsuranceTerms } from '../types'
import { getInsuranceTerms } from './InsuranceSummaryTermsLinks'

type Term = {
  termType: InsuranceTermType
  data: InsuranceTerm
}

type Terms = Term[]

const getMockedInsuranceTermsArray = (insuranceTerms: InsuranceTerms) => {
  return [...insuranceTerms].map(([termType, data]) => ({
    termType,
    data,
  }))
}

type GetTermsMissingParams = {
  mockedTerms: Terms
  newTermsArray: Terms
}

const getTermsMissingFromOrignialInsuranceTerms = ({
  mockedTerms,
  newTermsArray,
}: GetTermsMissingParams) => {
  const displayNames = newTermsArray.map(({ data }) => data.displayName)
  const urls = newTermsArray.map(({ data }) => data.url)

  return mockedTerms.filter(({ data }) => {
    return !displayNames.includes(data.displayName) || !urls.includes(data.url)
  })
}

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
      expect(termsCombo)

      const termsNoTravelMock = getMockedInsuranceTermsArray(
        insuranceTermsNoTravelMock,
      )
      const termsNoHomeContentsMock = getMockedInsuranceTermsArray(
        insuranceTermsNoHomeContentsMock,
      )

      const homeContentsTermsMissingInComboTerms = getTermsMissingFromOrignialInsuranceTerms(
        {
          mockedTerms: termsNoHomeContentsMock,
          newTermsArray: termsCombo,
        },
      )
      const travelTermsMissingInComboTerms = getTermsMissingFromOrignialInsuranceTerms(
        {
          mockedTerms: termsNoTravelMock,
          newTermsArray: termsCombo,
        },
      )

      const hasPrivacyPolicyInHomeContentTerms = insuranceTermsNoHomeContentsMock.has(
        InsuranceTermType.PrivacyPolicy,
      )
      const hasPrivacyPolicyInTravelTerms = insuranceTermsNoTravelMock.has(
        InsuranceTermType.PrivacyPolicy,
      )
      const privacyPolicyInHomeContentTerms = homeContentsTermsMissingInComboTerms.find(
        ({ termType }) => termType === InsuranceTermType.PrivacyPolicy,
      )
      const privacyPolicyInTravelTerms = travelTermsMissingInComboTerms.find(
        ({ termType }) => termType === InsuranceTermType.PrivacyPolicy,
      )

      expect(homeContentsTermsMissingInComboTerms).toHaveLength(
        hasPrivacyPolicyInHomeContentTerms ? 1 : 0,
      )
      expect(travelTermsMissingInComboTerms).toHaveLength(
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
    const insuranceTermsSeApartmentMock =
      seApartementBrf.quotes[0].insuranceTerms

    it('returns array that has the same length as the size of "insuranceTerms" property on quote', () => {
      const hasPrivacyPolicy = seApartementBrf.quotes[0].insuranceTerms.has(
        InsuranceTermType.PrivacyPolicy,
      )
      const sizeOfTermsInQuote = insuranceTermsSeApartmentMock.size

      expect(termsSwedishApartment).toHaveLength(
        hasPrivacyPolicy ? sizeOfTermsInQuote - 1 : sizeOfTermsInQuote,
      )
    })

    it('returns array where all insurance terms exist, excluding privacy policy', () => {
      const termsSeApartmentMock = getMockedInsuranceTermsArray(
        insuranceTermsSeApartmentMock,
      )
      const termsMissingInNewArray = getTermsMissingFromOrignialInsuranceTerms({
        mockedTerms: termsSeApartmentMock,
        newTermsArray: termsSwedishApartment,
      })

      const hasPrivacyPolicy = insuranceTermsSeApartmentMock.has(
        InsuranceTermType.PrivacyPolicy,
      )
      const privacyPolicyInTerms = termsMissingInNewArray.find(
        ({ termType }) => termType === InsuranceTermType.PrivacyPolicy,
      )

      expect(termsMissingInNewArray).toHaveLength(hasPrivacyPolicy ? 1 : 0)
      expect(privacyPolicyInTerms?.termType).toBe(
        hasPrivacyPolicy ? InsuranceTermType.PrivacyPolicy : undefined,
      )
    })
  })
})
