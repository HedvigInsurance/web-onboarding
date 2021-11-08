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
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${colorsV3.white};

  :focus {
    outline: none;
  }

  :hover path {
    fill: ${colorsV3.gray700};
  }

  path {
    fill: ${colorsV3.gray900};
  }
`

type Props = React.HTMLProps<HTMLButtonElement>

export const CloseButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Cross />
    </Button>
  )
}
