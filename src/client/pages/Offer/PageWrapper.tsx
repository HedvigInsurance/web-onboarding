import React from 'react'
import { useHistory } from 'react-router'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { EventName } from 'utils/tracking/gtm/types'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CallCenterPhoneNumber } from 'components/CallCenterPhoneNumber/CallCenterPhoneNumber'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'
import { useTrackOfferEvent } from 'utils/tracking/hooks/useTrackOfferEvent'

type PageWrapperProps = {
  quoteCartId: string
  isReferralCodeUsed?: boolean
  children: React.ReactNode
}

export const PageWrapper = ({ quoteCartId, children }: PageWrapperProps) => {
  const history = useHistory()
  const { callCenter } = useCurrentLocale()
  const variation = useVariation()
  const [isCustomerServicePhoneNumberEnabled] = useFeature([
    Features.CUSTOMER_SERVICE_PHONE_NUMBER,
  ])
  const trackOfferEvent = useTrackOfferEvent()
  const handleClickPhoneNumber = (status: 'opened' | 'closed') => {
    trackOfferEvent({
      eventName: EventName.ClickCallNumber,
      options: {
        phoneNumberData: { path: history.location.pathname, status },
      },
    })
  }

  return (
    <Page>
      {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
        <TopBar isTransparent>
          {isCustomerServicePhoneNumberEnabled && callCenter ? (
            <CallCenterPhoneNumber
              color="white"
              onClick={handleClickPhoneNumber}
            />
          ) : (
            <LanguagePicker
              color="white"
              path={`/new-member/offer/${quoteCartId}`}
            />
          )}
        </TopBar>
      )}
      {children}
    </Page>
  )
}
