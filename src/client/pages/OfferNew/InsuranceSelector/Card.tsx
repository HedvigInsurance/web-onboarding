import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { SelectedOptionCheckmark } from 'components/icons/SelectedOptionCheckmark'
import { UnselectedOptionCircle } from 'components/icons/UnselectedOptionCircle'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ selected }) =>
    selected ? colorsV3.gray900 : colorsV3.gray500};
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  min-height: 6.625rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    height: 9.25rem;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-left: 0.5rem;
  color: ${colorsV3.gray700};
`

const NameAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.75rem;
`

const Name = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
`

const Price = styled.div`
  color: ${colorsV3.gray700};
`

interface Props {
  name: string
  price: number
  label?: string
  selected?: boolean
  currency: string
  onClick: () => void
}

export const Card: React.FC<Props> = ({
  name,
  price,
  currency,
  label,
  selected,
  onClick,
}) => {
  return (
    <Container selected={selected} onClick={onClick}>
      <LabelWrapper>
        {selected ? <SelectedOptionCheckmark /> : <UnselectedOptionCircle />}
        {label && <Label>{label}</Label>}
      </LabelWrapper>
      <NameAndPriceWrapper>
        <Name>{name}</Name>
        <Price>
          {price}
          {currency}
        </Price>
      </NameAndPriceWrapper>
    </Container>
  )
}
