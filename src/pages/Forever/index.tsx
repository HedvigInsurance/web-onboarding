import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionContainer } from 'containers/SessionContainer'
import { useRedeemCodeV2Mutation } from 'data/graphql'
import { FormikHelpers } from 'formik'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps, useHistory } from 'react-router'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { captureSentryError } from 'utils/sentry-client'
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
  const handleSubmit = async (
    form: RedeemCodeFormValue,
    actions: FormikHelpers<RedeemCodeFormValue>,
  ) => {
    try {
      const result = await redeemCode({ variables: { code: form.code } })
      if (!result) {
        return
      }

      if (result.data?.redeemCodeV2.__typename === 'SuccessfulRedeemResult') {
        // TODO redirect to correct success screens
        history.push(`/${currentLocale}/new-member`)
        return
      }
      if (result.data?.redeemCodeV2.__typename === 'CannotRedeemOwnCampaign') {
        actions.setErrors({ code: 'FOREVER_ERROR_CANNOT_REDEEM_OWN_CAMPAIGN' })
        return
      }
      if (
        result.data?.redeemCodeV2.__typename ===
        'CampaignCannotBeCombinedWithExisting'
      ) {
        actions.setErrors({
          code: 'FOREVER_ERROR_CAMPAIGN_CANNOT_BE_COMBINED_WITH_EXISTING',
        })
        return
      }
      if (result.data?.redeemCodeV2.__typename === 'CampaignHasExpired') {
        actions.setErrors({ code: 'FOREVER_ERROR_CAMPAIGN_HAS_EXPIRED' })
        return
      }
      if (
        result.data?.redeemCodeV2.__typename ===
        'MemberIsNotEligibleForCampaign'
      ) {
        actions.setErrors({
          code: 'FOREVER_ERROR_CAMPAIGN_CANNOT_BE_COMBINED_WITH_EXISTING',
        })
        return
      }

      if (result.data?.redeemCodeV2.__typename === 'CampaignDoesNotExist') {
        actions.setErrors({ code: 'FOREVER_ERROR_CAMPAIGN_DOES_NOT_EXIST' })
        return
      }

      if (
        result.data?.redeemCodeV2.__typename ===
        'CannotRedeemCampaignFromDifferentMarket'
      ) {
        actions.setErrors({
          code: 'FOREVER_ERROR_CANNOT_REDEEM_CAMPAIGN_FROM_DIFFERENT_MARKET',
        })
        return
      }

      if (result.errors && result.errors.length > 0) {
        // TODO handle errors
        actions.setErrors({ code: 'FOREVER_ERROR_GENERIC' })
        return
      }
    } catch (e) {
      captureSentryError(e)
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
              <RedeemCode referralCode={code} onSubmit={handleSubmit} />
            </PageWrapper>
          </Page>
        )}
      </SessionContainer>
    </>
  )
}
