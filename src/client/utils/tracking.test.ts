import { getUtmParamsFromCookie } from './tracking'
let mockGetItem: jest.Mock
jest.mock('cookie-storage', () => ({
  CookieStorage() {
    mockGetItem = jest.fn()
    return { getItem: mockGetItem }
  },
}))
jest.mock('../apolloClient', () => ({}))

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
