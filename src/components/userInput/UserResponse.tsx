import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { FadeIn, FadeUp } from '../animations/appearings'

export const UserTextInput = styled('input')(
  ({ maxWidth }: { maxWidth: number }) => ({
    fontFamily: fonts.CIRCULAR,
    color: colors.PURPLE,
    border: 0,
    borderBottom: `2px solid ${colors.PURPLE}`,
    padding: 0,
    lineHeight: 'inherit',
    fontSize: 'inherit',
    width: `${maxWidth}ch`,
    borderRadius: 0,
    fontWeight: 600,

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
