import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionContainer } from 'containers/SessionContainer'
import { useRedeemCodeV2Mutation } from 'data/graphql'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps, useHistory } from 'react-router'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { captureSentryError } from 'utils/sentry-client'
import { Loading } from './components/Loading'
import { RedeemCode, RedeemCodeFormValue } from './components/RedeemCode'

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
  const history = useHistory()
  const currentLocale = useCurrentLocale()
  const [redeemCode] = useRedeemCodeV2Mutation()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (
    form: RedeemCodeFormValue,
    actions: FormikHelpers<RedeemCodeFormValue>,
  ) => {
    setIsLoading(true)
    try {
      const result = await redeemCode({ variables: { code: form.code } })
      if (!result) {
        return
      }

      if (result.errors && result.errors.length > 0) {
        // TODO handle errors
        actions.setFieldError('code', 'FOREVER_ADD_CODE_ERROR')
        return
      }
      // TODO redirect to success screens
      history.push(`/${currentLocale}/new-member`)
    } catch (e) {
      // tslint:disable-next-line no-console
      captureSentryError(e)
    } finally {
      setIsLoading(false)
    }
  }

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
                <LogoLink href={'/' + currentLocale}>
                  <HedvigLogo width={94} />
                </LogoLink>
              </Header>
              {isLoading && <Loading />}
              {!isLoading && (
                <RedeemCode referralCode={code} onSubmit={handleSubmit} />
              )}
            </PageWrapper>
          </Page>
        )}
      </SessionContainer>
    </>
  )
}
