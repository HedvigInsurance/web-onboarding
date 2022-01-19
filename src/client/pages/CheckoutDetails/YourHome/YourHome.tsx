import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { getQuoteDetails } from 'utils/getQuoteDetails'
import { useTextKeys } from 'utils/textKeys'
import { TextButton } from 'components/buttons'
import { OfferQuote } from '../../OfferNew/types'
import { Row } from '../components/Row'
import { Label } from '../components/Label'
import { Value } from '../components/Value'
import { SubSection } from '../components/SubSection'
import { Group } from '../components/Group'
import { HorizontalSpacer } from '../components/HorizontalSpacer'

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 0.5rem;
`

export const YourHome = ({ mainQuote }: { mainQuote: OfferQuote }) => {
  const textKeys = useTextKeys()

  return (
    <SubSection headlineText="Your home">
      {getQuoteDetails(mainQuote, textKeys).map((group, index) => (
        <Group key={index}>
          {group.map(({ key, value, label }) => (
            <Row key={key}>
              <Label>{label}</Label>
              <HorizontalSpacer />
              <Value>{value}</Value>
            </Row>
          ))}
        </Group>
      ))}
      <ButtonWrapper>
        <TextButton color={colorsV3.purple900}>Edit information</TextButton>
      </ButtonWrapper>
    </SubSection>
  )
}
