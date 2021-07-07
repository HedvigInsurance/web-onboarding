import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { getHouseholdSize, quoteDetailsHasAddress } from '../utils'
import { getAddress } from '../Checkout/InsuranceSummaryDetails'

type Props = {
  offerData: OfferData
}

const Wrapper = styled.div`
  padding: 2.5rem 0 1rem;
  color: ${colorsV3.white};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-top: 0;
  }
`
const Headline = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-size: 1rem;
`
const OfferInfoWrapper = styled.div`
  padding: 1rem 0;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-top: 0;
  }
`
const NameAndCoInsured = styled.div`
  font-size: 2rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
  }
`
const Address = styled.div`
  font-size: 1.375rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 2.5rem;
  }
`

export const HeroOfferDetails: React.FC<Props> = ({ offerData }) => {
  const [numberCoInsured, setNumberCoInsured] = useState<number | null>(null)
  const [address, setAddress] = useState<string | null>(null)

  const { person, quotes } = offerData

  useEffect(() => {
    const householdSize = getHouseholdSize(quotes[0].quoteDetails)
    setNumberCoInsured(householdSize - 1)

    const quoteWithAddress = quotes.find((quote) => {
      return quoteDetailsHasAddress(quote.quoteDetails)
    })
    if (quoteWithAddress) {
      const address = getAddress(quoteWithAddress.quoteDetails)
      setAddress(address)
    }
  }, [quotes])

  const textKeys = useTextKeys()
  return (
    <Wrapper>
      <Headline>{textKeys.HERO_OFFER_DETAILS_HEADER()}</Headline>
      <OfferInfoWrapper>
        <NameAndCoInsured>
          {person.firstName}
          {Boolean(numberCoInsured) && ` +${numberCoInsured}`}
        </NameAndCoInsured>
        {address && <Address>{address}</Address>}
      </OfferInfoWrapper>
    </Wrapper>
  )
}
