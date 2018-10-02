import * as React from 'react'
import { Container, InnerContainer } from './insured-amount'
import { GetInsuredButton, LinkTag } from './price-info'
import { colors, fonts } from '@hedviginsurance/brand'
import styled from 'react-emotion'

interface Props {
  title: string
  name: string
  getInsured: string
}

const Header = styled('h1')({
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '32px',
  marginBottom: '10px',
  fontWeight: 'normal',
  textAlign: 'center',
  paddingBottom: '10px',
  '@media (max-width: 640px)': {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  '@media (max-width: 400px)': {
    fontSize: '25px',
  },
})

const Card = styled('div')({
  marginTop: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '70px',
  backgroundColor: colors.WHITE,
  minWidth: '550px',
  paddingBottom: '30px',
  '@media (max-width: 550px)': {
    minWidth: '0px',
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

export const GetInsured: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>
          {props.title} {props.name}
        </Header>
        <GetInsuredButton>
          <LinkTag href="/">{props.getInsured}</LinkTag>
        </GetInsuredButton>
      </Card>
    </InnerContainer>
  </Container>
)
