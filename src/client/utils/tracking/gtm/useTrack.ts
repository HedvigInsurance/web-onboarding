import React from 'react'
import {
  SignState,
  useMemberQuery,
  useRedeemedCampaignsQuery,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { adtraction } from 'utils/tracking/adtraction/adtraction'
import { EventName } from './types'
import { trackOfferGTM } from './trackOfferGTM'

/**
 * @deprecated Will be removed
 */

export const useTrack = ({ offerData, signState }: TrackProps) => {
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const { data: memberData } = useMemberQuery()
  const memberId = memberData?.member.id

  React.useEffect(() => {
    const redeemedCampaigns = redeemedCampaignsData?.redeemedCampaigns ?? []

    if (process.env.NODE_ENV === 'test') {
      return
    }

    if (signState !== SignState.Completed) {
      return
    }

    if (!offerData) {
      return
    }

    if (memberId) {
      adtraction(
        parseFloat(offerData.cost.monthlyGross.amount),
        memberId,
        offerData.person.email || '',
        offerData,
        redeemedCampaigns !== null && redeemedCampaigns.length !== 0
          ? redeemedCampaigns[0].code
          : undefined,
      )
    }

    trackOfferGTM(
      EventName.SignedCustomer,
      { ...offerData, memberId: memberId || '' },
      redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction',
    )
  }, [redeemedCampaignsData, memberId, offerData, signState])
}
interface TrackProps {
  offerData?: OfferData | null
  signState?: SignState | null
}
