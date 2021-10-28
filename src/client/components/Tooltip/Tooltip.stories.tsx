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
  body: 'For more information, see the full terms and conditions above',
}

export const Small = Template.bind({})
Small.args = {
  body: 'For more information, see the full terms and conditions above',
}
