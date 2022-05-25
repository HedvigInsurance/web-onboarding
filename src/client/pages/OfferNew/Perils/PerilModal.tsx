import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useState, useEffect } from 'react'
import { BackArrow } from 'components/icons/BackArrow'
import { ForwardArrow } from 'components/icons/ForwardArrow'
import { Modal, ModalProps } from 'components/ModalNew'
import { PerilV2 } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import {
  MEDIUM_SMALL_SCREEN_MEDIA_QUERY,
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { Headline } from 'components/Headline/Headline'
import { SelectedOptionCheckmark } from 'components/icons/SelectedOptionCheckmark'
import { Cross } from 'components/icons/Cross'
import { InfoIconFilled } from 'components/icons/Info'

const TRANSITION_MS = 250

type ListItemColor = 'black' | 'gray'

interface PerilModalProps {
  perils: ReadonlyArray<PerilV2>
  currentPerilIndex: number
  setCurrentPeril: (perilIndex: number) => void
}

const ModalWrapper = styled(Modal)`
  max-width: 33rem;
  height: 100%;
  max-height: 42rem;
`

const ModalInnerWrapper = styled.div`
  padding: 5rem 1rem 3rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`

const Header = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-bottom: 4rem;
  }
`

const DirectionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  padding: 0;
  cursor: pointer;
  background: none;
  border: 1px solid currentColor;
  border-radius: 0.5rem;

  svg {
    transition: all 0.15s ease-in-out;
    fill: ${colorsV3.gray900};
  }
  :focus {
    outline: none;
  }
`

const Description = styled.div`
  margin-bottom: 3.75rem;
  font-size: 1rem;
  line-height: 1.33;
  color: ${colorsV3.gray900};

  @media (max-width: 600px) {
    font-size: 1.125rem;
  }
`

const CoverageWrapper = styled.div`
  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    flex-direction: column;
  }
`

const CoverageList = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`

const Divider = styled.div`
  border-top: 1px solid ${colorsV3.gray900};
  margin-bottom: 0.75rem;
`

const SubTitle = styled.p`
  font-size: 0.75rem;
  color: ${colorsV3.gray700};
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
`

const CoverageListItemWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const CoverageListItem = styled.li<{ color: Color }>`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ color }) =>
    color === 'black' ? colorsV3.gray900 : colorsV3.gray600};
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
  background: ${colorsV3.gray200};
  padding: 1.5rem 2.5rem 1.5rem 3.5rem;
  position: relative;
  svg {
    position: absolute;
    left: 1.5rem;
  }
  @media (max-width: 600px) {
    margin-top: 2.5rem;
    background: none;
    padding: 0;
    svg {
      display: none;
    }
  }
`

const InfoBoxBody = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colorsV3.gray700};
`

export const PerilModal: React.FC<PerilModalProps & ModalProps> = ({
  perils,
  currentPerilIndex,
  setCurrentPeril,
  isVisible,
  onClose,
}) => {
  const [actionsAllowed, setActionsAllowed] = useState(true)
  const textKeys = useTextKeys()

  useEffect(() => {
    const isBelowBoundary = currentPerilIndex < perils.length
    const isAboveBoundary = currentPerilIndex > perils.length * 2

    if (isBelowBoundary || isAboveBoundary) {
      setTimeout(() => {
        setCurrentPeril(
          currentPerilIndex + (isBelowBoundary ? 1 : -1) * perils.length,
        )
      }, TRANSITION_MS)
    }

    setActionsAllowed(false)

    setTimeout(() => {
      setActionsAllowed(true)
    }, TRANSITION_MS * 2)
  }, [perils.length, currentPerilIndex, setCurrentPeril])

  const currentPeril = perils[currentPerilIndex % perils.length]

  return (
    <ModalWrapper isVisible={isVisible} onClose={onClose}>
      <ModalInnerWrapper>
        <Header>
          <DirectionButton
            onClick={() =>
              actionsAllowed && setCurrentPeril(currentPerilIndex - 1)
            }
          >
            <BackArrow />
          </DirectionButton>
          <Headline
            textAlign="center"
            headingLevel="h2"
            colorVariant="dark"
            variant="s"
          >
            {currentPeril.title}
          </Headline>

          <DirectionButton
            onClick={() =>
              actionsAllowed && setCurrentPeril(currentPerilIndex + 1)
            }
          >
            <ForwardArrow />
          </DirectionButton>
        </Header>
        <Description>{currentPeril.description}</Description>
        <CoverageWrapper>
          <Divider />
          <CoverageList>
            <SubTitle>{textKeys.PERIL_MODAL_COVERAGE_TITLE()}</SubTitle>
            <CoverageListItemWrapper>
              {currentPeril.covered.map((text) => (
                <CoverageListItem key={text} color="black">
                  <SelectedOptionCheckmark size="0.875rem" />
                  {text}
                </CoverageListItem>
              ))}
            </CoverageListItemWrapper>
          </CoverageList>
          {currentPeril.exceptions.length > 0 && (
            <CoverageList>
              <SubTitle>{textKeys.PERIL_MODAL_EXCEPTIONS_TITLE()}</SubTitle>
              <CoverageListItemWrapper>
                {currentPeril.exceptions.map((text) => (
                  <CoverageListItem key={text} color="gray">
                    <Cross size="0.875rem" />
                    {text}
                  </CoverageListItem>
                ))}
              </CoverageListItemWrapper>
            </CoverageList>
          )}
        </CoverageWrapper>
        {currentPeril.info && (
          <InfoBoxWrapper>
            <InfoBox>
              <InfoIconFilled size="0.875rem" />
              <SubTitle>{textKeys.PERIL_MODAL_INFO_TITLE()}</SubTitle>
              <InfoBoxBody>{currentPeril.info}</InfoBoxBody>
            </InfoBox>
          </InfoBoxWrapper>
        )}
      </ModalInnerWrapper>
    </ModalWrapper>
  )
}
