import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Meta, Story } from '@storybook/react'
import styled from '@emotion/styled'
import { TextKeyProvider } from 'utils/textKeys'
import { Card, CardHeadline, CardParagraph } from './Card'

type StoryProps = {
  disabled: boolean
  headline: string
  paragraph: string
  badge: string
  hasBadge: boolean
  to: string
}

const Wrapper = styled.div`
  width: 25rem;
`

const storyMeta: Meta<StoryProps> = {
  title: 'Landing/Card',
  component: Card,
  parameters: { layout: 'centered' },
  args: {
    disabled: false,
    headline: 'Home, Accident & Travel',
    paragraph: 'Get all three of them',
    badge: '3-1',
    hasBadge: true,
    to: '/fake-route',
  },
}

export default storyMeta

export const Default: Story<StoryProps> = ({
  disabled,
  headline,
  paragraph,
  badge,
  hasBadge,
  to,
}) => {
  return (
    <MemoryRouter initialEntries={['/dk-en/new-member']}>
      <TextKeyProvider locale="en_DK">
        <Wrapper>
          <Card to={to} badge={hasBadge ? badge : ''} disabled={disabled}>
            <CardHeadline disabled={disabled}>{headline}</CardHeadline>
            <CardParagraph>{paragraph}</CardParagraph>
          </Card>
        </Wrapper>
      </TextKeyProvider>
    </MemoryRouter>
  )
}
