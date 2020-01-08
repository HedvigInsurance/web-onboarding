import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { Questionmark } from 'components/icons/Questionmark'
import { motion } from 'framer-motion'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Size } from './types'

interface Props {
  body: string
  size?: Size
}

const Wrapper = styled.div`
  position: relative;
  z-index: 100;
`

const TooltipIcon = styled(motion.div)<{ size: Size }>`
  background-color: ${colorsV2.lightgray};
  width: ${(props) => (props.size === 'sm' ? `1rem` : `1.5rem`)};
  height: ${(props) => (props.size === 'sm' ? `1rem` : `1.5rem`)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  text-align: center;
  transition: all 250ms;
  position: relative;

  .fillColor {
    transition: all 250ms;
  }

  @media (hover: hover) {
    :hover {
      background-color: ${colorsV2.gray};
      .fillColor {
        fill: ${colorsV2.white};
      }
    }
  }

  svg {
    width: ${(props) => (props.size === 'sm' ? `0.375rem` : `0.5rem`)};
    margin: 0 auto;
  }
`

const TooltipContainer = styled.div<{ visible: boolean }>`
  background-color: ${colorsV2.violet500};
  max-width: 9.75rem;
  min-width: 6rem;
  padding: 10px;
  position: absolute;
  display: flex;
  align-items: center;
  text-align: center;
  top: 0px;
  left: 50%;
  border-radius: 10px;
  transition: all 0.25s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateX(-50%)
    ${(props) =>
      props.visible
        ? `translateY(calc(-100% - 0.75rem))`
        : `translateY(-100%)`};
  visibility: ${(props) => (props.visible ? `visible` : `hidden`)};

  :after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: ${colorsV2.violet500};
    border-width: 7px;
    margin-left: -7px;
  }
`

const TooltipText = styled.div`
  font-size: 0.875rem;
  line-height: 1rem;
  color: ${colorsV2.white};
  text-align: center;
`

export const Tooltip: React.FC<Props> = ({ body, size = 'sm' }) => {
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
        size={size}
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
        <Questionmark />
      </TooltipIcon>
    </Wrapper>
  )
}
