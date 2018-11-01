import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { OfferContainer } from 'containers/OfferContainer'
import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import { Link } from 'react-router-dom'
import { trackEvent } from 'utils/tracking'
import { ResetButton } from '../pages/Chat/ResetButton'

const TOPBARHEIGHT = 70
const ICONWIDTH = 16

const Wrapper = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Bar = styled('div')({
  height: TOPBARHEIGHT,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'end',
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
  '@media (max-width: 850px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '50%',
  },
})

const EscapeLink = styled('a')({})

const Logo = styled('img')({
  marginLeft: '26px',
  marginTop: '24px',
})

const CheckmarkIcon = styled('img')({
  width: ICONWIDTH,
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
  width: '60%',
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

const BarButtonWrapper = styled('div')(
  ({
    upperSignButtonVisible,
    lowerSignButtonVisible,
  }: {
    upperSignButtonVisible: boolean
    lowerSignButtonVisible: boolean
  }) => ({
    width: '20%',
    transition: 'transform 250ms 100ms',
    transform:
      upperSignButtonVisible === true && lowerSignButtonVisible === true
        ? `translateX(0)`
        : `translateX(100%)`,
    willChange: 'transform',
    justifyContent: 'flex-end',
    '@media (max-width: 850px)': {
      width: '33%',
    },
    '@media (max-width: 600px)': {
      width: '50%',
    },
  }),
)

const GetInsuredButton = styled('div')({
  display: 'flex',
  justifyContent: 'inherit',
  marginRight: '26px',
})

const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '10px 24px',
  textAlign: 'center',
})

interface Props {
  progress?: number
  upperSignButtonVisible?: boolean
  lowerSignButtonVisible?: boolean
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

export const TopBar: React.SFC<Props> = ({
  progress,
  lowerSignButtonVisible,
  upperSignButtonVisible,
}) => (
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
        <EscapeLink href="https://hedvig.com">
          <Logo src="/new-member-assets/topbar/hedvig-wordmark-solid.svg" />
        </EscapeLink>
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
      {progress !== undefined &&
        progress < 3 && (
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
      {progress === 1 &&
      lowerSignButtonVisible !== undefined &&
      upperSignButtonVisible !== undefined ? (
        <OfferContainer>
          {(offer) => {
            if (!offer || !offer.insurance.type) {
              return null
            }
            return (
              <BarButtonWrapper
                lowerSignButtonVisible={lowerSignButtonVisible}
                upperSignButtonVisible={upperSignButtonVisible}
              >
                <GetInsuredButton>
                  <LinkTag
                    to={'/new-member/sign'}
                    onClick={() =>
                      trackEvent('Checkout Started', {
                        category: 'offer',
                        value: offer.insurance.monthlyCost,
                        label: 'TopBar',
                      })
                    }
                  >
                    <TranslationsConsumer textKey="TOP_BAR_SIGN_BUTTON">
                      {(text) => text}
                    </TranslationsConsumer>
                  </LinkTag>
                </GetInsuredButton>
              </BarButtonWrapper>
            )
          }}
        </OfferContainer>
      ) : (
        progress === 0 && <ResetButton />
      )}
    </Bar>
  </Wrapper>
)

export const TopBarFiller = styled('div')({
  paddingTop: 100,
})
