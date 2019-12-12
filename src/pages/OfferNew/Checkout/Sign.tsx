import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand/dist'
import { Button } from 'new-components/buttons'
import * as React from 'react'

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
`

const Disclaimer = styled('p')`
  font-size: 0.75rem;
  margin: 1rem 0 0;
  color: ${colorsV2.gray};
  line-height: 1.5;
  padding: 0 0.5rem;
`

interface Props {
  className?: string
}

export const Sign: React.FC<Props> = ({ className }) => (
  <Wrapper className={className}>
    <Button size="lg">Signera med BankID</Button>
    <Disclaimer>
      Genom att trycka på ”Gå vidare till signering” godkänner jag att jag har
      tagit del av förköpsinformation, villkor och att mina personuppgifter
      behandlas enligt GDPR.
    </Disclaimer>
  </Wrapper>
)
