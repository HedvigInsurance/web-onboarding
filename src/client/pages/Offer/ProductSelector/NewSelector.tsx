import React, { useRef } from 'react'
import styled from '@emotion/styled'
import {
  useSelectedInsuranceTypes,
  validateInsuranceTypes,
} from 'utils/hooks/useSelectedInsuranceTypes'
import { useTextKeys } from 'utils/textKeys'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { ProductCard, Product } from './ProductCard'

export type NewSelectorProps = {
  products: Array<Product>
}

export const NewSelector = ({ products }: NewSelectorProps) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null)

  const textKeys = useTextKeys()

  const [
    selectedInsuranceTypes,
    changeInsuranceTypes,
  ] = useSelectedInsuranceTypes()
  const selectedInsuranceTypesSet = new Set(
    selectedInsuranceTypes as Array<string>,
  )

  const handleClick = (insuranceType: string) => {
    if (selectedInsuranceTypesSet.has(insuranceType)) {
      selectedInsuranceTypesSet.delete(insuranceType)
    } else {
      selectedInsuranceTypesSet.add(insuranceType)
    }

    const newTypes = validateInsuranceTypes([...selectedInsuranceTypesSet])
    changeInsuranceTypes(newTypes)
  }

  return (
    <CardGrid>
      {products.map((product) => {
        const istTheOnlyProductSelected =
          selectedInsuranceTypesSet.size === 1 &&
          selectedInsuranceTypesSet.has(product.id)

        return (
          <ProductCard
            key={product.id}
            ref={istTheOnlyProductSelected ? checkboxRef : undefined}
            product={product}
            checked={selectedInsuranceTypesSet.has(product.id)}
            onChange={() => {
              if (istTheOnlyProductSelected) {
                checkboxRef.current?.setCustomValidity(
                  textKeys.OFFER_PAGE_MISSING_MAIN_COVERAGE_ERROR(),
                )
                checkboxRef.current?.reportValidity()
              } else {
                handleClick(product.id)
              }
            }}
          />
        )
      })}
    </CardGrid>
  )
}

const CardGrid = styled.ul({
  all: 'unset',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(9.38rem, 18.75rem))',
  gap: '8px',
  [MEDIA_QUERIES.mediumScreen]: {
    gap: '16px',
  },
})
