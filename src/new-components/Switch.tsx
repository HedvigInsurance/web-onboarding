import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import * as React from 'react'

const SwitchContainer = styled(motion.span)`
  display: inline-block;
  height: 30px;
  width: 50px;
  border-radius: 15px;
`

const SwitchNobble = styled(motion.span)`
  display: inline-block;
  height: 28px;
  width: 28px;
  border-radius: 14px;
  background-color: ${colorsV2.white};
  cursor: pointer;
`

interface SwitchProps {
  value: boolean
  onChange: (newValue: boolean) => void
}

export const Switch: React.FC<SwitchProps> = ({ value, onChange }) => (
  <SwitchContainer
    animate={{
      backgroundColor: value ? colorsV2.violet500 : colorsV2.gray,
    }}
    onTap={() => {
      onChange(!value)
    }}
  >
    <SwitchNobble animate={{ x: value ? 21 : 1, y: 1 }} />
  </SwitchContainer>
)
