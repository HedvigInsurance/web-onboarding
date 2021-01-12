import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Address } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { getHouseholdSize } from '../utils'

type Props = {
  offerData: OfferData
}

type QuoteWithStreet = {
  quoteDetails: { street: Address['street'] }
}

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  color: ${colorsV3.white};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: auto;
    padding: 0;
  }
`

const Heading = styled.h1`
  text-transform: uppercase;
  font-size: 0.75rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
  }
`

const OfferInfo = styled.div`
  font-size: 2rem;
  word-break: break-all;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
  }
`

export const HeroOfferDetails: React.FC<Props> = ({ offerData }) => {
  const [numberCoInsured, setNumberCoInsured] = useState<number | null>(null)
  const [street, setStreet] = useState<Address['street'] | null>(null)

  const { person, quotes } = offerData

  useEffect(() => {
    const householdSize = getHouseholdSize(quotes[0].quoteDetails)
    setNumberCoInsured(householdSize - 1)

    const quoteWithStreet = quotes.find((quote) => {
      return 'street' in quote.quoteDetails
    })
    if (quoteWithStreet) {
      setStreet((quoteWithStreet as QuoteWithStreet).quoteDetails.street)
    }
  }, [quotes])

  const textKeys = useTextKeys()
  return (
    <Container>
      <Heading>{textKeys.HERO_OFFER_DETAILS_HEADER()}</Heading>
      <OfferInfo>
        {person.firstName}
        {!!numberCoInsured && ` +${numberCoInsured}`}
      </OfferInfo>
      {street && <OfferInfo>{street}</OfferInfo>}
    </Container>
  )
}
