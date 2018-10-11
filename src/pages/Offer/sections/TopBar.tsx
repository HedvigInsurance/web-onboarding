import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

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
  zIndex: 5,
  borderBottom: '1px solid ' + colors.LIGHT_GRAY,
  '@media (max-width: 710px)': {
    justifyContent: 'space-evenly',
  },
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

const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'inherit',
  marginRight: '40px',
  '@media (max-width: 350px)': {
    marginRight: '20px',
  },
})

const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
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
  '@media (max-width: 710px)': {
    width: '33%',
  },
})

const BarProgressContainer = styled('div')({
  display: 'flex',
  width: '60%',
  justifyContent: 'center',
  flexDirection: 'row',
  '@media (max-width: 710px)': {
    flexDirection: 'column',
    width: '33%',
  },
})

const BarButtonContainer = styled('div')({
  width: '20%',
  justifyContent: 'flex-end',
  '@media (max-width: 710px)': {
    width: '33%',
  },
})

interface Props {
  buttonText?: string
  progress: number
  showButton: boolean
}

const progressStrings = [
  {
    key: 0,
    progressText: '1. Berätta om dig själv',
  },
  {
    key: 1,
    progressText: '2. Se din försäkring',
  },
  {
    key: 2,
    progressText: '3.Signera med BankID',
  },
]

export const TopBar: React.SFC<Props> = (props) => (
  <Container>
    <Bar>
      <BarContainer>
        <Logo src="/assets/offering/logo.png" />
      </BarContainer>
      <BarProgressContainer>
        {progressStrings.map((text) => (
          <ProgressLabel
            key={text.key}
            style={{
              color:
                text.key === props.progress ? colors.BLACK : colors.DARK_GRAY,
            }}
          >
            {text.progressText}
          </ProgressLabel>
        ))}
      </BarProgressContainer>
      {!props.showButton ? (
        <BarButtonContainer>
          {props.buttonText ? (
            <GetInsuredButton>
              <LinkTag to={'/hedvig'}>{props.buttonText}</LinkTag>
            </GetInsuredButton>
          ) : null}
        </BarButtonContainer>
      ) : null}
    </Bar>
  </Container>
)
