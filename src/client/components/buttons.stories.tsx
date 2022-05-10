import React from 'react'
import { Story, Meta } from '@storybook/react'
import { TextButton as TextButtonComponent, TextButtonProps } from './buttons'

const storyMeta: Meta<TextButtonProps> = {
  title: 'Components/Button/Text Button',
  component: TextButtonComponent,
  args: {
    size: 'sm',
  },
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export default storyMeta

const Template: Story<TextButtonProps> = (args) => {
  return (
    <>
      This is some text
      <TextButtonComponent {...args}>I'm a text button!</TextButtonComponent>
      and here is some more text
    </>
  )
}

export const Default = Template.bind({})

export const Inline = Template.bind({})
Inline.args = {
  inline: true,
}
