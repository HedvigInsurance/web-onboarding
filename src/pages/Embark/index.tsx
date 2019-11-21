import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import {
  useGoTo,
  Header,
  KeyValueStore,
  Passage,
} from '@hedviginsurance/embark'
import * as React from 'react'

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

const EmbarkStyling = styled.div`
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

interface EmbarkProps {
  name: string
}

const Embark: React.FunctionComponent<EmbarkProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, {
    history: [],
    passageId: null,
    data: null,
  })

  const goTo = useGoTo(state.data, (targetPassageId) => {
    dispatch({
      type: 'GO_TO',
      passageId: targetPassageId,
    })
  })

  React.useEffect(() => {
    // TODO load this via GraphQL
    fetch(
      `https://hedvig-embark.herokuapp.com/angel-data/angel-data?name=${encodeURIComponent(
        props.name,
      )}`,
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
    (passage: any) => passage.id === state.passageId,
  )[0]

  return (
    <EmbarkStyling>
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
    </EmbarkStyling>
  )
}

export const EmbarkRoot: React.FunctionComponent<EmbarkProps> = (props) => (
  <KeyValueStore>
    <Embark name={props.name} />
  </KeyValueStore>
)
