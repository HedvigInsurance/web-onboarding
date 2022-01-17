import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Icons, Props as IconsContainerProps } from './Icons'

const storyMeta: Meta<IconsContainerProps> = {
  title: 'Components/Icons',
  component: Icons,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
  args: { background: 'medium' },
}

const Template: Story<IconsContainerProps> = ({ background }) => (
  <Icons background={background} />
)

export const Default = Template.bind({})
export default storyMeta
