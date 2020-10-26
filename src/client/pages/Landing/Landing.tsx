import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import Helmet from 'react-helmet-async'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { LinkButton } from 'components/buttons'
import { ForwardArrow } from 'components/icons/ForwardArrow'
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

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 25vh 2rem 4rem;

  @media (max-width: 850px) {
    padding-top: 10vh;
  }

  @media (max-width: 600px) {
    padding-top: 1rem;
  }
`

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0;

  @media (max-width: 1020px) {
    width: calc(100% + 2.5rem);
    margin: 0 -1.125rem;
  }

  @media (max-width: 850px) {
    flex-direction: column;
  }
`

const CardComponent = styled.div<{ banner?: boolean }>`
  position: relative;
  width: 100%;
  background: ${colorsV3.white};
  border-radius: 8px;
  margin-top: ${(props) => (props.banner ? '-2rem' : 0)};
  margin-right: 1rem;
  margin-left: 1rem;
  padding: 3.5rem 2.5rem 2.5rem 2.5rem;
  padding-top: ${(props) => (props.banner ? '5.5rem' : '3.5rem')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.35s;
  text-decoration: none;

  :hover {
    transform: translateY(-6px);

    @media (hover: none) {
      transform: none;
    }
  }

  @media (max-width: 1020px) {
    justify-content: flex-end;
    padding: 2.5rem 2rem 2rem 2rem;
    padding-top: ${(props) => (props.banner ? '4.5rem' : '2.5rem')};
    margin-right: 1.125rem;
    margin-left: 1.125rem;
  }

  @media (max-width: 850px) {
    margin: 0 0 1rem 0;
    padding-right: 4rem;
  }

  @media (max-width: 600px) {
    padding: 2rem 4rem 1.5rem 1.5rem;
    padding-top: ${(props) => (props.banner ? '4rem' : '2rem')};
    align-items: center;
    box-shadow: 0 8px 13px rgba(0, 0, 0, 0.18);
  }
`

const CardLink = CardComponent.withComponent(Link)

const ChevronWrapper = styled.span<{ pushDown?: boolean }>`
  display: none;
  position: absolute;
  right: 1.5rem;
  top: 50%;
  height: 1rem;
  ${({ pushDown }) =>
    pushDown
      ? css`
          transform: translateY(calc(-50% + 1rem));
        `
      : css`
          transform: translateY(-50%);
        `};

  @media (max-width: 850px) {
    display: block;
  }
`

const Card: React.FC<{ to: string; banner?: boolean }> = ({
  banner,
  to,
  children,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })

  return isMobile ? (
    <CardLink to={to} banner={banner}>
      {children}
      <ChevronWrapper pushDown={banner}>
        <ForwardArrow />
      </ChevronWrapper>
    </CardLink>
  ) : (
    <CardComponent banner={banner}>
      {children}
      <ChevronWrapper>
        <ForwardArrow />
      </ChevronWrapper>
    </CardComponent>
  )
}

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
  font-size: 2.875rem;
  line-height: 2.875rem;
  font-weight: 500;
  color: ${colorsV3.gray900};
  letter-spacing: -1px;
  margin: 0 0 1rem 0;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  @media (max-width: 400px) {
    font-size: 1.75rem;
    line-height: 2rem;
  }
`

const Paragraph = styled.p`
  font-size: 1.25rem;
  line-height: 1.875rem;
  margin: 0;
  color: ${colorsV3.gray700};
  min-height: 3.75rem;
  width: 100%;

  @media (max-width: 850px) {
    min-height: 0;
  }

  @media (max-width: 600px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  @media (max-width: 500px) {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`

const DesktopProceedButton = styled(LinkButton)`
  margin-top: 5rem;

  @media (max-width: 850px) {
    display: none;
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
