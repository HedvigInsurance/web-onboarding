import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useBreakpoint } from 'utils/hooks/useBreakpoint'
import { TOP_BAR_HEIGHT } from 'components/TopBar'
import { DownloadHeadline } from './DownloadHeadline'
import { GetAppButtons } from './GetAppButtons'
import { AppImage } from './AppImage'

const IMAGE_WIDTH = 560

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
  max-width: 24rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 80rem;
    padding-top: 5rem;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const HeadlineWrapper = styled.div`
  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 30rem;
    margin-right: 3rem;
  }
`

const TextWrapper = styled.div`
  max-width: 24rem;
  padding: 3rem 0;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-bottom: 4rem;
  }
`

const Paragraph = styled.div`
  font-size: 1.125rem;
  line-height: 24px;
  color: ${colorsV3.gray100};
  opacity: 0.65;

  :not(:last-of-type) {
    margin-bottom: 12px;
  }
`

const ImageSection = styled.div`
  ${LARGE_SCREEN_MEDIA_QUERY} {
    flex-shrink: 1;
  }
`

const ButtonsWrapper = styled.div`
  max-width: 20rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 24rem;
  }
`

export const DownloadPageContent: React.FC = () => {
  const textKeys = useTextKeys()

  const { isLargeScreen } = useBreakpoint()

  return (
    <Page>
      <ContentContainer>
        <div>
          <HeadlineWrapper>
            <DownloadHeadline />
          </HeadlineWrapper>
          {!isLargeScreen && (
            <ImageSection>
              <AppImage width={IMAGE_WIDTH} />
            </ImageSection>
          )}
          <TextWrapper>
            <Paragraph>{textKeys.ONBOARDING_DOWNLOAD_PARAGRAPH_1()}</Paragraph>
            <Paragraph>{textKeys.ONBOARDING_DOWNLOAD_PARAGRAPH_2()}</Paragraph>
          </TextWrapper>
          <ButtonsWrapper>
            <GetAppButtons />
          </ButtonsWrapper>
        </div>
        {isLargeScreen && (
          <ImageSection>
            <AppImage width={IMAGE_WIDTH} />
          </ImageSection>
        )}
      </ContentContainer>
    </Page>
  )
}
