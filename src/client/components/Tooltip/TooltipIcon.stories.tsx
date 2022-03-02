import React from 'react'
import { Story, Meta } from '@storybook/react'

import { TooltipIcon, TooltipIconProps } from './TooltipIcon'

const storyMeta: Meta<TooltipIconProps> = {
  title: 'Components/TooltipIcon',
  component: TooltipIcon,
  argTypes: {
    placement: {
      name: 'placement',
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ] as Array<TooltipIconProps['placement']>,
      control: { type: 'select' },
    },
  },
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

export default storyMeta

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
