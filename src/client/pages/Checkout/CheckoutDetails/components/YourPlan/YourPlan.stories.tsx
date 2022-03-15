import React from 'react'
import { Story } from '@storybook/react'
import { MemoryRouter, Route } from 'react-router-dom'
import styled from '@emotion/styled'
import { LocaleLabel } from 'l10n/locales'
import { mockedQuoteCartId } from 'utils/testData/priceQueryMock'
import { TextKeyProvider } from 'utils/textKeys'
import { localePathPattern } from 'l10n/localePathPattern'
import {
  getTranslationsLocale,
  localeArgTypes,
} from 'utils/storybook/storyHelpers'
import { PriceData } from '../../../shared/types'
import { YourPlan } from './YourPlan'

type StoryProps = {
  localePath: LocaleLabel
  data: PriceData
}

const storyMeta = {
  title: 'Checkout Details/YourPlan',
  component: YourPlan,
  argTypes: localeArgTypes,
  args: {
    localePath: 'no-en',
    data: {
      prices: [{ displayName: 'Home Insurance', value: '300' }],
      totalBundleCost: '300',
      currency: 'NOK',
    },
  },
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Wrapper = styled.div`
  width: 532px;
`

export default storyMeta

export const Default: Story<StoryProps> = ({ localePath, data }) => {
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
              <YourPlan {...data} />
            </Wrapper>
          )}
        />
      </MemoryRouter>
    </TextKeyProvider>
  )
}
