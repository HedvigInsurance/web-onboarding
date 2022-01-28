import React, { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider, TranslationsLocale } from 'utils/textKeys'
import { SignFailModal } from './SignFailModal'

export default {
  title: 'Checkout/SignFailModal',
  component: SignFailModal,
  args: {
    translationsLocale: 'nb_NO',
  },
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export const Default = (translationsLocale: TranslationsLocale) => {
  const [isShowingFailModal, setIsShowingFailModal] = useState(true)

  return (
    <MemoryRouter initialEntries={['/no/new-member/sign']}>
      <TextKeyProvider locale={translationsLocale}>
        <SignFailModal
          isVisible={isShowingFailModal}
          onClose={() => setIsShowingFailModal(false)}
        />
      </TextKeyProvider>
    </MemoryRouter>
  )
}
