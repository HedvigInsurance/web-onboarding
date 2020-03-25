import {
  CompleteQuote,
  SignState,
  useMemberQuery,
  useRedeemedCampaignsQuery,
} from 'data/graphql'
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
  firstQuote: CompleteQuote
  signState?: SignState | null
}
export const useTrack = ({ firstQuote, email, signState }: TrackProps) => {
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

    const legacyInsuranceType: InsuranceType =
      firstQuote.quoteDetails.__typename === 'SwedishApartmentQuoteDetails'
        ? (firstQuote.quoteDetails.type as any)
        : 'HOUSE' // TODO do we have norway quotes here?

    adtraction(
      parseFloat(firstQuote.insuranceCost.monthlyGross.amount),
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
      trackStudentkortet(memberId, firstQuote.insuranceCost.monthlyGross.amount)
    }
  }, [signState])
}
