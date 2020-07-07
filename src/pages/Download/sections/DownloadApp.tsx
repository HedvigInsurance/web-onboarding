import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { LinkButton } from 'components/buttons'
import { LoadingPage } from 'components/LoadingPage'
import { useMemberQuery } from 'data/graphql'
import { isMobile } from 'is-mobile'
import {
  AppleAppStoreIcon,
  GooglePlayStoreIcon,
} from 'pages/Download/sections/appStoreIcons'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const SITE_WRAPPER = 1300
const TABLET_BP = 800
const MOBILE_BP = 450

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/details?id=com.hedvig.app'
const APPLE_APP_STORE_LINK = 'https://apps.apple.com/app/hedvig/id1303668531'

const InnerWrapper = styled('div')({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: SITE_WRAPPER,
  minHeight: '100vh',
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  backgroundColor: colorsV3.gray900,
  [`@media (max-width: ${TABLET_BP}px)`]: {
    maxWidth: '100%',
    flexDirection: 'column-reverse',
    paddingTop: 'calc(64px + 1vh)',
  },
})

const TextColumn = styled('div')({
  width: '60%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${TABLET_BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const TextSubColumn = styled('div')({
  width: '65%',
  [`@media (max-width: ${TABLET_BP}px)`]: {
    width: '100%',
  },
})

const ImageColumn = styled('div')({
  width: '40%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${TABLET_BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const LogoWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  [`@media (max-width: ${TABLET_BP}px)`]: {
    justifyContent: 'center',
  },
})

const AppleLogo = styled(AppleAppStoreIcon)({
  width: 36,
  marginRight: 24,
  fill: colorsV3.white,
})
const InlineAppleLogo = styled(AppleAppStoreIcon)({
  width: '1.1em',
  marginRight: '0.75em',
  marginTop: '-0.2em',
  fill: 'currentColor',
  verticalAlign: 'middle',
})

const GooglePlayLogo = styled(GooglePlayStoreIcon)({
  width: 36,
  fill: colorsV3.white,
})
const InlinePlayLogo = InlineAppleLogo.withComponent(GooglePlayStoreIcon)

const DownloadImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  [`@media (max-width: ${TABLET_BP}px)`]: {
    marginRight: 'auto',
    width: '80%',
  },
})

const Heading = styled('h1')({
  marginTop: '0px',
  marginBottom: '30px',
  fontSize: '1.75 rem',
  lineHeight: 1.2,
  color: colorsV3.gray100,
})

const Paragraph = styled('div')({
  marginBottom: 45,
  color: colorsV3.gray100,
  opacity: 0.65,
  [`@media (max-width: ${MOBILE_BP}px)`]: {
    marginBottom: 25,
  },
})

const ButtonWrapper = styled('div')({
  paddingTop: '3vh',
})

const RealLinkButton = LinkButton.withComponent('a')

export const DownloadApp: React.FC = ({ children }) => {
  return (
    <>
      <InnerWrapper>
        <TextColumn>{children}</TextColumn>
        <ImageColumn>
          <DownloadImage
            src={'/new-member-assets/download/welcome-illustration.svg'}
          />
        </ImageColumn>
      </InnerWrapper>
    </>
  )
}

export const DownloadAppRegular: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <DownloadApp>
      <Heading>
        {textKeys.ONBOARDING_DOWNLOAD_PRE_HEADLINE() +
          ' ' +
          textKeys.ONBOARDING_DOWNLOAD_HEADLINE()}
      </Heading>
      <TextSubColumn>
        <Paragraph>{textKeys.ONBOARDING_DOWNLOAD_BODY()}</Paragraph>

        <LogoWrapper>
          <a href={APPLE_APP_STORE_LINK}>
            <AppleLogo />
          </a>
          <a href={GOOGLE_PLAY_LINK}>
            <GooglePlayLogo />
          </a>
        </LogoWrapper>
      </TextSubColumn>
    </DownloadApp>
  )
}

export const DownloadAppHedvigForeverMember: React.FC = () => {
  const member = useMemberQuery()
  let isAppleDevice = false
  if (typeof window !== 'undefined') {
    const { userAgent } = window.navigator
    isAppleDevice = userAgent.includes('iPhone') || userAgent.includes('iPad')
  }

  if (!member.data?.member?.firstName) {
    return <LoadingPage loading />
  }

  const isMobileOrTablet = isMobile({ tablet: true })
  return (
    <DownloadApp>
      <Heading>Välkommen {member.data?.member?.firstName}!</Heading>
      <Paragraph>
        Du är nu medlem i Hedvig. Ladda ner appen för att komma igång, och glöm
        inte att bjuda in dina vänner!
      </Paragraph>
      <ButtonWrapper>
        {isMobileOrTablet && isAppleDevice && (
          <RealLinkButton
            href={APPLE_APP_STORE_LINK}
            foreground={colorsV3.gray900}
            background={colorsV3.purple500}
            fullWidth
          >
            <InlineAppleLogo />
            Ladda ner appen
          </RealLinkButton>
        )}
        {isMobileOrTablet && !isAppleDevice && (
          <RealLinkButton
            href={GOOGLE_PLAY_LINK}
            foreground={colorsV3.gray900}
            background={colorsV3.purple500}
            fullWidth
          >
            <InlinePlayLogo />
            Ladda ner appen
          </RealLinkButton>
        )}
        {!isMobileOrTablet && (
          <LogoWrapper>
            <a href={APPLE_APP_STORE_LINK}>
              <AppleLogo />
            </a>
            <a href={GOOGLE_PLAY_LINK}>
              <GooglePlayLogo />
            </a>
          </LogoWrapper>
        )}
      </ButtonWrapper>
    </DownloadApp>
  )
}
