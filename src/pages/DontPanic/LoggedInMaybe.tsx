import { colors } from '@hedviginsurance/brand'
import { Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { Mount } from 'react-lifecycle-components'
import { ChatMessage } from '../../components/hedvig/chat'
import { Conversation, Message } from '../../components/hedvig/conversation'
import { UserResponse } from '../../components/userInput/UserResponse'
import { StorageContainer } from '../../utils/StorageContainer'

const ConversationWrapper = styled('div')({
  width: '100%',
  padding: '5rem',
})

const TextResponse = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const SubmitButton = styled('button')({
  appearance: 'none',
  width: '1.5em',
  height: '1.5em',
  display: 'flex',
  border: 0,
  borderRadius: '100%',
  background: colors.PURPLE,
  color: colors.WHITE,
  fontSize: '2em',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '1rem',
  cursor: 'pointer',
})

const Textarea = styled('textarea')({
  width: '50%',
  minHeight: '7.5rem',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  borderRadius: 10,
  padding: '.5rem 1rem',
  border: '1px solid ' + colors.LIGHT_GRAY,
})

interface MessageType {
  isHedvig: boolean
  text: string
  id: string
}

export const LoggedInMaybe: React.FunctionComponent = () => (
  <StorageContainer>
    {({ dontPanicSession }) => {
      if (
        !dontPanicSession.getSession() ||
        !dontPanicSession.getSession().fbData
      ) {
        return null
      }
      const { fbData } = dontPanicSession.getSession()
      return (
        <ConversationWrapper>
          <Container<
            {
              // steps: string[]
              messages: MessageType[] | undefined
              initialMessages: MessageType[] | undefined
              currentMessage: string
              es: EventSource
            },
            {
              setCurrentMessage: (currentMessage: string) => void
              setMessages: (messages: MessageType[]) => void
            },
            {},
            {
              // addStep: (step: string) => void
              addMessage: (message: MessageType) => void
              sendMessage: (message: MessageType) => void
            }
          >
            initialState={{
              currentMessage: '',
              es:
                typeof EventSource !== 'undefined' &&
                new EventSource('http://localhost:1337/sse'),
            }}
            actions={{
              setCurrentMessage: (currentMessage) => () => ({ currentMessage }),
              setMessages: (messages) => () => ({
                messages,
                initialMessages: messages,
              }),
            }}
            effects={{
              // addStep: (step) => ({ state, setState }) => {
              //   const newSteps = [...state.steps, step]
              //   dontPanicSession.setSession({
              //     ...dontPanicSession.getSession(),
              //     steps: newSteps,
              //   })
              //   setState({ steps: newSteps })
              // },
              sendMessage: (message) => () => {
                // const messages = [
                //   message,
                // ]
                // const newSteps = [
                //   ...state.steps,
                //   'message-' + (messages.length - 1).toString(),
                // ]
                // setState({
                //   messages,
                //   steps: newSteps,
                //   currentMessage: '',
                // })
                fetch('http://localhost:1337', {
                  method: 'POST',
                  body: JSON.stringify(message),
                  headers: { 'content-type': 'application/json' },
                })
              },
              addMessage: (message) => ({ state, setState }) => {
                setState({ messages: [...state.messages!, message] })
              },
            }}
          >
            {({
              messages,
              initialMessages,
              addMessage,
              currentMessage,
              setCurrentMessage,
              setMessages,
              sendMessage,
              es,
            }) => {
              return (
                <Mount
                  on={() => {
                    es.onmessage = (message) => {
                      addMessage(JSON.parse(message.data))
                    }
                    fetch('http://localhost:1337')
                      .then((r) => r.json())
                      .then((r) => {
                        setMessages(r)
                      })
                  }}
                >
                  {messages && (
                    <>
                      <Conversation<string>
                        visibleSteps={[
                          'message-0',
                          ...messages.map(({ id }) => 'message-' + id),
                        ]}
                        currentStep={
                          'message-' +
                          ((messages[messages.length - 1] &&
                            messages[messages.length - 1].id) ||
                            0)
                        }
                        initialVisibleSteps={[
                          ...(initialMessages!.length > 0 ? ['message-0'] : []),
                          ...initialMessages!.map(({ id }) => 'message-' + id),
                        ]}
                      >
                        {[
                          <Message id="message-0" key="message-0">
                            {({ appear }) => (
                              <ChatMessage
                                isCurrentMessage={true}
                                appear={appear}
                                typingDuration={2000}
                              >
                                Hej {fbData.name.split(' ')[0]}! Hur kan jag
                                hjälpa dig? Du kan fråga mig om nästan vad som
                                helst.
                              </ChatMessage>
                            )}
                          </Message>,
                          ...messages.map(({ isHedvig, text, id }) => (
                            <Message id={'message-' + id} key={id}>
                              {({ appear }) =>
                                isHedvig ? (
                                  <ChatMessage
                                    appear={appear}
                                    isCurrentMessage={
                                      currentMessage === 'message-' + id
                                    }
                                  >
                                    {text}
                                  </ChatMessage>
                                ) : (
                                  <UserResponse appear={appear}>
                                    {text}
                                  </UserResponse>
                                )
                              }
                            </Message>
                          )),
                        ]}
                      </Conversation>
                      <TextResponse
                        onSubmit={(e) => {
                          e.preventDefault()
                          sendMessage({
                            isHedvig: false,
                            text: currentMessage,
                            id: Math.random().toString(),
                          })
                          setCurrentMessage('')
                        }}
                      >
                        <Textarea
                          value={currentMessage}
                          onChange={(e) =>
                            setCurrentMessage(e.currentTarget.value)
                          }
                        />
                        <SubmitButton type="submit">↑</SubmitButton>
                      </TextResponse>
                    </>
                  )}
                </Mount>
              )
            }}
          </Container>
        </ConversationWrapper>
      )
    }}
  </StorageContainer>
)
