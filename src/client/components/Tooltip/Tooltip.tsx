import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
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
  display: flex;
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
  const tooltipIconRef = React.useRef<HTMLDivElement>()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const listener = (e: TouchEvent) => {
      if (
        tooltipIconRef.current &&
        !(e.target as Node)?.contains(tooltipIconRef.current)
      ) {
        setVisible(false)
      }
    }

    window.addEventListener('touchstart', listener)
    return () => window.removeEventListener('touchstart', listener)
  }, [])

  const isHover = useMediaQuery({ query: '(hover: hover)' })

  return (
    <Wrapper>
      <TooltipContainer visible={visible}>
        <TooltipText>{body}</TooltipText>
      </TooltipContainer>
      <TooltipIcon
        onHoverStart={
          !isHover
            ? undefined
            : () => {
                setVisible(true)
              }
        }
        onHoverEnd={!isHover ? undefined : () => setVisible(false)}
        onTouchStart={() => setVisible(true)}
        ref={tooltipIconRef as React.MutableRefObject<HTMLDivElement>}
      >
        <InfoIcon size="20px" />
      </TooltipIcon>
    </Wrapper>
  )
}
