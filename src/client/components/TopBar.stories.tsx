import React from 'react'
import { MemoryRouter } from 'react-router'
import { Story, Meta } from '@storybook/react'
import { TopBar, Props as TopBarProps } from './TopBar'

const storyMeta: Meta<TopBarProps> = {
  title: 'Components/TopBar',
  component: TopBar,
  args: {
    isTransparent: false,
    textColorVariant: 'light',
    centered: false,
  },
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export default storyMeta

const Template: Story<TopBarProps> = (args) => {
  return (
    <MemoryRouter initialEntries={['/se/new-member']}>
      <TopBar {...args} />
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
