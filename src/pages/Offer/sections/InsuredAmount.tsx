import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { Card } from '.././components/Card'
import { Header } from '.././components/Header'
import { InnerWrapper } from '.././components/InnerWrapper'
import { Wrapper } from '.././components/Wrapper'

interface Props {
  title: string
  info: string
}

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

const Col = styled('div')({
  display: 'flex',
  paddingBottom: '10px',
  flexDirection: 'column',
  color: colors.BLACK,
  fontSize: '14px',
})

const AMOUNTS = [
  {
    key: 0,
    title: 'Bostaden:',
    amount: 'Fullvärde',
  },
  {
    key: 1,
    title: 'Dina prylar totalt:',
    amount: '1 000 000 kr',
  },
  {
    key: 2,
    title: 'Drulle gäller för prylar upp till:',
    amount: '50 000 kr',
  },
  {
    key: 3,
    title: 'Självrisk:',
    amount: '1 500 kr',
  },
]

export const InsuredAmount: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <Card>
        <Header>{props.title}</Header>
        <Table>
          {AMOUNTS.map((amount) => (
            <Row key={amount.key}>
              <Col>{amount.title}</Col>
              <Col>{amount.amount}</Col>
            </Row>
          ))}
        </Table>
      </Card>
    </InnerWrapper>
  </Wrapper>
)
