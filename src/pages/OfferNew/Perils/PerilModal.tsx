import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import hexToRgba from 'hex-to-rgba'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { BackArrow } from '../../../components/icons/BackArrow'
import { Checkmark } from '../../../components/icons/Checkmark'
import { Crossmark } from '../../../components/icons/Crossmark'
import { ForwardArrow } from '../../../components/icons/ForwardArrow'
import { InfoIcon } from '../../../components/icons/Info'
import { Modal, ModalProps } from '../../../components/ModalNew'
import { Peril } from './types'

const TRANSITION_MS = 250

interface PerilModalProps {
  perils: ReadonlyArray<Peril>
  currentPerilIndex: number
  setCurrentPeril: (perilIndex: number) => void
}

const Header = styled('div')`
  width: 100%;
  height: 8.75rem;
  background-color: ${colorsV2.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 0.125rem;
`

const Picker = styled('div')`
  width: 100%;
  height: 5.5rem;
  display: flex;
  flex-direction: row;
  margin: 0 -0.75rem;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`

const PickerItem = styled('button')`
  width: 6.25rem;
  flex-shrink: 0;
  padding: 0.5rem 0.5rem 0.625rem 0.5rem;
  margin: 0 0.5rem;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  svg {
    width: 2.75rem;
    height: 2.75rem;
  }

  :focus {
    outline: none;
  }
`

const PickerItemLabel = styled('div')`
  font-size: 0.9375rem;
  letter-spacing: -0.23px;
  text-align: center;
  white-space: nowrap;
  color: ${colorsV2.darkgray};
`

interface PerilItemsContainerProps {
  currentPerilIndex: number
  transition: boolean
}

const PerilItemsContainer = styled('div')<PerilItemsContainerProps>`
  position: relative;
  height: 5.5rem;
  display: flex;
  ${(props) =>
    props.transition && `transition: all ${TRANSITION_MS}ms ease-in-out;`}

  ${(props) =>
    `transform: translateX(${
      props.currentPerilIndex !== 0
        ? `calc((-100%/3) - ${(props.currentPerilIndex - 12 - 2) * (100 + 16) +
            8}px)`
        : `calc((-100%/3) + 6.75rem)`
    });`}
`

const Indicator = styled('div')`
  position: absolute;
  width: 6.25rem;
  height: 0.125rem;
  bottom: 0;
  left: 0;
  background-color: ${colorsV2.black};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  transition: transform 0.15s ease-in-out;
  left: 7.25rem;
`

const Gradient = styled('div')`
  height: 5rem;
  width: 6.25rem;
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0.5rem;
`

const LeftGradient = styled(Gradient)`
  left: 0;
  background: linear-gradient(
    to right,
    ${colorsV2.white} 30%,
    ${hexToRgba(colorsV2.white, 0)} 100%
  );
`

const RightGradient = styled(Gradient)`
  right: 0;
  justify-content: flex-end;
  background: linear-gradient(
    to left,
    ${colorsV2.white} 30%,
    ${hexToRgba(colorsV2.white, 0)} 100%
  );
`

const DirectionButton = styled('button')`
  width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
  background: none;
  border: none;
  svg {
    transition: all 0.15s ease-in-out;
    fill: ${colorsV2.gray};
  }
  :focus {
    outline: none;
  }
  &:hover {
    svg {
      fill: ${colorsV2.violet500};
    }
  }
`

const BackButton = styled(DirectionButton)`
  margin-left: 0.625rem;
  justify-content: flex-start;
`

const ForwardButton = styled(DirectionButton)`
  margin-right: 0.625rem;
  justify-content: flex-end;
`

const Content = styled('div')`
  padding: 3.5rem;

  @media (max-width: 450px) {
    padding: 2rem;
  }
`

const Title = styled.div`
  font-family: ${fonts.GEOMANIST};
  font-size: 2.5rem;
  line-height: 3.5rem;
  color: ${colorsV2.black};
  margin-bottom: 1rem;
  letter-spacing: -0.57px;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 0.5rem;
  }
`

const Description = styled.div`
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: ${colorsV2.darkgray};
  letter-spacing: -0.26px;
`

const CoverageWrapper = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const CoverageList = styled.div`
  width: 50%;

  :first-child {
    margin-right: 1rem;
  }

  :last-child {
    margin-left: 1rem;
  }

  @media (max-width: 600px) {
    width: 100%;

    :first-child {
      margin: 0 0 2.5rem 0;
    }

    :last-child {
      margin: 0;
    }
  }
`

const CoverageListTitle = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV2.black};
  letter-spacing: -0.26px;
  font-weight: 600;
  margin-bottom: 0.75rem;
