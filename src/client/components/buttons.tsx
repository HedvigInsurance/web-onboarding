import React from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import color from 'color'
import { Size } from './types'
import { getMargins, Margins } from './utils/margins'

const { white, gray300, gray500, gray900, purple900 } = colorsV3

export type ButtonProps = {
  background?: string
  foreground?: string
  size?: Size
  fullWidth?: boolean
  disabled?: boolean
  border?: boolean
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

type ButtonGroupProps = {
  fullWidth?: boolean
}

export const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  column-gap: 1rem;
  padding: 0 1rem;

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
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
  ${({ border, foreground }) =>
    css`
      border: ${border ? `1px solid ${foreground ?? white}` : 'none'};
    `}
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

const LinkWithQuery = ({ to, ...others }: LinkProps) => {
  const { search } = useLocation()

  return <Link to={to + search} {...others} />
}

export const LinkButton = Button.withComponent(Link)

export const LinkWithQueryButton = Button.withComponent(LinkWithQuery)

export type TextButtonProps = {
  color?: string
  size?: Size
  inline?: boolean
} & Margins

const TextButtonSizes: Record<Size, string> = {
  sm: '0.875rem',
  lg: '1.125rem',
}

export const TextButton = styled.button<TextButtonProps>(
  ({ color: textColor, size = 'sm', inline = false, ...props }) => ({
    background: 'none',
    padding: 0,
    margin: 0,
    marginLeft: inline ? '0.25em' : 0,
    marginRight: inline ? '0.25em' : 0,
    color: textColor || purple900,
    fontSize: inline ? 'inherit' : TextButtonSizes[size],
    lineHeight: '1.5rem',
    border: 'none',
    cursor: 'pointer',
    display: inline ? 'inline' : 'flex',
    transition: 'color 0.1s ease',

    ':hover': {
      color: color(textColor ?? purple900)
        .darken(0.1)
        .toString(),
    },

    ':focus': {
      outline: 'none',
    },
    ...getMargins(props),
  }),
)
