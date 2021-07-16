import { Story } from '@storybook/react'
import React from 'react'
import { Tooltip, TooltipProps } from './Tooltip'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  body: 'For more information, see the full terms and conditions above',
}

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  body: 'For more information, see the full terms and conditions above',
}
