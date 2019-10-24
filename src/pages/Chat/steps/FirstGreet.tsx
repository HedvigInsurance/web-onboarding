import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import { StorageContainer } from 'utils/StorageContainer'

const partners: Record<string, string> = {
  seb: 'CHAT_HEDVIG_FIRST_GREET_PARTNER_SEB',
  dreams: 'CHAT_HEDVIG_FIRST_GREET_PARTNER_DREAMS',
}
const getTextKey = (partner?: string): string =>
  partners[partner as any] || 'CHAT_HEDVIG_FIRST_GREET'

export const FirstGreet: React.SFC = () => (
  <StorageContainer>
    {({ session }) => {
      const partner =
        session && session.getSession() && session.getSession()!.partner
      return (
        <TranslationsConsumer textKey={getTextKey(partner)}>
          {(firstGreet) => firstGreet}
        </TranslationsConsumer>
      )
    }}
  </StorageContainer>
)
