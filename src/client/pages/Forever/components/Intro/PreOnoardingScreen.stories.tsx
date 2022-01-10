import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { PreOnboardingScreen } from './PreOnboardingScreen'

export default {
  title: 'Forever/Intro/PreOnboardingScreen',
  component: PreOnboardingScreen,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
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
