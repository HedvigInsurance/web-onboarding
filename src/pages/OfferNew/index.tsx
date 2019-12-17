import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useMemberOfferQuery } from 'generated/graphql'
import { History } from 'history'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { Checkout } from './Checkout'
import { Compare } from './Compare'
import { Introduction } from './Introduction'
import { Perils } from './Perils/index'
import { isOffer } from './utils'

const createToggleCheckout = (history: History<any>) => (isOpen: boolean) => {
  if (isOpen) {
    history.push(`/beta/new-member/offer/checkout`)
  } else {
    history.goBack()
  }
}

export const OfferNew: React.FC = () => {
  const { data, loading, error, refetch } = useMemberOfferQuery()
  const history = useHistory()
  const checkoutMatch = useRouteMatch('/beta/new-member/offer/checkout')
  const toggleCheckout = createToggleCheckout(history)

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
      </SessionTokenGuard>
    </Page>
  ) : null
}
