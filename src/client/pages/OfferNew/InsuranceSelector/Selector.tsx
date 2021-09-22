import styled from '@emotion/styled'
import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Card } from './Card'

const CardListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${colorsV3.gray100};
`

const CardWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    width: calc(50% - 1rem);
    margin-right: 1rem;
  }
`

interface Props {
  insurances: {
    id: string
    name: string
    price: number
    label?: string
    selected?: boolean
    currency: string
  }[]
  onChange: (id: string) => void
}

export const Selector: React.FC<Props> = ({ insurances, onChange }) => {
  return (
    <CardListContainer>
      {insurances.map(({ id, name, price, label, selected, currency }) => (
        <CardWrapper key={id}>
          <Card
            onClick={() => onChange(id)}
            selected={selected}
            name={name}
            price={price}
            label={label}
            currency={currency}
          />
        </CardWrapper>
      ))}
    </CardListContainer>
  )
}
