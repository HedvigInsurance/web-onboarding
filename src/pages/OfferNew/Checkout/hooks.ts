import {
  SignState,
  useMemberQuery,
  useRedeemedCampaignsQuery,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import * as React from 'react'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import { adtraction, trackStudentkortet } from 'utils/tracking'

export enum VisibilityState {
  CLOSED = 'CLOSED',
  CLOSING = 'CLOSING',
  OPENING = 'OPENING',
  OPEN = 'OPEN',
}

export const useScrollLock = (
  visibilityState: VisibilityState,
  outerWrapperRef: React.RefObject<HTMLDivElement | undefined>,
) =>
  React.useEffect(() => {
    const listener = (e: WheelEvent | TouchEvent) => {
      if (visibilityState !== VisibilityState.OPEN) {
        return
      }

      const { current } = outerWrapperRef
      if (!current) {
        return
      }

      const tryingToScrollUpButCant =
        e instanceof WheelEvent && current.scrollTop === 0 && e.deltaY < 0
      const tryingToScrollDownButCant =
        e instanceof WheelEvent &&
        current.offsetHeight + current.scrollTop >= current.scrollHeight &&
        e.deltaY > 0
      if (
        !current!.contains(e.target as Node) ||
        tryingToScrollUpButCant ||
        tryingToScrollDownButCant
      ) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', listener, { passive: false })
    window.addEventListener('touchmove', listener, { passive: false })

    return () => {
      window.removeEventListener('wheel', listener)
      window.removeEventListener('touchmove', listener)
    }
  }, [visibilityState])

interface TrackProps {
  email: string
  offerData: OfferData
  signState?: SignState | null
}
export const useTrack = ({ offerData, email, signState }: TrackProps) => {
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const redeemedCampaigns = redeemedCampaignsData?.redeemedCampaigns ?? []
  const { data: memberData } = useMemberQuery()
  const memberId = memberData?.member.id!

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return
    }

    if (signState !== SignState.Completed) {
      return
    }

    // TODO: Map to ContractType after talking to Carl about productIds
    const legacyInsuranceType: InsuranceType =
      offerData.quotes[0].quoteDetails.__typename ===
      'SwedishApartmentQuoteDetails'
        ? (offerData.quotes[0].quoteDetails.type as any)
        : 'HOUSE' // TODO do we have norway quotes here?

    adtraction(
      parseFloat(offerData.cost.monthlyGross.amount),
      memberId,
      email,
      redeemedCampaigns !== null && redeemedCampaigns.length !== 0
        ? redeemedCampaigns[0].code
        : null,
      legacyInsuranceType,
    )

    if (
      redeemedCampaigns?.length > 0 &&
      redeemedCampaigns[0].code.toLowerCase() === 'studentkortet'
    ) {
      trackStudentkortet(memberId, offerData.cost.monthlyGross.amount)
    }
  }, [signState])
}
