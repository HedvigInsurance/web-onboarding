import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import * as React from 'react'

interface PerilItemProps {
  title: string
  icon: JSX.Element
  onClick: () => void
}

const Container = styled('button')`
  width: 7.25rem;
  height: 5.75rem;
  margin: 0.25rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${colorsV2.white};
  border: 1px solid ${colorsV2.lightgray};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 3rem;
    height: 3rem;
  }

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2%);
  }

  :active {
    background-color: ${colorsV2.lightgray};
    box-shadow: none;
  }
`

const Title = styled('div')`
  font-size: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV2.violet500};
  font-family: ${fonts.CIRCULAR};
`

export const PerilItem: React.FC<PerilItemProps> = ({
  title,
  icon,
  onClick,
}) => (
  <Container onClick={onClick}>
    {icon}
    <Title>{title}</Title>
  </Container>
)
