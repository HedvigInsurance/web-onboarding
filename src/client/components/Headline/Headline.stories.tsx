import React from 'react'
import { Story } from '@storybook/react'
import { Headline, Props as HeadlineProps } from './Headline'

export default {
  title: 'Components/Headline',
  component: Headline,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
  args: {
    type: 'xl',
    children: 'This is a headline',
  },
}

const Template: Story<HeadlineProps> = ({ type, children }) => (
  <>
    <Headline type={type}>{children}</Headline>
  </>
)

export const Default = Template.bind({})
