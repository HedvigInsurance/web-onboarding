import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

import * as React from 'react'
import styled from 'react-emotion'

const ICONWIDTH = 30
const ICONHEIGHT = 47

const PageDownIcon = styled('img')({
  width: ICONWIDTH,
  height: ICONHEIGHT,
  marginTop: '30px',
  marginBottom: '30px',
})

export const PageDown: React.SFC<{}> = () => (
  <Wrapper>
    <InnerWrapper>
      <PageDownIcon src={'assets/offering/arrow-down.svg'} />
    </InnerWrapper>
  </Wrapper>
)
