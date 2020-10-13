import { MockedProvider } from '@apollo/react-testing'
import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { StaticRouter } from 'react-router'
import { Button } from 'components/buttons'
import { sleep } from 'utils/misc'
import { StaticTextKeyProvider } from 'utils/textKeys'
import { REGISTER_DIRECT_DEBIT_MUTATION } from '../containers/RegisterDirectDebitMutation'
import { TrustlyCheckout } from './TrustlyCheckout'
import { TrustlyModal } from './TrustlyModal'

it('renders without 💥', () => {
  const wrapper = mount(
    <StaticRouter location="http://localhost:8040/se/new-member/connect-payment">
      <StaticTextKeyProvider>
        <MockedProvider>
          <TrustlyCheckout />
        </MockedProvider>
      </StaticTextKeyProvider>
    </StaticRouter>,
  )

  expect(wrapper.find(Button).text()).toBe('ONBOARDING_CONNECT_DD_CTA')
  expect(wrapper.find(TrustlyModal).prop('isOpen')).toBe(false)
})

it('opens trustly modal and renders correct iframe url', async () => {
  const basePath = '/se/new-member/connect-payment'
  const location = `http://localhost${basePath}`
  const trustlyUrl = 'https://trustly.com/ConnectDirectDebitUrl?param=something'
  delete window.location
  // @ts-ignore
  window.location = new URL(location)

  const wrapper = mount(
    <StaticRouter location={basePath}>
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
      </MockedProvider>
    </StaticRouter>,
  )

  wrapper.find(Button).simulate('click')

  await act(() => sleep(1))
  act(() => {
    wrapper.update()
  })

  expect(wrapper.find(TrustlyModal).prop('isOpen')).toBe(true)
  expect(wrapper.find(TrustlyModal).prop('trustlyUrl')).toBe(
    trustlyUrl + '&NotifyParent=1',
  )
})
