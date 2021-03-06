import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import React from 'react'
import { CurrentInsurer } from 'data/graphql'
import {
  Body,
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
} from 'pages/OfferNew/components'
import { useTextKeys } from 'utils/textKeys'
import { CompareTable } from './CompareTable'
import { hedvigCompany, otherCompanies } from './mock'
import { InsuranceProperties } from './types'

const Wrapper = styled.div`
  padding: 5rem 0;
  background-color: ${colorsV2.offwhite};
`

const insuranceProperties: InsuranceProperties = {
  propertyProtection: {
    name: 'COMPARE_TABLE_EGENDOMSSKYDD_TITLE',
    tooltip: {
      title: 'COMPARE_TABLE_EGENDOMSSKYDD_TOOLTIP_TITLE',
      body: 'COMPARE_TABLE_EGENDOMSSKYDD_TOOLTIP_BODY',
    },
  },
  travelProtection: {
    name: 'COMPARE_TABLE_RESESKYDD_TITLE',
    tooltip: {
      title: 'COMPARE_TABLE_RESESKYDD_TOOLTIP_TITLE',
      body: 'COMPARE_TABLE_RESESKYDD_TOOLTIP_BODY',
    },
  },
  assaultProtection: {
    name: 'COMPARE_TABLE_OVERFALLSSKYDD_TITLE',
    tooltip: {
      title: 'COMPARE_TABLE_OVERFALLSSKYDD_TOOLTIP_TITLE',
      body: 'COMPARE_TABLE_OVERFALLSSKYDD_TOOLTIP_BODY',
    },
  },
  liabilityProtection: {
    name: 'COMPARE_TABLE_ANSVARSSKYDD_TITLE',
    tooltip: {
      title: 'COMPARE_TABLE_ANSVARSSKYDD_TOOLTIP_TITLE',
      body: 'COMPARE_TABLE_ANSVARSSKYDD_TOOLTIP_BODY',
    },
  },
  legalProtection: {
    name: 'COMPARE_TABLE_RATTSSKYDD_TITLE',
    tooltip: {
      title: 'COMPARE_TABLE_RATTSSKYDD_TOOLTIP_TITLE',
      body: 'COMPARE_TABLE_RATTSSKYDD_TOOLTIP_BODY',
    },
  },
  drulle: {
    name: 'COMPARE_TABLE_DRULLE_TITLE',
    tooltip: {
      title: 'COMPARE_TABLE_DRULLE_TOOLTIP_TITLE',
      body: 'COMPARE_TABLE_DRULLE_TOOLTIP_BODY',
    },
  },
  trustpilotScore: {
    name: 'COMPARE_TABLE_TRUSTPILOT_TITLE',
  },
}

interface CompareProps {
  currentInsurer?: CurrentInsurer
}

export const Compare: React.FC<CompareProps> = ({ currentInsurer }) => {
  const textKeys = useTextKeys()
  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>{textKeys.COMPARE_LABEL()}</PreHeading>
            <HeadingBlack>{textKeys.COMPARE_HEADLINE()}</HeadingBlack>
            <Body>{textKeys.COMPARE_BODY()}</Body>
          </HeadingWrapper>

          <CompareTable
            insuranceProperties={insuranceProperties}
            primaryCompany={hedvigCompany}
            otherCompanies={otherCompanies}
            currentCompany={otherCompanies.find(
              (company) => company.id === currentInsurer?.id,
            )}
          />
        </Column>
        <ColumnSpacing />
      </Container>
    </Wrapper>
  )
}
