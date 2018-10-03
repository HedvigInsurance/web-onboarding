import { Container } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { Conversation, Message } from './conversation'

const StateContainer: React.SFC<any> = ({ children, initialState }) => (
  <Container<any, any>
    initialState={initialState}
    actions={
      {
        goToStep: (step: string) => ({ visibleSteps }: any) => ({
          visibleSteps: [...visibleSteps, step],
          currentStep: step,
        }),
      } as any
    }
    children={children}
  />
)

jest.useFakeTimers()
it('renders a conversation on message at a time', () => {
  const Message1: React.SFC<{ goToStep: (step: string) => void }> = ({
    goToStep,
  }) => (
    <div>
      <div id={'hello'}>hello</div>
      <button onClick={() => goToStep('step-2')}>next</button>
    </div>
  )
  const Message2 = () => <div id="goodbye">goodbye</div>

  const wrapper = mount(
    <StateContainer
      initialState={{ currentStep: 'step-1', visibleSteps: ['step-1'] }}
    >
      {({ goToStep, visibleSteps, currentStep }: any) => (
        <Conversation currentStep={currentStep} visibleSteps={visibleSteps}>
          <Message id="step-1">
            {() => <Message1 goToStep={goToStep} />}
          </Message>
          <Message id="step-2" delay={500}>
            {(_) => <Message2 />}
          </Message>
        </Conversation>
      )}
    </StateContainer>,
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
  const Message1: React.SFC<{ goToStep: (step: string) => void }> = ({
    goToStep,
  }) => (
    <div>
      <div id={'hello'}>hello</div>
      <button onClick={() => goToStep('step-2')}>next</button>
    </div>
  )
  const Message2 = () => <div id="goodbye">goodbye</div>

  const wrapper = mount(
    <StateContainer
      initialState={{
        currentStep: 'step-2',
        visibleSteps: ['step-1', 'step-2'],
        initialVisibleSteps: ['step-1', 'step-2'],
      }}
    >
      {(props: any) => (
        <Conversation
          currentStep={props.currentStep}
          visibleSteps={props.visibleSteps}
          initialVisibleSteps={props.initialVisibleSteps}
        >
          <Message id="step-1">
            {() => <Message1 goToStep={props.goToStep} />}
          </Message>
          <Message delay={500} id="step-2">
            {(_) => <Message2 />}
          </Message>
        </Conversation>
      )}
    </StateContainer>,
  )

  expect(wrapper.find(Message)).toHaveLength(2)
})
