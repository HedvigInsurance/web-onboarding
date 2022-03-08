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
import { ContactInformationDocument } from 'data/graphql'
import {
  quoteCartIdMock,
  contactInfoResponseMockNO,
} from 'utils/testData/contactInfoMock'
import { localePathPattern } from 'l10n/localePathPattern'
import { ContactInformation } from './ContactInformation'

type StoryProps = {
  localePath: LocaleLabel
}

const Wrapper = styled.div`
  width: 100vw;
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

  return (
    <TextKeyProvider locale={translationsLocale}>
      <MemoryRouter
        initialEntries={[
          `/${localePath}/new-member/checkout/details/${quoteCartIdMock}`,
        ]}
      >
        <Route
          path={`${localePathPattern}/new-member/checkout/details/:id`}
          component={(routerProps: RouterProps) => (
            <Wrapper {...routerProps}>
              <ContactInformation />
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

NorwegianContactInfo.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: ContactInformationDocument,
          variables: {
            id: quoteCartIdMock,
          },
        },
        result: contactInfoResponseMockNO,
      },
    ],
  },
}
