import { Wrapper } from '.././components/Wrapper'

import * as React from 'react'
import styled from 'react-emotion'

const PageDownIcon = styled('img')({
  width: '30px',
  height: '47px',
  marginTop: '30px',
  marginBottom: '30px',
})

const CenterWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})
export const PageDown: React.SFC<{}> = () => (
  <Wrapper>
    <CenterWrapper>
      <PageDownIcon src={'assets/offering/arrow-down.svg'} />
    </CenterWrapper>
  </Wrapper>
)
