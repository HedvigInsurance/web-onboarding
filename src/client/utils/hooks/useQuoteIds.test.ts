import { useQuoteIds } from 'utils/hooks/useQuoteIds'
import { renderHook } from 'test/utils'
import { useStorage } from '../StorageContainer'

jest.mock('../StorageContainer')
const mockedUseStorage = useStorage as jest.Mock
let mockSession: {
  selectedQuoteIds: string[] | null | undefined
  quoteIds: string[] | null | undefined
} = {
  selectedQuoteIds: ['1', '2'],
  quoteIds: ['1', '2', '3'],
}
mockedUseStorage.mockImplementation(() => ({
  session: { getSession: () => mockSession, setSession: jest.fn() },
}))

// @TODO: this should be more like 'quoteIds=[<quoteIds>]#token=<token>' according to doc.
// Needs investigation
const mockUrlParametersQuery = 'quoteIds=[1,2,3]'
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    search: `?${mockUrlParametersQuery}`,
  }),
}))

it.only('should return correct quoteIds from storage', () => {
  const { result } = renderHook(() => useQuoteIds())

  expect(result.current).toEqual({
    isLoading: false,
    quoteIds: ['1', '2', '3'],
    selectedQuoteIds: ['1', '2'],
  })
})

it.only('should return quoteIds from urlParams if missing in storage', () => {
  mockSession = {
    quoteIds: null,
    selectedQuoteIds: ['1', '2'],
  }
  const { result } = renderHook(() => useQuoteIds())

  expect(result.current).toEqual({
    isLoading: false,
    quoteIds: ['1', '2', '3'],
    selectedQuoteIds: ['1', '2', '3'],
  })
})
