import React, { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Story, Meta } from '@storybook/react'
import {
  localeArgTypes,
  getTranslationsLocale,
} from 'utils/storybook/storyHelpers'
import { LocaleLabel } from 'l10n/locales'
import { TextKeyProvider } from 'utils/textKeys'
import { SignFailModal } from './SignFailModal'

type StoryProps = {
  localePath: LocaleLabel
  isManualReviewRequired: boolean
}

const storyMeta: Meta<StoryProps> = {
  title: 'Checkout/SignFailModal',
  component: SignFailModal,
  argTypes: localeArgTypes,
  args: {
    localePath: 'no-en',
    isManualReviewRequired: false,
  },
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export default storyMeta

export const Default: Story<StoryProps> = ({
  localePath,
  isManualReviewRequired,
}) => {
  const [isShowingFailModal, setIsShowingFailModal] = useState(true)
  const translationsLocale = getTranslationsLocale(localePath)

  return (
    <MemoryRouter initialEntries={['/se/new-member/sign']}>
      <TextKeyProvider locale={translationsLocale}>
        <SignFailModal
          isVisible={isShowingFailModal}
          onClose={() => setIsShowingFailModal(false)}
          isManualReviewRequired={isManualReviewRequired}
        />
      </TextKeyProvider>
    </MemoryRouter>
  )
}
