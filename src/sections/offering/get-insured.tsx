import { colors } from '@hedviginsurance/brand'
import { Container } from 'components/offering/container'
import {
  GetInsuredButton,
  LinkTag,
} from 'components/offering/get-insured-button'
import { Header } from 'components/offering/header'
import { InnerContainer } from 'components/offering/inner-container'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  title: string
  name: string
  getInsured: string
}

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
          <LinkTag to={'/'}>{props.getInsured}</LinkTag>
        </GetInsuredButton>
      </Card>
    </InnerContainer>
  </Container>
)
