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
  data: any
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

const dataMock = {
  firstName: 'Sven',
  lastName: 'Svensson',
  ssn: '1996030904251',
  email: 'sven@svensson.no',
}

export default storyMeta
const Template: Story<StoryProps> = ({ localePath, data }) => {
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
              <ContactInformation formikProps={data} />
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
  data: dataMock,
}
