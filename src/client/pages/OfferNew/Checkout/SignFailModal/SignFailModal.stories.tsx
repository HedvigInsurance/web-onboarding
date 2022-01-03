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

export const Default = () => {
  const [isShowingFailModal, setIsShowingFailModal] = useState(true)

  return (
    <MemoryRouter initialEntries={['/no-en/new-member/sign']}>
      <TextKeyProvider locale="en_NO">
        <SignFailModal
          isVisible={isShowingFailModal}
          onClose={() => setIsShowingFailModal(false)}
        />
      </TextKeyProvider>
    </MemoryRouter>
  )
}
