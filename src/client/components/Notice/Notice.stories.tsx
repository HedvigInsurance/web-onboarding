import styled from '@emotion/styled'
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

const Wrapper = styled.div({
  maxWidth: '28rem',
})

const Template: Story<NoticeProps> = (props) => (
  <Wrapper>
    <Space y={1}>
      <Notice.Root {...props}>A notice without a header</Notice.Root>
      <Notice.Root {...props}>
        <Notice.Header>A header</Notice.Header>A notice with a header
      </Notice.Root>
      <Notice.Root icon={<Shuffle size="1.25rem" />} {...props}>
        A notice with an icon
      </Notice.Root>
      <Notice.Root icon={<Shuffle size="1.25rem" />} {...props}>
        <Notice.Header>A header</Notice.Header>A notice with a header and icon
      </Notice.Root>
      <Notice.Root icon={<Shuffle size="1.25rem" />} {...props}>
        <Notice.Header>Much content</Notice.Header>Simply click the link you’ll
        have in your inbox shortly and follow the instructions. Questions? Chat
        with us in the app, and we’ll be happy to help.
      </Notice.Root>
    </Space>
  </Wrapper>
)

export const Default = Template.bind({})
Default.args = {
  size: 'sm',
}
