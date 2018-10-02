import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'

import { Header } from './price-info'

interface Props {
  title: string
  info: string
}
export const Container = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

export const InnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

export const Card = styled('div')({
  marginTop: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  minWidth: '1000px',
  '@media (max-width: 1000px)': {
    width: '100%',
    minWidth: '0%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const Table = styled('div')({
  marginTop: '20',
  marginBottom: '40',
})

const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: '20px',
  borderBottom: '1px solid ' + colors.LIGHT_GRAY,
  marginLeft: '40px',
  marginRight: '40px',
})

const TextCol = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  color: colors.BLACK,
  fontSize: '16px',
})

const ReadCol = styled('a')({
  display: 'flex',
  flexDirection: 'column',
  color: colors.LIGHT_GRAY,
  fontSize: '16px',
})

export const InsuredAmount: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>{props.title}</Header>
        <Table>
          {AMOUNTS.map((amount, index) => (
            <Row key={index}>
              <TextCol>
                {amount.title} {amount.amount}
              </TextCol>
              <ReadCol href="/">{props.info}</ReadCol>
            </Row>
          ))}
        </Table>
      </Card>
    </InnerContainer>
  </Container>
)

const AMOUNTS = [
  {
    title: 'Lägenheten:',
    amount: 'Fullvärde',
  },
  {
    title: 'Dina prylar totalt:',
    amount: '1 000 000 kr',
  },
  {
    title: 'Drulle gäller för:',
    amount: 'Prylar upp till 50 000 kr',
  },
  {
    title: 'Självrisk:',
    amount: '1 500 kr',
  },
  {
    title: 'Gäller i:',
    amount: 'Hela världen',
  },
]
