import React from 'react'
import styled from '@emotion/styled'
import { Intercom } from 'utils/Intercom'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
const TextLinkContainer = styled.div({
  textAlign: 'center',
  marginBottom: '-0.75rem',
  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    display: 'none',
  },
})
export const CheckoutIntercomVariation = () => (
  <>
    <Intercom.ShowOnScrollBehaviour />
    <Intercom.InjectedStyles
      style={{
        display: 'none',
        [MEDIUM_SCREEN_MEDIA_QUERY]: {
          display: 'block',
          bottom: '87px!important',
        },
      }}
    />
    <TextLinkContainer>
      <Intercom.TextLinkVariation />
    </TextLinkContainer>
  </>
)
