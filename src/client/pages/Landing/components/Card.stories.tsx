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
  wrapperWidth: WrapperProps['width']
}

type WrapperProps = {
  width: string
}

const Wrapper = styled.div<WrapperProps>`
  width: ${({ width }) => width};
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
    wrapperWidth: '25rem',
  },
}

export default storyMeta

export const Default: Story<StoryProps> = ({
  disabled,
  headline,
  paragraph,
  badge,
  hasBadge,
  wrapperWidth,
}) => {
  return (
    <MemoryRouter initialEntries={['/dk-en/new-member']}>
      <TextKeyProvider locale="en_DK">
        <Wrapper width={wrapperWidth}>
          <Card
            to={'/fake-route'}
            badge={hasBadge ? badge : ''}
            disabled={disabled}
          >
            <CardHeadline disabled={disabled}>{headline}</CardHeadline>
            <CardParagraph>{paragraph}</CardParagraph>
          </Card>
        </Wrapper>
      </TextKeyProvider>
    </MemoryRouter>
  )
}
