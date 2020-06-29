import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { PreOnboardingScreen } from './PreOnboardingScreen'

export default {
  title: 'Forever/Intro/PreOnboardingScreen',
  component: PreOnboardingScreen,
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

export const Default = () => (
  <MemoryRouter initialEntries={['http://localhost/se/forever/intro']}>
    <MockTextKeyProvider
      textKeys={{
        FOREVER_INTRO_READY_QUESTION: 'Redo?',
        FOREVER_INTRO_READY_CTA: 'Ja, ge mig ett prisförslag',
      }}
    >
      <div style={{ height: '100vh', color: '#fff' }}>
        <PreOnboardingScreen />
      </div>
    </MockTextKeyProvider>
  </MemoryRouter>
)
