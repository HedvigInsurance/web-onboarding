import React, { useState, KeyboardEvent } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Card } from './Card'

const CardListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${colorsV3.gray100};

  &:focus {
    div#${(props) => CSS.escape(props['aria-activedescendant'] || 'test')} {
      background-color: red;
      box-shaddow: 0 0 0 8px #f1f2f6;
    }
  }
`

const CardWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    width: calc(50% - 1rem);
    margin-right: 1rem;
  }
`

const KeyCodes = {
  arrowLeft: 37,
  arrowUp: 38,
  arrowRight: 39,
  arrowDown: 40,
  space: 32,
}

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
  const [focusId, setFocusId] = useState('')

  const handleInitialFocus = () => {
    if (!focusId) setFocusId(`${insurances[0].id}`)
  }

  const handleCardClick = (id: string) => {
    setFocusId(id)
    onChange(id)
  }

  const handleContainerKeyPress = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case KeyCodes.arrowLeft:
      case KeyCodes.arrowUp:
        event.preventDefault()
        const previousInsuranceIndex =
          insurances.findIndex((x) => x.id === focusId) - 1
        if (previousInsuranceIndex >= 0) {
          const previousInsuranceId = insurances[previousInsuranceIndex].id
          setFocusId(previousInsuranceId)
          onChange(previousInsuranceId)
        } else {
          const lastInsuranceId = insurances[insurances.length - 1].id
          setFocusId(lastInsuranceId)
          onChange(lastInsuranceId)
        }
        break
      case KeyCodes.arrowRight:
      case KeyCodes.arrowDown:
        event.preventDefault()
        const nextInsuranceIndex =
          insurances.findIndex((x) => x.id === focusId) + 1
        if (nextInsuranceIndex < insurances.length) {
          const nextInsuranceId = insurances[nextInsuranceIndex].id
          setFocusId(nextInsuranceId)
          onChange(nextInsuranceId)
        } else {
          const firstInsuranceId = insurances[0].id
          setFocusId(firstInsuranceId)
          onChange(firstInsuranceId)
        }
        break
      default:
        break
    }
  }

  return (
    <CardListContainer
      tabIndex={0}
      role="radio-group"
      aria-activedescendant={focusId}
      onFocus={handleInitialFocus}
      onKeyDown={handleContainerKeyPress}
    >
      {insurances.map(({ id, name, price, label, selected, currency }) => (
        <CardWrapper
          id={`${id}`}
          key={id}
          tabIndex={0}
          role="radio"
          aria-checked={selected}
        >
          <Card
            onClick={() => handleCardClick(id)}
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
