import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { LazyLottie } from 'components/animations/LazyLottie'
import * as React from 'react'

const MEDIA_QUERY_MAX_WIDTH = '@media (max-width: 700px)'

const popIn = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(.95)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
})

interface WithAppear {
  appear?: boolean
}

const Wrapper = styled('div')<WithAppear>(({ appear }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  animation: appear ? 'none' : `${popIn} 300ms forwards`,
  transformOrigin: 'bottom center',
  zIndex: 999,
}))

const InnerWrapper = styled('div')({
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 20,
  textAlign: 'center',
})

const TopHeadline = styled('h1')({
  fontSize: 24,
  margin: 0,

  [MEDIA_QUERY_MAX_WIDTH]: {
    fontSize: 20,
  },
})
const BottomHeadline = styled('h2')({
  fontSize: 40,
  margin: 0,
  marginBottom: 25,

  [MEDIA_QUERY_MAX_WIDTH]: {
    fontSize: 30,
  },
})

const BottomSpacer = styled('div')({
  paddingBottom: '15vh',
})

export const LoadingScreen: React.SFC<WithAppear> = ({ appear }) => (
  <Wrapper appear={appear}>
    <InnerWrapper>
      <TranslationsConsumer textKey="CREATE_OFFER_LOADING_HEADLINE">
        {(t) => <TopHeadline>{t}</TopHeadline>}
      </TranslationsConsumer>
      <TranslationsConsumer textKey="CREATE_OFFER_LOADING_TEXT">
        {(t) => <BottomHeadline>{t}</BottomHeadline>}
      </TranslationsConsumer>
      <LazyLottie
        options={{
          animationData: import('components/animations/lottie/loading.json'),
        }}
        width={300}
        height={100}
      />
      <BottomSpacer />
    </InnerWrapper>
  </Wrapper>
)
