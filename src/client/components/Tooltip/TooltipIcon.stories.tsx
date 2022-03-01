import React from 'react'
import { Story } from '@storybook/react'

import { TooltipIcon, TooltipIconProps } from './TooltipIcon'

export default {
  title: 'Components/TooltipIcon',
  component: TooltipIcon,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Template: Story<TooltipIconProps> = (args) => <TooltipIcon {...args} />

export const Large = Template.bind({})
Large.args = {
  body: 'For more information, see the full terms and conditions above',
  placement: 'auto',
}

export const Small = Template.bind({})
Small.args = {
  body: 'For more information, see the full terms and conditions above',
  placement: 'auto',
}
