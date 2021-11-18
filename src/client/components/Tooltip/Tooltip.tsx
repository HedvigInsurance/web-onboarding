import React, { useState, useCallback, useRef } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useClickOutside } from 'utils/hooks/useClickOutside'
import { InfoIcon } from '../icons/Info'

const ICON_SIZE = '20px'

export type TooltipProps = {
  body: string
}

const Wrapper = styled.div`
  position: relative;
`

const TooltipIcon = styled(motion.div)`
  /* remove extra space under child SVG: https://stackoverflow.com/a/51161925 */
  font-size: 0;
`

const TooltipContainer = styled.div<{ visible: boolean }>`
  transition: all 0.25s ease;

  background-color: ${colorsV3.gray800};
  box-shadow: 0px 16px 40px rgba(0, 0, 0, 0.15);
  padding: 0.75rem 1rem;
  border-radius: 8px;

  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};

  position: absolute;
  z-index: 1000;
  top: 0;
  right: 100%;
  transform: translateY(calc(-50% + ${ICON_SIZE} / 2))
    ${(props) => (props.visible ? 'translateX(-0.75rem)' : 'translateX(0)')};

  &:after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 100%; /* To the right of the tooltip */
    margin-top: -7px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent transparent ${colorsV3.gray800};
    pointer-events: none;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    left: 50%;
    right: unset;
    transform: translateX(-50%)
      ${(props) =>
        props.visible
          ? `translateY(calc(-100% - 0.75rem))`
          : `translateY(-100%)`};

    &:after {
      top: 100%; /* At the bottom of the tooltip */
      left: 50%;
      margin-left: -7px;
      margin-top: 0;
      border-color: ${colorsV3.gray800} transparent transparent transparent;
    }
  }
`

const TooltipText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${colorsV3.gray100};
  text-align: center;
  margin: 0;
  min-width: 12.5rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: max-content;
    max-width: 18.75rem;
  }
`

export const Tooltip: React.FC<TooltipProps> = ({ body }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setVisible] = useState(false)

  const handleClickOutside = useCallback(() => {
    if (isVisible) {
      setVisible(false)
    }
  }, [isVisible, setVisible])
  useClickOutside(ref, handleClickOutside)

  return (
    <Wrapper>
      <TooltipContainer visible={isVisible} ref={ref}>
        <TooltipText>{body}</TooltipText>
      </TooltipContainer>
      <TooltipIcon
        onHoverStart={() => setVisible(true)}
        onHoverEnd={() => setVisible(false)}
        onTouchStart={() => setVisible(true)}
      >
        <InfoIcon
          size={ICON_SIZE}
          color={isVisible ? colorsV3.gray700 : colorsV3.gray900}
        />
      </TooltipIcon>
    </Wrapper>
  )
}
