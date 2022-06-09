import React from 'react'
import { useHistory } from 'react-router'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'
import { CallCenterPhoneNumber } from 'components/CallCenterPhoneNumber/CallCenterPhoneNumber'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { pushToGTMDataLayer } from 'utils/tracking/gtm/dataLayer'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { ConnectPaymentPage } from './sections/ConnectPayment'

export const ConnectPayment = () => {
  const currentLocale = useCurrentLocale()
  const [isCustomerServicePhoneNumberEnabled] = useFeature([
    Features.CUSTOMER_SERVICE_PHONE_NUMBER,
  ])

  const history = useHistory()

  const handleClickPhoneNumber = (status: 'opened' | 'closed') => {
    pushToGTMDataLayer({
      event: 'click_call_number',
      phoneNumberData: {
        path: history.location.pathname,
        status,
      },
    })
  }

  return (
    <Page>
      <SessionTokenGuard>
        <TopBar>
          {isCustomerServicePhoneNumberEnabled && currentLocale.callCenter ? (
            <CallCenterPhoneNumber
              color="white"
              onClick={handleClickPhoneNumber}
              variant="supportNumber"
            />
          ) : (
            <LanguagePicker color="white" />
          )}
        </TopBar>
        <ConnectPaymentPage />
      </SessionTokenGuard>
    </Page>
  )
}
