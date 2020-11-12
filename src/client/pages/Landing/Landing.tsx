import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useState } from 'react'
import Helmet from 'react-helmet-async'
import { Redirect } from 'react-router'
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
  padding: 1rem 1rem 0;

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
  margin-bottom: 1rem;
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

const CardHeadline = styled.h2`
  width: 100%;
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.2;
  color: ${colorsV3.gray900};

  @media (min-width: 500px) {
    margin-bottom: 0.25rem;
    font-size: 1.5rem;
    line-height: 1.25;
  }

  @media (min-width: 850px) {
    max-width: 14ch;
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
    max-width: 20ch;
    font-size: 1.125rem;
  }

  @media (min-width: 1020px) {
    font-size: 1.5rem;
    letter-spacing: -0.02em;
  }
`

const LandingPageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  z-index: 1;
`

const BackgroundContainer = styled.div<{
  backgroundLoaded: boolean
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: opacity 1s cubic-bezier(0.33, 1, 0.68, 1);
  transition-delay: 150ms;
  z-index: -1;
  opacity: ${(props) => (props.backgroundLoaded ? 1 : 0)};

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 200;
    top: 0;
    left: 0;
    background-color: ${colorsV3.gray900};
    opacity: 0.5;
  }
`

const BackgroundImage = styled.img`
  display: block;
  position: fixed;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  object-fit: cover;

  @media (min-width: 1020px) {
    object-position: 100% 50%;
  }
`

export const Landing: React.FC<{ language: string }> = ({ language }) => {
  const textKeys = useTextKeys()
  const market = useMarket()
  const currentLocale = useCurrentLocale()
  const variation = useVariation()
  const [backgroundLoaded, setBackgroundHasLoaded] = useState(false)

  if (currentLocale === 'dk' || currentLocale === 'dk-en') {
    return <Redirect to={`/${currentLocale}/new-member/contents`} />
  }

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
            {market === Market.Se && (
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
            )}
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
        <BackgroundContainer backgroundLoaded={backgroundLoaded}>
          <BackgroundImage
            alt="laptop grip"
            onLoad={() => setBackgroundHasLoaded(true)}
            src="/new-member-assets/landing/laptop_grip_small.jpg"
            sizes="100vw"
            srcSet="
            /new-member-assets/landing/laptop_grip_small.jpg 1600w,
            /new-member-assets/landing/laptop_grip_medium.jpg 2200w"
          />
        </BackgroundContainer>
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
      </Card>
      <Card to={`/${language}/new-member/switch`}>
        <CardHeadline>{textKeys.STARTPAGE_INSURED_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_INSURED_BODY()}</CardParagraph>
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
      <Card
        banner={textKeys.STARTPAGE_COMBO_DISCOUNT_TEXT()}
        to={`/${language}/new-member/combo`}
      >
        <CardHeadline>{textKeys.STARTPAGE_COMBO_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_COMBO_BODY()}</CardParagraph>
      </Card>
      <Card to={`/${language}/new-member/contents`}>
        <CardHeadline>{textKeys.STARTPAGE_CONTENTS_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_CONTENTS_BODY()}</CardParagraph>
      </Card>
      <Card to={`/${language}/new-member/travel`}>
        <CardHeadline>{textKeys.STARTPAGE_TRAVEL_HEADLINE()}</CardHeadline>
        <CardParagraph>{textKeys.STARTPAGE_TRAVEL_BODY()}</CardParagraph>
      </Card>
    </>
  )
}
