import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Headline, Props as HeadlineProps } from './Headline'

const storyMeta: Meta<HeadlineProps> = {
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
    children: 'This is a headline',
  },
}

export default storyMeta

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

export const LightBackground = Template.bind({})
LightBackground.parameters = { backgrounds: { default: 'gray100' } }
LightBackground.args = { colorVariant: 'dark' }

export const DarkBackground = Template.bind({})
DarkBackground.parameters = { backgrounds: { default: 'gray900' } }
DarkBackground.args = { colorVariant: 'light' }
