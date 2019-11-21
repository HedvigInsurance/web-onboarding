import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import {
  EmbarkProvider,
  Header,
  Passage,
  useGoTo,
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
  data: any
}

const Embark: React.FunctionComponent<EmbarkProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, null, () => ({
    history: [props.data.startPassage],
    passageId: props.data.startPassage,
    data: props.data,
  }))

  const goTo = useGoTo(state.data, (targetPassageId) => {
    dispatch({
      type: 'GO_TO',
      passageId: targetPassageId,
    })
  })

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

interface EmbarkRootProps {
  name: string
}

export const EmbarkRoot: React.FunctionComponent<EmbarkRootProps> = (props) => {
  const [data, setData] = React.useState<null | any>(null)

  React.useEffect(() => {
    // TODO load this via GraphQL
    fetch(
      `https://hedvig-embark.herokuapp.com/angel-data?name=${encodeURIComponent(
        props.name,
      )}`,
    )
      .then((res) => res.json())
      .then((angelData) => {
        setData(angelData)
      })
  }, [])

  if (!data) {
    return null
  }

  return (
    <EmbarkProvider data={data}>
      <Embark data={data} />
    </EmbarkProvider>
  )
}
