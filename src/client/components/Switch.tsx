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

const SwitchNobble = styled(Tick)`
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 6px;
  background-color: ${colorsV3.white};
`

/**
 * The idea is to build a custom checkbox component that is accesibible and that
 * provides a good UX when it comes about controlling it: e.g it should possible
 * to bind it with a label e toggle it by clicking on the label.
 * We could solve the accessible part of the problem by using aria-* attributes.
 * However, the UX part would require a bunch of JS to emmit the events properly.
 * With that said, one well adopted solution is to use a hidden checkbox to handle
 * check/unchecked state that's visually hidden along with your custom implmentation
 * of a checkbox (styles, animation, etc)
 */
// Based on https://css-tricks.com/inclusively-hidden/
const InclusiveHiddenCheckbox = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

interface SwitchProps {
  className?: string
  value: boolean
  onChange: () => void
}

export const Switch: React.FC<SwitchProps> = ({
  className,
  value,
  onChange,
}) => (
  <>
    <InclusiveHiddenCheckbox type="checkbox" onChange={onChange} />
    <SwitchContainer
      className={className}
      aria-hidden
      animate={value ? 'checked' : 'unchecked'}
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
      <SwitchNobble />
    </SwitchContainer>
  </>
)
