import { colors } from '@hedviginsurance/brand'
import { Card } from 'components/offering/card'
import { Container } from 'components/offering/container'
import { Header } from 'components/offering/header'
import { InnerContainer } from 'components/offering/inner-container'
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

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

const TextCol = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  color: colors.BLACK,
  fontSize: '16px',
})

const ReadCol = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  color: colors.LIGHT_GRAY,
  fontSize: '16px',
})

const AMOUNTS = [
  {
    key: 0,
    title: 'Lägenheten:',
    amount: 'Fullvärde',
  },
  {
    key: 1,
    title: 'Dina prylar totalt:',
    amount: '1 000 000 kr',
  },
  {
    key: 2,
    title: 'Drulle gäller för:',
    amount: 'Prylar upp till 50 000 kr',
  },
  {
    key: 3,
    title: 'Självrisk:',
    amount: '1 500 kr',
  },
  {
    key: 4,
    title: 'Gäller i:',
    amount: 'Hela världen',
  },
]

export const InsuredAmount: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>{props.title}</Header>
        <Table>
          {AMOUNTS.map((amount) => (
            <Row key={amount.key}>
              <TextCol>
                {amount.title} {amount.amount}
              </TextCol>
              <ReadCol to={'/hedvig'}>{props.info}</ReadCol>
            </Row>
          ))}
        </Table>
      </Card>
    </InnerContainer>
  </Container>
)
