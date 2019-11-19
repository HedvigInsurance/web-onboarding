import styled from '@emotion/styled'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { LazyLottie } from '../components/animations/LazyLottie'

const FourOhFourWrapper = styled('div')({
  textAlign: 'center',
  padding: 20,
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

export const FourOhFour: React.SFC<RouteComponentProps<{}>> = ({
  staticContext,
}) => {
  if (staticContext) {
    staticContext.statusCode = 404
  }

  return (
    <>
      <TranslationsConsumer textKey="FOUR_OH_FOUR_PAGE_TITLE">
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </TranslationsConsumer>

      <FourOhFourWrapper>
        <h1>
          <TranslationsConsumer textKey="FOUR_OH_FOUR_HEADLINE">
            {(t) => t}
          </TranslationsConsumer>
        </h1>
        <LottieWrapper>
          <LazyLottie
            options={{
              animationData: import('../components/hedvig/sad.json'),
              autoplay: true,
              loop: false,
            }}
            width="100%"
          />
        </LottieWrapper>
        <LinksWrapper>
          <TranslationsConsumer textKey="FOUR_OH_FOUR_LINKS">
            {(text) => <div dangerouslySetInnerHTML={{ __html: text }} />}
          </TranslationsConsumer>
        </LinksWrapper>
      </FourOhFourWrapper>
    </>
  )
}
