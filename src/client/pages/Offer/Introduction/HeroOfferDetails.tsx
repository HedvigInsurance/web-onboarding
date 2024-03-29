import React, { useState, useMemo } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useLocation } from 'react-router'
import { OfferData } from 'pages/Offer/types'
import { getCarMakeAndOrModel, parseAddress } from 'pages/Offer/utils'
import { useTextKeys } from 'utils/textKeys'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { Button } from 'components/buttons'
import { BundledQuote } from 'data/graphql'
import { DetailsModal } from 'components/DetailsModal'

const Wrapper = styled.div`
  padding: 3.5rem 0 0;
  color: ${colorsV3.gray900};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-top: 0;
    color: ${colorsV3.gray100};
  }
`

const Headline = styled.h1`
  margin-bottom: 0;
  text-transform: uppercase;
  font-size: 0.875rem;
  line-height: 1.57;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
    line-height: 1.5;
  }
`

const OfferInfoWrapper = styled.div`
  padding-bottom: 1rem;
`

const NameAndCoInsured = styled.div`
  font-size: 1.5rem;
  line-height: 1.33;
  display: inline-block;
  margin-right: 0.5rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
    line-height: 1.17;
  }

  &:after {
    content: ',';
    display: inline;

    ${MEDIUM_SCREEN_MEDIA_QUERY} {
      display: none;
    }
  }
`

const QuoteAddress = styled.div`
  font-size: 1.5rem;
  line-height: 1.3;
  display: inline-block;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
    line-height: 1.17;
    display: block;
  }
`

const CarInfo = styled.div`
  font-size: 1.5rem;
  line-height: 1.3;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
    line-height: 1.17;
  }
`

const EditDetailsButton = styled(Button)`
  font-size: 0.875rem;
  border: 1px solid ${colorsV3.gray900};
  color: ${colorsV3.gray900};
  padding: 0.375rem 0.75rem;
  border-radius: 6px;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
    border: 1px solid ${colorsV3.gray100};
    color: ${colorsV3.gray100};
    padding: 0.75rem 2rem;
    border-radius: 8px;
  }

  &:hover {
    color: ${colorsV3.gray100};
    background-color: ${colorsV3.gray900};
    transform: none;
    transition-timing-function: ease;

    ${LARGE_SCREEN_MEDIA_QUERY} {
      color: ${colorsV3.gray900};
      background-color: ${colorsV3.gray100};
    }
  }
`

function useQueryParams() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

type Props = {
  quoteCartId: string
  offerData: OfferData
  allQuotes: BundledQuote[]
}

export const HeroOfferDetails = ({
  quoteCartId,
  offerData,
  allQuotes,
}: Props) => {
  const queryParams = useQueryParams()
  const textKeys = useTextKeys()

  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(
    () => queryParams.get('showEdit') === 'true',
  )

  const { person } = offerData
  const numberCoInsured = (person.householdSize ?? 1) - 1

  const address = person.address ? parseAddress(person.address) : ''
  const carInfo = getCarMakeAndOrModel(allQuotes)

  return (
    <Wrapper>
      <Headline>{textKeys.HERO_OFFER_DETAILS_HEADER()}</Headline>
      <OfferInfoWrapper>
        <NameAndCoInsured>
          {person.firstName || textKeys.HERO_FIRSTNAME_PLACEHOLDER()}
          {numberCoInsured > 0 && ` +${numberCoInsured}`}
        </NameAndCoInsured>

        {address && <QuoteAddress>{address}</QuoteAddress>}
        {carInfo && <CarInfo>{carInfo}</CarInfo>}
      </OfferInfoWrapper>
      <EditDetailsButton
        background="none"
        foreground={colorsV3.gray100}
        onClick={() => setDetailsModalIsOpen(true)}
      >
        {textKeys.SIDEBAR_SHOW_DETAILS_BUTTON()}
      </EditDetailsButton>
      <DetailsModal
        quoteCartId={quoteCartId}
        isVisible={detailsModalIsOpen}
        allQuotes={allQuotes}
        onClose={() => setDetailsModalIsOpen(false)}
      />
    </Wrapper>
  )
}
