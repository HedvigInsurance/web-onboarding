import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import * as React from 'react'

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

const SwitchNobble = styled.span`
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 6px;
  background-color: ${colorsV3.white};
`

interface SwitchProps {
  value: boolean
  onChange: (newValue: boolean) => void
}

export const Switch: React.FC<SwitchProps> = ({ value, onChange }) => (
  <SwitchContainer
    onTap={() => {
      onChange(!value)
    }}
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
    role="checkbox"
    aria-checked={value}
  >
    <SwitchNobble />
  </SwitchContainer>
)
