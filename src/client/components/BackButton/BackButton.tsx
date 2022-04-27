import React from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { colorsV3 } from '@hedviginsurance/brand'
import { UnstyledButton } from 'components/buttons'
import { Arrow } from 'components/icons/Arrow'

const { gray900, gray600 } = colorsV3

const Button = styled(UnstyledButton)`
  &:hover,
  &:focus {
    svg {
      fill: ${gray600};
    }
  }
`

export const BackButton = ({ onClick }: { onClick: () => void }) => {
  const history = useHistory()

  const handleClick = () => {
    history.goBack()
    onClick()
  }

  return (
    <Button onClick={handleClick}>
      <Arrow direction="backward" color={gray900} />
    </Button>
  )
}
