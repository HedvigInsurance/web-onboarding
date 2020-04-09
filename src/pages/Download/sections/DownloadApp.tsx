import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const SITEWRAPPER = 1300
const BP = 800
const MOBILE = 450

const Background = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colorsV3.gray900,
  zIndex: -1,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: SITEWRAPPER,
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '25vh',
  [`@media (max-width: ${BP}px)`]: {
    maxWidth: '100%',
    flexDirection: 'column',
    paddingTop: 40 + 70,
  },
})

const TextColumn = styled('div')({
  width: '60%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const TextSubColumn = styled('div')({
  width: '65%',
  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
  },
})

const ImageColumn = styled('div')({
  width: '40%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const LogoWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  [`@media (max-width: ${BP}px)`]: {
    justifyContent: 'center',
  },
})

const AppleLogo = styled('img')({
  width: 36,
  marginRight: 24,
})

const GooglePlayLogo = styled('img')({
  width: 36,
})

const DownloadImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  [`@media (max-width: ${BP}px)`]: {
    marginRight: 'auto',
    width: '80%',
  },
})

const Header = styled('h1')({
  marginTop: '0px',
  marginBottom: '30px',
  fontSize: '3rem',
  lineHeight: 1.2,
  color: colorsV3.white,
  [`@media (max-width: ${MOBILE}px)`]: {
    fontSize: '44px',
    lineHeight: '52px',
  },
})

const DownloadText = styled('div')({
  marginBottom: 45,
  color: colorsV3.gray500,
  [`@media (max-width: ${MOBILE}px)`]: {
    marginBottom: 25,
  },
})

export const DownloadApp: React.FC = () => {
  const textKeys = useTextKeys()
  return (
    <>
      <Background />
      <InnerWrapper>
        <TextColumn>
          <Header>
            {textKeys.ONBOARDING_DOWNLOAD_PRE_HEADLINE() +
              ' ' +
              textKeys.ONBOARDING_DOWNLOAD_HEADLINE()}
          </Header>
          <TextSubColumn>
            <DownloadText>{textKeys.ONBOARDING_DOWNLOAD_BODY()}</DownloadText>

            <LogoWrapper>
              <AppleLogo src={'/new-member-assets/download/apple-logo.svg'} />
              <GooglePlayLogo
                src={'/new-member-assets/download/google-play-logo-mono.svg'}
              />
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
