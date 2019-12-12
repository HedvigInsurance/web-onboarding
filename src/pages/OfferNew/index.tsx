import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useOfferQuery } from 'generated/graphql'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Checkout } from './Checkout'
import { Compare } from './Compare'
import { Introduction } from './Introduction'
import { Perils } from './Perils/index'
import { isOffer } from './utils'

const createToggleCheckout = (setCheckoutIsOpen: (isOpen: boolean) => void) => (
  isOpen: boolean,
) => {
  setCheckoutIsOpen(isOpen)
  if (isOpen) {
    history.pushState({ isOpen }, undefined as any, '/beta/new-member/offer') // TODO
  } else {
    history.back()
  }
}

export const OfferNew: React.FC<RouteComponentProps<{ offerId: string }>> = ({
  match,
}) => {
  const { data, loading, error, refetch } = useOfferQuery({
    variables: { id: match.params.offerId },
  })
  const [checkoutIsOpen, setCheckoutIsOpen] = React.useState(false)
  const toggleCheckout = createToggleCheckout(setCheckoutIsOpen)

  React.useEffect(() => {
    const listener = (e: PopStateEvent) => {
      setCheckoutIsOpen(Boolean(e.state?.isOpen))
    }
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  })

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
          isOpen={checkoutIsOpen}
          onClose={() => toggleCheckout(false)}
        />
      </SessionTokenGuard>
    </Page>
  ) : null
}
