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
import { QuoteBundle } from 'data/graphql'
import { useTrackOfferEvent } from 'utils/tracking/hooks/useTrackOfferEvent'

type PageWrapperProps = {
  quoteCartId: string
  bundle?: QuoteBundle
  isReferralCodeUsed?: boolean
  children: React.ReactNode
}

export const PageWrapper = ({
  quoteCartId,
  bundle,
  children,
}: PageWrapperProps) => {
  const history = useHistory()
  const { phoneNumber } = useCurrentLocale()
  const variation = useVariation()
  const [isCustomerServicePhoneNumberEnabled] = useFeature([
    Features.CUSTOMER_SERVICE_PHONE_NUMBER,
  ])
  const trackOfferEvent = useTrackOfferEvent()
  const handleClickPhoneNumber = (status: 'opened' | 'closed') => {
    if (bundle) {
      trackOfferEvent({
        eventName: EventName.ClickCallNumber,
        options: {
          phoneNumberData: { path: history.location.pathname, status },
        },
      })
    }
  }

  return (
    <Page>
      {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
        <TopBar isTransparent>
          {isCustomerServicePhoneNumberEnabled && phoneNumber ? (
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