`

const CoverageListItem = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV2.black};
  letter-spacing: -0.26px;
  padding-left: 2rem;
  position: relative;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    left: 0;
    top: 0.25rem;
  }
`
const InfoBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const InfoBox = styled.div`
  max-width: 41.25rem;
  width: 100%;
  border-radius: 8px;
  background: ${colorsV2.offwhite};
  padding: 1.5rem 2.5rem 1.5rem 3.5rem;
  margin-top: 4rem;
  position: relative;

  > svg {
    position: absolute;
    left: 1.5rem;
  }

  @media (max-width: 600px) {
    margin-top: 2.5rem;
    background: none;
    padding: 0;
    > svg {
      display: none;
    }
  }
`

const InfoBoxTitle = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  color: ${colorsV2.black};
  letter-spacing: -0.26px;
  font-weight: 600;
  margin-bottom: 0.75rem;
`

const InfoBoxBody = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colorsV2.darkgray};
  letter-spacing: -0.26px;
`

export const PerilModal: React.FC<PerilModalProps & ModalProps> = (props) => {
  const [transitionEnabled, setTransitionEnabled] = React.useState(true)
  const [actionsAllowed, setActionsAllowed] = React.useState(true)
  const textKeys = useTextKeys()

  React.useEffect(() => {
    const isBelowBoundary = props.currentPerilIndex < props.perils.length
    const isAboveBoundary = props.currentPerilIndex > props.perils.length * 2

    if (isBelowBoundary || isAboveBoundary) {
      setTimeout(() => {
        setTransitionEnabled(false)
        props.setCurrentPeril(
          props.currentPerilIndex +
            (isBelowBoundary ? 1 : -1) * props.perils.length,
        )

        setTimeout(() => setTransitionEnabled(true), TRANSITION_MS)
      }, TRANSITION_MS)
    }

    setActionsAllowed(false)

    setTimeout(() => {
      setActionsAllowed(true)
    }, TRANSITION_MS * 2)
  }, [props.currentPerilIndex])

  const tripledPerils = props.perils.concat(props.perils).concat(props.perils)

  const currentPeril =
    props.perils[props.currentPerilIndex % props.perils.length]

  return (
    <Modal isVisible={props.isVisible} onClose={props.onClose}>
      <Header>
        <Picker>
          <PerilItemsContainer
            currentPerilIndex={props.currentPerilIndex}
            transition={transitionEnabled}
          >
            {tripledPerils.map((peril, index) => (
              <PickerItem
                key={index}
                onClick={() =>
                  actionsAllowed &&
                  props.setCurrentPeril(index % tripledPerils.length)
                }
              >
                {peril.icon}
                <PickerItemLabel>{peril.title}</PickerItemLabel>
              </PickerItem>
            ))}
          </PerilItemsContainer>
          <Indicator />
        </Picker>

        <LeftGradient>
          <BackButton
            onClick={() =>
              actionsAllowed &&
              props.setCurrentPeril(props.currentPerilIndex - 1)
            }
          >
            <BackArrow />
          </BackButton>
        </LeftGradient>
        <RightGradient>
          <ForwardButton
            onClick={() =>
              actionsAllowed &&
              props.setCurrentPeril(props.currentPerilIndex + 1)
            }
          >
            <ForwardArrow />
          </ForwardButton>
        </RightGradient>
      </Header>
      <Content>
        <Title>{currentPeril.title}</Title>
        <Description>{currentPeril.description}</Description>

        <CoverageWrapper>
          <CoverageList>
            <CoverageListTitle>
              {textKeys.PERIL_MODAL_COVERAGE_TITLE()}
            </CoverageListTitle>
            {currentPeril.covered.map((text) => (
              <CoverageListItem key={text}>
                <Checkmark />
                {text}
              </CoverageListItem>
            ))}
          </CoverageList>

          {currentPeril.exceptions.length > 0 && (
            <CoverageList>
              <CoverageListTitle>
                {textKeys.PERIL_MODAL_EXCEPTIONS_TITLE()}
              </CoverageListTitle>
              {currentPeril.exceptions.map((text) => (
                <CoverageListItem key={text}>
                  <Crossmark />
                  {text}
                </CoverageListItem>
              ))}
            </CoverageList>
          )}
        </CoverageWrapper>

        {currentPeril.info && (
          <InfoBoxWrapper>
            <InfoBox>
              <InfoIcon />
              <InfoBoxTitle>{textKeys.PERIL_MODAL_INFO_TITLE()}</InfoBoxTitle>
              <InfoBoxBody>{currentPeril.info}</InfoBoxBody>
            </InfoBox>
          </InfoBoxWrapper>
        )}
      </Content>
    </Modal>
  )
}
