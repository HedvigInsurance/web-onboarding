import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'

const SITEWRAPPER = 1300
const BP = 800
const MOBILE = 450

const Background = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colors.OFF_WHITE,
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
  fontSize: '56px',
  lineHeight: '60px',
  [`@media (max-width: ${MOBILE}px)`]: {
    fontSize: '44px',
    lineHeight: '52px',
  },
})

const HeaderPart = styled('span')<{ color: string }>(({ color }) => ({
  color,
}))

const DownloadText = styled('div')({
  marginBottom: 45,
  color: colors.OFF_BLACK,
  [`@media (max-width: ${MOBILE}px)`]: {
    marginBottom: 25,
  },
})

interface DownloadAppProps {
  hasCurrentInsurer?: boolean
}

export const DownloadApp: React.FC<DownloadAppProps> = () => (
  <>
    <Background />
    <InnerWrapper>
      <TextColumn>
        <Header>
          <HeaderPart color={colors.DARK_YELLOW}>
            <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_PRE_HEADLINE">
              {(t) => t}
            </TranslationsConsumer>
          </HeaderPart>
          <HeaderPart color={colors.BLACK}>
            <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_HEADLINE">
              {(t) => t}
            </TranslationsConsumer>
          </HeaderPart>
        </Header>
        <TextSubColumn>
          <DownloadText>
            <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_BODY">
              {(t) => t}
            </TranslationsConsumer>
          </DownloadText>

          <LogoWrapper>
            <AppleLogo src={'/new-member-assets/download/apple-logo.svg'} />
            <GooglePlayLogo
              src={'/new-member-assets/download/google-play-logo.svg'}
            />
          </LogoWrapper>
        </TextSubColumn>
      </TextColumn>
      <ImageColumn>
        <DownloadImage
          src={'/new-member-assets/download/balloons-welcome-illustrations.svg'}
        />
      </ImageColumn>
    </InnerWrapper>
  </>
)
