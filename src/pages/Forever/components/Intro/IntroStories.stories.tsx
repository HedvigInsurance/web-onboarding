import { colorsV3 } from '@hedviginsurance/brand'
import { action, withActions } from '@storybook/addon-actions'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IntroStories } from './IntroStories'

export default {
  title: 'Forever/Intro/Stories',
  component: IntroStories,
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
  decorators: [withActions()],
}

export const Default = () => (
  <BrowserRouter>
    <div style={{ height: '100vh', color: '#fff' }}>
      <IntroStories onFinished={action('On finished')} />
    </div>
  </BrowserRouter>
)
