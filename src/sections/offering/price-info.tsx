import * as React from 'react'
import styled from 'react-emotion'
import { colors, fonts } from '@hedviginsurance/brand'

const Container = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
});

/* TODO: change to img and use img source instead*/
const BackgroundImage = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px',
  marginRight: '20px',
  backgroundColor: colors.LIGHT_GRAY,
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

const Header = styled('h1')({
  fontFamily: fonts.MERRIWEATHER,
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

const Adress = styled('p')({
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
  marginTop: '0px',
  fontSize: '16px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.BLACK_PURPLE,
});

const StartContainer = styled('div')({
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const AppliedContainer = styled('div')({
  marginBottom: '20px',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const ImageIcon = styled('img')({
  marginBottom: '0px',
  marginTop: '0px',
  width:'20px',
  height:'20px',
});

const Icon = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
});


const Label = styled('p')({
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
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 75px',
  '@media (max-width: 640px)': {
    padding: '15px 60px',
  },
});


class PriceInfo extends React.Component {

  render() {
    return (
      <Container>
        <BackgroundImage>
          <Card>
            <Header>Min hemförsäkring</Header>
            <Adress>Krukmakargatn 5</Adress>
            <Price>299 kr/mån</Price>
            <Time>Ingen bindningstid</Time>

            <StartContainer>
              <ImageIcon src="../../img/offering/start-date.png"/>
              <Label>Startdatum: </Label>
              <Icon> []</Icon>
            </StartContainer>
            <AppliedContainer>
              <ImageIcon src=""/>
              <Label>Gäller i hela världen</Label>
            </AppliedContainer>
            <GetInsuredButton>
              <LinkTag href="/hedvig">
                Bli försäkrad
              </LinkTag>
            </GetInsuredButton>

          </Card>
        </BackgroundImage>
      </Container>
    )
  }
}

export { PriceInfo }
