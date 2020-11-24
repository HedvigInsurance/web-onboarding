import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { InsuranceTermType } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { OfferData } from 'pages/OfferNew/types'
import { isNorwegian, isSwedish } from 'pages/OfferNew/utils'

const Disclaimer = styled('div')`
  padding: 2rem 0;
  font-size: 0.75rem;
  color: ${colorsV3.gray500};
  line-height: 1.5;

  @media (max-width: 600rem) {
    text-align: center;
  }

  p {
    margin: 0;
  }
`
type Props = {
  offerData: OfferData
}

export const SignDisclaimer: React.FC<Props> = ({ offerData }) => {
  const textKeys = useTextKeys()

  return (
    <>
      {offerData.quotes.map((quote) => {
        const seSignDisclaimer = textKeys.CHECKOUT_SIGN_DISCLAIMER({
          PREBUY_LINK:
            quote.insuranceTerms.get(InsuranceTermType.PreSaleInfoEuStandard)
              ?.url ?? '',
          TERMS_LINK:
            quote.insuranceTerms.get(InsuranceTermType.TermsAndConditions)
              ?.url ?? '',
        })
        const noSignDisclaimer = textKeys.CHECKOUT_SIGN_DISCLAIMER_NO({
          TERMS_LINK:
            quote.insuranceTerms.get(InsuranceTermType.TermsAndConditions)
              ?.url ?? '',
        })
        return (
          <Disclaimer key={quote.id}>
            {isSwedish(offerData) && (
              <ReactMarkdown
                source={
                  Array.isArray(seSignDisclaimer)
                    ? seSignDisclaimer.join('')
                    : seSignDisclaimer
                }
                linkTarget="_blank"
              />
            )}
            {isNorwegian(offerData) && (
              <ReactMarkdown
                source={
                  Array.isArray(noSignDisclaimer)
                    ? noSignDisclaimer.join('')
                    : noSignDisclaimer
                }
                linkTarget="_blank"
              />
            )}
          </Disclaimer>
        )
      })}
    </>
  )
}
