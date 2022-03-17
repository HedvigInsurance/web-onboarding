import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps, useHistory } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { FormikHelpers } from 'formik'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { Page } from 'components/utils/Page'
import { useCampaignQuery } from 'data/graphql'
import { Intro } from 'pages/Forever/components/Intro'
import { localePathPattern } from 'l10n/localePathPattern'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { captureSentryError } from 'utils/sentry-client'
import { CampaignCode } from 'utils/campaignCode'
import { RedeemCode, RedeemCodeFormValue } from './components/RedeemCode'

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
  color: ${colorsV3.gray900};
  background-color: ${colorsV3.white};

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
  color: ${colorsV3.gray900};
`

export const Forever: React.FC<ForeverProps> = ({
  match: {
    params: { code },
  },
}) => {
  const { path: pathLocale } = useCurrentLocale()
  const textKeys = useTextKeys()
  const history = useHistory()

  const { refetch: fetchCampaign } = useCampaignQuery({ skip: true })

  const handleSubmit = async (
    form: RedeemCodeFormValue,
    actions: FormikHelpers<RedeemCodeFormValue>,
  ) => {
    const { code } = form
    try {
      const result = await fetchCampaign({ code })
      if (result.data.campaign?.code) {
        CampaignCode.save(code)
        history.push({ pathname: `/${pathLocale}/new-member` })
      } else {
        actions.setErrors({ code: 'FOREVER_ERROR_GENERIC' })
      }
    } catch (error) {
      captureSentryError(error)
      actions.setErrors({ code: 'FOREVER_ERROR_GENERIC' })
    }
  }

  return (
    <>
      <Helmet>
        <title>{textKeys.FOREVER_LANDINGPAGE_TITLE()}</title>
        <meta property="og:image" content="" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Page>
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
    </>
  )
}
