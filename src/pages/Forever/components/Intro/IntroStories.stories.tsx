import { colorsV3 } from '@hedviginsurance/brand'
import { action, withActions } from '@storybook/addon-actions'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
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
    <MockTextKeyProvider
      textKeys={{
        FOREVER_INTRO_PAGE_1: '{REFERRER}s vänner är våra vänner.',
        FOREVER_INTRO_PAGE_2: 'Det här är en inbjudan till Hedvig Forever.',
        FOREVER_INTRO_PAGE_3:
          'För varje vän du bjuder in, sänks din månadskostnad.',
        FOREVER_INTRO_PAGE_4:
          'Tills du når noll och behåller gratis hemförsäkring livet ut.',
        SKIP: 'Hoppa över',
      }}
    >
      <div style={{ height: '100vh', color: '#fff' }}>
        <IntroStories onFinished={action('On finished')} />
      </div>
    </MockTextKeyProvider>
  </BrowserRouter>
)
