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

export const Legal: React.SFC<TermsProps> = ({ insuranceType }) => (
  <Container>
    <LegalText>
      <TranslationsPlaceholderConsumer
        textKey="OFFER_FOOTER_LEGAL_TEXT"
        replacements={{
          gdpr: (
            <TranslationsConsumer textKey="CHAT_INPUT_PERSONAL_DATA_LINK">
              {(url) => (
                <Link href={url} target="_blank">
                  <TranslationsConsumer textKey="OFFER_FOOTER_GDPR">
                    {(t) => t}
                  </TranslationsConsumer>
                </Link>
              )}
            </TranslationsConsumer>
          ),
          preBuy: (
            <TranslationsConsumer
              textKey={
                isApartmentOwner(insuranceType)
                  ? 'TERMS_PDF_PREBUY_OWNER_URL'
                  : 'TERMS_PDF_PREBUY_RENT_URL'
              }
            >
              {(url) => (
                <Link href={url} target="_blank">
                  <TranslationsConsumer textKey="OFFER_FOOTER_GDPR">
                    {(t) => t}
                  </TranslationsConsumer>
                </Link>
              )}
            </TranslationsConsumer>
          ),
          terms: (
            <TranslationsConsumer
              textKey={
                isApartmentOwner(insuranceType)
                  ? 'TERMS_PDF_INSURANCE_OWNER_URL'
                  : 'TERMS_PDF_INSURANCE_RENT_URL'
              }
            >
              {(url) => (
                <Link href={url} target="_blank">
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
