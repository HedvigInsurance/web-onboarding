import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import { Compare } from './Compare/index'
import { Introduction } from './Introduction/index'
import { Perils } from './Perils/index'

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
              <Perils />
              <Compare />
            </>
          )
        }}
      </OfferContainer>
    </SessionTokenGuard>
  </Page>
)
