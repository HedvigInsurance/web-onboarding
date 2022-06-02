import { usePaymentStatusQuery } from 'data/graphql'

export const useIsPaymentConnected = (): boolean => {
  const { data } = usePaymentStatusQuery()

  return data?.payinMethodStatus === 'ACTIVE'
}
