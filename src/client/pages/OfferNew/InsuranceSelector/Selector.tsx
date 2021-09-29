import React, { useState, KeyboardEvent, useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Card } from './Card'

const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: 1rem;
  background-color: ${colorsV3.gray100};
  outline: none;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    grid-template-columns: 1fr 1fr;
  }
`

const CardWrapper = styled.div`
  outline: none;
  cursor: pointer;
`

interface Props {
  insurances: {
    id: string
    name: string
    price: string
    grossPrice?: string
    label?: string
    selected?: boolean
  }[]
  onChange: (id: string) => void
}

export const Selector: React.FC<Props> = ({ insurances, onChange }) => {
  const [focusId, setFocusId] = useState<string | null>(null)

  const selectedInsuranceId = insurances.find(({ selected }) => selected)?.id
  useEffect(() => setFocusId(selectedInsuranceId ?? null), [
    selectedInsuranceId,
  ])

  const handleCardClick = (id: string) => {
    onChange(id)
  }

  const handleContainerKeyPress = (event: KeyboardEvent) => {
    const currentFocusIndex = insurances.findIndex(
      (item) => item.id === focusId,
    )

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        onChange(
          currentFocusIndex >= 1
            ? insurances[currentFocusIndex - 1].id
            : insurances[insurances.length - 1].id,
        )
        break
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        onChange(
          currentFocusIndex <= insurances.length - 1 - 1
            ? insurances[currentFocusIndex + 1].id
            : insurances[0].id,
        )
        break
      default:
        break
    }
  }

  return (
    <CardListContainer
      role="radiogroup"
      aria-activedescendant={focusId ?? undefined}
      onKeyDown={handleContainerKeyPress}
    >
      {insurances.map(({ id, name, price, grossPrice, label, selected }) => (
        <CardWrapper
          id={id}
          key={id}
          tabIndex={selected ? 0 : -1}
          role="radio"
          aria-checked={selected}
        >
          <Card
            onClick={() => handleCardClick(id)}
            selected={selected}
            focused={focusId === id}
            name={name}
            price={price}
            grossPrice={grossPrice}
            label={label}
          />
        </CardWrapper>
      ))}
    </CardListContainer>
  )
}
