import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter, Route } from 'react-router-dom'
import styled from '@emotion/styled'
import { LocaleLabel } from 'l10n/locales'
import {
  mockedQuoteCartId,
  getMockedPriceQueryResponse,
} from 'utils/testData/priceQueryMock'
import { TextKeyProvider } from 'utils/textKeys'
import { PriceDocument, Locale } from 'data/graphql'
import { localePathPattern } from 'l10n/localePathPattern'
import {
  getTranslationsLocale,
  localeArgTypes,
} from 'utils/storybook/storyHelpers'
import { YourPlan } from './YourPlan'

type StoryProps = {
  localePath: LocaleLabel
}

const storyMeta: Meta<StoryProps> = {
  title: 'Checkout/YourPlan',
  component: YourPlan,
  argTypes: localeArgTypes,
  args: {
    localePath: 'no-en',
  },
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Wrapper = styled.div`
  width: 650px;
`

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
          component={() => (
            <Wrapper>
              <YourPlan {...rest} />
            </Wrapper>
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
        result: getMockedPriceQueryResponse(Locale.EnSe),
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.SvSe,
          },
        },
        result: getMockedPriceQueryResponse(Locale.SvSe),
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.EnNo,
          },
        },
        result: getMockedPriceQueryResponse(Locale.EnNo),
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.NbNo,
          },
        },
        result: getMockedPriceQueryResponse(Locale.NbNo),
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.EnDk,
          },
        },
        result: getMockedPriceQueryResponse(Locale.EnDk),
      },
      {
        request: {
          query: PriceDocument,
          variables: {
            id: mockedQuoteCartId,
            locale: Locale.DaDk,
          },
        },
        result: getMockedPriceQueryResponse(Locale.DaDk),
      },
    ],
  },
}
