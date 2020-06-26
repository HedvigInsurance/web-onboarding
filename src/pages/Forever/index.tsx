import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { CurrentLocale } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { LOCALE_PATH_PATTERN } from 'routes'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { Intro } from './components/Intro'
import { RedeemCode } from './components/RedeemCode'

type ForeverProps = RouteComponentProps<{
  code: string
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

export const Forever: React.FC<ForeverProps> = ({
  match: {
    params: { code },
  },
}) => {
  const textKeys = useTextKeys()
  return (
    <>
      <Helmet>
        <title>{textKeys.FOREVER_LANDINGPAGE_TITLE()}</title>
        <meta
          property="og:title"
          content={textKeys.FOREVER_LANDINGPAGE_TITLE()}
        />
        <meta
          property="og:description"
          content={textKeys.FOREVER_LANDINGPAGE_DESCRIPTION()}
        />
        <meta
          property="og:image"
          content="https://www.hedvig.com/new-member-assets/social/hedvig-hemforsakring-2.jpg"
        />
      </Helmet>
      <Page>
        <Global
          styles={css`
            body {
              background-color: ${colorsV3.gray900};
            }
          `}
        />
        <CurrentLocale>
          {({ currentLocale }) => (
            <PageWrapper>
              <Header>
                <LogoLink href={'/' + currentLocale}>
                  <HedvigLogo width={94} />
                </LogoLink>
              </Header>
              <Switch>
                <Route
                  exact
                  path={LOCALE_PATH_PATTERN + '/forever/:code'}
                  render={() => <RedeemCode code={code} />}
                />
                <Route
                  path={LOCALE_PATH_PATTERN + '/forever/:code/intro'}
                  component={Intro}
                />
              </Switch>
            </PageWrapper>
          )}
        </CurrentLocale>
      </Page>
    </>
  )
}
