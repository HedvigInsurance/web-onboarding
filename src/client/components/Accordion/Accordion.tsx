import React from 'react'
import styled from '@emotion/styled'
import AnimateHeight from 'react-animate-height'
import { colorsV3 } from '@hedviginsurance/brand'

const AccordionRow = styled.button<Pick<AccordionProps, 'disabled'>>(
  ({ disabled }) => ({
    all: 'unset',
    cursor: disabled ? 'initial' : 'pointer',
  }),
)

export const AccordionActiveContent = styled(AnimateHeight)`
  font-size: 0.875rem;
  color: ${colorsV3.gray700};
`

export type AccordionProps = {
  isActive: boolean
  setIsActive: (isActive: boolean) => void
  children: React.ReactNode
  disabled: boolean
}

export const Accordion = ({
  isActive,
  setIsActive,
  children,
  disabled,
}: AccordionProps) => {
  return (
    <AccordionRow onClick={() => setIsActive(isActive)} disabled={disabled}>
      {children}
    </AccordionRow>
  )
}
