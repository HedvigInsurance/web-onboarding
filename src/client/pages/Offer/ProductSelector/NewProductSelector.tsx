import React, { useMemo } from 'react'
import { QuoteCartQuery } from 'data/graphql'
import { getAllQuotes } from 'api/quoteCartQuerySelectors'
import { useTextKeys } from 'utils/textKeys'
import { useLocalizeNumber } from 'l10n/useLocalizeNumber'
import {
  ContainerWrapper,
  Container,
  HeadingWrapper,
  HeadingBlack,
  Column,
  ColumnSpacing,
} from '../components'
import { NewSelector } from './NewSelector'

export type NewProductSelectorProps = { quoteCartQueryData: QuoteCartQuery }

export const NewProductSelector = ({
  quoteCartQueryData,
}: NewProductSelectorProps) => {
  const textKeys = useTextKeys()
  const localizedPerMonth = textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()
  const localizeNumber = useLocalizeNumber()

  const products = useMemo(() => {
    return getAllQuotes(quoteCartQueryData).map(
      ({ insuranceType, displayName, description, price }) => {
        return {
          id: insuranceType,
          name: displayName,
          description,
          price: `${localizeNumber(Math.round(Number(price.amount)))} ${
            price.currency
          }${localizedPerMonth}`,
        }
      },
    )
  }, [quoteCartQueryData, localizeNumber, localizedPerMonth])

  if (products.length === 0) return null

  return (
    <ContainerWrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <HeadingBlack>
              {textKeys.INSURANCE_SELECTOR_HEADLINE()}
            </HeadingBlack>
          </HeadingWrapper>
          <NewSelector products={products} />
        </Column>
        <ColumnSpacing />
      </Container>
    </ContainerWrapper>
  )
}
