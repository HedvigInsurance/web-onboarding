import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useBreakpoint } from 'utils/hooks/useBreakpoint'
import { TOP_BAR_HEIGHT } from 'components/TopBar'
import { AppleAppStoreIcon, GooglePlayStoreIcon } from './appStoreIcons'
import { AppImage } from './AppImage'

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/details?id=com.hedvig.app'
const APPLE_APP_STORE_LINK = 'https://apps.apple.com/app/hedvig/id1303668531'

const Page = styled.div`
  background: ${colorsV3.gray900};
  max-width: 100vw;
  min-height: 100vh;
  padding: ${TOP_BAR_HEIGHT} 2rem;
  display: flex;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 72rem;
    padding-top: 5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const TextSection = styled.div`
  max-width: 29rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-right: 2rem;
  }
`

const LogoWrapper = styled.div`
  width: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const DownloadLink = styled.a`
  svg {
    width: 36px;
    fill: ${colorsV3.white};
  }
`

const Heading = styled.h1`
  margin: 0;
  padding-bottom: 3rem;
  font-size: 1.75 rem;
  line-height: 1.2;
  color: ${colorsV3.gray100};
`

const Text = styled.div`
  padding: 3rem 0;
  color: ${colorsV3.gray100};
  opacity: 0.65;
`

export const DownloadApp: React.FC = () => {
  const textKeys = useTextKeys()

  const { isLargeScreen } = useBreakpoint()

  return (
    <Page>
      <ContentContainer>
        <div>
          <TextSection>
            <Heading>
              {textKeys.ONBOARDING_DOWNLOAD_PRE_HEADLINE() +
                ' ' +
                textKeys.ONBOARDING_DOWNLOAD_HEADLINE()}
            </Heading>
          </TextSection>
          {!isLargeScreen && <AppImage />}
          <TextSection>
            <Text>{textKeys.ONBOARDING_DOWNLOAD_BODY()}</Text>
            <LogoWrapper>
              <DownloadLink href={APPLE_APP_STORE_LINK}>
                <AppleAppStoreIcon />
              </DownloadLink>
              <DownloadLink href={GOOGLE_PLAY_LINK}>
                <GooglePlayStoreIcon />
              </DownloadLink>
            </LogoWrapper>
          </TextSection>
        </div>
        {isLargeScreen && <AppImage />}
      </ContentContainer>
    </Page>
  )
}
