import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { FadeIn, FadeUp, AnimateHeight } from '../animations/appearings'

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

const ActualSelectInput = styled('select')({
  appearance: 'none',
  background: 'transparent',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  paddingRight: '1.5em',
  border: 'none',
})

const UserSelectInputWrapper = styled(UserTextInput)((_: WithMaxWidth) => ({
  appearance: 'none',
  cursor: 'pointer',
  position: 'relative',
  '&::after': {
    borderStyle: 'solid',
    borderWidth: '.1em .1em 0 0',
    borderColor: colors.OFF_BLACK,
    content: '" "',
    position: 'absolute',
    height: '.45em',
    width: '.45em',
    right: '.3em',
    top: '15%',
    transform: 'rotate(135deg) translateY(-15%)',
  },
})).withComponent('label')

export const UserSelectInput = (
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) => (
  <UserSelectInputWrapper>
    <ActualSelectInput {...props} />
  </UserSelectInputWrapper>
)

const UserResponseWrapper: React.SFC<{
  className?: string
  appear?: boolean
}> = ({ className, children, appear }) =>
  appear ? (
    <div className={className}>{children}</div>
  ) : (
    <AnimateHeight initialMaxHeight={appear ? 300 : undefined}>
      <FadeIn className={className}>
        <FadeUp>{children}</FadeUp>
      </FadeIn>
    </AnimateHeight>
  )

export const InputValidationError = styled('div')({
  color: colors.PINK,
  fontSize: '.8em',
})

export const UserResponse = styled(UserResponseWrapper)({
  textAlign: 'right',
  paddingBottom: 16,
})
