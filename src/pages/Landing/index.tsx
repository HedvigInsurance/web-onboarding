import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { Page } from 'components/utils/Page'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { LinkButton } from 'new-components/buttons'

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
`

const Container = styled.div`
  width: calc(100% + 5rem);
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 -2.5rem;
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
`

const Headline = styled.h1`
  font-size: 3rem;
  line-height: 3rem;
  font-weight: 500;
  color: ${colorsV2.black};
  letter-spacing: -1px;
  margin: 0 0 1rem 0;
`

const Paragraph = styled.p`
  font-size: 1.25rem;
  line-height: 1.875rem;
  margin: 0;
  color: ${colorsV2.black};
`

const ProceedButton = styled(LinkButton)`
  margin-top: 5rem;
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
