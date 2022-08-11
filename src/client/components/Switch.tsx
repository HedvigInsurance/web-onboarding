import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import React from 'react'
import { Tick } from 'components/icons/Tick'

const SwitchContainer = styled(motion.span)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 1.25rem;
  width: 1.25rem;
  border: 1px solid;
  border-radius: 2px;
  cursor: pointer;
`

/**
 * Makes usage of a visually hidden checkbox for accessiblity reasons like
 * to make it discoverable for assistence tools and to enable binding it with
 * a <label> element.
 * Based on https://css-tricks.com/inclusively-hidden/
 */
const InclusiveHiddenCheckbox = styled.input({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0px',
  width: '1px',
  whiteSpace: 'nowrap',
})

type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...checkboxProps }, forwardedRef) => {
    return (
      <div className={className}>
        <InclusiveHiddenCheckbox
          ref={forwardedRef}
          type="checkbox"
          {...checkboxProps}
        />
        <SwitchContainer
          aria-hidden={true}
          animate={checkboxProps.checked ? 'checked' : 'unchecked'}
          variants={{
            checked: {
              backgroundColor: colorsV3.gray900,
              borderColor: colorsV3.gray900,
            },
            unchecked: {
              backgroundColor: colorsV3.white,
              borderColor: colorsV3.gray300,
            },
          }}
          transition={{ duration: 0.1 }}
        >
          <Tick />
        </SwitchContainer>
      </div>
    )
  },
)
