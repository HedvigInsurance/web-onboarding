import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { LocaleData } from 'l10n/locales'
import { Space } from 'components/Space'
import { useCreateTrustlyURL } from './useCreateTrustlyURL'
import { TrustlyIframe } from './TrustlyIframe'
import { useStoredRedirectURL } from './useStoredRedirectURL'
import { Breadcrumbs } from './Breadcrumbs'
import { TickIcon } from './TickIcon'

const CUSTOMER_SERVIVE_URL: Partial<Record<LocaleData['path'], string>> = {
  se: '/se/hjalp/kundservice',
  'se-en': '/se-en/help/customer-service',
}

export const PaymentPage = () => {
  const textKeys = useTextKeys()
  const { path: pathLocale } = useCurrentLocale()
  const redirectURL = useStoredRedirectURL()
  const [, trustlyURL] = useCreateTrustlyURL()

  const [showSuccess, setShowSuccess] = useState(false)
  const handleSuccess = (baseRedirectURL: string) => {
    setShowSuccess(true)
    window.location.assign(`${baseRedirectURL}/success`)
  }

  const handleFail = (baseRedirectURL: string) => {
    window.location.assign(`${baseRedirectURL}/fail`)
  }

  if (showSuccess) {
    return (
      <Centered>
        <TickIcon size="4rem" />
        <Text>{textKeys.AFTER_SIGN_PAYMENT_SUCCESS_MESSAGE()}</Text>
      </Centered>
    )
  }

  return (
    <SessionTokenGuard>
      <Wrapper y={2.5}>
        <PageHeader>
          <HeaderLogo>
            <HedvigLogo width={78} />
          </HeaderLogo>
          <HeaderBreadcrumbs>
            <Breadcrumbs
              nextStep={
                redirectURL?.includes('/switching')
                  ? 'switching'
                  : 'confirmation'
              }
            />
          </HeaderBreadcrumbs>
          <HeaderBack>
            <HeaderLink
              href={CUSTOMER_SERVIVE_URL[pathLocale]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {textKeys.AFTER_SIGN_PAYMENT_HELP_LINK()}
            </HeaderLink>
          </HeaderBack>
        </PageHeader>

        <Content y={2.5}>
          <LargeParagraph>
            {textKeys.AFTER_SIGN_PAYMENT_MESSAGE()}
          </LargeParagraph>
          {!redirectURL ? (
            <SmallParagraph>{textKeys.GENERIC_ERROR_HEADING()}</SmallParagraph>
          ) : showSuccess ? null : (
            trustlyURL && (
              <Space y={0.75}>
                <TrustlyIframe
                  url={trustlyURL}
                  onSuccess={() => handleSuccess(redirectURL)}
                  onFail={() => handleFail(redirectURL)}
                />
                <SmallParagraph>
                  {textKeys.AFTER_SIGN_PAYMENT_FOOTNOTE()}
                </SmallParagraph>
              </Space>
            )
          )}
        </Content>
      </Wrapper>
    </SessionTokenGuard>
  )
}

const Wrapper = styled(Space)({
  paddingBottom: '2rem',
  paddingInline: '1rem',
})

const LargeParagraph = styled.p({
  margin: 0,
  fontSize: '1.5rem',
  lineHeight: 1.26,
  letterSpacing: '-1%',
  textAlign: 'center',
  color: colorsV3.gray900,
})

const SmallParagraph = styled.p({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: 1.4,
  textAlign: 'center',
  color: colorsV3.gray700,
})

const PageHeader = styled.header({
  display: 'grid',
  gridTemplateAreas: `
    'logo back'
    'breadcrumbs breadcrumbs'
  `,
  gridTemplateColumns: '1fr auto',
  gridTemplateRows: '3rem 3rem',
  alignItems: 'center',

  [MEDIA_QUERIES.mediumScreen]: {
    gridTemplateAreas: `
      'logo breadcrumbs back'
    `,
    gridTemplateColumns: '1fr minmax(28rem, 33%) 1fr',
    gridTemplateRows: '3.5rem',
  },
})

const HeaderLogo = styled.div({ gridArea: 'logo' })
const HeaderBreadcrumbs = styled.div({ gridArea: 'breadcrumbs' })
const HeaderBack = styled.div({ gridArea: 'back', justifySelf: 'flex-end' })

const HeaderLink = styled.a({
  backgroundColor: 'hsl(0, 0%, 98%)',
  fontSize: '1.125rem',
  textDecoration: 'none',
  color: colorsV3.gray900,

  ':hover': {
    color: colorsV3.gray900,
    textDecoration: 'underline',
  },

  ':focus-visible': {
    borderRadius: 8,
    boxShadow: 'hsl(0, 0%, 98%) 0 0 0 3px, hsl(0, 0%, 7%) 0 0 0 4px',
  },

  [MEDIA_QUERIES.largeScreen]: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
})

const Content = styled(Space)({
  [MEDIA_QUERIES.mediumSmallScreen]: {
    display: 'grid',
    gridTemplateColumns: 'minmax(28rem, 33%)',
    justifyContent: 'center',
  },
})

const Centered = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  height: '100vh',
})

const Text = styled.p({
  margin: 0,
  fontSize: '1.125rem',
  textAlign: 'center',
  color: colorsV3.gray900,
})
