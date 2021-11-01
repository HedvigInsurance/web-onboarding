import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Cross } from '../icons/Cross'

const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: ${colorsV3.gray500};
  border-radius: 50%;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background-color: ${colorsV3.gray900};
  }

  svg {
    width: 100%;
    height: 100%;
    fill: ${colorsV3.white};
  }
`

type Props = {
  onClose: () => void
}

export const CloseButton = ({ onClose }: Props) => {
  return (
    <Button onClick={onClose}>
      <Cross />
    </Button>
  )
}
