import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider } from 'utils/hooks/useTextKeys'
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
    <TextKeyProvider locale="en">
      <div style={{ height: '100vh', color: '#fff' }}>
        <PreOnboardingScreen />
      </div>
    </TextKeyProvider>
  </MemoryRouter>
)
