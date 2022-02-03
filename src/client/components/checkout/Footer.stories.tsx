import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter, Route, RouterProps } from 'react-router-dom'
import { LocaleLabel } from 'l10n/locales'
import {
  mockedQuoteCartId,
  mockedPriceQueryResponse,
} from 'utils/testData/priceQueryMock'
import { TextKeyProvider } from 'utils/textKeys'
import { PriceDocument, Locale } from 'data/graphql'
import { localePathPattern } from 'l10n/localePathPattern'
import {
  getTranslationsLocale,
  localeArgTypes,
} from 'utils/storybook/storyHelpers'
import { Footer, Props as FooterProps } from './Footer'

type StoryProps = {
  localePath: LocaleLabel
} & FooterProps

const storyMeta: Meta<StoryProps> = {
  title: 'Checkout/Footer',
  component: Footer,
  argTypes: localeArgTypes,
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
  const translationsLocale = getTranslationsLocale(localePath)

  return (
    <TextKeyProvider locale={translationsLocale}>
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
