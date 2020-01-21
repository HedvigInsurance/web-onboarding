import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import * as React from 'react'

const Container = styled('button')`
  width: 138px;
  height: 120px;
  border-radius: 0.5rem;
  background: ${colorsV2.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  margin: 0.5rem;
  padding: 0.75rem;
  background-color: ${colorsV2.white};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;

  svg {
    width: 4rem;
    height: 4rem;
  }

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
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

interface PerilItemProps {
  title: React.ReactNode
  icon: JSX.Element
  onClick: () => void
}

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
