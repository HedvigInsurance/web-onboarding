import React from 'react'
import styled from '@emotion/styled'
import { fonts, colorsV3 } from '@hedviginsurance/brand'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { useCreateTrustlyURL } from './useCreateTrustlyURL'
import { TrustlyIframe } from './TrustlyIframe'
import { useStoredRedirectURL } from './useStoredRedirectURL'

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
          <LogoLink href={'/' + pathLocale}>
            <HedvigLogo width={82} />
          </LogoLink>
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
  padding: '1rem',
})

const PageHeader = styled.div({
  display: 'flex',
  justifyContent: 'center',
})

const LogoLink = styled.a({
  display: 'block',
  color: 'inherit',
  // remove extra space under child SVG: https://stackoverflow.com/a/51161925
  fontSize: 0,
})

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '37rem',
  margin: '0 auto',
})

const Heading = styled.h1({
  margin: 0,
  fontSize: '1.5rem',
  textAlign: 'center',
  fontFamily: fonts.HEDVIG_LETTERS_STANDARD,
  fontWeight: 400,
})

const Paragraph = styled.p({
  margin: 0,
  fontSize: '1rem',
  lineHeight: 1.5,
  textAlign: 'center',
  color: colorsV3.gray600,
})
