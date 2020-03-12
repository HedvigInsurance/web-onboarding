import { MockedProvider } from '@apollo/react-testing'
import { mount } from 'enzyme'
import { SignState, SignStatusDocument } from 'generated/graphql'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { StaticRouter } from 'react-router'
import { mockNetworkWait } from 'utils/test-utils'
import { SignStatus } from './SignStatus'

jest.mock('../../../client/apolloClient', () => ({
  apolloClient: {},
}))

it('renders without 💥', () => {
  mount(
    <StaticRouter location="/new-member/sign" context={{}}>
      <MockedProvider mocks={[]}>
        <SignStatus
          isSigning={false}
          onFailure={() => {
            /* noop */
          }}
          onSuccess={() => {
            /* noop */
          }}
        />
      </MockedProvider>
    </StaticRouter>,
  )
})

it('shows pending state', async () => {
  const SignWrapper: React.FC<{ isSigning: boolean }> = ({ isSigning }) => (
    <StaticRouter location="/new-member/sign" context={{}}>
      <MockedProvider
        mocks={[
          {
            request: { query: SignStatusDocument },
            result: {
              data: {
                signStatus: {
                  __typename: 'SignStatus',
                  signState: SignState.Initiated,
                  collectStatus: {
                    __typename: 'CollectStatus',
                    status: 'pending',
                    code: 'started',
                  },
                },
              },
            },
          },
        ]}
      >
        <SignStatus
          isSigning={isSigning}
          onFailure={() => {
            /* noop */
          }}
          onSuccess={() => {
            /* noop */
          }}
        />
      </MockedProvider>
    </StaticRouter>
  )

  const wrapper = mount(<SignWrapper isSigning={false} />)

  expect(wrapper.text()).toBe('')

  wrapper.setProps({ isSigning: true })
  await act(() => mockNetworkWait())
  expect(wrapper.text()).toBe('SIGN_BANKID_INITIATED')
})
