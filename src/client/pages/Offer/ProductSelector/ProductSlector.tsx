import React, { useState, useRef, useMemo } from 'react'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { MainProductCard } from './MainProductCard'
import { AdditionalProductCard } from './AdditionalProductCard'

type Product = {
  id: string
  name: string
  description: string
  price: string
  image: string
}

type ProductSelectorProps = {
  className?: string
  mainProducts: Array<Product>
  additionalProducts: Array<Product>
}

const getInitialState = ({
  mainProducts,
  additionalProducts,
}: {
  mainProducts: Array<Product>
  additionalProducts: Array<Product>
}): {
  mainProducts: Record<string, boolean>
  additionalProducts: Record<string, boolean>
} => {
  const getProductIdByValueMap = (products: Array<Product>) =>
    products.reduce(
      (result, product) => ({
        ...result,
        [product.id]: false,
      }),
      {},
    )

  return {
    mainProducts: getProductIdByValueMap(mainProducts),
    additionalProducts: getProductIdByValueMap(additionalProducts),
  }
}

export const ProductSelector = ({
  className,
  mainProducts,
  additionalProducts,
}: ProductSelectorProps) => {
  const textKeys = useTextKeys()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedProductsByCategory, setSelectedProductsByCategory] = useState(
    getInitialState({ mainProducts, additionalProducts }),
  )

  const selectedMainProducts = useMemo(() => {
    return Object.keys(selectedProductsByCategory.mainProducts).filter(
      (productId) => selectedProductsByCategory.mainProducts[productId],
    )
  }, [selectedProductsByCategory])

  return (
    <Wrapper className={className}>
      <section>
        <h2>{textKeys.OFFER_PAGE_SECTION_TITLE_MAIN()}</h2>
        <MainCoverageCardGrid>
          {mainProducts.map(({ id, name, price, description, image }) => {
            const isTheOnlySelectedMainProduct =
              selectedMainProducts.length === 1 &&
              selectedMainProducts[0] === id

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
                checked={selectedProductsByCategory.mainProducts[id]}
                onClick={() => {
                  if (isTheOnlySelectedMainProduct) {
                    inputRef.current?.setCustomValidity(
                      textKeys.OFFER_PAGE_MISSING_MAIN_COVERAGE_ERROR(),
                    )
                    inputRef.current?.reportValidity()
                  } else {
                    setSelectedProductsByCategory((prevState) => ({
                      ...prevState,
                      mainProducts: {
                        ...prevState.mainProducts,
                        [id]: !prevState.mainProducts[id],
                      },
                    }))
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
                setSelectedProductsByCategory((prevState) => ({
                  ...prevState,
                  additionalProducts: {
                    ...prevState.additionalProducts,
                    [id]: !prevState.additionalProducts[id],
                  },
                }))
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
