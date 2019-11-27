import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import {
  EmbarkProvider,
  Header,
  Passage,
  useGoTo,
} from '@hedviginsurance/embark'
import * as React from 'react'
import { useHistory } from 'react-router'

import { StorageContainer } from '../../utils/StorageContainer'
import { createQuote } from './createQuote'
import { resolveHouseInformation } from './houseInformation'
import { resolvePersonalInformation } from './personalInformation'

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
      if (state.passageId == action.passageId) {
        return state
      }

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
  height: 100vh;

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
  name: string
  baseUrl: string
}

const Embark: React.FunctionComponent<EmbarkProps> = (props) => {
  const history = useHistory()
  const [state, dispatch] = React.useReducer(reducer, null, () => {
    if (
      history.location.state &&
      props.name == history.location.state.embarkPassageName
    ) {
      return {
        history: history.location.state.embarkPassageHistory || [
          props.data.startPassage,
        ],
        passageId:
          history.location.state.embarkPassageId || props.data.startPassage,
        data: props.data,
      }
    }

    return {
      history: [props.data.startPassage],
      passageId: props.data.startPassage,
      data: props.data,
    }
  })

  const goTo = useGoTo(state.data, (targetPassageId) => {
    dispatch({
      type: 'GO_TO',
      passageId: targetPassageId,
    })
  })

  const currentPassage = state.data.passages.find(
    (passage: any) => passage.id === state.passageId,
  )

  React.useEffect(() => {
    history.push(
      `${props.baseUrl}${currentPassage.url || `/${currentPassage.id}`}`,
      {
        embarkPassageId: currentPassage.id,
        embarkPassageHistory: state.history,
        embarkPassageName: props.name,
      },
    )
  }, [currentPassage])

  return (
    <EmbarkStyling>
      <Header passage={currentPassage} storyData={state.data} />
      <Passage
        canGoBack={state.history.length > 1}
        historyGoBackListener={(goBack) =>
          history.listen((_: any, action: string) => {
            if (action == 'POP' && state.history.length > 1) {
              goBack()
            }
          })
        }
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
  baseUrl: string
}

export const EmbarkRoot: React.FunctionComponent<EmbarkRootProps> = (props) => {
  const [data, setData] = React.useState<null | any>(null)
  const [initialStore, setInitialStore] = React.useState<null | {
    [key: string]: any
  }>()

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

  React.useEffect(() => {
    const prevStore = window.localStorage.getItem(
      `embark-store-${encodeURIComponent(props.name)}`,
    )

    if (!prevStore) {
      setInitialStore({})
      return
    }

    try {
      const parsedPrevStore = JSON.parse(prevStore)
      setInitialStore(parsedPrevStore as { [key: string]: any })
    } catch (err) {
      setInitialStore({})
    }
  }, [])

  if (!data) {
    return null
  }

  return (
    <StorageContainer>
      {(storageState) => (
        <EmbarkProvider
          data={data}
          resolvers={{
            personalInformationApi: resolvePersonalInformation,
            houseInformation: resolveHouseInformation,
            createQuote: createQuote(storageState),
          }}
          initialStore={initialStore}
          onStoreChange={(store) => {
            window.localStorage.setItem(
              `embark-store-${encodeURIComponent(props.name)}`,
              JSON.stringify(store),
            )
          }}
        >
          <Embark baseUrl={props.baseUrl} data={data} name={props.name} />
        </EmbarkProvider>
      )}
    </StorageContainer>
  )
}
