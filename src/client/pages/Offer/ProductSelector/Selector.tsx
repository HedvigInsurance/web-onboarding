import React, { useState, useRef, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { MainProductCard } from 'components/MainProductCard'
import { AdditionalProductCard } from 'components/AdditionalProductCard'
import { Product } from 'pages/Offer/types'

type SelectorProps = {
  className?: string
  standaloneProducts: Array<Product>
  additionalProducts: Array<Product>
}

type State = {
  standaloneProducts: Record<string, boolean>
  additionalProducts: Record<string, boolean>
}

const getStateFromURL = ({
  standaloneProducts,
  additionalProducts,
  searchParams,
}: {
  standaloneProducts: Array<Product>
  additionalProducts: Array<Product>
  searchParams: string
}): State => {
  const selectedInsuranceTypes = new Set(
    new URLSearchParams(searchParams).getAll('type'),
  )

  const getProductIdByValueMap = (quotes: Array<Product>) =>
    quotes.reduce(
      (result, quote) => ({
        ...result,
        [quote.id]: selectedInsuranceTypes.has(quote.id),
      }),
      {},
    )

  return {
    standaloneProducts: getProductIdByValueMap(standaloneProducts),
    additionalProducts: getProductIdByValueMap(additionalProducts),
  }
}

const getSearchParamsFromState = (state: State) => {
  const selectedStandaloneProducts = Object.keys(
    state.standaloneProducts,
  ).filter((productId) => state.standaloneProducts[productId])
  const selectedAdditionalProducts = Object.keys(
    state.additionalProducts,
  ).filter((productId) => state.additionalProducts[productId])
  const selectedProducts = [
    ...selectedStandaloneProducts,
    ...selectedAdditionalProducts,
  ]

  const searchParams = new URLSearchParams()
  selectedProducts.forEach((type) => searchParams.append('type', type))

  return searchParams.toString()
}

export const Selector = ({
  className,
  standaloneProducts,
  additionalProducts,
}: SelectorProps) => {
  const textKeys = useTextKeys()

  const { search: searchParams } = useLocation()
  const history = useHistory()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [selectedProductsByCategory, setSelectedProductsByCategory] = useState(
    getStateFromURL({ standaloneProducts, additionalProducts, searchParams }),
  )

  const selectedStandaloneProducts = useMemo(() => {
    return Object.keys(selectedProductsByCategory.standaloneProducts).filter(
      (productId) => selectedProductsByCategory.standaloneProducts[productId],
    )
  }, [selectedProductsByCategory])

  return (
    <Wrapper className={className}>
      <section>
        <h2>{textKeys.OFFER_PAGE_SECTION_TITLE_MAIN()}</h2>
        <MainCoverageCardGrid>
          {standaloneProducts.map(({ id, name, price, description, image }) => {
            const isTheOnlySelectedMainProduct =
              selectedStandaloneProducts.length === 1 &&
              selectedStandaloneProducts[0] === id

            return (
              <MainProductCard
                key={id}
                checkboxRef={
                  isTheOnlySelectedMainProduct ? inputRef : undefined
                }
                title={name}
                price={price}
                description={description}
                image={image}
                checked={selectedProductsByCategory.standaloneProducts[id]}
                onClick={() => {
                  if (isTheOnlySelectedMainProduct) {
                    inputRef.current?.setCustomValidity(
                      textKeys.OFFER_PAGE_MISSING_MAIN_COVERAGE_ERROR(),
                    )
                    inputRef.current?.reportValidity()
                  } else {
                    const newState = {
                      ...selectedProductsByCategory,
                      standaloneProducts: {
                        ...selectedProductsByCategory.standaloneProducts,
                        [id]: !selectedProductsByCategory.standaloneProducts[
                          id
                        ],
                      },
                    }

                    setSelectedProductsByCategory(newState)

                    history.push({
                      search: getSearchParamsFromState(newState),
                    })
                  }
                }}
              />
            )
          })}
        </MainCoverageCardGrid>
      </section>
      <section>
        <h2>{textKeys.OFFER_PAGE_SECTION_TITLE_ADDITIONAL()}</h2>
        <AdditionalCoverageCardGrid>
          {additionalProducts.map(({ id, name, price, description, image }) => (
            <AdditionalProductCard
              key={id}
              title={name}
              price={price}
              description={description}
              image={image}
              checked={selectedProductsByCategory.additionalProducts[id]}
              onClick={() => {
                const newState = {
                  ...selectedProductsByCategory,
                  additionalProducts: {
                    ...selectedProductsByCategory.additionalProducts,
                    [id]: !selectedProductsByCategory.additionalProducts[id],
                  },
                }

                setSelectedProductsByCategory(newState)

                history.push({
                  search: getSearchParamsFromState(newState),
                })
              }}
            />
          ))}
        </AdditionalCoverageCardGrid>
      </section>
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

  [MEDIA_QUERIES.mediumScreen]: {
    gridTemplateColumns: '1f',
  },
})
