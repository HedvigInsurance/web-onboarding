import { colors } from '@hedviginsurance/brand'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, Query } from 'react-apollo'
import styled from 'react-emotion'
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
import { Container } from 'constate'
import { Link } from 'react-router-dom'

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
  paddingTop: '3rem',
  paddingBottom: '3rem',
  minHeight: 0,
})
const MessageForm = styled('form')({
  display: 'flex',
  flexDirection: 'row',
  width: '75%',
})
const MessageTextarea = styled('textarea')({
  width: '100%',
  border: '1px solid ' + colors.LIGHT_GRAY,
  borderRadius: 7,
  padding: '.5rem 1rem',
  fontSize: 'inherit',
  color: 'inherit',
  fontFamily: 'inherit',
})

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
                    : 'initial'
                }
              >
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
                          isCurrentMessage={
                            isCurrentStep(true, 'first-message', steps) &&
                            !isChatActive
                          }
                          typingDuration={1500}
                          appear={appear}
                          onTyped={() => {
                            createChatSession({
                              variables: { name, currentInsurer },
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
                                          {message.text}
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
                          {(sendMessage, { loading }) => (
                            <MessageForm
                              onSubmit={(e) => {
                                e.preventDefault()
                                sendMessage({
                                  variables: {
                                    sessionId,
                                    text: messageText,
                                  },
                                  awaitRefetchQueries: true,
                                }).then((_) => {
                                  setMessageText('')
                                  makeChatActive()
                                })
                              }}
                            >
                              <MessageTextarea
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                              />
                              <Button
                                background={colors.GREEN}
                                foreground={colors.WHITE}
                                type="submit"
                                disabled={loading}
                              >
                                Skicka
                              </Button>
                            </MessageForm>
                          )}
                        </Mutation>
                      )}
                    </Container>
                  </MessageBoxWrapper>
                </>
              )}
            </>
          )}
        </DontPanicContainer>
      </Wrapper>
    )
  }
}
