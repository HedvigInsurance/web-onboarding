import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Card, CardHeadline, CardParagraph } from './Card'

export default {
  title: 'Landing/Card',
  component: Card,
  parameters: { layout: '' },
}

export const Enabled = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <Card to="/se/new-member/offer-1" badge="Best value" key="offer-1">
      <CardHeadline>Home Contents & Accident</CardHeadline>
      <CardParagraph>Get both of them</CardParagraph>
    </Card>
  </MemoryRouter>
)

export const Disabled = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <Card to="" badge="Coming soon" disabled={true} key="offer-2">
      <CardHeadline>Home Contents</CardHeadline>
      <CardParagraph>Available soon</CardParagraph>
    </Card>
  </MemoryRouter>
)

export const NoBadge = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <Card to="/se/new-member/offer-3" key="offer-3">
      <CardHeadline>Home Contents, Accident & Travel</CardHeadline>
      <CardParagraph>Get your price</CardParagraph>
    </Card>
  </MemoryRouter>
)
