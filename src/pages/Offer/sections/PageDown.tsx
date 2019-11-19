import styled from '@emotion/styled'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'
import * as React from 'react'
import { CurrentLanguage } from '../../../components/utils/CurrentLanguage'

const PageDownIcon = styled('img')({
  marginTop: '40px',
  marginBottom: '40px',
})

export const PageDown: React.SFC<{}> = () => (
  <Wrapper>
    <InnerWrapper>
      <CurrentLanguage>
        {({ currentLanguage }) => (
          <PageDownIcon
            src={`/new-member-assets/offering/scroll-down${currentLanguage &&
              '-' + currentLanguage}.svg`}
          />
        )}
      </CurrentLanguage>
    </InnerWrapper>
  </Wrapper>
)
