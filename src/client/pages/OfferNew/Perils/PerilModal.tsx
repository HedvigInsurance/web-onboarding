import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
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
import { Cross } from 'components/icons/Cross'

const TRANSITION_MS = 250

interface PerilModalProps {
  perils: ReadonlyArray<PerilV2>
  currentPerilIndex: number
  setCurrentPeril: (perilIndex: number) => void
}

const ModalWrapper = styled(Modal)`
  max-width: 33rem;
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

const Content = styled.div`
  display: block;
`

const Title = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1.5rem;
  line-height: 1.2;
  text-align: center;
  color: ${colorsV3.gray900};

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 2rem;
  }
`

const Description = styled.div`
  margin-bottom: 3rem;
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
  margin-bottom: 2rem;
`

const CoverageListTitle = styled.div`
  font-size: 1.5rem;
  color: ${colorsV3.gray900};
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${colorsV3.gray900};
`

const CoverageListItem = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${colorsV3.gray900};
  padding-left: 2rem;
  position: relative;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    left: 0;
    top: 0.25rem;
  }
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
          <Title>{currentPeril.title}</Title>

          <DirectionButton
            onClick={() =>
              actionsAllowed && setCurrentPeril(currentPerilIndex + 1)
            }
          >
            <ForwardArrow />
          </DirectionButton>
        </Header>

        <Content>
          <Description>{currentPeril.description}</Description>
          <CoverageWrapper>
            <CoverageList>
              <CoverageListTitle>
                {textKeys.PERIL_MODAL_EXCEPTIONS_TITLE()}
              </CoverageListTitle>
              {currentPeril.covered.map((text) => (
                <CoverageListItem key={text}>
                  <Cross size="0.75rem" />
                  {text}
                </CoverageListItem>
              ))}
            </CoverageList>
          </CoverageWrapper>
        </Content>
      </ModalInnerWrapper>
    </ModalWrapper>
  )
}
