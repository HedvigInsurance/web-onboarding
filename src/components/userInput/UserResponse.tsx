import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { FadeIn, FadeUp } from '../animations/appearings'

interface InputProps {
  hasError?: boolean
}

interface WithMaxWidth {
  maxWidth?: number
}

export const UserTextInput = styled('input')(
  ({ hasError, maxWidth }: WithMaxWidth & InputProps) => ({
    fontFamily: fonts.CIRCULAR,
    color: hasError ? colors.PINK : colors.OFF_BLACK,
    border: 0,
    borderBottom: `2px solid ${hasError ? colors.PINK : colors.OFF_BLACK}`,
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
  }),
)

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

export const InputValidationError = styled('div')({
  color: colors.PINK,
  fontSize: '.8em',
})

export const UserResponse = styled(UserResponseWrapper)({
  textAlign: 'right',
  paddingBottom: 16,
})
