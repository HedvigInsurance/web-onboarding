import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import {
  Body,
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
} from '../components'
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

export const Compare = () => {
  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>
              <TranslationsConsumer textKey="COMPARE_LABEL">
                {(t) => t}
              </TranslationsConsumer>
            </PreHeading>
            <HeadingBlack>
              <TranslationsConsumer textKey="COMPARE_HEADLINE">
                {(t) => t}
              </TranslationsConsumer>
            </HeadingBlack>
            <Body>
              <TranslationsConsumer textKey="COMPARE_BODY">
                {(t) => t}
              </TranslationsConsumer>
            </Body>
          </HeadingWrapper>

          <CompareTable
            insuranceProperties={insuranceProperties}
            primaryCompany={hedvigCompany}
            otherCompanies={otherCompanies}
          />
        </Column>
        <ColumnSpacing />
      </Container>
    </Wrapper>
  )
}
