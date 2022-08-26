import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useBreakpoint } from 'utils/hooks/useBreakpoint'
import { TOP_BAR_HEIGHT } from 'components/TopBar'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { Arrow } from 'components/icons/Arrow'
import {
  Description,
  Header,
  Image,
  ImageFrame,
  LinkCard,
  Section,
  Title,
} from 'components/AdditionalProductCard'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useCrossSells } from '../useCrossSells'
import { GetAppButtons } from './GetAppButtons'
import { AppImage } from './AppImage'

const IMAGE_WIDTH = 560

const Page = styled.div`
  background: ${colorsV3.gray100};
  max-width: 100vw;
  min-height: 100vh;
  padding: ${TOP_BAR_HEIGHT} 2rem 8rem;
  display: flex;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    max-width: 70rem;
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
  max-width: 32rem;
  padding: 3rem 0;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-bottom: 4rem;
  }
`

const Paragraph = styled.div`
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: ${colorsV3.gray700};

  :not(:last-of-type) {
    margin-bottom: 0.75rem;
  }
`

const ImageSection = styled.div`
  ${LARGE_SCREEN_MEDIA_QUERY} {
    flex-shrink: 1;
  }
`

const Headline = styled.h1`
  width: 100%;
  font-size: 2rem;
  line-height: 1.25;
  color: ${colorsV3.gray900};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    line-height: 1.16;
  }
`

const CrossSellSectionHeader = styled.p({
  textTransform: 'uppercase',
  marginTop: '4rem',
})

const StyledLinkCard = styled(LinkCard)({
  maxWidth: '32rem',
  marginTop: '1.5rem',
  [LARGE_SCREEN_MEDIA_QUERY]: {
    marginRight: '2rem',
  },
})

const Cta = styled.p({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
})

type DownloadPageContentProps = {
  paragraphTextKeys?: string[]
  headlineTextKeys?: string[]
}

export const DownloadPageContent = ({
  paragraphTextKeys = [
    'ONBOARDING_DOWNLOAD_PARAGRAPH_1',
    'ONBOARDING_DOWNLOAD_PARAGRAPH_2',
  ],
  headlineTextKeys = [
    'ONBOARDING_DOWNLOAD_HEADLINE_PART_1',
    'ONBOARDING_DOWNLOAD_HEADLINE_PART_2',
  ],
}: DownloadPageContentProps) => {
  const textKeys = useTextKeys()

  const { isLargeScreen } = useBreakpoint()

  const [isCrossSellEnabled] = useFeature([
    Features.CONFIRMATION_PAGE_CROSS_SELL,
  ])

  return (
    <Page>
      <ContentContainer>
        <div>
          <HeadlineWrapper>
            <Headline>
              {headlineTextKeys.map((textKey) => (
                <span key={textKey}>{textKeys[textKey]() + ' '}</span>
              ))}
            </Headline>
          </HeadlineWrapper>
          {!isLargeScreen && (
            <ImageSection>
              <AppImage width={IMAGE_WIDTH} />
            </ImageSection>
          )}
          <TextWrapper>
            {paragraphTextKeys.map((textKey) => (
              <Paragraph key={textKey}>{textKeys[textKey]()}</Paragraph>
            ))}
          </TextWrapper>
          <GetAppButtons />
          {isCrossSellEnabled && <CrossSells />}
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

const CrossSells = () => {
  const { crossSells } = useCrossSells()
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()

  if (!crossSells || crossSells.length === 0) return null

  return (
    <>
      <CrossSellSectionHeader>
        {textKeys.ONBOARDING_CROSS_SELL_HEADER()}
      </CrossSellSectionHeader>
      {crossSells?.map((crossSell) => (
        <StyledLinkCard
          key={crossSell.id}
          href={`/${currentLocale.path}${crossSell.href}`}
          orientation="column"
        >
          <ImageFrame>
            <Image src={crossSell.image} />
          </ImageFrame>
          <Section>
            <Header>
              <Title>{crossSell.title}</Title>
            </Header>
            <Description>{crossSell.description}</Description>
            <Cta>
              {crossSell.callToAction}{' '}
              <Arrow size="1.25rem" direction="forward" />
            </Cta>
          </Section>
        </StyledLinkCard>
      ))}
    </>
  )
}
