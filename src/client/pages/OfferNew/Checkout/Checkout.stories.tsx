import React from 'react'
import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { LocationDescriptor } from 'history'
import {
  possibleVariationsApartmentSE,
  possibleVariationsNoCombo,
  possibleVariationsDkHome,
  possibleVariationsDkHomeAccident,
  possibleVariationsDkHomeAccidentTravel,
} from 'utils/testData/possibleVariationsMock'
import { TextKeyProvider, TranslationsLocale } from 'utils/textKeys'
import { Checkout, CheckoutProps } from '.'

export default {
  title: 'Offer/Checkout',
  component: Checkout,
  parameters: {
    paddings: [{ name: 'Medium', value: '16px', default: true }],
  },
}

type StoryProps = {
  initialEntries: LocationDescriptor
  translationsLocale: TranslationsLocale
  componentProps: CheckoutProps
}

const Template: Story<StoryProps> = (args) => (
  <MockedProvider>
    <MemoryRouter initialEntries={[args.initialEntries]}>
      <TextKeyProvider locale={args.translationsLocale}>
        <Checkout {...args.componentProps} />
      </TextKeyProvider>
    </MemoryRouter>
  </MockedProvider>
)

const defaultArgs = {
  isOpen: true,
  onClose: action('onClose'),
  onAddQuotes: action('onAddQuotes'),
  refetch: (...args: any[]) => {
    action('refetch')(...args)
    return Promise.resolve()
  },
}

export const SEApartmentBrf = Template.bind({})
SEApartmentBrf.args = {
  initialEntries: '/se/new-member/offer',
  translationsLocale: 'sv_SE',
  componentProps: {
    ...defaultArgs,
    quoteBundleVariants: possibleVariationsApartmentSE,
    selectedQuoteBundleVariant: possibleVariationsApartmentSE[1],
  },
}

export const NOCombo = Template.bind({})
NOCombo.args = {
  initialEntries: '/no/new-member/offer',
  translationsLocale: 'nb_NO',
  componentProps: {
    ...defaultArgs,
    quoteBundleVariants: possibleVariationsNoCombo,
    selectedQuoteBundleVariant: possibleVariationsNoCombo[0],
  },
}

export const DKHomeContent = Template.bind({})
DKHomeContent.args = {
  initialEntries: '/dk/new-member/offer',
  translationsLocale: 'da_DK',
  componentProps: {
    ...defaultArgs,
    quoteBundleVariants: possibleVariationsDkHome,
    selectedQuoteBundleVariant: possibleVariationsDkHome[0],
  },
}

export const DKHomeContentAccident = Template.bind({})
DKHomeContentAccident.args = {
  initialEntries: '/dk/new-member/offer',
  translationsLocale: 'da_DK',
  componentProps: {
    ...defaultArgs,
    quoteBundleVariants: possibleVariationsDkHomeAccident,
    selectedQuoteBundleVariant: possibleVariationsDkHomeAccident[0],
  },
}

export const DKHomeContentAccidentTravel = Template.bind({})
DKHomeContentAccidentTravel.args = {
  initialEntries: '/dk/new-member/offer',
  translationsLocale: 'da_DK',
  componentProps: {
    ...defaultArgs,
    quoteBundleVariants: possibleVariationsDkHomeAccidentTravel,
    selectedQuoteBundleVariant: possibleVariationsDkHomeAccidentTravel[0],
  },
}
