import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { Redirect, StaticRouter } from 'react-router'
import { ChatScreenContainer } from '../containers/ChatScreenContainer'
import { LoadingScreen } from './LoadingScreen'
import { OfferCreationHandler } from './OfferCreationHandler'

jest.useFakeTimers()
it('does nothing when no correct state is set', () => {
  const wrapper = mount(
    <StaticRouter context={{}}>
      <Provider initialState={{}}>
        <OfferCreationHandler />
        <ChatScreenContainer>
          {(state) => (
            <>
              <button
                id="trigger-debounce"
                onClick={() => state.beginDebounce()}
              />
              <button
                id="trigger-loading"
                onClick={() => state.beginCreateOffer()}
              />
              <button
                id="trigger-finished"
                onClick={() => state.createOfferSuccess()}
              />
            </>
          )}
        </ChatScreenContainer>
      </Provider>
    </StaticRouter>,
  )

  expect(wrapper.find(Redirect)).toHaveLength(0)
  expect(wrapper.find(LoadingScreen)).toHaveLength(0)

  wrapper.find('#trigger-loading').simulate('click')
  expect(wrapper.find(LoadingScreen)).toHaveLength(1)

  wrapper.find('#trigger-debounce').simulate('click')
  wrapper.find('#trigger-finished').simulate('click')
  expect(wrapper.find(LoadingScreen)).toHaveLength(1)

  jest.runAllTimers()
  wrapper.update()

  expect(wrapper.find(Redirect).prop('to')).toBe('/new-member/offer')
})
