import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  noCombo as mockedOfferDataNoCombo,
  seApartementBrf as mockedOfferDataSeApartment,
  dkHomeContentAccidentTravel as mockedOfferDataDkHomeAccidentTravel,
} from 'utils/testData/offerDataMock'
import { getAddress, InsuranceSummaryDetails } from './InsuranceSummaryDetails'

describe('InsuranceSummaryDetails', () => {
  it('renders component', async () => {
    const danishHomeContentsQuote =
      mockedOfferDataDkHomeAccidentTravel.quotes[0]

    render(
      <StaticRouter location="/dk/new-member/sign">
        <InsuranceSummaryDetails
          mainQuote={danishHomeContentsQuote}
          personalDetails={mockedOfferDataDkHomeAccidentTravel.person}
        />
      </StaticRouter>,
    )

    const { findByText } = screen
    expect(await findByText('Judith Madsen')).toBeVisible()
    expect(await findByText('Navn')).toBeVisible()
    screen.debug()
  })
})

describe('getAddress function', () => {
  describe('with Swedish quote', () => {
    it('returns only street name and street number when quote is Swedish', () => {
      const swedishApartmentQuoteDetails =
        mockedOfferDataSeApartment.quotes[0].quoteDetails

      const address = getAddress(swedishApartmentQuoteDetails)
      expect(address).toBe('Testgatan 23')
    })
  })

  describe('with Norwegian quotes', () => {
    it('returns only street name and street number when quote is Norwegian Home Contents quote', () => {
      const norwegianHomeContentsQuote = mockedOfferDataNoCombo.quotes[1]

      const norwegianHomeContentsQuoteDetails =
        norwegianHomeContentsQuote.quoteDetails

      const address = getAddress(norwegianHomeContentsQuoteDetails)
      expect(address).toBe('Testveien 23')
    })

    it('throws Error when quote is Norwegian Travel quote since it lacks address', () => {
      const norwegianTravelQuote = mockedOfferDataNoCombo.quotes[0]

      const norwegianTravelQuoteDetails = norwegianTravelQuote.quoteDetails

      expect(() => {
        getAddress(norwegianTravelQuoteDetails)
      }).toThrow()
    })
  })

  describe('with Danish quotes', () => {
    const danishHomeContentsQuote =
      mockedOfferDataDkHomeAccidentTravel.quotes[0]

    it('returns floor and apartment in addition to street name and street number when those properties exist', () => {
      const danishHomeContentsQuoteDetails =
        danishHomeContentsQuote.quoteDetails

      const address = getAddress(danishHomeContentsQuoteDetails)
      expect(address).toBe('Theodore Roosevelts Vej 1, 2. tv')
    })

    it('returns only street name and street number when no other properties exist', () => {
      const danishHomeContentsQuoteDetailsWithoutFloorAndApartment = {
        ...danishHomeContentsQuote.quoteDetails,
        floor: null,
        apartment: null,
      }

      const address = getAddress(
        danishHomeContentsQuoteDetailsWithoutFloorAndApartment,
      )
      expect(address).toBe('Theodore Roosevelts Vej 1')
    })

    it('returns street name, street number and floor when apartment property does not exist', () => {
      const danishHomeContentsQuoteDetailsWithoutApartment = {
        ...danishHomeContentsQuote.quoteDetails,
        apartment: null,
      }

      const address = getAddress(danishHomeContentsQuoteDetailsWithoutApartment)
      expect(address).toBe('Theodore Roosevelts Vej 1, 2.')
    })
  })
})
