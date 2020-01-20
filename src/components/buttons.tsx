import styled from '@emotion/styled'
import { colors, fonts } from '@hedviginsurance/brand'

export const Button = styled('button')<{
  background: string
  foreground: string
  border?: string
  size?: 'sm' | 'lg'
}>(
  ({
    background,
    foreground,
    border = '1px solid transparent',
    size = 'sm',
  }) => ({
    fontFamily: fonts.CIRCULAR,
    appearance: 'none',
    padding: size === 'sm' ? '10px 16px' : '16px 20px',
    border,
    fontSize: size === 'sm' ? 16 : 20,
    borderRadius: '50px',
    color: foreground,
    background,
    cursor: 'pointer',
    textDecoration: 'none',

    transition: 'background 300ms, border 300ms, color 300ms',

    '&:focus': {
      outlineColor: background,
    },

    '&:hover, &:focus': {
      textDecoration: 'none',
    },

    '&:disabled': {
      backgroundColor: colors.LIGHT_GRAY,
      cursor: 'default',
    },
  }),
)
