import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'

const Container = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

export const InnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const Card = styled('div')({
  marginTop: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  minWidth: '700px',
  paddingBottom: 40,
  '@media (max-width: 700px)': {
    minWidth: '0px',
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

export const Header = styled('h1')({
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '32px',
  marginBottom: '10px',
  fontWeight: 'normal',
  textAlign: 'center',
  '@media (max-width: 640px)': {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  '@media (max-width: 400px)': {
    fontSize: '25px',
  },
})

export const SubTitle = styled('p')({
  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '16px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.DARK_GRAY,
})

const Price = styled('p')({
  marginBottom: '0px',
  marginTop: '30px',
  fontSize: '20px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.PURPLE,
})

const Time = styled('p')({
  marginBottom: '30px',
  marginTop: '0px',
  fontSize: '16px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.BLACK_PURPLE,
})

export const Label = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
})

export const ProtectionLabel = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.BLACK,
})

export const Row = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  justifyContent: 'center',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '30px',
})

const Image = styled('img')({
  margin: '30px',
  maxWidth: '70px',
  '@media (max-width: 400px)': {
    margin: '0px',
    maxWidth: '150px',
  },
})

export const Title = styled('label')({
  marginBottom: '10px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: '150px',
})

export const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

export const LinkTag = styled('a')({
  backgroundColor: colors.GREEN,
  fontSize: '18px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
})

interface Props {
  alreadyInsured: boolean
  header: string
  subTitle1: string
  subTitle2: string
  price: string
  subscriptionTime: string
  startDate: string
  coverage: string
  getInsured: string
  iconWorld: any /*TODO: type fix*/
  iconClock: any /*TODO: type fix*/
  BackgroundImage: any /*TODO: type fix*/
  alreadyInsuredLabel: string
  todayLabel: string
  protection: string
}

interface MyComponentState {
  buttonIsHidden: boolean
}

export class PriceInfo extends React.Component<Props, MyComponentState> {
  public COLUMNS = [
    {
      key: 0,
      title: 'Din bostad',
      image: '/assets/offering/Placeholder.png',
    },
    {
      key: 1,
      title: 'Dig och din familj',
      image: '/assets/offering/Placeholder.png',
    },
    {
      key: 2,
      title: 'Dina prylar',
      image: '/assets/offering/Placeholder.png',
    },
  ]
  constructor(props: any) {
    super(props)
    this.hideButton = this.hideButton.bind(this)
    this.state = {
      buttonIsHidden: false,
    }
  }
  public componentDidMount() {
    window.addEventListener('scroll', this.hideButton)
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.hideButton)
  }

  /*TODO: use refs instead of fixed height*/
  public hideButton() {
    if (window.scrollY > 532) {
      this.setState({
        buttonIsHidden: true,
      })
    } else if (window.scrollY < 532) {
      this.setState({
        buttonIsHidden: false,
      })
    }
  }

  public render() {
    return (
      <Container onScroll={this.hideButton}>
        <InnerContainer>
          <Card>
            <Header>{this.props.header}</Header>
            <SubTitle>{this.props.subTitle1}</SubTitle>
            <SubTitle>{this.props.subTitle2}</SubTitle>
            <Price>{this.props.price}</Price>
            <Time>{this.props.subscriptionTime}</Time>
            <ProtectionLabel>{this.props.protection}</ProtectionLabel>
            <Row>
              {this.COLUMNS.map((col) => (
                <Col key={col.key}>
                  <Image src={col.image} />
                  <Title>{col.title}</Title>
                </Col>
              ))}
            </Row>
            <GetInsuredButton
              style={{
                visibility: this.state.buttonIsHidden ? 'hidden' : 'visible',
              }}
            >
              <LinkTag href="/">{this.props.getInsured}</LinkTag>
            </GetInsuredButton>
          </Card>
        </InnerContainer>
      </Container>
    )
  }
}
