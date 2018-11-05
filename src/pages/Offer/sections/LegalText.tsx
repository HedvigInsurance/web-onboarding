import { colors } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { InsuranceType } from 'containers/OfferContainer'
import * as React from 'react'
import styled from 'react-emotion'

const isApartmentOwner = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.BRF ||
  insuranceType === InsuranceType.STUDENT_BRF

interface TermsProps {
  insuranceType: InsuranceType
}

const LEGALWIDTH = 400

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: colors.OFF_WHITE,
  paddingBottom: '70px',
})

const LegalText = styled('div')({
  color: colors.DARK_GRAY,
  textAlign: 'center',
  maxWidth: LEGALWIDTH,
})

const Link = styled('a')({
  color: colors.PURPLE,
  textDecoration: 'none',
})

const getInsuranceURLTextKey = (insuranceType: InsuranceType): string => {
  const map = {
    [InsuranceType.RENT]: 'LEGAL_TEXT_RENT_TEXT',
    [InsuranceType.BRF]: 'LEGAL_TEXT_BRF_TEXT',
    [InsuranceType.STUDENT_RENT]: 'LEGAL_TEXT_STUDENT_RENT_TEXT',
    [InsuranceType.STUDENT_BRF]: 'LEGAL_TEXT_STUDENT_BRF_TEXT',
  }
  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export const Legal: React.SFC<TermsProps> = ({ insuranceType }) => (
  <Container>
    <LegalText>
      <TranslationsPlaceholderConsumer
        textKey="OFFER_FOOTER_LEGAL_TEXT_TEST"
        replacements={{
          preBuy: (
            <TranslationsConsumer
              textKey={getInsuranceURLTextKey(insuranceType)}
            >
              {(url) => (
                <Link href={url} rel="noreferrer noopener" target="_blank">
                  <TranslationsConsumer textKey="OFFER_FOOTER_PREBUY">
                    {(t) => t}
                  </TranslationsConsumer>
                </Link>
              )}
            </TranslationsConsumer>
          ),
          terms: (
            <TranslationsConsumer
              textKey={getInsuranceURLTextKey(insuranceType)}
            >
              {(url) => (
                <Link href={url} rel="noreferrer noopener" target="_blank">
                  <TranslationsConsumer textKey="OFFER_FOOTER_TERMS">
                    {(t) => t}
                  </TranslationsConsumer>
                </Link>
              )}
            </TranslationsConsumer>
          ),
          gdpr: (
            <TranslationsConsumer textKey="CHAT_INPUT_PERSONAL_DATA_LINK">
              {(url) => (
                <Link href={url} rel="noreferrer noopener" target="_blank">
                  <TranslationsConsumer textKey="OFFER_FOOTER_GDPR">
                    {(t) => t}
                  </TranslationsConsumer>
                </Link>
              )}
            </TranslationsConsumer>
          ),
        }}
      >
        {(legalText) => legalText}
      </TranslationsPlaceholderConsumer>
    </LegalText>
  </Container>
)
