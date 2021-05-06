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
      <h1>Home contents & Accident</h1>
    </Card>
  </MemoryRouter>
)

export const Disabled = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <Card to="" badge="Coming soon" disabled={true} key="offer-2">
      <h1>Home contents</h1>
    </Card>
  </MemoryRouter>
)
