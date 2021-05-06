import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Card } from './Card'

export default {
  title: 'Landing/Card',
  component: Card,
}

export const Enabled = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <Card to="/se/new-member/offer-1" badge="Best value" key="offer-1">
      <h1>Home Contents & Accident</h1>
    </Card>
  </MemoryRouter>
)

export const Disabled = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <Card to="" badge="Coming soon" disabled={true} key="offer-2">
      <h1>Home Contents</h1>
    </Card>
  </MemoryRouter>
)

export const NoBadge = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <Card to="/se/new-member/offer-3" key="offer-3">
      <h1>Home Contents, Accident & Travel</h1>
    </Card>
  </MemoryRouter>
)
