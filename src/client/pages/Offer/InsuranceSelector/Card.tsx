import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { SelectedOptionCheckmark } from 'components/icons/SelectedOptionCheckmark'
import { UnselectedOptionCircle } from 'components/icons/UnselectedOptionCircle'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { SelectableInsurance } from './Selector'

const Container = styled.div<{ selected?: boolean; focused?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-width: ${({ selected }) => (selected ? '2px' : '1px')};
  border-style: solid;
  border-color: ${({ selected, focused }) =>
    selected
      ? colorsV3.gray900
      : focused
      ? colorsV3.gray700
      : colorsV3.gray500};
  border-radius: 0.5rem;
  padding: ${({ selected }) => (selected ? '1rem' : 'calc(1rem + 1px)')};
  font-size: 1rem;
  line-height: 1.5rem;
  min-height: 6.625rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    min-height: 9.25rem;
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

const Description = styled.div({
  marginTop: '0.5rem',
  color: colorsV3.gray700,
  fontSize: '0.875rem',
})

const Name = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
`

const Price = styled.div`
  color: ${colorsV3.gray700};
`

const GrossPrice = styled(Price)`
  font-size: 0.875rem;
  text-decoration: line-through;
`

type Props = Omit<SelectableInsurance, 'id'> & {
  focused?: boolean
  onClick: () => void
}

export const Card = ({
  name,
  price,
  grossPrice,
  label,
  selected,
  onClick,
  focused,
  description,
}: Props) => {
  return (
    <Container selected={selected} focused={focused} onClick={onClick}>
      <LabelWrapper>
        {selected ? <SelectedOptionCheckmark /> : <UnselectedOptionCircle />}
        {label && <Label>{label}</Label>}
      </LabelWrapper>
      <NameAndPriceWrapper>
        <Name>{name}</Name>
        <PriceWrapper>
          {grossPrice && <GrossPrice>{grossPrice}</GrossPrice>}
          <Price>{price}</Price>
        </PriceWrapper>
      </NameAndPriceWrapper>
      {description && <Description>{description}</Description>}
    </Container>
  )
}
