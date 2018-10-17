import { mount } from 'enzyme'
import * as React from 'react'
import { ChatScreenContainer, LoadingState } from './ChatScreenContainer'

jest.useFakeTimers()
it('performs debounced loading', () => {
  const wrapper = mount(
    <ChatScreenContainer>
      {(state) => (
        <>
          <div id="debounce">{state.offerCreationDebounceState}</div>
          <div id="loading">{state.offerCreationLoadingState}</div>
          <button id="trigger-debounce" onClick={() => state.beginDebounce()} />
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
    </ChatScreenContainer>,
  )

  expect(wrapper.find('#debounce').text()).toBe(
    String(LoadingState.NOT_LOADING),
  )
  expect(wrapper.find('#loading').text()).toBe(String(LoadingState.NOT_LOADING))

  wrapper.find('#trigger-debounce').simulate('click')
  expect(wrapper.find('#debounce').text()).toBe(String(LoadingState.LOADING))
  expect(wrapper.find('#loading').text()).toBe(String(LoadingState.NOT_LOADING))

  wrapper.find('#trigger-loading').simulate('click')
  expect(wrapper.find('#debounce').text()).toBe(String(LoadingState.LOADING))
  expect(wrapper.find('#loading').text()).toBe(String(LoadingState.LOADING))

  jest.runAllTimers()
  expect(wrapper.find('#debounce').text()).toBe(String(LoadingState.COMPLETED))
  expect(wrapper.find('#loading').text()).toBe(String(LoadingState.LOADING))

  wrapper.find('#trigger-finished').simulate('click')
  expect(wrapper.find('#debounce').text()).toBe(String(LoadingState.COMPLETED))
  expect(wrapper.find('#loading').text()).toBe(String(LoadingState.COMPLETED))
})
