import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import color from 'color'
import { Link } from 'react-router-dom'
import { Size } from './types'

const { white, gray300, gray500, gray900, purple900 } = colorsV3

type ButtonProps = {
  background?: string
  foreground?: string
  size?: Size
  fullWidth?: boolean
  disabled?: boolean
}

type UnstyledButtonProps = {
  disabled?: boolean
}

export const UnstyledButton = styled.button<UnstyledButtonProps>`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`

export const Button = styled(UnstyledButton)<ButtonProps>`
  display: inline-block;
  font-size: 1rem;
  line-height: ${({ size }) => (size === 'lg' ? '1rem' : '1.25rem')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ size }) => (size === 'lg' ? '1.5rem 2.5rem' : '0.75rem 2rem')};
  background: ${({ background }) => background ?? gray900};
  color: ${({ foreground }) => foreground ?? white};
  border-radius: 8px;
  border: none;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  text-align: center;

  :focus {
    outline: none;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${gray500};
      background-color: ${gray300};
    `}

  ${({ disabled, foreground }) =>
    !disabled &&
    css`
      &:hover,
      &:focus {
        transform: translateY(-2px);
        box-shadow: 0 3px 5px rgba(55, 55, 55, 0.15);
        color: ${foreground ?? white};

        @media (hover: none) {
          transform: none;
        }
      }
    `}
`

export const LinkButton = Button.withComponent(Link)

type TextButtonProps = {
  color?: string
}

export const TextButton = styled.button<TextButtonProps>`
  background: none;
  padding: 0;
  margin: 0;
  color: ${({ color }) => color || purple900};
  font-size: 0.875rem;
  line-height: 1.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  transition: color 0.1s ease;

  :hover {
    color: ${({ color: textColor }) =>
      color(textColor ?? purple900)
        .darken(0.1)
        .toString()};
  }

  :focus {
    outline: none;
  }
`
