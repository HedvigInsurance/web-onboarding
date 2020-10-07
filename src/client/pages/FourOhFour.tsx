import styled from '@emotion/styled'
import { LazyLottie } from 'components/animations/LazyLottie'
import { TopBar } from 'components/TopBar'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { useTextKeys } from 'utils/textKeys'

const FourOhFourWrapper = styled('div')({
  textAlign: 'center',
  padding: 20,
  paddingTop: '5rem',
})

const LinksWrapper = styled('div')({
  paddingTop: 50,
})

const LottieWrapper = styled('div')({
  width: '80%',
  maxWidth: 300,
  margin: 'auto',
  minHeight: 250,
})

export const FourOhFour: React.FunctionComponent<RouteComponentProps<
  Record<string, string>
>> = ({ staticContext }) => {
  if (staticContext) {
    staticContext.statusCode = 404
  }
  const textKeys = useTextKeys()

  return (
    <>
      <Helmet>
        <title>{textKeys.FOUR_OH_FOUR_PAGE_TITLE()}</title>
      </Helmet>

      <TopBar />
      <FourOhFourWrapper>
        <h1>{textKeys.FOUR_OH_FOUR_HEADLINE()}</h1>
        <LottieWrapper>
          <LazyLottie
            options={{
              animationData: import(
                /* webpackChunkName: 'animation-sad' */ 'components/animations/sad-hedvig.json'
              ),
              autoplay: true,
              loop: false,
            }}
            width="100%"
          />
        </LottieWrapper>
        <LinksWrapper>
          <div
            dangerouslySetInnerHTML={{ __html: textKeys.FOUR_OH_FOUR_LINKS() }}
          />
        </LinksWrapper>
      </FourOhFourWrapper>
    </>
  )
}
