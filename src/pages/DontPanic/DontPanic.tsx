import { colors } from '@hedviginsurance/brand'
import { Container } from 'constate'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, Query } from 'react-apollo'
import styled, { keyframes } from 'react-emotion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/buttons'
import { ChatMessage } from '../../components/hedvig/chat'
import {
  Conversation,
  ConversationWrapper,
  Message,
} from '../../components/hedvig/conversation'
import {
  UserResponse,
  UserSelectInput,
  UserTextInput,
} from '../../components/userInput/UserResponse'
import { Size, Spacing } from '../../components/utils/Spacing'
import { insurerNames } from '../Chat/steps/CurrentInsuranceInput'
import { DontPanicContainer, Step } from './DontPanicContainer'

const DontPanicButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '50px 0',
})

const slideUp = keyframes({
  from: { transform: 'translateY(50%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
})

const DontPanicButton = styled(Button)(
  ({ appear, currentStep }: { appear: boolean; currentStep: boolean }) => ({
    width: '20vh',
    height: '20vh',
    fontWeight: 'bold',
    borderRadius: 500,
    cursor: currentStep ? 'pointer' : 'default',
    opacity: currentStep ? 1 : 0.5,
    animation: appear ? undefined : `${slideUp} 1000ms forwards`,
    transition: 'opacity 300ms',
  }),
)

const Wrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  minHeight: '100vh',
}))

const BottomConversation = styled(Conversation)({
  minHeight: 0,
  marginTop: -150,
  width: '100%',
  paddingBottom: '0',
})

const Error = styled('div')({
  color: colors.PINK,
})

const MessageBoxWrapper = styled(ConversationWrapper)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: '100%',
  padding: 0,
  minHeight: 0,
})
const MessageFormFiller = styled('div')({
  height: 200,
})
const MessageFormWrapper = styled('div')({
  background: colors.WHITE,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
})
const MessageForm = styled('form')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: 1000,
  borderTop: '1px solid ' + colors.LIGHT_GRAY,
  padding: '20px',
})
const MessageTextarea = styled('textarea')({
  width: 'calc(100% - 100px)',
  border: 0,
  borderRadius: 7,
  padding: '.5rem 1rem',
  paddingLeft: 0,
  fontSize: 'inherit',
  color: 'inherit',
  fontFamily: 'inherit',
  resize: 'none',
})

const MessageSendButton = styled(Button)({
  border: 0,
  background: 'transparent',
  textAlign: 'center',
  fontSize: 'inherit',
  transition: 'opacity 200ms',

  '&:disabled': {
    background: 'transparent',
    opacity: 0.1,
  },
})

const HedvigH = () => (
  <svg
    viewBox="0 0 29 38"
    xmlns="http://www.w3.org/2000/svg"
    fill={colors.WHITE}
    width="25%"
    height="25%"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.0625 37.997H28.748V24.7198H23.0625V37.997Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.7499 24.7199H23.0644C23.0644 20.2238 19.3906 16.5636 14.8757 16.5636C10.3594 16.5636 6.68553 20.2238 6.68553 24.7199H1C1 17.1017 7.22432 10.9031 14.8757 10.9031C22.5256 10.9031 28.7499 17.1017 28.7499 24.7199Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 24.7198H6.68553V0H1V24.7198Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 37.997H6.68553V24.7198H1V37.997Z"
    />
  </svg>
)

interface Session {
  id: string
  name: string
  currentInsurer: string
  chatMessages: Array<{
    id: string
    text: string
    isHedvig: boolean
    type: 'text' | 'onboard'
  }>
}

const SESSION_QUERY = gql`
  query DontPanicSession($id: ID!) {
    dontPanicSession(id: $id) {
      id
      name
      currentInsurer
      chatMessages {
        id
        text
        isHedvig
        type
      }
    }
  }
`

const CREATE_SESSION_MUTATION = gql`
  mutation CreateDontPanicSession($name: String!, $currentInsurer: String!) {
    createDontPanicSession(name: $name, currentInsurer: $currentInsurer) {
      id
    }
  }
`

const ADD_MESSAGE_MUTATION = gql`
  mutation AddDontPanicMessage($sessionId: ID!, $text: String!) {
    addDontPanicChatMessage(
      sessionId: $sessionId
      text: $text
      who: "user"
      isHedvig: false
    ) {
      id
    }
  }
`

