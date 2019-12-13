import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand/dist'
import { Button } from 'new-components/buttons'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useTextKeys } from 'utils/hooks/useTextKeys'

export const SignSpacer = styled('div')`
  height: 250px;
`
const Wrapper = styled('div')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 4rem 8rem 2.5rem 4.5rem;
  background-image: linear-gradient(
    to bottom,
    rgba(249, 250, 252, 0),
    ${colorsV2.offwhite} 50%
  );

  @media (max-width: 40rem) {
    padding: 1rem;
  }
`

const ButtonWrapper = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
`

const Disclaimer = styled('p')`
  font-size: 0.75rem;
  margin: 1rem 0 0;
  color: ${colorsV2.gray};
  line-height: 1.5;
  padding: 0 0.5rem;

  @media (max-width: 40rem) {
    text-align: center;
  }
`

interface Props {
  className?: string
}

export const Sign: React.FC<Props> = ({ className }) => {
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const textKeys = useTextKeys()

  return (
    <Wrapper className={className}>
      <ButtonWrapper>
        <Button size={isMobile ? 'sm' : 'lg'}>
          {textKeys.CHECKOUT_SIGN_BUTTON_TEXT()}
        </Button>
      </ButtonWrapper>
      <Disclaimer>{textKeys.CHECKOUT_SIGN_DISCLAIMER()}</Disclaimer>
    </Wrapper>
  )
}
