import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

type BadgeProps = {
  children: ReactNode
  size?: 'sm' | 'lg'
}

export const BadgeContainer = styled.span<BadgeProps>`
  display: inline-block;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 0.75rem;
  line-height: 2;
  text-transform: uppercase;
  text-align: center;
  color: ${colorsV3.gray800};
  background-color: ${colorsV3.purple100};
  border-radius: 0.25rem;

  ${({ size }) =>
    size === 'lg' &&
    `
    @media (min-width: 1020px) {
    font-size: 0.875rem;
  }
  `};
`

export const Badge: React.FC<BadgeProps> = ({ children, size = 'sm' }) => (
  <BadgeContainer size={size}>{children}</BadgeContainer>
)
