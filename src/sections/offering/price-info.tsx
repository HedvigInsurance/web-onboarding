import * as React from 'react';
import styled from 'react-emotion';
import { colors, fonts } from '@hedviginsurance/brand';

const Container = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
});

const BackgroundImage = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundSize: 'cover',
  marginLeft: '20px',
  marginRight: '20px',
  '@media (max-width: 640px)': {
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
});

const Card = styled('div')({
  marginTop: '70px',
  marginBottom: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  '@media (max-width: 640px)': {
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
});

export const Header = styled('h1')({
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '32px',
  marginBottom: '10px',
  fontWeight: 'normal',
  textAlign: 'center',
  paddingLeft: '150px',
  paddingRight: '150px',
  '@media (max-width: 640px)': {
    fontSize: '30px',
    width: '100%',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
});

export const SubTitle = styled('p')({
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
});

const Price = styled('p')({
  marginBottom: '0px',
  marginTop: '40px',
  fontSize: '20px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.PURPLE,
});

const Time = styled('p')({
  marginBottom: '20px',
  marginTop: '0px',
  fontSize: '16px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.BLACK_PURPLE,
});

export const Line = styled('div')({
  width: '100%',
  backgroundColor: colors.LIGHT_GRAY,
  height: '1px',
});

const StartContainer = styled('div')({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const AppliedContainer = styled('div')({
  marginBottom: '20px',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const ImageIcon = styled('img')({
  marginBottom: '0px',
  marginTop: '0px',
  marginRight: '6px',
  width:'17px',
  height:'17px',
});

export const Label = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
});

const InsuredLabel = styled('p')({
  marginLeft: '5px',
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
});

const GetInsuredButton = styled('div')({
  paddingBottom: 40,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const LinkTag = styled('a')({
  backgroundColor: colors.GREEN,
  fontSize: '18px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
});

interface Props {
  alreadyInsured: boolean,
  header: string,
  subTitle: string,
  price: string,
  subscriptionTime: string,
  startDate: string,
  coverage: string,
  getInsured: string,
  iconWorld: any, /*TODO: type fix*/
  iconClock: any, /*TODO: type fix*/
  BackgroundImage: any, /*TODO: type fix*/
  alreadyInsuredLabel: string,
  todayLabel: string,
}

export const PriceInfo: React.SFC<Props> = (props) => (

      /*TODO: Change strings to be handled by cms */
      <Container>
        <BackgroundImage style={{backgroundImage: props.BackgroundImage}}>
          <Card>
            <Header>{props.header}</Header>
            <SubTitle>{props.subTitle}</SubTitle>
            <Price>{props.price}</Price>
            <Time>{props.subscriptionTime}</Time>
            <Line/>

            <StartContainer>
              <ImageIcon src={props.iconClock}/>
              <Label>{props.startDate}</Label>
              <InsuredLabel>
                {props.alreadyInsured ? props.alreadyInsuredLabel: props.todayLabel}
              </InsuredLabel>
            </StartContainer>

            <AppliedContainer>
              <ImageIcon src={props.iconWorld}/>
              <Label>{props.coverage}</Label>
            </AppliedContainer>

            <GetInsuredButton>
              <LinkTag href="/">
                {props.getInsured}
              </LinkTag>
            </GetInsuredButton>

          </Card>
        </BackgroundImage>
      </Container>
    );
