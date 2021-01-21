import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useBreakpoint } from 'utils/hooks/useBreakpoint'
import { TOP_BAR_HEIGHT } from 'components/TopBar'
import { DownloadAppButtons } from './DownloadAppButtons'
import { AppImage } from './AppImage'

const IMAGE_WIDTH = 560
const IMAGE_MAX_WIDTH_SMALL_SCREEN = 380

const Page = styled.div`
  background: ${colorsV3.gray900};
  max-width: 100vw;
  min-height: 100vh;
  padding: ${TOP_BAR_HEIGHT} 2rem 8rem;
  display: flex;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: ${IMAGE_WIDTH}px;
  padding-top: 2rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 80rem;
    padding-top: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const FlexColumnSmallScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    display: block;
  }
`

const TextSection = styled.div`
  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 30rem;
    margin-right: 3rem;
  }
`

const Headline = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  line-height: 40px;
  color: ${colorsV3.gray100};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin: 0;
    font-size: 3rem;
    line-height: 56px;
    align-items: flex-start;
  }
`

const MainHeadline = styled.h1`
  margin: 0;
  font-size: inherit;
`

const TextWrapper = styled.div`
  max-width: ${IMAGE_MAX_WIDTH_SMALL_SCREEN}px;
  padding: 3rem 0;
  color: ${colorsV3.gray100};
  opacity: 0.65;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-bottom: 4rem;
  }
`

const Paragraph = styled.div`
  font-size: 1.125rem;
  line-height: 24px;

  :not(:last-of-type) {
    margin-bottom: 8px;
  }
`

const ImageWrapper = styled.div`
  max-width: ${IMAGE_MAX_WIDTH_SMALL_SCREEN}px;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 100%;
    flex-shrink: 1;
  }
`

const ButtonsWrapper = styled.div`
  max-width: 20rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: ${IMAGE_MAX_WIDTH_SMALL_SCREEN}px;
  }
`

export const DownloadApp: React.FC = () => {
  const textKeys = useTextKeys()

  const { isLargeScreen } = useBreakpoint()

  return (
    <Page>
      <ContentContainer>
        <div>
          <TextSection>
            <Headline>
              <MainHeadline>
                {textKeys.ONBOARDING_DOWNLOAD_HEADLINE_PART_1()}
              </MainHeadline>
              <div>{textKeys.ONBOARDING_DOWNLOAD_HEADLINE_PART_2()}</div>
            </Headline>
          </TextSection>
          <FlexColumnSmallScreen>
            {!isLargeScreen && (
              <ImageWrapper>
                <AppImage width={IMAGE_WIDTH} />
              </ImageWrapper>
            )}
            <TextSection>
              <TextWrapper>
                <Paragraph>
                  {textKeys.ONBOARDING_DOWNLOAD_PARAGRAPH_ONE()}
                </Paragraph>
                <Paragraph>
                  {textKeys.ONBOARDING_DOWNLOAD_PARAGRAPH_TWO()}
                </Paragraph>
              </TextWrapper>
              <ButtonsWrapper>
                <DownloadAppButtons />
              </ButtonsWrapper>
            </TextSection>
          </FlexColumnSmallScreen>
        </div>
        {isLargeScreen && (
          <ImageWrapper>
            <AppImage width={IMAGE_WIDTH} />
          </ImageWrapper>
        )}
      </ContentContainer>
    </Page>
  )
}
