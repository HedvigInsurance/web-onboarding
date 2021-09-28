import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { SelectedOptionCheckmark } from 'components/icons/SelectedOptionCheckmark'
import { UnselectedOptionCircle } from 'components/icons/UnselectedOptionCircle'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const Container = styled.div<{ selected?: boolean; focused?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ selected, focused }) =>
    selected
      ? colorsV3.gray900
      : focused
      ? colorsV3.gray700
      : colorsV3.gray500};
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  min-height: 6.625rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    height: 9.25rem;
  }

  &:hover {
    border-color: ${colorsV3.gray700};
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
  gap: 1rem;
  margin-top: 1.75rem;
`

const Name = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Price = styled.div`
  color: ${colorsV3.gray700};
`

const FullPrice = styled(Price)`
  font-size: 0.875rem;
  text-decoration: line-through;
`

interface Props {
  name: string
  price: string
  fullPrice?: string
  label?: string
  selected?: boolean
  focused?: boolean
  onClick: () => void
}

export const Card: React.FC<Props> = ({
  name,
  price,
  fullPrice,
  label,
  selected,
  onClick,
  focused,
}) => {
  return (
    <Container selected={selected} focused={focused} onClick={onClick}>
      <LabelWrapper>
        {selected ? <SelectedOptionCheckmark /> : <UnselectedOptionCircle />}
        {label && <Label>{label}</Label>}
      </LabelWrapper>
      <NameAndPriceWrapper>
        <Name>{name}</Name>
        <PriceWrapper>
          {fullPrice ? <FullPrice>{fullPrice}</FullPrice> : null}
          <Price>{price}</Price>
        </PriceWrapper>
      </NameAndPriceWrapper>
    </Container>
  )
}
