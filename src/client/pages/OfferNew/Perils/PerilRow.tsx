import React from 'react'
import styled from '@emotion/styled'
import { OfferQuote } from 'pages/OfferNew/types'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { PerilModal } from './PerilModal'
import { PerilCollection } from './PerilCollection'
import AmountCollection from './AmountCollection'
import DocumentCollection from './DocumentCollection'

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

      <DocumentCollection offer={offerQuote} />

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
