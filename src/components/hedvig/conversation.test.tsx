import { mount } from 'enzyme'
import * as React from 'react'
import { Conversation, Message } from './conversation'

jest.useFakeTimers()
it('renders a conversation on message at a time', () => {
  const Message1: React.SFC<{ next: () => void }> = ({ next }) => (
    <div>
      <div id={'hello'}>hello</div>
      <button onClick={next}>next</button>
    </div>
  )
  const Message2 = () => <div id="goodbye">goodbye</div>

  const wrapper = mount(
    <Conversation>
      <Message>{({ next }) => <Message1 next={next} />}</Message>
      <Message delay={500}>{(_) => <Message2 />}</Message>
    </Conversation>,
  )

  expect(wrapper.find('#hello').contains('hello')).toBe(true)
  expect(wrapper.find('#goodbye')).toHaveLength(0)

  wrapper.find('button').simulate('click')
  expect(wrapper.find('#hello').contains('hello')).toBe(true)
  expect(wrapper.find('#goodbye')).toHaveLength(0)

  jest.runTimersToTime(500)
  wrapper.update()
  expect(wrapper.find('#goodbye').contains('goodbye')).toBe(true)
})

it('renders initial steps', () => {
  const Message1: React.SFC<{ next: () => void }> = ({ next }) => (
    <div>
      <div id={'hello'}>hello</div>
      <button onClick={next}>next</button>
    </div>
  )
  const Message2 = () => <div id="goodbye">goodbye</div>

  const wrapper = mount(
    <Conversation initialStep={1}>
      <Message>{({ next }) => <Message1 next={next} />}</Message>
      <Message delay={500}>{(_) => <Message2 />}</Message>
    </Conversation>,
  )

  expect(wrapper.find(Message)).toHaveLength(2)
})
