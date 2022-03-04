import React, { Fragment } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { getQuoteDetails, Value as ValueType } from 'utils/getQuoteDetails'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useQuoteDetailsDataQuery } from 'data/graphql'
import { SubSection } from '../SubSection'
import { Divider } from '../../../shared/Divider'

const { gray900, gray700 } = colorsV3

const Row = styled.div`
  font-size: 0.874rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1.4;
`

const Label = styled.div`
  color: ${gray900};
`
const Value = styled.div`
  color: ${gray700};
  text-align: right;
`

const HorizontalSpacer = styled.div`
  width: 48px;
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`

const getValueText = ({
  value,
  prefix,
  suffix,
  textKey,
  textKeys,
}: ValueType & { textKeys: TextKeyMap }) => {
  if (textKey) {
    return textKeys[textKey]()
  }
  if (prefix && value) {
    return `${textKeys[prefix]()} ${value}`
  }
  if (suffix && value) {
    return `${value} ${textKeys[suffix]()}`
  }
  return value
}

export const QuoteDetails = () => {
  const textKeys = useTextKeys()
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { data } = useQuoteDetailsDataQuery({
    variables: { id: quoteCartId },
  })

  const quoteDetailsData = data?.quoteCart.bundle?.quotes?.map(
    ({ data }) => data,
  )

  if (!quoteDetailsData) {
    return null // TODO: Do something more sophisticated
  }

  const quoteDetails = getQuoteDetails({ quoteDetailsData })

  return (
    <SubSection headlineText={textKeys.CHECKOUT_QUOTE_DETAILS_TITLE()}>
      {quoteDetails.map((group, index) => (
        <Fragment key={index}>
          <Group>
            {group.map(
              ({ label, value: { value, prefix, suffix, textKey } }) => {
                const valueText = getValueText({
                  value,
                  prefix,
                  suffix,
                  textKey,
                  textKeys,
                })
                return (
                  <Row key={label}>
                    <Label>{textKeys[label]()}</Label>
                    <HorizontalSpacer />
                    <Value>{valueText}</Value>
                  </Row>
                )
              },
            )}
          </Group>
          {index < quoteDetails.length - 1 && <Divider />}
        </Fragment>
      ))}
    </SubSection>
  )
}
