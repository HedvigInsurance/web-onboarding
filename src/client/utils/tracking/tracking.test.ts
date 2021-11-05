import { TypeOfContract } from 'data/graphql'
import {
  DkBundleTypes,
  getTrackableContractCategory,
  getUtmParamsFromCookie,
  NoComboTypes,
  SeBundleTypes,
  TrackableContractCategory,
} from './tracking'
let mockGetItem: jest.Mock
jest.mock('cookie-storage', () => ({
  CookieStorage() {
    mockGetItem = jest.fn()
    return { getItem: mockGetItem }
  },
}))

describe('getUtmParamsFromCookie()', () => {
  it('Converts a regular set of utm parameters', () => {
    const cookie = '{"source": "foo"}'
    mockGetItem.mockReturnValue(cookie)

    const res = getUtmParamsFromCookie()

    expect(res).toMatchObject({ source: 'foo' })

    mockGetItem.mockClear()
  })

  it('Returns undefined if the UTM parameters are malformed', () => {
    const cookie = '{SOO_mAlfOrMeD'
    mockGetItem.mockReturnValue(cookie)

    const res = getUtmParamsFromCookie()

    expect(res).toBeUndefined()
    mockGetItem.mockClear()
  })
})

describe('getTrackableContractCategory', () => {
  it('returns correct contract category for swedish quotes', () => {
    expect(getTrackableContractCategory(TypeOfContract.SeApartmentRent)).toBe(
      TrackableContractCategory.Home,
    )
    expect(
      getTrackableContractCategory(TypeOfContract.SeApartmentStudentBrf),
    ).toBe(TrackableContractCategory.Home)
    expect(
      getTrackableContractCategory(SeBundleTypes.SeHomeAccidentBundleHouse),
    ).toBe(TrackableContractCategory.HomeAccident)
    expect(
      getTrackableContractCategory(SeBundleTypes.SeHomeAccidentBundleBrf),
    ).toBe(TrackableContractCategory.HomeAccident)
  })

  it('returns correct contract category for norwegian quotes', () => {
    expect(getTrackableContractCategory(TypeOfContract.NoHomeContentOwn)).toBe(
      TrackableContractCategory.Home,
    )

    expect(getTrackableContractCategory(TypeOfContract.NoTravel)).toBe(
      TrackableContractCategory.Travel,
    )

    expect(getTrackableContractCategory(NoComboTypes.NoCombo)).toBe(
      TrackableContractCategory.HomeTravel,
    )

    expect(getTrackableContractCategory(NoComboTypes.NoComboYouth)).toBe(
      TrackableContractCategory.HomeTravel,
    )
  })

  it('returns correct contract category for danish quotes', () => {
    expect(getTrackableContractCategory(TypeOfContract.DkHomeContentRent)).toBe(
      TrackableContractCategory.Home,
    )

    expect(
      getTrackableContractCategory(TypeOfContract.DkHomeContentStudentOwn),
    ).toBe(TrackableContractCategory.Home)

    expect(
      getTrackableContractCategory(DkBundleTypes.DkAccidentBundleStudent),
    ).toBe(TrackableContractCategory.HomeAccident)

    expect(getTrackableContractCategory(DkBundleTypes.DkAccidentBundle)).toBe(
      TrackableContractCategory.HomeAccident,
    )

    expect(getTrackableContractCategory(DkBundleTypes.DkTravelBundle)).toBe(
      TrackableContractCategory.HomeAccidentTravel,
    )

    expect(
      getTrackableContractCategory(DkBundleTypes.DkTravelBundleStudent),
    ).toBe(TrackableContractCategory.HomeAccidentTravel)
  })
})
