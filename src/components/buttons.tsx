import styled from '@emotion/styled'
import { colors, fonts } from '@hedviginsurance/brand'
import { Link } from 'react-router-dom'

export const GetInsuredButton = styled('div')<{
  margin?: string
  centered?: boolean
}>(({ margin, centered }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: centered ? 'center' : undefined,
  marginTop: margin || 0,
}))

export const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
})

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
