import React from 'react'
import { renderComponent, screen, waitFor } from 'test/utils'

import { FaqSection } from './FaqSection'

describe('FaqSection', () => {
  it('should fetch a list of faqs and display them', async () => {
    renderComponent(<FaqSection />)

    await waitFor(() => {
      expect(screen.getByText(/faq:0 Headline/i)).toBeVisible()
      expect(screen.getByText(/faq:0 Body/i)).toBeInTheDocument()
    })
  })
})
