import { Page } from 'components/utils/Page'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import { Compare } from './Compare/index'
import { Introduction } from './Introduction/index'
import { Perils } from './Perils/index'
import { mockedOffer } from './mock'

export const OfferNew: React.SFC = () => (
  <Page>
    <SessionTokenGuard>
      <OfferContainer>
        {(offer, { refetch }) => {
          if (!offer || !offer.insurance.type) {
            return null
          }

          return (
            <>
              <TopBar />
              <Introduction offer={offer} refetch={refetch} />
              <Perils offer={offer} />
              <Compare />
            </>
          )
        }}
      </OfferContainer>
    </SessionTokenGuard>
  </Page>
)