const isCurrentStep = (
  isHedvig: boolean,
  id: string,
  steps: ReadonlyArray<Step>,
) => {
  const lastMessage = [...steps]
    .reverse()
    .find((step) => step.isHedvig === isHedvig)
  return lastMessage ? lastMessage.id === id : false
}

export class DontPanic extends React.Component {
  public render() {
    return (
      <Wrapper>
        <DontPanicContainer>
          {({
            steps,
            initialVisibleSteps,
            goToStep,
            name,
            setName,
            currentInsurer,
            setCurrentInsurer,
            sessionId,
            setSessionId,
            isChatActive,
            makeChatActive,
          }) => (
            <>
              <Conversation<string>
                initialVisibleSteps={initialVisibleSteps.map(
                  ({ id }: Step) => id,
                )}
                visibleSteps={steps.map(({ id }) => id)}
                currentStep={
                  steps[steps.length - 1]
                    ? steps[steps.length - 1].id
                    : 'dont-panic'
                }
              >
                <Message id="dont-panic">
                  {({ appear }) => (
                    <DontPanicButtonWrapper>
                      <DontPanicButton
                        foreground={colors.WHITE}
                        background={colors.GREEN}
                        size="lg"
                        onClick={() => {
                          if (isCurrentStep(true, 'dont-panic', steps)) {
                            goToStep({ id: 'initial', isHedvig: true })
                          }
                        }}
                        appear={appear}
                        currentStep={isCurrentStep(true, 'dont-panic', steps)}
                      >
                        <HedvigH />
                        <br />
                        Don't panic!
                      </DontPanicButton>
                    </DontPanicButtonWrapper>
                  )}
                </Message>
                <Message id="initial">
                  {({ appear }) => (
                    <ChatMessage
                      isCurrentMessage={isCurrentStep(true, 'initial', steps)}
                      typingDuration={2000}
                      appear={appear}
                      onTyped={() => {
                        goToStep({
                          id: 'initial-response',
                          isHedvig: false,
                        })
                      }}
                    >
                      Hej 👋
                      <br />
                      Det är jag som är Hedvig. Här hjälper jag dig med allt vad
                      hem och försäkring innebär. Innan jag kan hälpa dig skulle
                      behöva ställa ett par frågor dock. Men don't panic! Det
                      tar några sekunder bara.
                    </ChatMessage>
                  )}
                </Message>
                <Message id="initial-response" delay={500}>
                  {({ appear }) => (
                    <UserResponse appear={appear}>
                      <Button
                        background={colors.GREEN}
                        foreground={colors.WHITE}
                        size="lg"
                        onClick={() => goToStep({ id: 'name', isHedvig: true })}
                      >
                        Okej, shoot!
                      </Button>
                    </UserResponse>
                  )}
                </Message>

                <Message id="name">
                  {({ appear }) => (
                    <ChatMessage
                      isCurrentMessage={isCurrentStep(true, 'name', steps)}
                      typingDuration={1000}
                      appear={appear}
                      onTyped={() => {
                        goToStep({ id: 'name-response', isHedvig: false })
                      }}
                    >
                      Alright, vad heter du?
                    </ChatMessage>
                  )}
                </Message>
                <Message id="name-response" delay={300}>
                  {({ appear }) => (
                    <UserResponse appear={appear}>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          if (!name) {
                            return
                          }
                          goToStep({
                            id: 'current-insurer',
                            isHedvig: true,
                          })
                        }}
                      >
                        <Spacing paddingBottom={Size.SM}>
                          Jag heter{' '}
                          <UserTextInput
                            placeholder="Namn"
                            size={Math.max(10, name ? name.length : 0)}
                            value={name || ''}
                            onChange={(e) => {
                              if (
                                steps[steps.length - 1].id === 'name-response'
                              ) {
                                setName(e.currentTarget.value)
                              }
                            }}
                          />
                        </Spacing>
                        {steps[steps.length - 1].id === 'name-response' && (
                          <Button
                            background={colors.GREEN}
                            foreground={colors.WHITE}
                            size="lg"
                            type="submit"
                            disabled={!Boolean(name)}
                          >
                            Nästa
                          </Button>
                        )}
                      </form>
                    </UserResponse>
                  )}
                </Message>
                <Message id="current-insurer">
                  {({ appear }) => (
                    <ChatMessage
                      isCurrentMessage={isCurrentStep(
                        true,
                        'current-insurer',
                        steps,
                      )}
                      typingDuration={2000}
                      appear={appear}
                      onTyped={() => {
                        goToStep({
                          id: 'current-insurer-response',
                          isHedvig: false,
                        })
                      }}
                    >
                      Hej {name}, trevligt att träffas! Är du försäkrad idag?
                    </ChatMessage>
                  )}
                </Message>
                <Message id="current-insurer-response" delay={300}>
                  {({ appear }) => (
                    <UserResponse appear={appear}>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          goToStep({ id: 'first-message', isHedvig: true })
                        }}
                      >
                        <Spacing paddingBottom={Size.SM}>
                          <UserSelectInput
                            onChange={(e) => {
                              if (
                                steps[steps.length - 1].id !==
                                'current-insurer-response'
                              ) {
                                return
                              }
                              setCurrentInsurer(e.target.value)
                            }}
                            value={currentInsurer}
                          >
                            <option value="NO">Nej</option>
                            <option value="Hedvig">Ja, med Hedvig</option>
                            {Array.from(insurerNames.entries()).map(
                              ([key, val]) => (
                                <option key={key} value={key}>
                                  Ja, med {val}
                                </option>
                              ),
                            )}
                          </UserSelectInput>
                        </Spacing>

                        {steps[steps.length - 1].id ===
                          'current-insurer-response' && (
                          <Button
                            background={colors.GREEN}
                            foreground={colors.WHITE}
                            size="lg"
                            type="submit"
                          >
                            Nästa
                          </Button>
                        )}
                      </form>
                    </UserResponse>
                  )}
                </Message>

