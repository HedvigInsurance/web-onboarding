import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'

const Container = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Bar = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.WHITE,
  // justifyContent: 'space-between',
  borderBottom: '1px solid ' + colors.LIGHT_GRAY,
})

const Logo = styled('img')({
  height: '26px',
  marginTop: '25px',
  marginBottom: '25px',
  marginLeft: '40px',
  '@media (max-width: 350px)': {
    marginLeft: '20px',
  },
})

export const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginRight: '40px',
  '@media (max-width: 350px)': {
    marginRight: '20px',
  },
})

export const LinkTag = styled('a')({
  backgroundColor: colors.GREEN,
  fontSize: '18px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  width: 'max-content',
  '@media (max-width: 350px)': {
    textAlign: 'center',
    marginRight: 0,
    maxWidth: '250px',
  },
})

const ProgressLabel = styled('div')({
  marginLeft: '10px',
  marginRight: '10px',
  fontSize: '14px',
})

const BarContainer = styled('div')({
  width: '20%',
})

const BarProgressContainer = styled('div')({
  display: 'flex',
  width: '60%',
  justifyContent: 'center',
})

const BarButtonContainer = styled('div')({
  width: '20%',
  justifyContent: 'flex-end',
})

interface MyComponentState {
  navButtonIsHidden: boolean
  active: number
}

interface Props {
  getInsured?: string
  progress: number
}

export class TopBar extends React.Component<Props, MyComponentState> {
  constructor(props: any) {
    super(props)
    this.hideButton = this.hideButton.bind(this)

    this.state = {
      navButtonIsHidden: true,
      active: this.props.progress,
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
        navButtonIsHidden: false,
      })
    } else if (window.scrollY < 532) {
      this.setState({
        navButtonIsHidden: true,
      })
    }
  }

  public checkProgress(index: number) {
    if (index === this.state.active) {
      return colors.BLACK
    } else {
      return colors.DARK_GRAY
    }
  }

  public render() {
    return (
      <Container>
        <Bar>
          <BarContainer>
            <Logo src="/assets/offering/logo.png" />
          </BarContainer>
          <BarProgressContainer>
            {progressStrings.map((text, index) => (
              <ProgressLabel
                key={index}
                style={{ color: this.checkProgress(index) }}
              >
                {text.progressText}
              </ProgressLabel>
            ))}
          </BarProgressContainer>
          <BarButtonContainer>
            {this.props.getInsured ? (
              <GetInsuredButton
                style={{
                  visibility: this.state.navButtonIsHidden
                    ? 'hidden'
                    : 'visible',
                }}
              >
                <LinkTag href="/">{this.props.getInsured}</LinkTag>
              </GetInsuredButton>
            ) : null}
          </BarButtonContainer>
        </Bar>
      </Container>
    )
  }
}

const progressStrings = [
  {
    progressText: '1. Berätta om dig själv',
  },
  {
    progressText: '2. Se din försäkring',
  },
  {
    progressText: '3.Signera med BankID',
  },
]
