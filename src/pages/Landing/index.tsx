import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { Page } from 'components/utils/Page'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { LinkButton } from 'new-components/buttons'
import hexToRgba from 'hex-to-rgba'

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-position: center center;
  background-size: cover;
  background-image: url(/new-member-assets/landing/background.jpg);

  ::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    left: 0;
    height: 5rem;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    );
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  padding-top: 25vh;

  @media (max-width: 850px) {
    padding-top: 10vh;
  }

  @media (max-width: 600px) {
    padding-top: 1rem;
  }
`

const Container = styled.div`
  width: calc(100% + 5rem);
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 -2.5rem;

  @media (max-width: 1020px) {
    width: calc(100% + 2.5rem);
    margin: 0 -1.125rem;
  }

  @media (max-width: 850px) {
    flex-flow: column;
  }
`

const Card = styled.div`
  width: 100%;
  background: ${colorsV2.white};
  border-radius: 8px;
  margin: 0 2.5rem;
  padding: 3.5rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  flex-flow: column;
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
  font-size: 3rem;
  line-height: 3rem;
  font-weight: 500;
  color: ${colorsV2.black};
  letter-spacing: -1px;
  margin: 0 0 1rem 0;

  @media (max-width: 600px) {
    font-size: 2.25rem;
    line-height: 2.5rem;
    text-align: center;
  }
`

const Paragraph = styled.p`
  font-size: 1.25rem;
  line-height: 1.875rem;
  margin: 0;
  color: ${colorsV2.darkgray};

  @media (max-width: 600px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
    text-align: center;
  }
`

const ProceedButton = styled(LinkButton)`
  margin-top: 5rem;

  @media (max-width: 600px) {
    margin-top: 2.5rem;
  }
`

export const Landing: React.FC = () => (
  <Page>
    <Background />
    <TopBar transparent />

    <Wrapper>
      <Container>
        <Card>
          <Headline>Är du oförsäkrad?</Headline>
          <Paragraph>
            Beräkna priset på ett ny hemförsäkring hos Hedvig
          </Paragraph>
          <ProceedButton size="lg" to="/new">
            Beräkna ditt pris
          </ProceedButton>
        </Card>
        <Card>
          <Headline>Har du redan hemförsäkring?</Headline>
          <Paragraph>
            Beräkna priset på att flytta över din nuvarande försäkring till
            Hedvig
          </Paragraph>
          <ProceedButton size="lg" to="/switch">
            Jämför med Hedvig
          </ProceedButton>
        </Card>
      </Container>
    </Wrapper>
  </Page>
)
