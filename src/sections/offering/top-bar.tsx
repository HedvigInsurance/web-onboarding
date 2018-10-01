import * as React from 'react'
import styled from 'react-emotion'
import { colors } from '@hedviginsurance/brand'

const Container = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Bar = styled('div')({
  position: 'fixed',
  width: '100%',
  top: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.WHITE,
  justifyContent: 'space-between',
  borderBottom: '1px solid ' + colors.LIGHT_GRAY
})

const Logo = styled('img')({
  height: '26px',
  marginTop: '25px',
  marginBottom: '25px',
  marginLeft: '40px',
})

export const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginRight: '40px',
})

export const LinkTag = styled('a')({
  backgroundColor: colors.GREEN,
  fontSize: '18px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
})

interface MyComponentState { navButtonIsHidden :  boolean }

interface Props {
    getInsured: string,
}

export class TopBar extends React.Component<Props,MyComponentState>  {

  componentDidMount() {
      window.addEventListener('scroll', this.hideButton);
    }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideButton);
  }

  constructor(props: any) {
    super(props)
    this.hideButton = this.hideButton.bind(this);

    this.state = {
      navButtonIsHidden: true,
    }
  }

  hideButton() {
    if (window.scrollY > 415) {
      this.setState({
        navButtonIsHidden: false,
      });
    }else if (window.scrollY < 415){
      this.setState({
        navButtonIsHidden: true,
      });
    }
  }

  render(){
    return(
      <Container>
        <Bar>
          <Logo src="/assets/offering/logo.png"/>
            <GetInsuredButton style={{visibility: this.state.navButtonIsHidden ? 'hidden' : 'visible'}}>
              <LinkTag href="/">{this.props.getInsured}</LinkTag>
            </GetInsuredButton>
        </Bar>
      </Container>
    );
  }
}
