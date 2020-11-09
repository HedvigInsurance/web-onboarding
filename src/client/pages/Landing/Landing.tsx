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
import { CheckmarkCircle } from 'components/icons/CheckmarkCircle'
import { LanguagePicker } from '../Embark/LanguagePicker'
import { Card } from './components/Card'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1rem 4rem;

  @media (min-width: 600px) {
    padding-top: 6vh;
  }

  @media (min-height: 900px) and (min-width: 1020px) {
    padding-top: calc(25vh - 10.5rem);
  }
`

const UspContainer = styled.div`
  display: block;
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${colorsV3.gray100};

  @media (min-width: 800px) {
    margin-bottom: 2rem;
    text-align: center;
  }

  @media (min-width: 1020px) {
    margin-bottom: 4rem;
  }
`
const Headline = styled.h1`
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-size: 2rem;
  letter-spacing: -0.02em;

  @media (min-width: 800px) {
    margin-bottom: 0.75rem;
  }

  @media (min-width: 1020px) {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`

const Preamble = styled.p`
  margin-top: 0;
  margin-bottom: 1.25rem;
  line-height: 1.5;

  @media (min-width: 800px) {
    margin-bottom: 2rem;
    font-size: 1.125rem;
  }

  @media (min-width: 1020px) {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
`

const UspList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
  text-align: left;

  @media (min-width: 800px) {
    display: inline-flex;
  }
`

const UspItem = styled.li`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;

  span {
    margin-left: 1rem;
    line-height: 1.5;
  }

  @media (min-width: 800px) {
    display: inline-flex;

    span {
      margin-right: 2rem;
    }
  }

  @media (min-width: 1020px) {
    span {
      margin-right: 3rem;
    }
  }
`

const CardContainer = styled.div`
  position: relative;
  margin: 0;

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

const CardHeadline = styled.h1`
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
    max-width: 14ch;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    letter-spacing: -0.02em;
  }
`

const CardParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colorsV3.gray700};

  @media (min-width: 850px) {
    max-width: 29ch;
  }
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
          <UspContainer>
            <Headline>{textKeys.STARTPAGE_HEADLINE()}</Headline>
            <Preamble>{textKeys.STARTPAGE_PREAMBLE()}</Preamble>
            <UspList>
              <UspItem>
                <CheckmarkCircle size="1.25rem" />
                <span>{textKeys.STARTPAGE_USP_1()}</span>
              </UspItem>
              <UspItem>
                <CheckmarkCircle size="1.25rem" />
                <span>{textKeys.STARTPAGE_USP_2()}</span>
              </UspItem>
              <UspItem>
                <CheckmarkCircle size="1.25rem" />
                <span>{textKeys.STARTPAGE_USP_3()}</span>
              </UspItem>
            </UspList>
          </UspContainer>
          <CardContainer>
            {market === Market.Se && (
              <LandingPageCardsSe textKeys={textKeys} language={language} />
            )}
            {market === Market.No && (
              <LandingPageCardsNo textKeys={textKeys} language={language} />
            )}
          </CardContainer>
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
        <CardHeadline>{textKeys.STARTPAGE_UNINSURED_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_UNINSURED_BODY()}</CardParagraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/new`}
        >
          {textKeys.STARTPAGE_UNINSURED_BUTTON()}
        </DesktopProceedButton>
      </Card>
      <Card to={`/${language}/new-member/switch`}>
        <CardHeadline>{textKeys.STARTPAGE_INSURED_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_INSURED_BODY()}</CardParagraph>
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
        <CardHeadline>{textKeys.STARTPAGE_COMBO_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_COMBO_BODY()}</CardParagraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/combo`}
        >
          {textKeys.STARTPAGE_COMBO_BUTTON()}
        </DesktopProceedButton>
      </Card>
      <Card to={`/${language}/new-member/contents`}>
        <CardHeadline>{textKeys.STARTPAGE_CONTENTS_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_CONTENTS_BODY()}</CardParagraph>
        <DesktopProceedButton
          size="lg"
          fullWidth
          to={`/${language}/new-member/contents`}
        >
          {textKeys.STARTPAGE_CONTENTS_BUTTON()}
        </DesktopProceedButton>
      </Card>
      <Card to={`/${language}/new-member/travel`}>
        <CardHeadline>{textKeys.STARTPAGE_TRAVEL_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_TRAVEL_BODY()}</CardParagraph>
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
