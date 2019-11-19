import styled from '@emotion/styled'
import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { OfferData } from 'containers/OfferContainer'
import { isFreeMonths, isMonthlyCostDeduction } from 'containers/types'
import * as React from 'react'
import {
  isApartmentOwner,
  isStudentInsurance,
} from 'utils/insuranceDomainUtils'
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
  marginBottom: '0px',
  marginTop: '10px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

const InsuranceInfo = styled('div')<{ wide?: boolean }>(({ wide }) => ({
  textAlign: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 2,
  '@media (max-width: 350px)': {
    flexDirection: wide ? 'column' : 'row',
  },
}))

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

const GrossPrice = styled('div')({
  textAlign: 'center',
  textDecoration: 'line-through',
  color: colors.DARK_GRAY,
})

const CampaignOwner = styled('p')({
  textAlign: 'center',
  color: '#cc6e66',
  marginTop: 0,
  fontSize: '0.875em',
})

const CampaignOwnerBold = styled('span')({
  fontWeight: 600,
})

interface Props {
  offer: OfferData
}

export const PriceAndInclusions: React.SFC<Props> = ({ offer }) => (
  <>
    <PriceWrapper>
      <TranslationsPlaceholderConsumer
        textKey="OFFER_SUMMARY_PRICE"
        replacements={{ price: Number(offer.insurance.cost.monthlyNet.amount) }}
      >
        {(priceText) => <Price>{priceText}</Price>}
      </TranslationsPlaceholderConsumer>
      {isStudentInsurance(offer.insurance.type) && (
        <StudentBadge placement="right" />
      )}
    </PriceWrapper>
    {offer.redeemedCampaigns.length > 0 && (
      <>
        {isMonthlyCostDeduction(offer.redeemedCampaigns[0].incentive) && (
          <TranslationsPlaceholderConsumer
            textKey="OFFER_SUMMARY_PRICE"
            replacements={{
              price: Number(offer.insurance.cost.monthlyGross.amount),
            }}
          >
            {(grossPrice) => <GrossPrice>{grossPrice}</GrossPrice>}
          </TranslationsPlaceholderConsumer>
        )}
        {isFreeMonths(offer.redeemedCampaigns[0].incentive) && (
          <TranslationsPlaceholderConsumer
            textKey="WEB_VOUCHER_ADDEDPERK"
            replacements={{
              FREE_MONTHS: offer.redeemedCampaigns[0].incentive.quantity,
              CAMPAIGN_NAME: (
                <CampaignOwnerBold>
                  {offer.redeemedCampaigns[0].owner.displayName}
                </CampaignOwnerBold>
              ),
            }}
          >
            {(campaignOwner) => <CampaignOwner>{campaignOwner}</CampaignOwner>}
          </TranslationsPlaceholderConsumer>
        )}
      </>
    )}

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
    <InsuranceInfo wide={true}>
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
          <TranslationsConsumer textKey="OFFER_PRICE_INCLUSION_PEOPLE_INSURED_LABEL">
            {(text) => text}
          </TranslationsConsumer>
        </BoldInfoText>
        <InfoText>
          {offer.member.firstName}
          {offer.insurance.personsInHousehold > 1 &&
            ` + ${offer.insurance.personsInHousehold - 1}`}
        </InfoText>
      </InsuranceInfo>
      <InsuranceInfo>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <BoldInfoText>
          <TranslationsConsumer
            textKey={
              isApartmentOwner(offer.insurance.type)
                ? 'OFFER_PRICE_INCLUSION_ADDITION'
                : 'OFFER_PRICE_INCLUSION_ADDITION_RENT'
            }
          >
            {(text) => text}
          </TranslationsConsumer>
        </BoldInfoText>
      </InsuranceInfo>
      <InsuranceInfo>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <BoldInfoText>
          <TranslationsConsumer textKey="OFFER_PRICE_INCLUSION_NO_SUBSCRIPTION">
            {(text) => text}
          </TranslationsConsumer>
        </BoldInfoText>
      </InsuranceInfo>
    </CheckBoxTable>
  </>
)
