import React from 'react'
import { Meta, Story } from '@storybook/react'
import { MemoryRouter, Route, RouterProps } from 'react-router-dom'
import styled from '@emotion/styled'
import { TextKeyProvider } from 'utils/textKeys'
import { LocaleLabel } from 'l10n/locales'

import {
  localeArgTypes,
  getTranslationsLocale,
} from 'utils/storybook/storyHelpers'
import { localePathPattern } from 'l10n/localePathPattern'
import { mockedQuoteCartId } from 'utils/testData/quoteDetailsDataMock'
import { ContactInformation } from './ContactInformation'

type StoryProps = {
  localePath: LocaleLabel
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
const storyMeta: Meta<StoryProps> = {
  title: 'Checkout Details/Contact Information',
  component: ContactInformation,
  argTypes: localeArgTypes,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

export default storyMeta

export const Template: Story<StoryProps> = ({ localePath }) => {
  const translationsLocale = getTranslationsLocale(localePath)

  const dataMock = {
    firstName: 'Sven',
    lastName: 'Svensson',
    ssn: '1996030904251',
    email: 'sven@svensson.no',
  }

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
              <ContactInformation data={dataMock} />
            </Wrapper>
          )}
        />
      </MemoryRouter>
    </TextKeyProvider>
  )
}

export const NorwegianContactInfo = Template.bind({})

NorwegianContactInfo.args = {
  localePath: 'no-en',
}
