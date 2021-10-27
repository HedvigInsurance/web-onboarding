import React from 'react'
import { MemoryRouter } from 'react-router'
import TermsCollection from './TermsCollection'

export default {
  title: 'Offer/TermsCollection',
  component: TermsCollection,
  parameters: {
    backgrounds: { default: 'gray100' },
    layout: 'padded',
  },
}

const ITEMS = [
  {
    key: '1',
    label: 'Villkor och förköpsinformation',
    link: '#',
  },
  {
    key: '2',
    label: 'Produktfaktablad',
    link: '#',
  },
  {
    key: '3',
    label: 'Personuppgifter',
    link: '#',
  },
  {
    key: '4',
    label: 'Leverans',
    link: '#',
  },
  {
    key: '5',
    label: 'Betalning',
    link: '#',
  },
]

export const Default = () => {
  return (
    <MemoryRouter initialEntries={['/se/new-member/offer']}>
      <TermsCollection>
        {ITEMS.map((item) => (
          <TermsCollection.Link key={item.key} href={item.link}>
            {item.label}
          </TermsCollection.Link>
        ))}
      </TermsCollection>
    </MemoryRouter>
  )
}
