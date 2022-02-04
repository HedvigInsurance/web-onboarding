import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'
import { TextButton } from 'components/buttons'
import { Row } from '../components/Row'
import { Label } from '../components/Label'
import { Value } from '../components/Value'
import { SubSection } from '../components/SubSection'
import { Group } from '../components/Group'
import { HorizontalSpacer } from '../components/HorizontalSpacer'
import { HomeInsuranceTypeOfContract } from '../../OfferNew/utils'

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 0.5rem;
`

type MainQuoteDetails = {
  id: string
  birthDate: string
  street: string
  city: string | null
  zipCode: string
  numberCoInsured: number
  livingSpace: number
  typeOfContract: HomeInsuranceTypeOfContract
  isStudent: boolean
}

type DetailsGroup = {
  key: string
  value: string
  label: string
}[]

type Props = { detailsGroups: DetailsGroup[] }

export const QuoteDetails = ({ detailsGroups }: Props) => {
  const textKeys = useTextKeys()

  return (
    <SubSection headlineText={textKeys.CHECKOUT_YOUR_HOME_SECTION_TITLE()}>
      {detailsGroups.map((group, index) => (
        <Group key={index}>
          {group.map(({ key, value, label }) => (
            <Row key={key}>
              <Label>{label}</Label>
              <HorizontalSpacer />
              <Value>{value}</Value>
            </Row>
          ))}
        </Group>
      ))}
      <ButtonWrapper>
        <TextButton color={colorsV3.purple900}>
          {textKeys.CHECKOUT_EDIT_INFORMATION_BUTTON()}
        </TextButton>
      </ButtonWrapper>
    </SubSection>
  )
}
