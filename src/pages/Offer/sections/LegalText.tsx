import { colors } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import {
  getInsurancePDFTextKey,
  getPrebuyPDFTextKey,
  InsuranceType,
} from 'utils/insuranceDomainUtils'

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
        textKey="OFFER_FOOTER_LEGAL_TEXT_TEST"
        replacements={{
          preBuy: (
            <TranslationsConsumer textKey={getPrebuyPDFTextKey(insuranceType)}>
              {(url) => (
                <Link href={url} rel="noreferrer noopener" target="_blank">
                  <TranslationsConsumer textKey="OFFER_FOOTER_PREBUY">
                    {(linkText) => linkText}
                  </TranslationsConsumer>
                </Link>
              )}
            </TranslationsConsumer>
          ),
          terms: (
            <TranslationsConsumer
              textKey={getInsurancePDFTextKey(insuranceType)}
            >
              {(url) => (
                <Link href={url} rel="noreferrer noopener" target="_blank">
                  <TranslationsConsumer textKey="OFFER_FOOTER_TERMS">
                    {(linkText) => linkText}
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
                    {(linkText) => linkText}
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
