import React from 'react'
import styled from '@emotion/styled'
import { Intercom } from 'utils/Intercom'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useFeature } from 'utils/hooks/useFeature'
import { Feature } from 'shared/clientConfig'
const TextLinkContainer = styled.div({
  textAlign: 'center',
  marginBottom: '-0.75rem',
  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    display: 'none',
  },
})
export const CheckoutIntercomVariation = () => {
  const [enabled] = useFeature([Feature.INTERCOM])
  if (!enabled) return null

  return (
    <>
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
}
