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

const ICONSIDE = 16

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
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 2,
})

const BoldInfoText = styled('div')({
  color: colors.BLACK,
  display: 'inline',
  fontWeight: 600,
  marginRight: 3,
})

const InfoText = styled('div')({
  color: colors.OFF_BLACK,
  display: 'inline',
})

const CheckIcon = styled('img')({
  marginRight: 6,
  width: ICONSIDE,
  height: ICONSIDE,
})

const CheckBoxTable = styled('div')({
  marginTop: 20,
  marginBottom: 20,
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
    <CheckBoxTable>
      <InsuranceInfo>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <BoldInfoText>
          <TranslationsConsumer textKey="Antal försökrade:">
            {(text) => text}
          </TranslationsConsumer>
        </BoldInfoText>
        <InfoText>
          <TranslationsConsumer textKey="Zak + 1">
            {(text) => text}
          </TranslationsConsumer>
        </InfoText>
      </InsuranceInfo>
      <InsuranceInfo>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <BoldInfoText>
          <TranslationsConsumer textKey="Bostadsrättstillägg ingår!">
            {(text) => text}
          </TranslationsConsumer>
        </BoldInfoText>
      </InsuranceInfo>
      <InsuranceInfo>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <BoldInfoText>
          <TranslationsConsumer textKey="Ingen bindningstid!">
            {(text) => text}
          </TranslationsConsumer>
        </BoldInfoText>
      </InsuranceInfo>
    </CheckBoxTable>
  </>
)
