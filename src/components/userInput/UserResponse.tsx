import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { FadeIn, FadeUp } from '../animations/appearings'

interface WithMaxWidth {
  maxWidth?: number
}

export const UserTextInput = styled('input')(({ maxWidth }: WithMaxWidth) => ({
  fontFamily: fonts.CIRCULAR,
  color: colors.PURPLE,
  border: 0,
  borderBottom: `2px solid ${colors.PURPLE}`,
  padding: 0,
  lineHeight: 'inherit',
  fontSize: 'inherit',
  width: maxWidth !== undefined ? `${maxWidth}ch` : undefined,
  borderRadius: 0,
  fontWeight: 600,

  '&::placeholder': {
    fontWeight: 400,
    fontStyle: 'italic',
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    appearance: 'none',
    margin: 0,
  },
  '&[type="number"]': {
    appearance: 'textfield' as any, // unsure why but emotion cries when this isnt any
  },

  '&:focus': {
    outline: 'none',
  },
}))

export const UserSelectInput = styled(UserTextInput)(
  (_: WithMaxWidth) => ({}),
).withComponent('select')

const UserResponseWrapper: React.SFC<{
  className?: string
  appear?: boolean
}> = ({ className, children, appear }) =>
  appear ? (
    <div className={className}>{children}</div>
  ) : (
    <FadeIn className={className}>
      <FadeUp>{children}</FadeUp>
    </FadeIn>
  )

export const UserResponse = styled(UserResponseWrapper)({
  textAlign: 'right',
})
