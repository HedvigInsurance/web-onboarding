import React, { useMemo } from 'react'
import {
  getStandaloneProducts,
  getAdditionalProducts,
} from 'api/quoteCartQuerySelectors'
import { QuoteCartQuery } from 'data/graphql'
import {
  ContainerWrapper,
  Container,
  Column,
  ColumnSpacing,
} from '../components'
import { Selector } from './Selector'

type ProductSelectorProps = {
  quoteCartQueryData: QuoteCartQuery
}

export const ProductSelector = ({
  quoteCartQueryData,
}: ProductSelectorProps) => {
  const standaloneProducts = useMemo(
    () => getStandaloneProducts(quoteCartQueryData),
    [quoteCartQueryData],
  )
  const additionalProducts = useMemo(
    () => getAdditionalProducts(quoteCartQueryData),
    [quoteCartQueryData],
  )

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
