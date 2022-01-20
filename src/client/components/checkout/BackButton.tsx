import React from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { colorsV3 } from '@hedviginsurance/brand'
import { UnstyledButton } from '../buttons'
import { Arrow } from '../icons/Arrow'

const { gray900, gray600 } = colorsV3

const Button = styled(UnstyledButton)`
  &:hover,
  &:focus {
    svg {
      fill: ${gray600};
    }
  }
`

export const BackButton = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <Button onClick={goBack}>
      <Arrow direction="backward" color={gray900} />
    </Button>
  )
}
