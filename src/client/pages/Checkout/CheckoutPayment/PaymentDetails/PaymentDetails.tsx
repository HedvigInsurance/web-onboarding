import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { InputField, Wrapper } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { Headline } from 'components/Headline/Headline'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
const { gray600, gray700 } = colorsV3

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    width: 45%;
  }
  & > div:first-child {
    flex: 1 0 100%;
  }
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 2fr 140px 140px;
    & > div {
      width: auto;
    }
  }
  ${Wrapper} {
    background-color: transparent;
  }
`

const Description = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${gray700};
`

const Terms = styled.div`
  color: ${gray600};
  margin-top: 1rem;
  font-size: 0.75rem;
  line-height: 1.33;
  a {
    text-decoration: none;
  }
`

export const PaymentDetails = () => {
  const textKeys = useTextKeys()

  return (
    <>
      <Headline variant="s" headingLevel="h2" colorVariant="dark">
        Payment details
      </Headline>
      <Description>
        Money is withdrawn the end of each month. We handle payments securely
        with Adyen.
      </Description>

      <Row>
        <InputField
          label="Credit card"
          placeholder="4562 4589 4565"
          type="number"
        />
        <InputField
          label="Expiry data"
          placeholder="MM/YY"
          type="number "
        ></InputField>
        <InputField
          label="CVC/CVV "
          type="number"
          placeholder="123"
        ></InputField>
      </Row>

      <Terms>{textKeys.CHECKOUT_SIGN_DISCLAIMER()}</Terms>
    </>
  )
}
