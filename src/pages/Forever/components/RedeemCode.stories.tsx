import { colorsV3 } from '@hedviginsurance/brand'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { RedeemCode } from './RedeemCode'

export default {
  title: 'Forever/RedeemCode',
  component: RedeemCode,
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

const text = {
  FOREVER_LANDINGPAGE_INPUT_TEXT: 'Fyll i koden',
  FOREVER_LANDINGPAGE_BTN_LABEL: 'Nästa',
  FOREVER_LANDINGPAGE_INFO_TEXT:
    'This is an exclusive site only intended for invited individuals. If you currently are not in possession of a code please do continue to our <a href="https://www.hedvig.com/se-en/new-member">regular website.</a>',
  FOREVER_CODE_ERROR: 'Felaktig kod. Fortsätt utan kod.',
}

export const Default = () => (
  <MemoryRouter initialEntries={['/se/forever/abc123']}>
    <MockTextKeyProvider textKeys={text}>
      <div
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <RedeemCode onSubmit={action('Submit')} />
      </div>
    </MockTextKeyProvider>
  </MemoryRouter>
)
