import { colors, fonts } from '@hedviginsurance/brand'
import { GetInsuredButton, LinkTag } from 'components/buttons'
import * as React from 'react'
import styled from 'react-emotion'
import * as VisibilitySensor from 'react-visibility-sensor'
import { CardWrapperSmall } from '../components/CardWrapperSmall'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

interface Props {
  title: string
  name: string
  buttonText: string
  buttonVisibility: (isVisible: boolean) => void
  price: string
  subTitle1: string
  subTitle2: string
  subTitle3: string
}

const Card = styled('div')({
  marginTop: '70px',
  marginBottom: '70px',
  backgroundColor: colors.WHITE,
  paddingBottom: '30px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.WHITE,
  marginTop: '0px',
  paddingTop: '30px',
  marginBottom: '10px',
  fontSize: '32px',
})

const PersonalInfo = styled('div')({
  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '30px',
  fontSize: '14px',
  lineHeight: '22px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.WHITE,
})

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
})

const Price = styled('h1')({
  marginBottom: '20px',
  marginTop: '20px',
  fontSize: '32px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

export const GetInsured: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapperSmall>
        <Card>
          <HeaderBackground>
            <HeaderWrapper>
              <Header>
                {props.title} {props.name}
              </Header>
            </HeaderWrapper>
            <PersonalInfo>
              {props.subTitle1} • {props.subTitle2} • {props.subTitle3}
            </PersonalInfo>
          </HeaderBackground>
          <Price>{props.price}</Price>
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
      </CardWrapperSmall>
    </InnerWrapper>
  </Wrapper>
)
