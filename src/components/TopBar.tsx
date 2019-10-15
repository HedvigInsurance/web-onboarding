import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CurrentLanguage } from './utils/CurrentLanguage'

export const TOP_BAR_HEIGHT = 70
export const ICON_WIDTH = 16

const Wrapper = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Bar = styled('div')({
  height: TOP_BAR_HEIGHT,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.WHITE,
  zIndex: 5,
  boxShadow: '0 1px 11px 1px rgba(0,0,0,.15)',
})

const ProgressLine = styled('div')({
  backgroundColor: colors.GREEN,
  height: '4px',
  zIndex: 10,
  top: 0,
  left: 0,
  right: 0,
  position: 'fixed',
})

const LogoWrapper = styled('div')({
  height: '100%',
  width: '20%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: 4,
  paddingLeft: 24,
  '@media (max-width: 850px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '55%',
  },
  '@media (max-width: 350px)': {
    paddingLeft: 10,
  },
})

const EscapeLink = styled('a')({
  display: 'flex',
})

const Logo = styled('img')({})

const CheckmarkIcon = styled('img')({
  width: ICON_WIDTH,
})

const ProgressText = styled('div')({
  marginLeft: '10px',
  marginRight: '10px',
  fontSize: '14px',
})

const ProgressStages = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '55%',
  '@media (max-width: 850px)': {
    display: 'none',
  },
})

const StageCol = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const StageRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
})

const CollapsedProgressStages = styled('div')({
  display: 'none',
  '@media (max-width: 850px)': {
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
  },
  '@media (max-width: 600px)': {
    display: 'none',
  },
})

const ButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  textAlign: 'right',
  width: '20%',
  paddingTop: 4,
  paddingLeft: 10,
  '& > *:last-of-type': {
    marginRight: 26,
  },
  '@media (max-width: 850px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '45%',
    paddingRight: 26,
    '& > *:last-of-type': {
      marginRight: 10,
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
  '@media (max-width: 350px)': {
    paddingRight: 10,
  },
})

interface Props {
  progress?: number
  button?: React.ReactNode
  partner?: string
}

const progressInfo = [
  {
    key: 0,
    progressPercentage: '30%',
    textKey: 'PROGRESS_TEXT_HEDVIG',
  },
  {
    key: 1,
    progressPercentage: '50%',
    textKey: 'PROGRESS_TEXT_OFFER',
  },
  {
    key: 2,
    progressPercentage: '70%',
    textKey: 'PROGRESS_TEXT_SIGN',
  },
]

const getTextColor = (progress: number, key: number) => {
  return progress >= key ? colors.BLACK : colors.DARK_GRAY
}

export const TopBar: React.SFC<Props> = ({ progress, button, partner }) => (
  <Wrapper>
    {progress !== undefined && (
      <ProgressLine
        style={{
          width:
            progress < 3 ? progressInfo[progress].progressPercentage : '100%',
        }}
      />
    )}

    <Bar>
      <LogoWrapper>
        <CurrentLanguage>
          {({ currentLanguage }) => (
            <EscapeLink href={'/' + currentLanguage}>
              <Logo
                src={`/new-member-assets/topbar/hedvig-wordmark-${partner ||
                  'solid'}.svg`}
              />
            </EscapeLink>
          )}
        </CurrentLanguage>
      </LogoWrapper>
      {progress !== undefined && (
        <ProgressStages>
          {progressInfo.map((stage) => (
            <StageCol key={stage.key}>
              <StageRow>
                <ProgressText
                  style={{
                    color: getTextColor(progress, stage.key),
                  }}
                >
                  {stage.key + 1}.
                </ProgressText>
              </StageRow>
              <StageRow>
                <TranslationsConsumer textKey={stage.textKey}>
                  {(text) => (
                    <ProgressText
                      style={{
                        color: getTextColor(progress, stage.key),
                      }}
                    >
                      {text}
                    </ProgressText>
                  )}
                </TranslationsConsumer>
                <CheckmarkIcon
                  src="/new-member-assets/offering/checkmark.svg"
                  style={{
                    visibility: progress <= stage.key ? 'hidden' : 'visible',
                  }}
                />
              </StageRow>
            </StageCol>
          ))}
        </ProgressStages>
      )}
      {progress !== undefined && progress < 3 && (
        <CollapsedProgressStages>
          <StageCol>
            <StageRow>
              <ProgressText
                style={{
                  color: colors.BLACK,
                }}
              >
                {progressInfo[progress].key + 1}
                {'.'}
              </ProgressText>
            </StageRow>
            <StageRow>
              <TranslationsConsumer textKey={progressInfo[progress].textKey}>
                {(text) => <ProgressText>{text}</ProgressText>}
              </TranslationsConsumer>
            </StageRow>
          </StageCol>
        </CollapsedProgressStages>
      )}
      <ButtonWrapper>{button}</ButtonWrapper>
    </Bar>
  </Wrapper>
)

const EmptyBar = styled(Bar)({
  justifyContent: 'space-between',
})

const ProceedComponentWrapper = styled('div')({
  marginRight: 26,
  '@media (max-width: 350px)': {
    marginRight: 10,
  },
})

interface EmptyTopBarProps {
  proceedComponent?: React.ReactNode
  partner?: string
}

export const EmptyTopBar: React.FC<EmptyTopBarProps> = ({
  proceedComponent = <div />,
  partner,
}) => (
  <Wrapper>
    <EmptyBar>
      <LogoWrapper>
        <EscapeLink href="/">
          <Logo
            src={`/new-member-assets/topbar/hedvig-wordmark-${partner ||
              'solid'}.svg`}
          />
        </EscapeLink>
      </LogoWrapper>
      <div />
      <ProceedComponentWrapper>{proceedComponent}</ProceedComponentWrapper>
    </EmptyBar>
  </Wrapper>
)

export const TopBarFiller = styled('div')({
  paddingTop: 100,
})