                <Message id="first-message">
                  {({ appear }) => (
                    <Mutation
                      mutation={CREATE_SESSION_MUTATION}
                      onCompleted={(data) => {
                        setSessionId(data.createDontPanicSession.id)
                      }}
                    >
                      {(createChatSession) => (
                        <ChatMessage
                          isCurrentMessage={isCurrentStep(
                            true,
                            'first-message',
                            steps,
                          )}
                          typingDuration={1500}
                          appear={appear}
                          onTyped={() => {
                            createChatSession({
                              variables: { name, currentInsurer },
                            })
                            goToStep({
                              id: 'question-examples',
                              isHedvig: true,
                            })
                          }}
                        >
                          {currentInsurer !== 'NO' &&
                          currentInsurer !== 'Hedvig' ? (
                            <>
                              👀
                              <br />
                              Okej! Vi svarar såklart på dina frågor ändå. Vad
                              har du på hjärtat?
                            </>
                          ) : (
                            <>Cool! Vad är det du undrar över?</>
                          )}
                        </ChatMessage>
                      )}
                    </Mutation>
                  )}
                </Message>

                <Message id="question-examples" delay={500}>
                  {({ appear }) => (
                    <ChatMessage
                      isCurrentMessage={
                        isCurrentStep(true, 'first-message', steps) &&
                        !isChatActive
                      }
                      typingDuration={2000}
                      appear={appear}
                    >
                      Några saker du kan fråga mig är exempelvis:
                      <ul>
                        <li>
                          Vad gäller på min försäkring när jag reser utomlands?
                        </li>
                        <li>Jag har råkat ut för XYZ - kan jag bli ersatt?</li>
                        <li>Vilken flyttfirma ska jag anlita?</li>
                      </ul>
                    </ChatMessage>
                  )}
                </Message>
              </Conversation>

