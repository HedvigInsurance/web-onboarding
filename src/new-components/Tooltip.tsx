import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { Questionmark } from 'components/icons/Questionmark'
import { motion } from 'framer-motion'
import * as React from 'react'

interface Props {
  body: string
  size?: 'sm' | 'lg'
}

const Wrapper = styled.div`
  position: relative;
`

const TooltipIcon = styled(motion.div)<{ size: 'sm' | 'lg' }>`
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

  :hover {
    background-color: ${colorsV2.gray};
    .fillColor {
      fill: ${colorsV2.white};
    }
  }

  svg {
    width: ${(props) => (props.size === 'sm' ? `0.375rem` : `0.5rem`)};
    margin: 0 auto;
  }
`

const TooltipContainer = styled(motion.div)`
  background-color: ${colorsV2.violet500};
  max-width: 9.75rem;
  min-width: 2rem;
  padding: 10px;
  position: absolute;
  display: flex;
  align-items: center;
  text-align: center;
  top: 0px;
  left: 50%;
  border-radius: 10px;

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
  const [tooltipIsVisible, setTooltipIsVisible] = React.useState(false)

  return (
    <>
      <Wrapper>
        <TooltipContainer
          initial="hidden"
          animate={tooltipIsVisible ? 'visible' : 'hidden'}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 125,
          }}
          variants={{
            visible: {
              opacity: 1,
              transform: 'translateX(-50%) translateY(calc(-100% - 0.75rem))',
            },
            hidden: {
              opacity: 0,
              transform: 'translateX(-50%) translateY(calc(-100% - 0rem))',
            },
          }}
        >
          <TooltipText>{body}</TooltipText>
        </TooltipContainer>
        <TooltipIcon
          size={size}
          onHoverStart={() => {
            setTooltipIsVisible(true)
          }}
          onHoverEnd={() => setTooltipIsVisible(false)}
        >
          <Questionmark />
        </TooltipIcon>
      </Wrapper>
    </>
  )
}
