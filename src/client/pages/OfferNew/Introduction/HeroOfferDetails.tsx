import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { Button } from 'components/buttons'
import { BundledQuote } from 'src/client/data/graphql'
import { quoteDetailsHasAddress } from '../utils'
import { getAddress } from '../Checkout/InsuranceSummaryDetails'
import { DetailsModal } from './DetailsModal'

type Props = {
  offerData: OfferData
  allQuotes: BundledQuote[]
  refetchOfferData: () => Promise<void>
}

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

const Address = styled.div`
  font-size: 1.5rem;
  line-height: 1.3;
  display: inline-block;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
    line-height: 1.17;
    display: block;
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

export const HeroOfferDetails: React.FC<Props> = ({
  offerData,
  allQuotes,
  refetchOfferData,
}) => {
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false)
  const { person, quotes } = offerData
  const numberCoInsured = person.householdSize - 1

  // TODO: Address information is present in offerData.address.
  // We should format that address instead of looking it up again
  const quoteWithAddress = quotes.find((quote) => {
    return quoteDetailsHasAddress(quote.quoteDetails)
  })
  const address = quoteWithAddress
    ? getAddress(quoteWithAddress.quoteDetails)
    : null

  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <Headline>{textKeys.HERO_OFFER_DETAILS_HEADER()}</Headline>
      <OfferInfoWrapper>
        <NameAndCoInsured>
          {person.firstName}
          {numberCoInsured > 0 && ` +${numberCoInsured}`}
        </NameAndCoInsured>

        {address && <Address>{address}</Address>}
      </OfferInfoWrapper>
      <EditDetailsButton
        background={'none'}
        foreground={colorsV3.gray100}
        onClick={() => setDetailsModalIsOpen(true)}
      >
        {textKeys.SIDEBAR_SHOW_DETAILS_BUTTON()}
      </EditDetailsButton>
      <DetailsModal
        offerData={offerData}
        allQuotes={allQuotes}
        refetch={refetchOfferData}
        isVisible={detailsModalIsOpen}
        onClose={() => setDetailsModalIsOpen(false)}
      />
    </Wrapper>
  )
}
