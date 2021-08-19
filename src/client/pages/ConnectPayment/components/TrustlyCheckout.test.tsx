import { MockedProvider } from '@apollo/react-testing'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { StaticTextKeyProvider } from 'utils/textKeys'
import { renderComponent, waitFor } from 'test/utils'
import { REGISTER_DIRECT_DEBIT_MUTATION } from '../containers/RegisterDirectDebitMutation'
import { TrustlyCheckout } from './TrustlyCheckout'

it('renders without 💥', () => {
  const { getByRole, queryByText } = renderComponent(
    <StaticTextKeyProvider>
      <MockedProvider>
        <TrustlyCheckout />
      </MockedProvider>
    </StaticTextKeyProvider>,
    {
      wrapperProps: {
        location: 'http://localhost:8040/se/new-member/connect-payment',
      },
    },
  )

  expect(getByRole('button').textContent).toBe('ONBOARDING_CONNECT_DD_CTA')
  expect(queryByText('ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_TITLE')).toBeNull()
})

it('opens trustly modal and renders correct iframe url', async () => {
  const basePath = '/se/new-member/connect-payment'
  const location = `http://localhost${basePath}`
  const trustlyUrl = 'https://trustly.com/ConnectDirectDebitUrl?param=something'
  delete window.location
  // @ts-ignore
  window.location = new URL(location)

  const { getByRole, getByText } = renderComponent(
    <MockedProvider
      mocks={[
        {
          request: {
            query: REGISTER_DIRECT_DEBIT_MUTATION,
            variables: {
              clientContext: {
                successUrl: location + '/success',
                failureUrl: location + '/fail',
              },
            },
          },
          result: {
            data: {
              registerDirectDebit: {
                orderId: 'abc123',
                url: trustlyUrl,
                __typename: 'DirectDebitResponse',
              },
            },
          },
        },
      ]}
    >
      <StaticTextKeyProvider>
        <TrustlyCheckout />
      </StaticTextKeyProvider>
    </MockedProvider>,
    { wrapperProps: { location: basePath } },
  )

  userEvent.click(getByRole('button'))
  await waitFor(() =>
    expect(
      getByText('ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_TITLE'),
    ).toBeInTheDocument(),
  )
})
