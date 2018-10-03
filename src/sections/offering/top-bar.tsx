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

const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginRight: '40px',
  '@media (max-width: 350px)': {
    marginRight: '20px',
  },
})

const LinkTag = styled(Link)({
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

interface Props {
  getInsured?: string
  progress: number
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
      {/* TODO: Visability Sensor */}
      <BarButtonContainer>
        {props.getInsured ? (
          <GetInsuredButton>
            <LinkTag to={'/hedvig'}>{props.getInsured}</LinkTag>
          </GetInsuredButton>
        ) : null}
      </BarButtonContainer>
    </Bar>
  </Container>
)
