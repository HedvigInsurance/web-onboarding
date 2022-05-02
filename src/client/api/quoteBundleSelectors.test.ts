import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { QuoteBundle } from 'data/graphql'
import * as quoteSelector from './quoteBundleSelectors'

const quoteBundleMock = {
  quotes: [
    {
      data: {
        type: 'NORWEGIAN_HOME_CONTENT',
      },
    },
    {
      data: {
        type: 'NORWEGIAN_ACCIDENT',
      },
    },
  ],
} as QuoteBundle

describe('quoteBundleSelectors', () => {
  it('should return true when bundle includes exactly all contract types', () => {
    expect(
      quoteSelector.includesExactlyAllContracts(quoteBundleMock, [
        InsuranceType.NORWEGIAN_HOME_CONTENT,
        InsuranceType.NORWEGIAN_ACCIDENT,
      ]),
    ).toBe(true)
  })

  it('should return false when bundle does not include exactly all contract types', () => {
    expect(
      quoteSelector.includesExactlyAllContracts(quoteBundleMock, [
        InsuranceType.NORWEGIAN_HOME_CONTENT,
        InsuranceType.NORWEGIAN_TRAVEL,
      ]),
    ).toBe(false)

    expect(
      quoteSelector.includesExactlyAllContracts(quoteBundleMock, [
        InsuranceType.NORWEGIAN_HOME_CONTENT,
      ]),
    ).toBe(false)

    expect(
      quoteSelector.includesExactlyAllContracts(quoteBundleMock, [
        InsuranceType.NORWEGIAN_HOME_CONTENT,
        InsuranceType.NORWEGIAN_HOME_CONTENT,
      ]),
    ).toBe(false)
  })
})
