import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
const TOPBARHEIGHT = 70

const Wrapper = styled('div')({
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

const BarWrapper = styled('div')({
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
  textAlign: 'center',
  '@media (max-width: 350px)': {
    padding: '8px 20px',
  },
})

const ProgressLabel = styled('div')({
  marginLeft: '10px',
  marginRight: '10px',
  fontSize: '14px',
})

const BarProgressWrapper = styled('div')({
  display: 'flex',
  width: '50%',
  justifyContent: 'center',
  flexDirection: 'row',
  '@media (max-width: 800px)': {
    display: 'none',
  },
})

const CollapsedProgressWrapper = styled('div')({
  display: 'none',
  '@media (max-width: 800px)': {
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
  },
  '@media (max-width: 600px)': {
    display: 'none',
  },
})

const BarButtonWrapper = styled('div')({
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
  upperSignButtonVisible?: boolean
  lowerSignButtonVisible?: boolean
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
  <Wrapper>
    <Bar>
      <BarWrapper>
        <EscapeLink href="https://hedvig.com">
          <Logo src="/assets/topbar/hedvig-wordmark-solid.svg" />
        </EscapeLink>
      </BarWrapper>
      {props.progress !== undefined ? (
        <BarProgressWrapper>
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
        </BarProgressWrapper>
      ) : null}
      {props.progress !== undefined ? (
        <CollapsedProgressWrapper>
          <ProgressLabel>
            {progressStrings[props.progress].progressText}
          </ProgressLabel>
        </CollapsedProgressWrapper>
      ) : null}
      {props.upperSignButtonVisible && props.lowerSignButtonVisible ? (
        <BarButtonWrapper>
          {props.buttonText ? (
            <GetInsuredButton>
              <LinkTag to={'/sign'}>{props.buttonText}</LinkTag>
            </GetInsuredButton>
          ) : null}
        </BarButtonWrapper>
      ) : null}
    </Bar>
  </Wrapper>
)

export const TopBarFiller = styled('div')({
  paddingTop: 100,
})
