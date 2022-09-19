import React, { useRef } from 'react'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { StandaloneProductCard } from 'components/StandaloneProductCard'
import { AdditionalProductCard } from 'components/AdditionalProductCard'
import {
  useSelectedInsuranceTypes,
  validateInsuranceTypes,
} from 'utils/hooks/useSelectedInsuranceTypes'

export type Product = {
  id: string
  name: string
  description: string
  price: string
  image: string
}

export type SelectorProps = {
  className?: string
  standaloneProducts: Array<Product>
  additionalProducts: Array<Product>
}

export const Selector = ({
  className,
  standaloneProducts,
  additionalProducts,
}: SelectorProps) => {
  const textKeys = useTextKeys()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [
    selectedInsuranceTypes,
    changeInsuranceTypes,
  ] = useSelectedInsuranceTypes()

  const selectedInsuranceTypesSet = new Set(
    selectedInsuranceTypes as Array<string>,
  )

  const selectedStandaloneProducts = standaloneProducts.filter(({ id }) =>
    selectedInsuranceTypesSet.has(id),
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
    <Wrapper className={className}>
      {standaloneProducts.length > 0 && (
        <section>
          <h2>{textKeys.OFFER_PAGE_SECTION_TITLE_MAIN()}</h2>
          <MainCoverageCardGrid>
            {standaloneProducts.map(
              ({ id, name, price, description, image }) => {
                const isTheOnlySelectedStandaloneProduct =
                  selectedStandaloneProducts.length === 1 &&
                  selectedStandaloneProducts[0].id === id

                return (
                  <StandaloneProductCard
                    key={id}
                    checkboxRef={
                      isTheOnlySelectedStandaloneProduct ? inputRef : undefined
                    }
                    title={name}
                    price={price}
                    description={description}
                    image={image}
                    checked={selectedInsuranceTypesSet.has(id)}
                    onClick={() => {
                      if (isTheOnlySelectedStandaloneProduct) {
                        inputRef.current?.setCustomValidity(
                          textKeys.OFFER_PAGE_MISSING_MAIN_COVERAGE_ERROR(),
                        )
                        inputRef.current?.reportValidity()
                      } else {
                        handleClick(id)
                      }
                    }}
                  />
                )
              },
            )}
          </MainCoverageCardGrid>
        </section>
      )}

      {additionalProducts.length > 0 && (
        <section>
          <h2>{textKeys.OFFER_PAGE_SECTION_TITLE_ADDITIONAL()}</h2>
          <AdditionalCoverageCardGrid>
            {additionalProducts.map(
              ({ id, name, price, description, image }) => (
                <AdditionalProductCard
                  key={id}
                  title={name}
                  price={price}
                  description={description}
                  image={image}
                  checked={selectedInsuranceTypesSet.has(id)}
                  onClick={() => handleClick(id)}
                />
              ),
            )}
          </AdditionalCoverageCardGrid>
        </section>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  maxWidth: '42rem',
})

const MainCoverageCardGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  [MEDIA_QUERIES.mediumScreen]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const AdditionalCoverageCardGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
})
