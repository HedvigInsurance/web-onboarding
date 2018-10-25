import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

import * as React from 'react'
import styled from 'react-emotion'

const PageDownIcon = styled('img')({
  marginTop: '40px',
  marginBottom: '88px',
})

export const PageDown: React.SFC<{}> = () => (
  <Wrapper>
    <InnerWrapper>
      <PageDownIcon src={'assets/offering/scroll-down.svg'} />
    </InnerWrapper>
  </Wrapper>
)
