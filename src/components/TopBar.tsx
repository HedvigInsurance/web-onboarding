import { colors } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
const TOPBARHEIGHT = 70

const Container = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Bar = styled('div')({
  height: TOPBARHEIGHT,
  maxHeight: TOPBARHEIGHT,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.WHITE,
  zIndex: 5,
  boxShadow: '0 1px 11px 1px rgba(0,0,0,.15)',
})

const BarContainer = styled('div')({
  height: '100%',
  width: '25%',
  '@media (max-width: 800px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '50%',
  },
})

const EscapeLink = styled('a')({
  display: 'flex',
})

const Logo = styled('img')({
  marginLeft: '26px',
  marginTop: '24px',
})

const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'inherit',
  marginRight: '26px',
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
    padding: '15px 20px',
  },
})

const ProgressLabel = styled('div')({
  marginLeft: '10px',
  marginRight: '10px',
  fontSize: '14px',
})

const BarProgressContainer = styled('div')({
  display: 'flex',
  width: '50%',
  justifyContent: 'center',
  flexDirection: 'row',
  '@media (max-width: 800px)': {
    width: '33%',
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const CollapsedProgressContainer = styled('div')({
  display: 'none',
  width: '25%',
  justifyContent: 'center',
  flexDirection: 'row',
  textAlign: 'center',
  '@media (max-width: 800px)': {
    width: '33%',
    display: 'flex',
    visibility: 'visible',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '@media (max-width: 600px)': {
    display: 'none',
  },
})

const BarButtonContainer = styled('div')({
  width: '25%',
  justifyContent: 'flex-end',
  '@media (max-width: 800px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '50%',
  },
})

interface Props {
  buttonText?: string
  progress?: number
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
    progressText: '3. Signera med BankID',
  },
]

export const TopBar: React.SFC<Props> = (props) => (
  <Container>
    <Bar>
      <BarContainer>
        <EscapeLink href="/hedvig">
          <Logo src="/assets/topbar/hedvig-wordmark-solid.svg" />
        </EscapeLink>
      </BarContainer>
      <BarProgressContainer>
        {props.progress !== undefined
          ? progressStrings.map((text) => (
              <ProgressLabel
                key={text.key}
                style={{
                  color:
                    text.key === props.progress
                      ? colors.BLACK
                      : colors.DARK_GRAY,
                }}
              >
                {text.progressText}
              </ProgressLabel>
            ))
          : null}
      </BarProgressContainer>
      <CollapsedProgressContainer>
        <ProgressLabel>
          {props.progress !== undefined
            ? progressStrings[props.progress].progressText
            : null}
        </ProgressLabel>
      </CollapsedProgressContainer>
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

export const TopBarFiller = styled('div')({
  paddingTop: 100,
})
