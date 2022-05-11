import React from 'react'
import styled from '@emotion/styled'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { BundledQuote } from 'data/graphql'
import { PerilModal } from './PerilModal'
import { PerilCollection } from './PerilCollection'
import { AmountCollection } from './AmountCollection'
import { DocumentCollection } from './DocumentCollection'

const Spacer = styled.div`
  height: 2rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: 4rem;
  }
`

type Props = {
  quote: BundledQuote
}

export const PerilRow = ({ quote }: Props) => {
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)

  return (
    <>
      <PerilCollection
        perils={quote.contractPerils}
        setCurrentPeril={setCurrentPeril}
        setIsShowingPeril={setIsShowingPeril}
      />

      <Spacer />

      <AmountCollection quote={quote} />

      <Spacer />

      <DocumentCollection quote={quote} />

      {quote.contractPerils.length > 0 && (
        <PerilModal
          perils={quote.contractPerils}
          currentPerilIndex={currentPeril}
          setCurrentPeril={setCurrentPeril}
          isVisible={isShowingPeril}
          onClose={() => setIsShowingPeril(false)}
        />
      )}
    </>
  )
}
