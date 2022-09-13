import React, { useMemo } from 'react'
import {
  getStandaloneQuotes,
  getAdditionalQuotes,
} from 'api/quoteCartQuerySelectors'
import {
  QuoteCartQuery,
  StandaloneQuoteFragment,
  AdditionalQuoteFragment,
} from 'data/graphql'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  ContainerWrapper,
  Container,
  Column,
  ColumnSpacing,
} from '../components'
import { Selector, Product } from './Selector'

const homeInsuranceTypes = new Set([
  InsuranceType.SWEDISH_APARTMENT,
  InsuranceType.SWEDISH_HOUSE,
  InsuranceType.NORWEGIAN_HOME_CONTENT,
  InsuranceType.DANISH_HOME_CONTENT,
])
const houseInsuranceTypes = new Set([
  InsuranceType.NORWEGIAN_HOUSE,
  InsuranceType.DANISH_HOUSE,
])
const accidentInsuranceTypes = new Set([
  InsuranceType.SWEDISH_ACCIDENT,
  InsuranceType.NORWEGIAN_ACCIDENT,
  InsuranceType.DANISH_ACCIDENT,
])
const travelInsuranceTypes = new Set([
  InsuranceType.NORWEGIAN_TRAVEL,
  InsuranceType.DANISH_TRAVEL,
])

const parseQuoteIntoProduct = ({
  insuranceType,
  displayName,
  description,
  price,
}: StandaloneQuoteFragment | AdditionalQuoteFragment): Product => {
  let image = ''
  if (homeInsuranceTypes.has(insuranceType as InsuranceType)) {
    image = '/new-member-assets/offer/home.jpg'
  } else if (houseInsuranceTypes.has(insuranceType as InsuranceType)) {
    image = '/new-member-assets/offer/house.jpg'
  } else if (accidentInsuranceTypes.has(insuranceType as InsuranceType)) {
    image = '/new-member-assets/offer/accident.jpg'
  } else if (travelInsuranceTypes.has(insuranceType as InsuranceType)) {
    image = '/new-member-assets/offer/travel.jpg'
  }

  return {
    id: insuranceType,
    name: displayName,
    description,
    price: `${price.amount} ${price.currency}`,
    image,
  }
}

type ProductSelectorProps = {
  quoteCartQueryData: QuoteCartQuery
}

export const ProductSelector = ({
  quoteCartQueryData,
}: ProductSelectorProps) => {
  const standaloneProducts = useMemo(
    () => getStandaloneQuotes(quoteCartQueryData).map(parseQuoteIntoProduct),
    [quoteCartQueryData],
  )
  const additionalProducts = useMemo(
    () => getAdditionalQuotes(quoteCartQueryData).map(parseQuoteIntoProduct),
    [quoteCartQueryData],
  )

  const areChoicesAvailable =
    standaloneProducts.length + additionalProducts.length > 1
  if (!areChoicesAvailable) {
    return null
  }

  return (
    <ContainerWrapper>
      <Container>
        <Column>
          <Selector
            standaloneProducts={standaloneProducts}
            additionalProducts={additionalProducts}
          />
        </Column>
        <ColumnSpacing />
      </Container>
    </ContainerWrapper>
  )
}
