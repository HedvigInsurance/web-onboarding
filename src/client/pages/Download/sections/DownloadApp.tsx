import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  AppleAppStoreIcon,
  GooglePlayStoreIcon,
} from 'pages/Download/sections/appStoreIcons'
import { useTextKeys } from 'utils/textKeys'

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

const GooglePlayLogo = styled(GooglePlayStoreIcon)({
  width: 36,
  fill: colorsV3.white,
})

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

export const DownloadApp: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <>
      <InnerWrapper>
        <TextColumn>
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
        </TextColumn>
        <ImageColumn>
          <DownloadImage
            src={'/new-member-assets/download/welcome-illustration.svg'}
          />
        </ImageColumn>
      </InnerWrapper>
    </>
  )
}
