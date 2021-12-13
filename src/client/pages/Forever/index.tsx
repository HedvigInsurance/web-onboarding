import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { Page } from 'components/utils/Page'
import { SessionContainer } from 'containers/SessionContainer'
import { useUpdatePickedLocaleMutation } from 'data/graphql'
import { Intro } from 'pages/Forever/components/Intro'
import { localePathPattern } from 'l10n/localePathPattern'
import { useTextKeys } from 'utils/textKeys'
import { useStorage } from 'utils/StorageContainer'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { RedeemCode } from './components/RedeemCode'
import { useRedeemCode } from './useRedeemCode'

type ForeverProps = RouteComponentProps<{
  code: string
  locale: string
}>

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 1.625rem;
  padding-right: 1.625rem;
  color: ${colorsV3.gray500};
  background-color: ${colorsV3.gray900};

  @media (min-width: 800px) {
    padding-left: 3.75rem;
    padding-right: 3.75rem;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 1.25rem;
  padding-bottom: 1.15rem;

  @media (min-width: 800px) {
    justify-content: space-between;
    padding-top: 2.5rem;
  }
`

const LogoLink = styled.a`
  color: ${colorsV3.gray100};
`

export const OldForeverPage: React.FC<ForeverProps> = ({
  match: {
    params: { code },
  },
}) => {
  const { isoLocale, path: pathLocale } = useCurrentLocale()
  const textKeys = useTextKeys()
  const { handleSubmit } = useRedeemCode()
  const [updatePickedLocale] = useUpdatePickedLocaleMutation({
    variables: {
      pickedLocale: isoLocale,
    },
  })
  const storage = useStorage()
  const hasToken = Boolean(storage?.session?.getSession()?.token)
  useEffect(() => {
    if (!hasToken) {
      return
    }
    updatePickedLocale()
  }, [isoLocale, updatePickedLocale, hasToken])

  return (
    <>
      <Helmet>
        <title>{textKeys.FOREVER_LANDINGPAGE_TITLE()}</title>
        <meta property="og:image" content="" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <SessionContainer>
        {() => (
          <Page>
            <Global
              styles={css`
                body {
                  background-color: ${colorsV3.gray900};
                }
              `}
            />
            <PageWrapper>
              <Header>
                <LogoLink href={'/' + pathLocale}>
                  <HedvigLogo width={94} />
                </LogoLink>
              </Header>

              <Switch>
                <Route
                  path={localePathPattern + '/forever/:code?'}
                  exact
                  render={() => (
                    <RedeemCode referralCode={code} onSubmit={handleSubmit} />
                  )}
                />
                <Route
                  path={localePathPattern + '/forever/:code/intro'}
                  component={Intro}
                />
              </Switch>
            </PageWrapper>
          </Page>
        )}
      </SessionContainer>
    </>
  )
}

const QuoteCartForeverPage: React.FC<ForeverProps> = ({
  match: {
    params: { code },
  },
}) => {
  const { path: pathLocale } = useCurrentLocale()
  const textKeys = useTextKeys()

  return (
    <>
      <Helmet>
        <title>{textKeys.FOREVER_LANDINGPAGE_TITLE()}</title>
        <meta property="og:image" content="" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Page>
        <Global
          styles={css`
            body {
              background-color: ${colorsV3.gray900};
            }
          `}
        />
        <PageWrapper>
          <Header>
            <LogoLink href={'/' + pathLocale}>
              <HedvigLogo width={94} />
            </LogoLink>
          </Header>

          <Switch>
            <Route
              path={localePathPattern + '/forever/:code?'}
              exact
              render={() => (
                <RedeemCode
                  referralCode={code}
                  onSubmit={() => console.log('submit')}
                />
              )}
            />
            <Route
              path={localePathPattern + '/forever/:code/intro'}
              component={Intro}
            />
          </Switch>
        </PageWrapper>
      </Page>
    </>
  )
}

export const Forever = (props: ForeverProps) => {
  const [isUsingQuoteCartApi] = useFeature([Features.QUOTE_CART_API])
  return isUsingQuoteCartApi ? (
    <QuoteCartForeverPage {...props} />
  ) : (
    <OldForeverPage {...props} />
  )
}
