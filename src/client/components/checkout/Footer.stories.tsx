import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter, Route, RouterProps } from 'react-router-dom'
import { LocaleLabel } from 'l10n/locales'
import {
  mockedQuoteCartId,
  mockedPriceQueryResponse,
} from 'utils/testData/priceQueryMock'
import { TextKeyProvider, TranslationsLocale } from 'utils/textKeys'
import { PriceDocument, Locale } from 'data/graphql'
import { localePathPattern } from 'l10n/localePathPattern'
import { Footer, Props as FooterProps } from './Footer'

type StoryProps = {
  localePath: LocaleLabel
} & FooterProps

const storyMeta: Meta<StoryProps> = {
  title: 'Components/Checkout/Footer/Footer',
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

export const Default: Story<StoryProps> = ({ localePath, ...rest }) => {
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
    <TextKeyProvider locale={getTranslationsLocale(localePath)}>
      <MemoryRouter
        initialEntries={[
          `/${localePath}/new-member/checkout/details/${mockedQuoteCartId}`,
        ]}
      >
        <Route
          path={`${localePathPattern}/new-member/checkout/details/:id`}
          component={(routerProps: RouterProps) => (
            <Footer {...routerProps} {...rest} />
          )}
        />
      </MemoryRouter>
    </TextKeyProvider>
  )
}

Default.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.EnSe,
          },
        },
        result: mockedPriceQueryResponse,
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.SvSe,
          },
        },
        result: mockedPriceQueryResponse,
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.EnNo,
          },
        },
        result: mockedPriceQueryResponse,
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.NbNo,
          },
        },
        result: mockedPriceQueryResponse,
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.EnDk,
          },
        },
        result: mockedPriceQueryResponse,
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.DaDk,
          },
        },
        result: mockedPriceQueryResponse,
      },
    ],
  },
}
