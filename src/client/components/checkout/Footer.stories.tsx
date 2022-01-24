import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { LocaleLabel } from 'l10n/locales'
import { TextKeyProvider, TranslationsLocale } from 'utils/textKeys'
import { Footer, Props as FooterProps } from './Footer'

type StoryProps = {
  localePath: LocaleLabel
} & FooterProps

const storyMeta: Meta<StoryProps> = {
  title: 'Components/Checkout/Footer',
  component: Footer,
  args: {
    buttonText: 'Continue to payment',
    buttonOnClick: () => {
      console.log('👉 Click!')
    },
    localePath: 'no-en',
  },
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

export default storyMeta

const Template: Story<StoryProps> = ({ localePath, ...rest }) => {
  const getTranslationsLocale = (
    localePath: LocaleLabel,
  ): TranslationsLocale => {
    switch (localePath) {
      case 'se':
        return 'sv_SE'
      case 'se-en':
        return 'en_SE'
      case 'no':
        return 'nb_NO'
      case 'no-en':
        return 'en_NO'
      case 'dk':
        return 'da_DK'
      case 'dk-en':
        return 'en_DK'
      default:
        return 'en'
    }
  }

  return (
    <MemoryRouter
      initialEntries={[`${localePath}/new-member/checkout/details`]}
    >
      <TextKeyProvider locale={getTranslationsLocale(localePath)}>
        <Footer {...rest} />
      </TextKeyProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
