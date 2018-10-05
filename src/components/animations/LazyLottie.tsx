import { Action, Container, StateUpdater } from 'constate'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import ReactLottieComponent, { ReactLottieProps } from 'react-lottie'

interface State {
  animationData: any | null
  ReactLottie: (typeof ReactLottieComponent) | null
}

interface Actions {
  setLoadedAnimationData: Action<State, any>
  setLoadedLottie: (
    ReactLottie: typeof ReactLottieComponent,
  ) => StateUpdater<State>
}

export const LazyLottie: React.SFC<ReactLottieProps> = (props) =>
  process.env.NODE_ENV === 'test' ? null : (
    <Container<State, Actions>
      initialState={{ animationData: null, ReactLottie: null }}
      actions={{
        setLoadedAnimationData: (animationData: any) => ({ animationData }),
        setLoadedLottie: (ReactLottie: typeof ReactLottieComponent) => ({
          ReactLottie,
        }),
      }}
    >
      {({
        animationData,
        setLoadedAnimationData,
        ReactLottie,
        setLoadedLottie,
      }: State & Actions) => (
        <Mount
          on={() => {
            props.options.animationData.then(setLoadedAnimationData)
            import('react-lottie').then((lottieModule) => {
              if (!lottieModule || !lottieModule.default) {
                return
              }

              setLoadedLottie(lottieModule.default)
            })
          }}
        >
          {animationData !== null && ReactLottie !== null ? (
            <ReactLottie
              {...props}
              options={{ ...props.options, animationData }}
            />
          ) : null}
        </Mount>
      )}
    </Container>
  )
