import { colors, fonts } from '@hedviginsurance/brand'
import { Container } from 'constate'
import * as React from 'react'
import AnimateHeight from 'react-animate-height'
import styled from 'react-emotion'
import { Mount } from 'react-lifecycle-components'
import { FadeIn, FadeUp } from '../animations/appearings'
import { HEIGHT_AND_SCROLL_ANIMATION_TIME } from '../hedvig/conversation'

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

const ActualSelectInput = styled('select')(({ hasError }: InputProps) => ({
  appearance: 'none',
  background: 'transparent',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  paddingRight: '1.5em',
  border: 'none',
  cursor: 'pointer',
  color: hasError ? colors.PINK : undefined,
}))

const UserSelectInputWrapper = styled(UserTextInput)(
  ({ hasError }: WithMaxWidth & InputProps) => ({
    appearance: 'none',
    cursor: 'pointer',
    position: 'relative',
    '&::after': {
      borderStyle: 'solid',
      borderWidth: '.1em .1em 0 0',
      borderColor: hasError ? colors.PINK : colors.OFF_BLACK,
      content: '" "',
      position: 'absolute',
      zIndex: -1,
      height: '.45em',
      width: '.45em',
      right: '.3em',
      top: '15%',
      transform: 'rotate(135deg) translateY(-15%)',
    },
  }),
).withComponent('label')

export const UserSelectInput = (
  props: React.SelectHTMLAttributes<HTMLSelectElement> & InputProps,
) => (
  <UserSelectInputWrapper hasError={props.hasError}>
    <ActualSelectInput {...props} />
  </UserSelectInputWrapper>
)

const CheckboxWrapper = styled('label')(
  ({ disabled }: { disabled?: boolean }) => ({
    opacity: disabled ? 0.3 : 1,
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
)
const CheckboxInputContainer = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'relative',
})
const Tick = styled('svg')({
  opacity: 0,
  transition: 'opacity 150ms',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '.6em',
  transform: 'translateX(-50%) translateY(-50%)',
  fill: colors.WHITE,

  'input:checked + &': {
    opacity: 1,
  },
})
const CheckboxInput = styled('input')({
  appearance: 'none',
  fontSize: 'inherit',
  width: '1em',
  height: '1em',
  border: `2px solid ${colors.DARK_GRAY}`,
  position: 'relative',
  borderRadius: 5,
  cursor: 'pointer',
  transition: 'background 150ms, border 150ms',

  '&:focus': {
    outline: 'none',
  },

  '&:checked': {
    backgroundColor: colors.GREEN,
    borderColor: colors.GREEN,
  },
})
const CheckboxLabel = styled('span')({
  paddingLeft: '0.5em',
  cursor: 'pointer',
})
export const UserCheckbox = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
) => (
  <CheckboxWrapper disabled={props.disabled}>
    <CheckboxInputContainer>
      <CheckboxInput type="checkbox" {...{ ...props, children: undefined }} />
      <Tick viewBox="0 0 490.434 490.433">
        <path d="M472.003 58.36l-13.132-11.282c-21.798-18.732-54.554-16.644-73.799 4.697L165.39 295.359l-66.312-57.112c-21.775-18.753-54.536-16.707-73.804 4.611l-11.611 12.848a52.934 52.934 0 0 0-13.595 38.18 52.938 52.938 0 0 0 17.402 36.6l121.553 111.311a52.936 52.936 0 0 0 76.355-4.057l262.245-304.71a52.915 52.915 0 0 0 12.661-38.496 52.92 52.92 0 0 0-18.281-36.174z" />
      </Tick>
    </CheckboxInputContainer>
    <CheckboxLabel>{props.children}</CheckboxLabel>
  </CheckboxWrapper>
)

const UserResponseWrapper: React.SFC<{
  className?: string
  appear?: boolean
  delay?: number
}> = ({ className, children, appear, delay }) =>
  appear ? (
    <div className={className}>{children}</div>
  ) : (
    <Container<{ hasMounted: boolean }, { mount: () => void }>
      initialState={{ hasMounted: appear }}
      actions={{ mount: () => () => ({ hasMounted: true }) }}
    >
      {({ hasMounted, mount }) => (
        <Mount
          on={() => {
            if (!delay) {
              mount()
              return
            }
            setTimeout(() => mount(), delay)
          }}
        >
          <AnimateHeight
            duration={HEIGHT_AND_SCROLL_ANIMATION_TIME}
            height={hasMounted ? 'auto' : 0}
          >
            <FadeIn className={className}>
              <FadeUp>{children}</FadeUp>
            </FadeIn>
          </AnimateHeight>
        </Mount>
      )}
    </Container>
  )

export const InputValidationError = styled('div')({
  color: colors.PINK,
  fontSize: '.8em',
})

export const UserResponse = styled(UserResponseWrapper)({
  textAlign: 'right',
  paddingBottom: 16,
})
