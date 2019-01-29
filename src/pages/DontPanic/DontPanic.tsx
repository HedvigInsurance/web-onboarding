import { colors, fonts } from '@hedviginsurance/brand'
import { Container } from 'constate'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, Query } from 'react-apollo'
import styled, { css } from 'react-emotion'
import ReactFacebookLogin from 'react-facebook-login'
import { Link } from 'react-router-dom'
import { Button } from '../../components/buttons'
import { ChatMessage, ChatWrapper } from '../../components/hedvig/chat'
import {
  Conversation,
  ConversationWrapper,
  Message,
} from '../../components/hedvig/conversation'
import { EmptyTopBar, TopBarFiller } from '../../components/TopBar'
import {
  UserResponse,
  UserSelectInput,
  UserTextInput,
} from '../../components/userInput/UserResponse'
import { Size, Spacing } from '../../components/utils/Spacing'
import {
  ApplicationSpecificEvents,
  getUtmParamsFromCookie,
  TrackAction,
} from '../../utils/tracking'
import { insurerNames } from '../Chat/steps/CurrentInsuranceInput'
import { DontPanicContainer, Step } from './DontPanicContainer'
import { Notifier } from './Notifier'

const facebookButtonClass = css({
  appearance: 'none',
  borderRadius: 100,
  background: '#3b5998',
  border: 0,
  padding: '1rem 2rem',
  color: colors.WHITE,
  fontSize: '1.1rem',
  fontFamily: 'inherit',
  cursor: 'pointer',

  '&:disabled': {
    opacity: 0.5,
    cursor: 'unset',
  },

  '&:focus': {
    outline: 'none',
  },
})

const ContinueWithoutFacebook = styled('button')({
  appearance: 'none',
  border: 0,
  padding: 10,
  background: 'transparent',
  color: colors.OFF_BLACK,
  fontSize: '0.7rem',
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'unset',
  },

  '&:focus': {
    outline: 'none',
  },
})

const Wrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  minHeight: '100vh',
}))
const PremadeQuestionButtonWrapper = styled('div')({
  paddingBottom: 12,
  '&:last-of-type': {
    paddingBottom: 0,
  },
})
const PremadeQuestionButton = styled(Button)({
  textAlign: 'left',
  paddingLeft: 30,
  paddingRight: 30,
})

const BottomConversation = styled(Conversation)({
  minHeight: 0,
  marginTop: -150,
  width: '100%',
  paddingBottom: '0',
})

const Error = styled('div')({
  color: colors.PINK,
})

const OnboardingMessageBody = styled('div')({
  backgroundColor: colors.BLACK_PURPLE,
  color: colors.WHITE,
  padding: '4rem 2rem',
  borderRadius: 8,
  textAlign: 'center',
  width: '100%',
  fontFamily: fonts.SORAY,
  fontWeight: 600,
})
const OnboardingMessageText = styled('div')({
  paddingBottom: '1rem',
})
const OnboardingButton = Button.withComponent(Link)
const OnboardingMessage: React.FunctionComponent<{
  to: string
  onClick: () => void
}> = ({ children, to, onClick }) => (
  <ChatWrapper isHedvig={true}>
    <OnboardingMessageBody>
      <OnboardingMessageText>{children}</OnboardingMessageText>
      <OnboardingButton
        foreground={colors.WHITE}
        background={colors.GREEN}
        to={to}
        onClick={onClick}
      >
        Skaffa Hedvig
      </OnboardingButton>
    </OnboardingMessageBody>
  </ChatWrapper>
)

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
  justifyContent: 'space-between',
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
  height: 80,
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

  '&:focus': {
    outline: 'none',
  },
})

const PREMADE_QUESTIONS = [
  {
    id: 1,
    question:
      'Hur funkar det egentligen med hemförsäkring när man hyr ut sin bostad? 🧐',
  },
  { id: 2, question: 'Vad kostar er försäkring?' },
  { id: 3, question: 'Min telefonskärm har gått sönder! Vad gör jag?' },
]

