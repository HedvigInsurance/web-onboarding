import React from 'react'
import styled from '@emotion/styled'
import { InsuranceValues } from 'pages/OfferNew/Perils/InsuranceValues'
import { PerilCollection } from 'pages/OfferNew/Perils/PerilCollection'
import { PerilModal } from 'pages/OfferNew/Perils/PerilModal'
import { OfferQuote } from 'pages/OfferNew/types'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import AmountCollection from './AmountCollection'

const InsuranceTypeHeadline = styled.div`
  padding-bottom: 1rem;
  font-size: 1.375rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
`

const Spacer = styled.div`
  height: 2rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: 4rem;
  }
`

type Props = {
  offerQuote: OfferQuote
}

export const PerilRow: React.FC<Props> = ({ offerQuote }) => {
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)

  return (
    <>
      <InsuranceTypeHeadline>{offerQuote.displayName}</InsuranceTypeHeadline>
      <PerilCollection
        perils={offerQuote.perils}
        setCurrentPeril={setCurrentPeril}
        setIsShowingPeril={setIsShowingPeril}
      />

      <Spacer />

      <AmountCollection offer={offerQuote} />

      <Spacer />

      <InsuranceValues offerQuote={offerQuote} />

      {offerQuote.perils.length > 0 && (
        <PerilModal
          perils={offerQuote.perils}
          currentPerilIndex={currentPeril}
          setCurrentPeril={setCurrentPeril}
          isVisible={isShowingPeril}
          onClose={() => setIsShowingPeril(false)}
        />
      )}
    </>
  )
}
