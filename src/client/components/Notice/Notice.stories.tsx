import { Story } from '@storybook/react'
import React from 'react'
import { Shuffle } from '../icons/Shuffle'
import { Space } from '../Space'
import * as Notice from './Notice'
import { NoticeProps } from './Notice'

export default {
  title: 'Components/Notice',
  component: Notice,
  parameters: {
    paddings: [{ name: 'Large', value: '64px', default: true }],
  },
}

const Template: Story<NoticeProps> = () => (
  <Space y={1}>
    <Notice.Root>A notice without a header</Notice.Root>
    <Notice.Root>
      <Notice.Header>A header</Notice.Header>A notice with a header
    </Notice.Root>
    <Notice.Root icon={<Shuffle size="1.25rem" />}>
      A notice with an icon
    </Notice.Root>
    <Notice.Root icon={<Shuffle size="1.25rem" />}>
      <Notice.Header>A header</Notice.Header>A notice with a header and icon
    </Notice.Root>
  </Space>
)

export const Default = Template.bind({})
Default.args = {}
