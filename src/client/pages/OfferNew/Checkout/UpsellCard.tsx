import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

import { Button } from '../../../components/buttons'

const UpsellCardRoot = styled.div`
  background-color: ${colorsV3.gray200};
  border-radius: 8px;
  padding: 1.5em;
  margin-bottom: 1rem;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
`

const Description = styled.p`
  margin: 0;
  font-size: 0.875rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
  }
`

const Price = styled.h2`
  font-size: 1.25rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
`

const AddButton = styled(Button)`
  font-size: 0.875rem;
  padding: 0.875em 1.5em;
`

export function UpsellCard() {
  return (
    <UpsellCardRoot>
      <Title>Accident Sweden</Title>
      <Description>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, quos!
      </Description>
      <Price>68 kr/mån</Price>
      <AddButton>Add to your plan</AddButton>
    </UpsellCardRoot>
  )
}
