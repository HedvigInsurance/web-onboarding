import React, { Fragment } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { Value as ValueType, QuoteProps } from 'utils/getQuoteDetails'
import { useTextKeys, TextKeyMap } from 'utils/textKeys'
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
`

const HorizontalDivider = styled(Divider)`
  margin: 0.5rem 0;
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

export const QuoteDetails = ({ groups }: QuoteProps) => {
  const textKeys = useTextKeys()

  return (
    <SubSection headlineText={textKeys.CHECKOUT_QUOTE_DETAILS_TITLE()}>
      {groups.map((group, index) => (
        <Fragment key={index}>
          <Group>
            {group.map((item) => {
              const valueText = getValueText({
                ...item.value,
                textKeys,
              })
              return (
                <Row key={item.label}>
                  <Label>{textKeys[item.label]()}</Label>
                  <HorizontalSpacer />
                  <Value>{valueText}</Value>
                </Row>
              )
            })}
          </Group>
          {index < groups.length - 1 && <HorizontalDivider />}
        </Fragment>
      ))}
    </SubSection>
  )
}
