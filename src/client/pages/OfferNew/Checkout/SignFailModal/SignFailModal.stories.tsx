import React, { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { SignFailModal } from './SignFailModal'

export default {
  title: 'Checkout/SignFailModal',
  component: SignFailModal,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

const errorMessageMock = {
  headerText: 'Your purchase can’t be completed',
  contentText:
    "Unfortunately, we can't offer you to purchase an insurance online. Please contact betaling@hedvig.com and we'll assist you.",
}

export const Default = () => {
  const [isShowingFailModal, setIsShowingFailModal] = useState(true)

  return (
    <MemoryRouter initialEntries={['/no-en/new-member/sign']}>
      <TextKeyProvider locale="en_NO">
        <SignFailModal
          isVisible={isShowingFailModal}
          onClose={() => setIsShowingFailModal(false)}
          headerText={errorMessageMock.headerText}
          contentText={errorMessageMock.contentText}
        />
      </TextKeyProvider>
    </MemoryRouter>
  )
}
