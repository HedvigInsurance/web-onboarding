import React from 'react'
import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { LocationDescriptor } from 'history'
import {
  dkHomeContentAccident,
  dkHomeContentAccidentTravel,
  dkHomeContentOwn,
  noCombo,
  seApartementBrf,
} from 'utils/testData/offerDataMock'
import { TextKeyProvider, Locale } from 'utils/textKeys'
import { Checkout, Props } from '.'

export default {
  title: 'Offer/Checkout',
  component: Checkout,
  parameters: {
    paddings: [{ name: 'Medium', value: '16px', default: true }],
  },
}

type StoryProps = {
  initialEntries: LocationDescriptor
  locale: Locale
  componentProps: Props
}

const Template: Story<StoryProps> = (args) => (
  <MockedProvider>
    <MemoryRouter initialEntries={[args.initialEntries]}>
      <TextKeyProvider locale={args.locale}>
        <Checkout {...args.componentProps} />
      </TextKeyProvider>
    </MemoryRouter>
  </MockedProvider>
)

const defaultArgs = {
  isOpen: true,
  onClose: action('onClose'),
  refetch: (...args: any[]) => {
    action('refetch')(...args)
    return Promise.resolve()
  },
}

export const SEApartmentBrf = Template.bind({})
SEApartmentBrf.args = {
  initialEntries: '/se/new-member/offer',
  locale: 'sv_SE',
  componentProps: {
    ...defaultArgs,
    offerData: seApartementBrf,
  },
}

export const NOCombo = Template.bind({})
NOCombo.args = {
  initialEntries: '/no/new-member/offer',
  locale: 'nb_NO',
  componentProps: {
    ...defaultArgs,
    offerData: noCombo,
  },
}

export const DKHomeContent = Template.bind({})
DKHomeContent.args = {
  initialEntries: '/dk/new-member/offer',
  locale: 'da_DK',
  componentProps: {
    ...defaultArgs,
    offerData: dkHomeContentOwn,
  },
}

export const DKHomeContentAccident = Template.bind({})
DKHomeContentAccident.args = {
  initialEntries: '/dk/new-member/offer',
  locale: 'da_DK',
  componentProps: {
    ...defaultArgs,
    offerData: dkHomeContentAccident,
  },
}

export const DKHomeContentAccidentTravel = Template.bind({})
DKHomeContentAccidentTravel.args = {
  initialEntries: '/dk/new-member/offer',
  locale: 'da_DK',
  componentProps: {
    ...defaultArgs,
    offerData: dkHomeContentAccidentTravel,
  },
}
