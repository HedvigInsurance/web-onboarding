import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useOfferQuery } from 'generated/graphql'
import { History } from 'history'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import { RouteComponentProps, useHistory, useRouteMatch } from 'react-router'
import { Checkout } from './Checkout'
import { Compare } from './Compare'
import { Introduction } from './Introduction'
import { Perils } from './Perils/index'
import { isOffer } from './utils'

const createToggleCheckout = (history: History<any>, offerId?: string) => (
  isOpen: boolean,
) => {
  if (isOpen) {
    history.push(`/beta/new-member/offer/${offerId ?? ''}/checkout`) // TODO
  } else {
    history.goBack()
  }
}

export const OfferNew: React.FC<RouteComponentProps<{ offerId: string }>> = ({
  match,
}) => {
  const { data, loading, error, refetch } = useOfferQuery({
    variables: { id: match.params.offerId },
  })
  const history = useHistory()
  const checkoutMatch = useRouteMatch(
    '/beta/new-member/offer/:offerId/checkout',
  )
  const toggleCheckout = createToggleCheckout(history, data?.quote?.id)

  return !loading && !error && data && isOffer(data) ? (
    <Page>
      <SessionTokenGuard>
        <TopBar />
        <Introduction
          offer={data}
          refetch={refetch}
          onCheckoutOpen={() => toggleCheckout(true)}
        />
        <Perils offer={data} />
        <Compare />
        <Checkout
          offer={data}
          isOpen={checkoutMatch !== null}
          onClose={() => toggleCheckout(false)}
        />
        )}
      </SessionTokenGuard>
    </Page>
  ) : null
}
