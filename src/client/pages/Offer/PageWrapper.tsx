import React from 'react'
import { useHistory } from 'react-router'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { EventName } from 'utils/tracking/gtm'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CallCenterPhoneNumber } from 'components/CallCenterPhoneNumber/CallCenterPhoneNumber'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'
import { trackOfferEvent } from 'utils/tracking/trackOfferEvent'
import { QuoteBundle } from 'data/graphql'

type PageWrapperProps = {
  quoteCartId: string
  bundle?: QuoteBundle
  isReferralCodeUsed?: boolean
  children: React.ReactNode
}

export const PageWrapper = ({
  quoteCartId,
  bundle,
  isReferralCodeUsed = false,
  children,
}: PageWrapperProps) => {
  const history = useHistory()
  const { phoneNumber } = useCurrentLocale()
  const variation = useVariation()
  const [isCustomerServicePhoneNumberEnabled] = useFeature([
    Features.CUSTOMER_SERVICE_PHONE_NUMBER,
  ])

  const handleClickPhoneNumber = (status: 'opened' | 'closed') => {
    if (bundle) {
      trackOfferEvent(EventName.ClickCallNumber, bundle, isReferralCodeUsed, {
        quoteCartId,
        phoneNumberData: { path: history.location.pathname, status },
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
