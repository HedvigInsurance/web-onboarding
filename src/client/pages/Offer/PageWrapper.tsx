import React from 'react'
import { useHistory } from 'react-router'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { trackOfferGTM, EventName } from 'utils/tracking/gtm'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CallCenterPhoneNumber } from 'components/CallCenterPhoneNumber/CallCenterPhoneNumber'
import { OfferData } from 'pages/OfferNew/types'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'

type PageWrapperProps = {
  quoteCartId: string
  offerData?: OfferData
  isReferralCodeUsed?: boolean
  children: React.ReactNode
}

export const PageWrapper = ({
  quoteCartId,
  offerData,
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
    if (offerData) {
      trackOfferGTM(EventName.ClickCallNumber, offerData, isReferralCodeUsed, {
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
