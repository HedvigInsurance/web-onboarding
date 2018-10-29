import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import {
  createSession,
  IsomorphicSessionStorage,
  Session,
  SESSION_KEY,
} from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { mockNetworkWait } from 'utils/test-utils'
import { ChatContainer } from '../state'
import { createCreateOfferMutationMock, mockState } from '../utils/test-utils'
import {
  CreateOfferContainer,
  getCreateOfferVariablesFromChatState,
} from './CreateOfferContainer'

jest.mock('client/apolloClient', () => ({
  apolloClient: {
    subscriptionClient: { close: jest.fn() },
  },
}))

it('creates an offer when HAS initial session', async () => {
  const mockedRequests = createCreateOfferMutationMock()

  const wrapper = mount(
    <MockedProvider mocks={mockedRequests}>
      <Provider<{
        storage: { session: IsomorphicSessionStorage<Session> }
      }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({
                  chat: mockState(),
                  token: 'abc123',
                }),
              }),
            ),
          },
        }}
      >
        <ChatContainer>
          {(chatState) => (
            <CreateOfferContainer>
              {(mutate, { loading, data }) => {
                if (loading) {
                  return <div>loading</div>
                }
                if (data) {
                  return <div>{data}</div>
                }

                return (
                  <button
                    onClick={() =>
                      mutate(getCreateOfferVariablesFromChatState(chatState))
                    }
                  />
                )
              }}
            </CreateOfferContainer>
          )}
        </ChatContainer>
      </Provider>
    </MockedProvider>,
  )

  wrapper.find('button').simulate('click')
  expect(wrapper.find('div').contains('loading')).toBe(true)
  await mockNetworkWait()
  await mockNetworkWait(2)
  wrapper.update()
  expect(wrapper.find('div').contains('abc123')).toBe(true)
})

it('creates an offer when has NO initial session', async () => {
  const mockedRequests = createCreateOfferMutationMock()

  const wrapper = mount(
    <MockedProvider mocks={mockedRequests}>
      <Provider<{
        storage: { session: IsomorphicSessionStorage<Session> }
      }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({
                  chat: mockState(),
                }),
              }),
            ),
          },
        }}
      >
        <ChatContainer>
          {(chatState) => (
            <CreateOfferContainer>
              {(mutate, { loading, data }) => {
                if (loading) {
                  return <div>loading</div>
                }
                if (data) {
                  return <div>{data}</div>
                }

                return (
                  <button
                    onClick={() =>
                      mutate(getCreateOfferVariablesFromChatState(chatState))
                    }
                  />
                )
              }}
            </CreateOfferContainer>
          )}
        </ChatContainer>
      </Provider>
    </MockedProvider>,
  )

  wrapper.find('button').simulate('click')
  expect(wrapper.find('div').contains('loading')).toBe(true)
  await mockNetworkWait()
  await mockNetworkWait(2)
  wrapper.update()
  expect(wrapper.find('div').contains('abc123')).toBe(true)
})
