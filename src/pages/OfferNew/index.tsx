import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useOfferQuery } from 'generated/graphql'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Checkout } from './Checkout'
import { Compare } from './Compare/index'
import { Introduction } from './Introduction/index'
import { Perils } from './Perils/index'
import { isOffer } from './utils'

export const OfferNew: React.FC<RouteComponentProps<{ offerId: string }>> = ({
  match,
}) => {
  const { data, loading, error, refetch } = useOfferQuery({
    variables: { id: match.params.offerId },
  })
  const [checkoutIsOpen, setCheckoutIsOpen] = React.useState(false)

  return !loading && !error && data && isOffer(data) ? (
    <Page>
      <SessionTokenGuard>
        <TopBar />
        <Introduction
          offer={data}
          refetch={refetch}
          onCheckoutOpen={() => setCheckoutIsOpen(true)}
        />
        <Perils offer={data} />
        <Compare />
        <Checkout
          offer={data}
          isOpen={checkoutIsOpen}
          onClose={() => setCheckoutIsOpen(false)}
        />
      </SessionTokenGuard>
    </Page>
  ) : null
}
