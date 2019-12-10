import { useEmbark } from '@hedviginsurance/embark'
import { Page } from 'components/utils/Page'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import { Compare } from './Compare/index'
import { Introduction } from './Introduction/index'
import { Perils } from './Perils/index'
import { mockedOffer } from './mock'
import { useOfferQuery } from 'generated/graphql'
import { EmbarkProvider } from '@hedviginsurance/embark'
import { StorageContainer } from 'utils/StorageContainer'

export const OfferNew: React.FC = () => {
  const { data, loading, error, refetch } = useOfferQuery()
  console.log(data)

  return (
    <StorageContainer>
      {({ session }) => (
        <Page>
          <SessionTokenGuard>
            <TopBar />
            <Introduction offer={mockedOffer} refetch={refetch} />
            {/*<Perils offer={offer} />*/}
            <Compare />
          </SessionTokenGuard>
        </Page>
      )}
    </StorageContainer>
  )
}