export const HedvigH: React.FunctionComponent<{ className?: string }> = ({
  className,
}) => (
  <svg
    viewBox="0 0 29 38"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="30%"
    height="30%"
    className={className}
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

export interface Session {
  id: string
  name: string
  lastName?: string
  email?: string
  currentInsurer: string
  chatMessages: Array<{
    id: string
    text: string
    isHedvig: boolean
    type: 'text' | 'onboard' | 'link'
  }>
}

const SESSION_QUERY = gql`
  query DontPanicSession($id: ID!) {
    dontPanicSession(id: $id) {
      id
      name
      lastName
      email
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
  mutation CreateDontPanicSession(
    $name: String!
    $lastName: String
    $email: String
    $currentInsurer: String!
  ) {
    createDontPanicSession(
      name: $name
      lastName: $lastName
      email: $email
      currentInsurer: $currentInsurer
    ) {
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
      <>
        <TopBarFiller />
        <EmptyTopBar />
        <Wrapper>
          <DontPanicContainer>
            {({
              steps,
              initialVisibleSteps,
              goToStep,
              name,
              setName,
              lastName,
              setLastName,
              email,
              setEmail,
              currentInsurer,
              setCurrentInsurer,
              sessionId,
              setSessionId,
              isChatActive,
              makeChatActive,
              selectedPremadeQuestion,
              selectPremadeQuestion,
            }) => (
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
                            isCurrentMessage={isCurrentStep(
                              true,
                              'initial',
                              steps,
                            )}
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
                            Det är jag som är Hedvig. Här försöker jag hjälpa
                            dig med allt vad hem och försäkring innebär. Innan
                            jag kan det skulle behöva ställa ett par frågor
                            dock. Men don't panic! Det tar bara några sekunder.
                          </ChatMessage>
                        )}
                      </Message>
                      <Message id="initial-response" delay={500}>
                        {({ appear }) => (
                          <UserResponse appear={appear}>
                            {isCurrentStep(false, 'initial-response', steps) &&
                            !email ? (
                              <div>
                                <TrackAction
                                  event={{
                                    name: ApplicationSpecificEvents.COMPLETED,
                                    properties: {
                                      category: 'dont-panic-steps',
                                      label: 'facebook-login',
                                      ...getUtmParamsFromCookie(),
                                    },
                                  }}
                                >
                                  {({ track }) => (
                                    <ReactFacebookLogin
                                      fields="first_name,last_name,email"
                                      textButton="Fortsätt med Facebook"
                                      appId={
                                        process.env.NODE_ENV === 'production'
                                          ? '221855442096816'
                                          : '523826788131113'
                                      }
                                      redirectUri={
                                        typeof window !== 'undefined'
                                          ? window.location.protocol +
                                            '//' +
                                            window.location.host +
                                            '/dont-panic/hedvig'
                                          : undefined
                                      }
                                      callback={(fbData) => {
                                        if (
                                          !fbData ||
                                          !(fbData as any).first_name ||
                                          !(fbData as any).last_name ||
                                          !(fbData as any).email
                                        ) {
                                          return
                                        }

                                        setName((fbData as any).first_name)
                                        setLastName((fbData as any).last_name)
                                        setEmail((fbData as any).email)
                                        goToStep({
                                          id: 'current-insurer',
                                          isHedvig: true,
                                        })
                                        track()
                                      }}
                                      cssClass={facebookButtonClass}
                                    />
                                  )}
                                </TrackAction>
                              </div>
                            ) : (
                              email && (
                                <button
                                  className={facebookButtonClass}
                                  disabled
                                >
                                  Fortsätt med Facebook
                                </button>
                              )
                            )}
                            {!email && (
                              <div>
                                <TrackAction
                                  event={{
                                    name: ApplicationSpecificEvents.COMPLETED,
                                    properties: {
                                      category: 'dont-panic-steps',
                                      label: 'continue-without-facebook',
                                      ...getUtmParamsFromCookie(),
                                    },
                                  }}
                                >
                                  {({ track }) => (
                                    <ContinueWithoutFacebook
                                      onClick={() => {
                                        if (
                                          isCurrentStep(
                                            false,
                                            'initial-response',
                                            steps,
                                          )
                                        ) {
                                          goToStep({
                                            id: 'name',
                                            isHedvig: true,
                                          })
                                          track()
                                        }
                                      }}
                                      disabled={
                                        !isCurrentStep(
                                          false,
                                          'initial-response',
                                          steps,
                                        )
                                      }
                                    >
                                      Jag har inte Facebook
                                    </ContinueWithoutFacebook>
                                  )}
                                </TrackAction>
                              </div>
                            )}
                          </UserResponse>
                        )}
                      </Message>

                      <Message id="name">
                        {({ appear }) => (
                          <ChatMessage
                            isCurrentMessage={isCurrentStep(
                              true,
                              'name',
                              steps,
                            )}
                            typingDuration={1000}
                            appear={appear}
                            onTyped={() => {
                              goToStep({
                                id: 'name-response',
                                isHedvig: false,
                              })
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
                                  placeholder="Hedvig"
                                  size={Math.max(10, name ? name.length : 0)}
                                  value={name || ''}
                                  onChange={(e) => {
                                    if (
                                      steps[steps.length - 1].id ===
                                      'name-response'
                                    ) {
                                      setName(e.currentTarget.value)
                                    }
                                  }}
                                  name="first-name"
                                />
                              </Spacing>
                              {steps[steps.length - 1].id ===
                                'name-response' && (
                                <Button
                                  background={colors.PURPLE}
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
                            Hej {name}, trevligt att träffas! Är du försäkrad
                            idag?
                          </ChatMessage>
                        )}
                      </Message>
                      <Message id="current-insurer-response" delay={300}>
                        {({ appear }) => (
                          <UserResponse appear={appear}>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault()
                                goToStep({
                                  id: 'first-message',
                                  isHedvig: true,
                                })
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
                                  background={colors.PURPLE}
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
                          <TrackAction
                            event={{
                              name: ApplicationSpecificEvents.COMPLETED,
                              properties: {
                                category: 'dont-panic-steps',
                                label: 'session-initiated',
                                ...getUtmParamsFromCookie(),
                              },
                            }}
                          >
                            {({ track }) => (
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
                                        variables: {
                                          name,
                                          lastName: lastName || '',
                                          email: email || '',
                                          currentInsurer,
                                        },
                                      })
                                      goToStep({
                                        id: 'question-examples',
                                        isHedvig: true,
                                      })
                                      track()
                                    }}
                                  >
                                    {currentInsurer !== 'NO' &&
                                    currentInsurer !== 'Hedvig' ? (
                                      <>
                                        👀
                                        <br />
                                        Okej! Vi svarar såklart på dina frågor
                                        ändå. Vad har du på hjärtat?
                                      </>
                                    ) : (
                                      <>Cool! Vad är det du undrar över?</>
                                    )}
                                  </ChatMessage>
                                )}
                              </Mutation>
                            )}
                          </TrackAction>
                        )}
                      </Message>

                      <Message id="question-examples" delay={500}>
                        {({ appear }) => (
                          <>
                            <ChatMessage
                              isCurrentMessage={
                                isCurrentStep(
                                  true,
                                  'question-examples',
                                  steps,
                                ) && !isChatActive
                              }
                              typingDuration={2000}
                              appear={appear}
                            >
                              Självklart kan du{' '}
                              <strong>
                                fråga vad som helst som rör hem och försäkring
                              </strong>
                              , men här är <strong>några exempel</strong> på
                              saker jag kan besvara:
                            </ChatMessage>
                            <UserResponse appear={appear} delay={3000}>
                              {PREMADE_QUESTIONS.map((premadeQuestion) => (
                                <PremadeQuestionButtonWrapper
                                  key={premadeQuestion.id}
                                >
                                  <PremadeQuestionButton
                                    type="button"
                                    border={`1px solid ${colors.BLACK_PURPLE}`}
                                    background={
                                      selectedPremadeQuestion ===
                                      premadeQuestion.id
                                        ? colors.BLACK_PURPLE
                                        : 'transparent'
                                    }
                                    foreground={
                                      selectedPremadeQuestion ===
                                      premadeQuestion.id
                                        ? colors.WHITE
                                        : colors.BLACK_PURPLE
                                    }
                                    onClick={(e) => {
                                      if (
                                        selectedPremadeQuestion !== undefined
                                      ) {
                                        return
                                      }
                                      e.preventDefault()
                                      setMessageText(
                                        (
                                          messageText +
                                          ' ' +
                                          premadeQuestion.question
                                        ).trim(),
                                      )
                                      selectPremadeQuestion(premadeQuestion.id)
                                    }}
                                  >
                                    {premadeQuestion.question}
                                  </PremadeQuestionButton>
                                </PremadeQuestionButtonWrapper>
                              ))}
                            </UserResponse>
                          </>
                        )}
                      </Message>
                    </Conversation>

                    {(Boolean(sessionId) ||
                      steps
                        .map(({ id }) => id)
                        .includes('question-examples')) && (
                      <>
                        <Query<{ dontPanicSession?: Session }>
                          query={SESSION_QUERY}
                          pollInterval={1000}
                          variables={{ id: sessionId }}
                        >
                          {({ data, error }) => (
                            <Container<{
                              initialVisibleConversationSteps: string[]
                            }>
                              initialState={{
                                initialVisibleConversationSteps:
                                  (data &&
                                    data.dontPanicSession &&
                                    data.dontPanicSession.chatMessages.map(
                                      ({ id }) => id,
                                    )) ||
                                  [],
                                latestConversationSteps:
                                  data &&
                                  data.dontPanicSession &&
                                  data.dontPanicSession.chatMessages,
                              }}
                            >
                              {({ initialVisibleConversationSteps }) => (
                                <>
                                  <Notifier
                                    chatMessages={
                                      (data &&
                                        data.dontPanicSession &&
                                        data.dontPanicSession.chatMessages) ||
                                      []
                                    }
                                  />
                                  {error && (
                                    <Error>
                                      Ojdå... Något gick visst fel
                                      konversationen skulle laddas :(
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
                                        data!.dontPanicSession!.chatMessages
                                          .length > 0
                                          ? data!.dontPanicSession!
                                              .chatMessages[
                                              data!.dontPanicSession!
                                                .chatMessages.length - 1
                                            ].id
                                          : ''
                                      }
                                    >
                                      {data!.dontPanicSession!.chatMessages.map(
                                        (message) => (
                                          <Message
                                            id={message.id}
                                            key={message.id}
                                          >
                                            {({ appear }) => {
                                              if (message.type === 'onboard') {
                                                return (
                                                  <TrackAction
                                                    event={{
                                                      name:
                                                        ApplicationSpecificEvents.COMPLETED,
                                                      properties: {
                                                        category:
                                                          'dont-panic-steps',
                                                        label:
                                                          'onboarding-clicked',
                                                        ...getUtmParamsFromCookie(),
                                                      },
                                                    }}
                                                  >
                                                    {({ track }) => (
                                                      <OnboardingMessage
                                                        to={`/new-member/hedvig?firstName=${name}&lastName=${lastName ||
                                                          ''}&initialInsurer=${currentInsurer}`}
                                                        onClick={track}
                                                      >
                                                        {message.text}
                                                      </OnboardingMessage>
                                                    )}
                                                  </TrackAction>
                                                )
                                              }

                                              return (
                                                <ChatMessage
                                                  isCurrentMessage={isCurrentStep(
                                                    true,
                                                    message.id,
                                                    data!.dontPanicSession!
                                                      .chatMessages,
                                                  )}
                                                  typingDuration={
                                                    message.isHedvig ? 2000 : 0
                                                  }
                                                  appear={appear}
                                                  isHedvig={message.isHedvig}
                                                >
                                                  {message.text
                                                    .split('\n')
                                                    .map(
                                                      (text, i, { length }) => {
                                                        if (
                                                          message.type ===
                                                          'link'
                                                        ) {
                                                          return (
                                                            <a
                                                              key={i}
                                                              href={
                                                                message.text
                                                              }
                                                              target="_blank"
                                                            >
                                                              {message.text}
                                                            </a>
                                                          )
                                                        }

                                                        return (
                                                          <React.Fragment
                                                            key={i}
                                                          >
                                                            {text}
                                                            {i < length - 1 && (
                                                              <br />
                                                            )}
                                                          </React.Fragment>
                                                        )
                                                      },
                                                    )}
                                                </ChatMessage>
                                              )
                                            }}
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
                            <TrackAction
                              event={{
                                name: ApplicationSpecificEvents.COMPLETED,
                                properties: {
                                  category: 'dont-panic-steps',
                                  label: 'message-sent',
                                  ...getUtmParamsFromCookie(),
                                },
                              }}
                            >
                              {({ track }) => (
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
                                        track()
                                        const popAudio = new Audio(
                                          '/new-member-assets/audio/pop.mp3',
                                        )
                                        popAudio.volume = 0.3
                                        return popAudio.play()
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
                                          onKeyDown={(e) => {
                                            if (
                                              window.matchMedia(
                                                '(max-width: 800px)',
                                              ).matches
                                            ) {
                                              return
                                            }
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
                                          foreground={colors.PURPLE}
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
                            </TrackAction>
                          </MessageBoxWrapper>
                        </MessageFormWrapper>
                      </>
                    )}
                  </>
                )}
              </Container>
            )}
          </DontPanicContainer>
        </Wrapper>
      </>
    )
  }
}
