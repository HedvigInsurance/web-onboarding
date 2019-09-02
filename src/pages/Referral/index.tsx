import { colors } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { Button } from 'components/buttons'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { MobileContext } from 'utils/mobileContext'
import { createFirebaseLink } from './util'

type ReferralProps = RouteComponentProps<{
  code: string
}>

const PageWrapper = styled('div')({
  '@media (min-width: 700px)': {
    margin: '0 auto',
    maxWidth: 540,
  },
  paddingBottom: 50,
})

const LogoWrapper = styled('a')({
  marginTop: '2.25rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  maxWidth: 100,
})
const Logo = styled('img')({
  width: '100%',
})
const HeroImageWrapper = styled('div')({
  padding: '0 1rem',
})
const HeroImage = styled('img')({
  marginTop: '2.25rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  borderRadius: 5,
})

const Title = styled('h1')({
  textAlign: 'center',
  fontSize: '1.5rem',
  marginLeft: '1rem',
  marginRight: '1rem',
  lineHeight: 1.2,
  '@media (min-width: 700px)': {
    fontSize: '3.5rem',
  },
})

const Paragraph = styled('p')({
  textAlign: 'center',
  color: colors.OFF_BLACK,
  fontSize: '1rem',
  marginLeft: '1rem',
  marginRight: '1rem',
})

const Centered = styled('div')({
  marginTop: 65,
  textAlign: 'center',
})

const CodeWrapper = styled('div')({
  textAlign: 'center',
})

const Code = styled('p')({
  borderRadius: 16,
  border: `solid 1px ${colors.OFF_WHITE}`,
  padding: '8px 16px',
  backgroundColor: colors.OFF_WHITE,
  display: 'inline-block',
  marginTop: 8,
  marginBottom: 8,
  color: colors.PURPLE,
  fontWeight: 600,
  lineHeight: 1.5,
  textAlign: 'center',
})

const LinkButton = styled(Button.withComponent('a'))({
  fontWeight: 400,
  padding: '16px 32px',
})

const AppStoreContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
  flexDirection: 'row',
  marginLeft: '2rem',
  marginRight: '2rem',
})

export const Referral: React.FunctionComponent<ReferralProps> = ({
  match: {
    params: { code },
  },
}) => (
  <>
    <TranslationsConsumer textKey="REFERRAL_LANDINGPAGE_TITLE">
      {(title) => (
        <TranslationsConsumer textKey="REFERRAL_LANDINGPAGE_DESCRIPTION">
          {(description) => (
            <Helmet>
              <title>{title}</title>
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta
                property="og:image"
                content="/new-member-assets/referrals/referrals-hero.jpg"
              />
            </Helmet>
          )}
        </TranslationsConsumer>
      )}
    </TranslationsConsumer>
    <Page>
      <PageWrapper>
        <LogoWrapper href="/">
          <Logo src="/new-member-assets/topbar/hedvig-wordmark-color.svg" />
        </LogoWrapper>
        <HeroImageWrapper>
          <HeroImage src="/new-member-assets/referrals/referrals-hero.jpg" />
        </HeroImageWrapper>
        <Title>
          <TranslationsConsumer textKey="REFERRAL_LANDINGPAGE_HEADLINE">
            {(text) => text}
          </TranslationsConsumer>
        </Title>
        <MobileContext.Consumer>
          {(isMobile) =>
            isMobile ? (
              <>
                <Paragraph>
                  <TranslationsPlaceholderConsumer
                    textKey="REFERRAL_LANDINGPAGE_BODY"
                    replacements={{ REFERRAL_VALUE: 10 }}
                  >
                    {(text) => text}
                  </TranslationsPlaceholderConsumer>
                </Paragraph>
                <Centered>
                  <LinkButton
                    background={colors.PURPLE}
                    foreground={colors.WHITE}
                    href={createFirebaseLink(code)}
                  >
                    <TranslationsConsumer textKey="REFERRAL_LANDINGPAGE_BTN_CTA">
                      {(text) => text}
                    </TranslationsConsumer>
                  </LinkButton>
                </Centered>
              </>
            ) : (
              <>
                <Paragraph>
                  <TranslationsConsumer textKey="REFERRAL_LANDING_PAGE_DESKTOP_PARAGRAPH_ONE">
                    {(text) => text}
                  </TranslationsConsumer>
                </Paragraph>
                <CodeWrapper>
                  <Code>{code}</Code>
                </CodeWrapper>
                <Paragraph>
                  <TranslationsConsumer textKey="REFERRAL_LANDING_PAGE_DESKTOP_PARAGRAPH_TWO">
                    {(text) => text}
                  </TranslationsConsumer>
                </Paragraph>
                <AppStoreContainer>
                  <a href="https://apps.apple.com/se/app/hedvig-f%C3%B6rs%C3%A4kring/id1303668531">
                    <img src="https://cdn.hedvig.com/www/appstores/app-store-badge.svg" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.hedvig.app">
                    <img src="https://cdn.hedvig.com/www/appstores/google-play-badge.svg" />
                  </a>
                </AppStoreContainer>
              </>
            )
          }
        </MobileContext.Consumer>
      </PageWrapper>
    </Page>
  </>
)