              {Boolean(sessionId) && (
                <>
                  <Query<{ dontPanicSession?: Session }>
                    query={SESSION_QUERY}
                    pollInterval={1000}
                    variables={{ id: sessionId }}
                  >
                    {({ data, error }) => (
                      <Container<{ initialVisibleConversationSteps: string[] }>
                        initialState={{
                          initialVisibleConversationSteps:
                            (data &&
                              data.dontPanicSession &&
                              data.dontPanicSession.chatMessages.map(
                                ({ id }) => id,
                              )) ||
                            [],
                        }}
                      >
                        {({ initialVisibleConversationSteps }) => (
                          <>
                            {error && (
                              <Error>
                                Ojdå... Något gick visst fel konversationen
                                skulle laddas :(
                              </Error>
                            )}
                            {Boolean(data && data.dontPanicSession) && (
                              <BottomConversation
                                visibleSteps={data!.dontPanicSession!.chatMessages.map(
                                  ({ id }) => id,
                                )}
                                initialVisibleSteps={
                                  initialVisibleConversationSteps
                                }
                                currentStep={
                                  data!.dontPanicSession!.chatMessages.length >
                                  0
                                    ? data!.dontPanicSession!.chatMessages[
                                        data!.dontPanicSession!.chatMessages
                                          .length - 1
                                      ].id
                                    : ''
                                }
                              >
                                {data!.dontPanicSession!.chatMessages.map(
                                  (message) => (
                                    <Message id={message.id} key={message.id}>
                                      {({ appear }) => (
                                        <ChatMessage
                                          isCurrentMessage={isCurrentStep(
                                            true,
                                            message.id,
                                            data!.dontPanicSession!
                                              .chatMessages,
                                          )}
                                          typingDuration={
                                            message.isHedvig ? 500 : 0
                                          }
                                          appear={appear}
                                          isHedvig={message.isHedvig}
                                        >
                                          {message.text
                                            .split('\n')
                                            .map((text, i, { length }) => {
                                              return (
                                                <React.Fragment key={i}>
                                                  {text}
                                                  {i < length - 1 && <br />}
                                                </React.Fragment>
                                              )
                                            })}
                                          {message.type === 'onboard' && (
                                            <>
                                              <br />
                                              <Link
                                                to={`/new-member/hedvig?firstName=${name}&initialInsurer=${currentInsurer}`}
                                              >
                                                Gå till onboarding
                                              </Link>
                                            </>
                                          )}
                                        </ChatMessage>
                                      )}
                                    </Message>
                                  ),
                                )}
                              </BottomConversation>
                            )}
                          </>
                        )}
                      </Container>
                    )}
                  </Query>

                  <MessageFormFiller />
                  <MessageFormWrapper>
                    <MessageBoxWrapper>
                      <Container<
                        { messageText: string },
                        { setMessageText: (messageText: string) => void }
                      >
                        initialState={{ messageText: '' }}
                        actions={{
                          setMessageText: (messageText) => ({ messageText }),
                        }}
                      >
                        {({ messageText, setMessageText }) => (
                          <Mutation
                            mutation={ADD_MESSAGE_MUTATION}
                            refetchQueries={() => [
                              {
                                query: SESSION_QUERY,
                                variables: { id: sessionId },
                              },
                            ]}
                          >
                            {(mutate, { loading }) => {
                              const sendMessage = (vars: any) => {
                                if (messageText.trim().length === 0) {
                                  return
                                }
                                return mutate(vars).then((_) => {
                                  setMessageText('')
                                  makeChatActive()
                                })
                              }
                              return (
                                <MessageForm
                                  onSubmit={(e) => {
                                    e.preventDefault()
                                    sendMessage({
                                      variables: {
                                        sessionId,
                                        text: messageText,
                                      },
                                      awaitRefetchQueries: true,
                                    })
                                  }}
                                >
                                  <MessageTextarea
                                    value={messageText}
                                    onChange={(e) =>
                                      setMessageText(e.target.value)
                                    }
                                    placeholder="Skriv ditt meddelande..."
                                    rows={4}
                                    onKeyDown={(e) => {
                                      if (e.keyCode !== 13) {
                                        return
                                      }
                                      if (e.shiftKey) {
                                        return
                                      }

                                      e.preventDefault()
                                      sendMessage({
                                        variables: {
                                          sessionId,
                                          text: messageText,
                                        },
                                        awaitRefetchQueries: true,
                                      })
                                    }}
                                  />
                                  <MessageSendButton
                                    background="transparent"
                                    foreground={colors.GREEN}
                                    type="submit"
                                    disabled={loading}
                                  >
                                    Skicka
                                  </MessageSendButton>
                                </MessageForm>
                              )
                            }}
                          </Mutation>
                        )}
                      </Container>
                    </MessageBoxWrapper>
                  </MessageFormWrapper>
                </>
              )}
            </>
          )}
        </DontPanicContainer>
      </Wrapper>
    )
  }
}
