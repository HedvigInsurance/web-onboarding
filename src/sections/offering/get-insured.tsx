import { colors } from '@hedviginsurance/brand'
import {
  GetInsuredButton,
  LinkTag,
} from 'components/offering/get-insured-button'
import { Header } from 'components/offering/header'
import { InnerWrapper } from 'components/offering/inner-wrapper'
import { Wrapper } from 'components/offering/wrapper'
import * as React from 'react'
import styled from 'react-emotion'
import * as VisibilitySensor from 'react-visibility-sensor'

interface Props {
  title: string
  name: string
  getInsured: string
  state: boolean
  update: (isVisible: boolean) => void
}

const Card = styled('div')({
  marginTop: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '70px',
  backgroundColor: colors.WHITE,
  minWidth: '550px',
  paddingBottom: '30px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
  '@media (max-width: 550px)': {
    minWidth: '0px',
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

export const GetInsured: React.SFC<Props> = (props) => {
  const handleChange = (isVisible: boolean) => {
    props.update(isVisible)
  }
  return (
    <Wrapper>
      <InnerWrapper>
        <Card>
          <Header>
            {props.title} {props.name}
          </Header>
          <VisibilitySensor partialVisibility onChange={handleChange}>
            {() => (
              <GetInsuredButton>
                <LinkTag to={'/'}>{props.getInsured}</LinkTag>
              </GetInsuredButton>
            )}
          </VisibilitySensor>
        </Card>
      </InnerWrapper>
    </Wrapper>
  )
}
