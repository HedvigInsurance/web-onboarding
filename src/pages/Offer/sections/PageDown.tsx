import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

import * as React from 'react'
import styled from 'react-emotion'

const PageDownIcon = styled('img')({
  marginTop: '40px',
  marginBottom: '40px',
})

export const PageDown: React.SFC<{}> = () => (
  <Wrapper>
    <InnerWrapper>
      <PageDownIcon src={'/new-member-assets/offering/scroll-down.svg'} />
    </InnerWrapper>
  </Wrapper>
)
