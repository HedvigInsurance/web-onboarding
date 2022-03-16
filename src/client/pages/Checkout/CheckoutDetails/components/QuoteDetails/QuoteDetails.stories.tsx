import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter, Route, RouterProps } from 'react-router-dom'
import styled from '@emotion/styled'
import { TextKeyProvider } from 'utils/textKeys'
import { QuoteDetailsDataDocument } from 'data/graphql'
import {
  getTranslationsLocale,
  localeArgTypes,
} from 'utils/storybook/storyHelpers'
import {
  mockedQuoteCartId,
  mockedQuoteDetailsDataQueryResponseSeHouse,
  mockedQuoteDetailsDataQueryResponseNoCombo,
  mockedQuoteDetailsDataQueryResponseDKHomeOwnerStudent,
} from 'utils/testData/quoteDetailsDataMock'
import { LocaleLabel } from 'l10n/locales'
import { localePathPattern } from 'l10n/localePathPattern'
import { PageSection } from '../PageSection'
import { QuoteDetails } from './QuoteDetails'

type StoryProps = {
  localePath: LocaleLabel
}

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`

const storyMeta: Meta<StoryProps> = {
  title: 'Checkout Details/QuoteDetails',
  component: QuoteDetails,
  argTypes: localeArgTypes,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

export default storyMeta

const Template: Story<StoryProps> = ({ localePath }) => {
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
            <Wrapper {...routerProps}>
              <PageSection>
                <QuoteDetails
                  groups={mockedQuoteDetailsDataQueryResponseSeHouse}
                />
              </PageSection>
            </Wrapper>
          )}
        />
      </MemoryRouter>
    </TextKeyProvider>
  )
}

export const SwedishHouseQuote = Template.bind({})

SwedishHouseQuote.args = { localePath: 'se-en' }

SwedishHouseQuote.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: QuoteDetailsDataDocument,
          variables: {
            id: mockedQuoteCartId,
          },
        },
        result: mockedQuoteDetailsDataQueryResponseSeHouse,
      },
    ],
  },
}

export const NorwegianComboQuote = Template.bind({})

NorwegianComboQuote.args = {
  localePath: 'no-en',
}

NorwegianComboQuote.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: QuoteDetailsDataDocument,
          variables: {
            id: mockedQuoteCartId,
          },
        },
        result: mockedQuoteDetailsDataQueryResponseNoCombo,
      },
    ],
  },
}

export const DanishHomeContentsQuoteStudent = Template.bind({})

DanishHomeContentsQuoteStudent.args = { localePath: 'dk-en' }

DanishHomeContentsQuoteStudent.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: QuoteDetailsDataDocument,
          variables: {
            id: mockedQuoteCartId,
          },
        },
        result: mockedQuoteDetailsDataQueryResponseDKHomeOwnerStudent,
      },
    ],
  },
}
