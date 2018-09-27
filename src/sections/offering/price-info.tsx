import * as React from 'react'
import styled from 'react-emotion'
import { colors, fonts } from '@hedviginsurance/brand'

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
  backgroundImage: 'url(assets/offering/map-background.png)',
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

const Label = styled('p')({
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
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 75px',
  '@media (max-width: 640px)': {
    padding: '15px 60px',
  },
});

interface Props {
  alreadyInsured: boolean,
}

class PriceInfo extends React.Component<Props> {

  render() {
    return (
      /*TODO: Change strings to be handled by cms */
      <Container>
        <BackgroundImage>
          <Card>
            <Header>Min hemförsäkring</Header>
            <Adress>Krukmakargatn 5</Adress>
            <Price>299 kr/mån</Price>
            <Time>Ingen bindningstid</Time>

            <StartContainer>
              <ImageIcon src={'/assets/offering/start-date.png'}/>
              <Label>Startdatum:</Label>
              <InsuredLabel>{this.props.alreadyInsured ? 'Gamla försäkringens slutdatum' : 'Idag'}</InsuredLabel>
            </StartContainer>

            <AppliedContainer>
              <ImageIcon src={'/assets/offering/world.png'}/>
              <Label>Gäller i hela världen</Label>
            </AppliedContainer>

            <GetInsuredButton>
              <LinkTag href="/">
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
