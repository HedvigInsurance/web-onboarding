import { Story } from '@storybook/react'
import React from 'react'
import { TextKeyProvider } from 'utils/textKeys'
import {
  SwedishApartmentType,
  TypeOfContract,
  InsurableLimitType,
  InsuranceTermType,
} from 'data/graphql'
import { perilsMock } from 'utils/testData/offerDataMock'
import { OfferQuote } from '../../../OfferNew/types'
import { PageSection } from '../components/PageSection'
import { QuoteDetails } from './QuoteDetails'

export default {
  title: 'Checkout Details/QuoteDetails',
  component: QuoteDetails,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

type StoryProps = {
  mainQuote: OfferQuote
}

const mockOfferQuote = {
  id: '55b885cd-0876-4e67-b4c4-3ba379c1978c',
  displayName: 'Home Insurance Renter',
  price: {
    amount: '59',
    currency: 'SEK',
    __typename: 'MonetaryAmountV2' as const,
  },
  startDate: null,
  quoteDetails: {
    street: 'Storgatan 1',
    zipCode: '12345',
    householdSize: 1,
    livingSpace: 23,
    type: SwedishApartmentType.Rent,
    __typename: 'SwedishApartmentQuoteDetails' as const,
  },
  dataCollectionId: null,
  currentInsurer: null,
  perils: perilsMock,
  contractType: TypeOfContract.SeAccident,
  insurableLimits: new Map([
    [
      InsurableLimitType.InsuredAmount,
      {
        label: 'Your insured amount is',
        limit: '1 000 000 SEK',
        description:
          'The amount applies as maximum compensation in the event of permanent injury and loss of fitness for work. In addition to the insurance amount, compensation depends on the degree of disability that the doctor assesses (in percent) for your injury. Example: If the permanent damage is determined to be 20%, we pay SEK 200,000 in compensation.',
        type: InsurableLimitType.InsuredAmount,
        __typename: 'InsurableLimit' as const,
      },
    ],
    [
      InsurableLimitType.Deductible,
      {
        label: 'Your deductible is',
        limit: '0 SEK',
        description: 'The insurance applies without deductible\n',
        type: InsurableLimitType.Deductible,
        __typename: 'InsurableLimit' as const,
      },
    ],
  ] as const),
  insuranceTerms: [
    {
      displayName: 'Terms and pre-sale information',
      url:
        'https://promise.hedvig.com/eng_terms_conditions_accident_0a5e1d2828.pdf',
      type: InsuranceTermType.TermsAndConditions,
      __typename: 'InsuranceTerm' as const,
    },
    {
      displayName: 'IPID',
      url:
        'https://promise.hedvig.com/Hedvig_OLYCKSFALL_SE_IPID_1_7e7640efa2.pdf',
      type: InsuranceTermType.PreSaleInfoEuStandard,
      __typename: 'InsuranceTerm' as const,
    },
    {
      displayName: 'Ärrtabell',
      url: 'https://promise.hedvig.com/se_arrtabell_olycksfall_66dbff4975.pdf',
      type: InsuranceTermType.GeneralTerms,
      __typename: 'InsuranceTerm' as const,
    },
  ],
}

const Template: Story<StoryProps> = () => (
  <TextKeyProvider locale="en_SE">
    <PageSection>
      <QuoteDetails mainQuote={mockOfferQuote} />
    </PageSection>
  </TextKeyProvider>
)

export const Default = Template.bind({})
