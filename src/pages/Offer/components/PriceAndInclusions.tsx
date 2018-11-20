import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { OfferData } from 'containers/OfferContainer'
import * as React from 'react'
import styled from 'react-emotion'
import { isStudentInsurance } from 'utils/insuranceDomainUtils'
import { StudentBadge } from '../components/StudentOfferBadge'

const PriceWrapper = styled('div')({
  display: 'inline-block',
  position: 'relative',
  margin: '0 auto',
  justifyContent: 'center',
  width: '100%',
})

export const Price = styled('h1')({
  marginBottom: '10px',
  marginTop: '30px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

const InsuranceInfo = styled('div')({
  textAlign: 'center',
})

const BoldInfoText = styled('div')({
  color: colors.BLACK,
  display: 'inline',
  fontWeight: 600,
})

const InfoText = styled('div')({
  color: colors.OFF_BLACK,
  display: 'inline',
})

interface Props {
  offer: OfferData
}

export const PriceAndInclusions: React.SFC<Props> = ({ offer }) => (
  <>
    <PriceWrapper>
      <TranslationsPlaceholderConsumer
        textKey="OFFER_SUMMARY_PRICE"
        replacements={{ price: offer.insurance.monthlyCost }}
      >
        {(priceText) => <Price>{priceText}</Price>}
      </TranslationsPlaceholderConsumer>
      {isStudentInsurance(offer.insurance.type) && (
        <StudentBadge placement="right" />
      )}
    </PriceWrapper>
    <InsuranceInfo>
      <BoldInfoText>
        <TranslationsConsumer textKey="OFFER_SELF_RISK_LABEL">
          {(text) => text}
        </TranslationsConsumer>
      </BoldInfoText>
      <InfoText>
        <TranslationsConsumer textKey="OFFER_SELF_RISK_VALUE">
          {(text) => text}
        </TranslationsConsumer>
      </InfoText>
    </InsuranceInfo>
    <InsuranceInfo>
      <BoldInfoText>
        <TranslationsConsumer textKey="OFFER_START_DATE_LABEL">
          {(text) => text}
        </TranslationsConsumer>
      </BoldInfoText>
      <InfoText>
        {offer.insurance.insuredAtOtherCompany ? (
          <TranslationsConsumer textKey="OFFER_START_LATER">
            {(riskLabel) => riskLabel}
          </TranslationsConsumer>
        ) : (
          <TranslationsConsumer textKey="OFFER_START_NOW">
            {(riskLabel) => riskLabel}
          </TranslationsConsumer>
        )}
      </InfoText>
    </InsuranceInfo>
  </>
)
