import React from 'react'
import { Story, Meta } from '@storybook/react'

import { IconsOverview, Props as IconsContainerProps } from './IconsOverview'

const storyMeta: Meta<IconsContainerProps> = {
  title: 'Components/Icons/Overview',
  component: IconsOverview,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
  args: { background: 'medium' },
}

const Template: Story<IconsContainerProps> = ({ background }) => (
  <IconsOverview background={background} />
)

export const Default = Template.bind({})
export default storyMeta
