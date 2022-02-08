import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { getQuoteDetails } from 'utils/getQuoteDetails'
import { useTextKeys } from 'utils/textKeys'
import { TextButton } from 'components/buttons'
import { OfferQuote } from '../../OfferNew/types'
import { Value } from '../components/Value'
import { SubSection } from '../components/SubSection'
import { HorizontalSpacer } from '../components/HorizontalSpacer'

const { gray500, gray300 } = colorsV3

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 0.5rem;
`
const Row = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1;
`

const Label = styled.div`
  color: ${gray500};
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${gray300};
`

export const QuoteDetails = ({ mainQuote }: { mainQuote: OfferQuote }) => {
  const textKeys = useTextKeys()

  return (
    <SubSection headlineText={textKeys.CHECKOUT_YOUR_HOME_SECTION_TITLE()}>
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
        <TextButton color={colorsV3.purple900}>
          {textKeys.CHECKOUT_EDIT_INFORMATION_BUTTON()}
        </TextButton>
      </ButtonWrapper>
    </SubSection>
  )
}
