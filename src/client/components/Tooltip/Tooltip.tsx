import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { InfoIcon } from '../icons/Info'

export type TooltipProps = {
  body: string
}

const Wrapper = styled.div`
  position: relative;
  z-index: 1000;
`

const TooltipIcon = styled(motion.div)`
  /* remove extra space under child SVG: https://stackoverflow.com/a/51161925 */
  font-size: 0;
`

const TooltipContainer = styled.div<{ visible: boolean }>`
  background-color: ${colorsV3.gray800};
  box-shadow: 0px 16px 40px rgba(0, 0, 0, 0.15);
  padding: 0.75rem 1rem;
  position: absolute;
  top: 0px;
  left: 50%;
  border-radius: 8px;
  transition: all 0.25s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateX(-50%)
    ${(props) =>
      props.visible
        ? `translateY(calc(-100% - 0.75rem))`
        : `translateY(-100%)`};
  visibility: ${(props) => (props.visible ? `visible` : `hidden`)};

  :after {
    content: ' ';
    top: 100%;
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: ${colorsV3.gray800};
    border-width: 7px;
    margin-left: -7px;
  }
`

const TooltipText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${colorsV3.gray100};
  text-align: center;
  margin: 0;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: max-content;
    max-width: 18.75rem;
  }
`

export const Tooltip: React.FC<TooltipProps> = ({ body }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isVisible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (isVisible === false) return

    const handleClickOutside = (event: TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setVisible(false)
      }
    }

    window.addEventListener('touchstart', handleClickOutside)
    return () => window.removeEventListener('touchstart', handleClickOutside)
  }, [isVisible])

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
        <InfoIcon size="20px" />
      </TooltipIcon>
    </Wrapper>
  )
}
