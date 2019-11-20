import * as React from 'react'
import {
  Passage,
  Header,
  KeyValueStore,
  goToHook,
} from '@hedviginsurance/embark'
import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'

interface State {
  history: string[]
  passageId: null | string
  data: null | any
}

type Action =
  | { type: 'GO_TO'; passageId: string }
  | { type: 'SET_STATE'; state: State }
  | { type: 'GO_BACK' }

const reducer: (state: State, action: Action) => State = (state, action) => {
  switch (action.type) {
    case 'GO_TO':
      return {
        ...state,
        history: [...state.history, action.passageId],
        passageId: action.passageId,
      }
    case 'GO_BACK':
      const historyLength = state.history.length
      return {
        ...state,
        history: state.history.slice(0, -1),
        passageId: state.history[historyLength - 2],
      }
    case 'SET_STATE':
      return {
        ...action.state,
      }
    default:
      return state
  }
}

export const ChatRoot = () => (
  <KeyValueStore>
    <Chat />
  </KeyValueStore>
)

const ChatStyling = styled.div`
  background-color: ${colors.PINK};

  * {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul,
  li {
    list-style-type: none;
  }
`

const Chat = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    history: [],
    passageId: null,
    data: null,
  })

  const goTo = goToHook(state.data, (targetPassageId) => {
    dispatch({
      type: 'GO_TO',
      passageId: targetPassageId,
    })
  })

  React.useEffect(() => {
    // TODO load this via GraphQL
    fetch(
      'https://hedvig-embark.herokuapp.com/angel-data/angel-data?name=Web%20Onboarding%20-%20Swedish',
    )
      .then((res) => res.json())
      .then((angelData) => {
        dispatch({
          type: 'SET_STATE',
          state: {
            history: [angelData.startPassage],
            passageId: angelData.startPassage,
            data: angelData,
          },
        })
      })
  }, [])

  if (!state.data) {
    return null
  }

  const currentPassage = state.data.passages.filter(
    (passage: any) => passage.id == state.passageId,
  )[0]

  return (
    <ChatStyling>
      <Header passage={currentPassage} storyData={state.data} />
      <Passage
        canGoBack={state.history.length > 1}
        historyGoBackListener={(_) => () => {
          // TODO
        }}
        passage={currentPassage}
        goBack={() => {
          dispatch({
            type: 'GO_BACK',
          })
        }}
        changePassage={goTo}
      />
    </ChatStyling>
  )
}
