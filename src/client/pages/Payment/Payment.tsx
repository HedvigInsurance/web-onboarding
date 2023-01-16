import React from 'react'
import styled from '@emotion/styled'
import { fonts, colorsV3 } from '@hedviginsurance/brand'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { LocaleData } from 'l10n/locales'
import { useCreateTrustlyURL } from './useCreateTrustlyURL'
import { TrustlyIframe } from './TrustlyIframe'
import { useStoredRedirectURL } from './useStoredRedirectURL'

const CUSTOMER_SERVIVE_URL: Partial<Record<LocaleData['path'], string>> = {
  se: '/se/hjalp/kundservice',
  'se-en': '/se-en/help/customer-service',
}

export const PaymentPage = () => {
  const textKeys = useTextKeys()
  const { path: pathLocale } = useCurrentLocale()
  const redirectURL = useStoredRedirectURL()
  const [, trustlyURL] = useCreateTrustlyURL()

  const handleSuccess = (baseRedirectURL: string) => {
    window.location.assign(`${baseRedirectURL}/success`)
  }

  const handleFail = (baseRedirectURL: string) => {
    window.location.assign(`${baseRedirectURL}/fail`)
  }

  return (
    <SessionTokenGuard>
      <Wrapper>
        <PageHeader>
          <HedvigLogo width={82} />

          <HeaderLink
            href={CUSTOMER_SERVIVE_URL[pathLocale]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {textKeys.AFTER_SIGN_PAYMENT_HELP_LINK()}
          </HeaderLink>
        </PageHeader>
        <Header>
          <Heading>{textKeys.ONBOARDING_CONNECT_DD_CTA()}</Heading>
          <Paragraph>{textKeys.AFTER_SIGN_PAYMENT_MESSAGE()}</Paragraph>
        </Header>
        {!redirectURL ? (
          <Paragraph>{textKeys.GENERIC_ERROR_HEADING()}</Paragraph>
        ) : (
          trustlyURL && (
            <TrustlyIframe
              url={trustlyURL}
              onSuccess={() => handleSuccess(redirectURL)}
              onFail={() => handleFail(redirectURL)}
            />
          )
        )}
      </Wrapper>
    </SessionTokenGuard>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  paddingBottom: '2rem',
})

const PageHeader = styled.div({
  height: '3.5rem',
  paddingInline: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [MEDIA_QUERIES.mediumScreen]: {
    paddingInline: '2rem',
  },
})

const HeaderLink = styled.a({
  color: colorsV3.gray900,
  textDecoration: 'none',

  ':hover': {
    color: colorsV3.gray900,
    textDecoration: 'underline',
  },
})

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '37rem',
  paddingInline: '1rem',
  marginInline: 'auto',

  [MEDIA_QUERIES.mediumScreen]: {
    gap: '1.5rem',
  },
})

const Heading = styled.h1({
  margin: 0,
  fontSize: '2rem',
  textAlign: 'center',
  fontFamily: fonts.HEDVIG_LETTERS_STANDARD,
  fontWeight: 400,

  [MEDIA_QUERIES.mediumScreen]: {
    fontSize: '3rem',
  },
})

const Paragraph = styled.p({
  margin: 0,
  fontSize: '1rem',
  lineHeight: 1.5,
  textAlign: 'center',
  color: colorsV3.gray600,
})
