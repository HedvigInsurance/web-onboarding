import { colors } from '@hedviginsurance/brand'
import { MarkdownTranslation } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { InsuranceType } from 'utils/insuranceDomainUtils'

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

export const Legal: React.SFC<TermsProps> = ({}) => (
  <Container>
    <LegalText>
      <MarkdownTranslation
        textKey="OFFER_FOOTER_LEGAL_TEXT_TEST"
        replacements={{}}

        //   replacements={{
        //     gdpr: (
        //       <TranslationsConsumer textKey="CHAT_INPUT_PERSONAL_DATA_LINK">
        //         {(url) => (
        //           <Link href={url} rel="noreferrer noopener" target="_blank">
        //             <TranslationsConsumer textKey="OFFER_FOOTER_GDPR">
        //               {(t) => t}
        //             </TranslationsConsumer>
        //           </Link>
        //         )}
        //       </TranslationsConsumer>
        //     ),
        //     preBuy: (
        //       <TranslationsConsumer
        //         textKey={
        //           isApartmentOwner(insuranceType)
        //             ? 'TERMS_PDF_PREBUY_OWNER_URL'
        //             : 'TERMS_PDF_PREBUY_RENT_URL'
        //         }
        //       >
        //         {(url) => (
        //           <Link href={url} rel="noreferrer noopener" target="_blank">
        //             <TranslationsConsumer textKey="OFFER_FOOTER_PREBUY">
        //               {(t) => t}
        //             </TranslationsConsumer>
        //           </Link>
        //         )}
        //       </TranslationsConsumer>
        //     ),
        //     terms: (
        //       <TranslationsConsumer
        //         textKey={
        //           isApartmentOwner(insuranceType)
        //             ? 'TERMS_PDF_INSURANCE_OWNER_URL'
        //             : 'TERMS_PDF_INSURANCE_RENT_URL'
        //         }
        //       >
        //         {(url) => (
        //           <Link href={url} rel="noreferrer noopener" target="_blank">
        //             <TranslationsConsumer textKey="OFFER_FOOTER_TERMS">
        //               {(t) => t}
        //             </TranslationsConsumer>
        //           </Link>
        //         )}
        //       </TranslationsConsumer>
        //     ),
        //   }}
        // >
        //   {(legalText) => legalText}
      />
    </LegalText>
  </Container>
)
