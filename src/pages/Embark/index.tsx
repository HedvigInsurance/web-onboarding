import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import {
  EmbarkProvider,
  Header,
  Passage,
  useEmbark,
} from '@hedviginsurance/embark'
import * as React from 'react'
import { useHistory } from 'react-router'

import { colorsV2 } from '@hedviginsurance/brand'
import { StorageContainer } from '../../utils/StorageContainer'
import { createQuote } from './createQuote'
import { resolveHouseInformation } from './houseInformation'
import { resolvePersonalInformation } from './personalInformation'

const EmbarkStyling = styled.div`
  height: 100vh;
  background-color: ${colorsV2.gray};

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

const EmbarkBackgroundContainer = styled.picture<{
  backgroundHasLoaded: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: opacity 1s;
  transition-delay: 150ms;
  ${(props) => `opacity: ${props.backgroundHasLoaded ? 1 : 0}`};
`

const EmbarkBackground = styled.img`
  postion: fixed;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  object-fit: cover;
`

const PassageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`

interface EmbarkProps {
  data: any
  name: string
  baseUrl: string
}

const Embark: React.FunctionComponent<EmbarkProps> = (props) => {
  const history = useHistory()
  const {
    reducer: [state, dispatch],
    goTo,
  } = useEmbark(() => {
    if (
      history.location.state &&
      props.name === history.location.state.embarkPassageName
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

  const [backgroundHasLoaded, setBackgroundHasLoaded] = React.useState(false)

  return (
    <EmbarkStyling>
      <Global
        styles={css`
          body {
            overflow: hidden;
          }
        `}
      />
      <EmbarkBackgroundContainer backgroundHasLoaded={backgroundHasLoaded}>
        <EmbarkBackground
          onLoad={() => setBackgroundHasLoaded(true)}
          sizes="(max-width: 1400px) 100vw, 1400px"
          srcSet="
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_200.jpg 200w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_481.jpg 481w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_677.jpg 677w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_858.jpg 858w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1013.jpg 1013w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1161.jpg 1161w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1296.jpg 1296w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1393.jpg 1393w,
/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1400.jpg 1400w"
          src="/new-member-assets/embark/orange-juice-copy_3x_xybd1d_c_scale,w_1400.jpg"
        />
      </EmbarkBackgroundContainer>
      <PassageContainer>
        <StorageContainer>
          {({ session }) => (
            <Header
              partnerName={
                (session &&
                  session.getSession() &&
                  session.getSession()!.partner) ||
                null
              }
              passage={currentPassage}
              storyData={state.data}
            />
          )}
        </StorageContainer>
        <Passage
          canGoBack={state.history.length > 1}
          historyGoBackListener={(goBack) =>
            history.listen((_: any, action: string) => {
              if (action === 'POP' && state.history.length > 1) {
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
      </PassageContainer>
    </EmbarkStyling>
  )
}

interface EmbarkRootProps {
  name: string
  baseUrl: string
}

export const EmbarkRoot: React.FunctionComponent<EmbarkRootProps> = (props) => {
  const history = useHistory()
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

  if (!data || !initialStore) {
    return null
  }

  return (
    <StorageContainer>
      {(storageState) => (
        <EmbarkProvider
          externalRedirects={{
            Offer: () => {
              history.push('/new-member/offer')
            },
          }}
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
