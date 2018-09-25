import { mount } from 'enzyme'
import * as React from 'react'
import { Transition } from 'react-transition-group'
import { ChatMessage, ChatMessageTextWrapper } from './chat'

jest.useFakeTimers()
it('renders typing and text without 💥', () => {
  const DURATION = 500
  const wrapper = mount(
    <ChatMessage typingDuration={DURATION}>Hello</ChatMessage>,
  )
  expect(wrapper.find(Transition).prop('in')).toBe(true)
  expect(wrapper.find(ChatMessageTextWrapper).prop('isVisible')).toBe(false)

  jest.runTimersToTime(DURATION)
  wrapper.update()

  expect(wrapper.find(Transition).prop('in')).toBe(false)
  expect(wrapper.find(ChatMessageTextWrapper).prop('isVisible')).toBe(true)
})
