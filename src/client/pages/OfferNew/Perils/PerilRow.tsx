import React from 'react'
import styled from '@emotion/styled'
import { InsuranceValues } from 'pages/OfferNew/Perils/InsuranceValues'
import { PerilCollection } from 'pages/OfferNew/Perils/PerilCollection'
import { PerilModal } from 'pages/OfferNew/Perils/PerilModal'
import { OfferQuote } from 'pages/OfferNew/types'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const InsuranceTypeHeadline = styled.div`
  padding: 1rem 0;
  font-size: 1.375rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
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
