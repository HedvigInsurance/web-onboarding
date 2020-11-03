import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import Helmet from 'react-helmet-async'
import { LinkButton } from 'components/buttons'
import { TopBar, TopBarFiller } from 'components/TopBar'
import {
  Market,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { LanguagePicker } from '../Embark/LanguagePicker'
import { Card } from './components/Card'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  align-items: center;
  padding: 1rem 1rem 4rem;

  @media (min-width: 600px) {
    padding-top: 10vh;
  }

  @media (min-width: 850px) {
    padding-top: 25vh;
  }
`

const Container = styled.div`
  position: relative;
  min-height: 100%;
  margin: 0;
  width: calc(100% + 2.5rem);

  @media (min-width: 850px) {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 1020px) {
    width: 100%;
  }
`
const CardBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  line-height: 2rem;
  width: 100%;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: ${colorsV3.gray900};
  background-color: ${colorsV3.purple300};
`

const Headline = styled.h1`
  width: 100%;
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: ${colorsV3.gray900};

  @media (min-width: 500px) {
    font-size: 1.5rem;
    line-height: 1.25;
  }

  @media (min-width: 850px) {
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }
`

const Paragraph = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colorsV3.gray700};
`

const DesktopProceedButton = styled(LinkButton)`
  display: none;

  @media (min-width: 850px) {
    display: block;
    margin-top: 2.5rem;
  }
`

const LandingPageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  backdrop-filter: blur(20px);
`

export const Landing: React.FC<{ language: string }> = ({ language }) => {
  const textKeys = useTextKeys()
  const market = useMarket()
  const currentLocale = useCurrentLocale()
  const variation = useVariation()
  return (
    <Page>
      <Global
        styles={css`
          body {
            overflow: visible !important;
          }
        `}
      />
      <LandingPageContainer>
        <Helmet>
          <title>{textKeys.STARTPAGE_PAGE_TITLE()}</title>
          <link
            rel="alternate"
            hrefLang="sv-se"
            href="https://www.hedvig.com/se/new-member"
          />
          <link
            rel="alternate"
            hrefLang="en-se"
            href="https://www.hedvig.com/se-en/new-member"
          />
          <link
            rel="alternate"
            hrefLang="nb-no"
            href="https://www.hedvig.com/no/new-member"
          />
          <link
            rel="alternate"
            hrefLang="en-no"
            href="https://www.hedvig.com/no-en/new-member"
          />
          <link
            rel="canonical"
            href={`https://hedvig.com/${currentLocale}/new-member`}
          />
        </Helmet>

        {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
          <>
            <TopBar transparent>
              <LanguagePicker />
            </TopBar>
            <TopBarFiller />
          </>
        )}

        <Wrapper>
          <Container>
            {market === Market.Se && (
              <LandingPageCardsSe textKeys={textKeys} language={language} />
            )}
            {market === Market.No && (
              <LandingPageCardsNo textKeys={textKeys} language={language} />
            )}
          </Container>
        </Wrapper>
      </LandingPageContainer>
    </Page>
  )
}

const LandingPageCardsSe: React.FC<{
  textKeys: TextKeyMap
  language: string | undefined
}> = ({ textKeys, language }) => {
  return (
    <>
      <Card to={`/${language}/new-member/new`}>
        <Headline>{textKeys.STARTPAGE_UNINSURED_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_UNINSURED_BODY()}</Paragraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/new`}
        >
          {textKeys.STARTPAGE_UNINSURED_BUTTON()}
        </DesktopProceedButton>
      </Card>
      <Card to={`/${language}/new-member/switch`}>
        <Headline>{textKeys.STARTPAGE_INSURED_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_INSURED_BODY()}</Paragraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/switch`}
        >
          {textKeys.STARTPAGE_INSURED_BUTTON()}
        </DesktopProceedButton>
      </Card>
    </>
  )
}

const LandingPageCardsNo: React.FC<{
  textKeys: TextKeyMap
  language: string | undefined
}> = ({ textKeys, language }) => {
  return (
    <>
      <Card banner to={`/${language}/new-member/combo`}>
        <CardBanner>{textKeys.STARTPAGE_COMBO_DISCOUNT_TEXT()}</CardBanner>
        <Headline>{textKeys.STARTPAGE_COMBO_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_COMBO_BODY()}</Paragraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/combo`}
        >
          {textKeys.STARTPAGE_COMBO_BUTTON()}
        </DesktopProceedButton>
      </Card>
      <Card to={`/${language}/new-member/contents`}>
        <Headline>{textKeys.STARTPAGE_CONTENTS_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_CONTENTS_BODY()}</Paragraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/contents`}
        >
          {textKeys.STARTPAGE_CONTENTS_BUTTON()}
        </DesktopProceedButton>
      </Card>
      <Card to={`/${language}/new-member/travel`}>
        <Headline>{textKeys.STARTPAGE_TRAVEL_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_TRAVEL_BODY()}</Paragraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/travel`}
        >
          {textKeys.STARTPAGE_TRAVEL_BUTTON()}
        </DesktopProceedButton>
      </Card>
    </>
  )
}
