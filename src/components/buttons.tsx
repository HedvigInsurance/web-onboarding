import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

export const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

export const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
})

export const Button = styled('button')(
  ({ background, foreground }: { background: string; foreground: string }) => ({
    appearance: 'none',
    padding: '10px 16px',
    border: 'none',
    fontSize: 16,
    borderRadius: '50px',
    color: foreground,
    background,

    '&:focus': {
      outlineColor: background,
    },

    '&:disabled': {
      backgroundColor: colors.LIGHT_GRAY,
    },
  }),
)

export const RefreshButton = styled('button')({})

export const RefreshImage = styled('img')({})
