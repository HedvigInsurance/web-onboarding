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
    variant: 'xl',
    headingLevel: 'h1',
    colorVariant: 'dark',
    children: 'This is a headline',
  },
}

const Template: Story<HeadlineProps> = ({
  variant,
  headingLevel,
  colorVariant,
  children,
}) => (
  <Headline
    variant={variant}
    headingLevel={headingLevel}
    colorVariant={colorVariant}
  >
    {children}
  </Headline>
)

export const Default = Template.bind({})
