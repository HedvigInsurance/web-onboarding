import React from 'react'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'

type Props = {
  nextStep: 'switching' | 'confirmation'
}

export const Breadcrumbs = ({ nextStep }: Props) => {
  const textKeys = useTextKeys()
  return (
    <Root>
      <Step>{textKeys.BREADCRUMB_CHECKOUT()}</Step>
      <Step active>{textKeys.BREADCRUMB_PAYMENT()}</Step>
      <Step>
        {nextStep === 'confirmation'
          ? textKeys.BREADCRUMB_CONFIRMATION()
          : textKeys.BREADCRUMB_SWITCHING_ASSISTANT()}
      </Step>
    </Root>
  )
}

const Root = styled.ul({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
  margin: 0,
})

const Step = styled.li<{ active?: boolean }>(({ active }) => ({
  fontSize: '1rem',
  borderRadius: 8,
  height: '2rem',
  display: 'flex',
  alignItems: 'center',

  color: 'hsl(0, 0%, 71%)',
  ...(active && {
    backgroundColor: 'hsl(0, 0%, 92%)',
    color: 'hsl(0, 0%, 7%)',
    paddingInline: '0.75rem',
  }),
}))
