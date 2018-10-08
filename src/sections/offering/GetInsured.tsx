import { colors } from '@hedviginsurance/brand'
import { GetInsuredButton, LinkTag } from 'components/get-insured-button'
import { Header } from 'components/offering/Header'
import { InnerWrapper } from 'components/offering/InnerWrapper'
import { Wrapper } from 'components/offering/Wrapper'
import * as React from 'react'
import styled from 'react-emotion'
import * as VisibilitySensor from 'react-visibility-sensor'

interface Props {
  title: string
  name: string
  buttonText: string
  buttonVisibility: (isVisible: boolean) => void
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

export const GetInsured: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <Card>
        <Header>
          {props.title} {props.name}
        </Header>
        <VisibilitySensor
          partialVisibility
          onChange={(isVisible: boolean) => {
            props.buttonVisibility(isVisible)
          }}
        >
          {() => (
            <GetInsuredButton>
              <LinkTag to={'/'}>{props.buttonText}</LinkTag>
            </GetInsuredButton>
          )}
        </VisibilitySensor>
      </Card>
    </InnerWrapper>
  </Wrapper>
)
