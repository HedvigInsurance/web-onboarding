import React from 'react'
import { useLocation, useHistory } from 'react-router'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { StandaloneProductCard } from 'components/StandaloneProductCard'
import { AdditionalProductCard } from 'components/AdditionalProductCard'

const SEARCH_PARAM = 'type'

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

  const { search: searchParams } = useLocation()
  const history = useHistory()

  const selectedProductIds = new URLSearchParams(searchParams).getAll(
    SEARCH_PARAM,
  )
  const selectedStandaloneProducts = standaloneProducts.filter(({ id }) =>
    selectedProductIds.includes(id),
  )

  const handleClick = (productId: string) => {
    const searchParams = new URLSearchParams()

    const isProductSelected = selectedProductIds.includes(productId)
    let newSelectedProductIds: Array<string> = []
    if (isProductSelected) {
      newSelectedProductIds = selectedProductIds.filter(
        (insuranceType) => insuranceType !== productId,
      )
    } else {
      newSelectedProductIds = [...selectedProductIds, productId]
    }

    newSelectedProductIds.forEach((insuranceType) =>
      searchParams.append(SEARCH_PARAM, insuranceType),
    )

    history.replace({
      search: searchParams.toString(),
    })
  }

  return (
    <Wrapper className={className}>
      <section>
        <h2>{textKeys.OFFER_PAGE_SECTION_TITLE_MAIN()}</h2>
        <MainCoverageCardGrid>
          {standaloneProducts.map(({ id, name, price, description, image }) => {
            const isTheOnlyStandaloneProduct =
              selectedStandaloneProducts.length === 1 &&
              selectedStandaloneProducts[0].id === id

            return (
              <StandaloneProductCard
                key={id}
                title={name}
                price={price}
                description={description}
                image={image}
                checked={selectedProductIds.includes(id)}
                disabled={isTheOnlyStandaloneProduct}
                onClick={() => handleClick(id)}
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
              checked={selectedProductIds.includes(id)}
              onClick={() => handleClick(id)}
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
})
