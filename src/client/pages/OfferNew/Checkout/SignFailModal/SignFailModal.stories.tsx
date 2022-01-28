import React, { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Story } from '@storybook/react'
import { TextKeyProvider, TranslationsLocale } from 'utils/textKeys'
import { SignFailModal } from './SignFailModal'

type StoryProps = {
  translationsLocale: TranslationsLocale
}

export default {
  title: 'Checkout/SignFailModal',
  component: SignFailModal,
  args: {
    translationsLocale: 'sv_SE',
  },
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export const Default: Story<StoryProps> = ({ translationsLocale }) => {
  const [isShowingFailModal, setIsShowingFailModal] = useState(true)

  return (
    <MemoryRouter initialEntries={['/se/new-member/sign']}>
      <TextKeyProvider locale={translationsLocale}>
        <SignFailModal
          isVisible={isShowingFailModal}
          onClose={() => setIsShowingFailModal(false)}
        />
      </TextKeyProvider>
    </MemoryRouter>
  )
}
