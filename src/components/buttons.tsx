import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

export const GetInsuredButton = styled('div')(
  ({ margin, centered }: { margin?: string; centered?: boolean }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: centered ? 'center' : undefined,
    marginTop: margin || 0,
  }),
)

export const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
})

export const Button = styled('button')(
  ({
    background,
    foreground,
    size = 'sm',
  }: {
    background: string
    foreground: string
    size?: 'sm' | 'lg'
  }) => ({
    appearance: 'none',
    padding: size === 'sm' ? '10px 16px' : '16px 20px',
    border: 'none',
    fontSize: size === 'sm' ? 16 : 20,
    borderRadius: '50px',
    color: foreground,
    background,
    cursor: 'pointer',

    '&:focus': {
      outlineColor: background,
    },

    '&:disabled': {
      backgroundColor: colors.LIGHT_GRAY,
      cursor: 'default',
    },
  }),
)
