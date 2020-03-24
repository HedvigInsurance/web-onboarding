import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { LinkButton } from 'new-components/buttons'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { TextKeyMap, useTextKeys } from 'utils/hooks/useTextKeys'

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
  width: calc(100% + 7rem);
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 -3.5rem;

  @media (max-width: 1020px) {
    width: calc(100% + 2.5rem);
    margin: 0 -1.125rem;
  }

  @media (max-width: 850px) {
    flex-direction: column;
  }
`

const Card = styled.div`
  width: 100%;
  background: ${colorsV2.white};
  border-radius: 8px;
  margin: 0 2.5rem;
  padding: 3.5rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  transition: all 0.35s;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.06);

  :hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 18px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 1020px) {
    padding: 2.5rem 2rem 2rem 2rem;
    margin: 0 1.125rem;
  }

  @media (max-width: 850px) {
    margin: 0 0 1rem 0;
  }

  @media (max-width: 600px) {
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    align-items: center;
    box-shadow: 0 8px 13px rgba(0, 0, 0, 0.18);
  }
`

const Headline = styled.h1`
  font-size: 2.875rem;
  line-height: 2.875rem;
  font-weight: 500;
  color: ${colorsV2.black};
  letter-spacing: -1px;
  margin: 0 0 1rem 0;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 2.25rem;
    line-height: 2.5rem;
    text-align: center;
  }

  @media (max-width: 400px) {
    font-size: 1.75rem;
    line-height: 2rem;
    text-align: center;
  }
`

const Paragraph = styled.p`
  font-size: 1.25rem;
  line-height: 1.875rem;
  margin: 0;
  color: ${colorsV2.darkgray};
  min-height: 3.75rem;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
    text-align: center;
  }

  @media (max-width: 500px) {
    font-size: 1.125rem;
    line-height: 1.5rem;
    text-align: center;
  }
`

const ProceedButton = styled(LinkButton)`
  margin-top: 5rem;

  @media (max-width: 600px) {
    margin-top: 2.5rem;
  }

  @media (max-width: 500px) {
    margin-top: 1.75rem;
  }
`

const LandingPageContainer = styled.div`
  position: relative;
  height: 100vh;
  backdrop-filter: blur(20px);
`

export const Landing: React.FC<{ language?: string }> = ({ language }) => {
  const textKeys = useTextKeys()
  const market = useMarket()
  return (
    <Page>
      <LandingPageContainer>
        <Helmet>
          <title>{textKeys.STARTPAGE_PAGE_TITLE()}</title>
        </Helmet>

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
      <Card>
        <Headline>{textKeys.STARTPAGE_UNINSURED_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_UNINSURED_BODY()}</Paragraph>
        <ProceedButton
          size="lg"
          to={(language ? '/' + language : '') + '/new-member/new'}
        >
          {textKeys.STARTPAGE_UNINSURED_BUTTON()}
        </ProceedButton>
      </Card>
      <Card>
        <Headline>{textKeys.STARTPAGE_INSURED_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_INSURED_BODY()}</Paragraph>
        <ProceedButton
          size="lg"
          to={(language ? '/' + language : '') + '/new-member/switch'}
        >
          {textKeys.STARTPAGE_INSURED_BUTTON()}
        </ProceedButton>
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
      <Card>
        <Headline>{textKeys.STARTPAGE_CONTENTS_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_CONTENTS_BODY()}</Paragraph>
        <ProceedButton
          size="lg"
          to={(language ? '/' + language : '') + '/new-member/contents'}
        >
          {textKeys.STARTPAGE_CONTENTS_BUTTON()}
        </ProceedButton>
      </Card>
      <Card>
        <Headline>{textKeys.STARTPAGE_TRAVEL_HEADLINE()}</Headline>
        <Paragraph>{textKeys.STARTPAGE_TRAVEL_BODY()}</Paragraph>
        <ProceedButton
          size="lg"
          to={(language ? '/' + language : '') + '/new-member/travel'}
        >
          {textKeys.STARTPAGE_TRAVEL_BUTTON()}
        </ProceedButton>
      </Card>
    </>
  )
}
