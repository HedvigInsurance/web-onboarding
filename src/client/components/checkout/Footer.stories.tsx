import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { TextKeyProvider, TranslationsLocale } from 'utils/textKeys'
import { Footer, Props as FooterProps } from './Footer'

type StoryProps = { translationsLocale: TranslationsLocale } & FooterProps

const storyMeta: Meta<StoryProps> = {
  title: 'Components/Checkout/Footer',
  component: Footer,
  args: {
    buttonText: 'Continue to payment',
    buttonOnClick: () => {
      console.log('👉 Click!')
    },
    translationsLocale: 'en_NO',
  },
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

export default storyMeta

const Template: Story<StoryProps> = (args) => (
  <MemoryRouter initialEntries={['/se-en/new-member/checkout/details']}>
    <TextKeyProvider locale={args.translationsLocale}>
      <Footer {...args} />
    </TextKeyProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
