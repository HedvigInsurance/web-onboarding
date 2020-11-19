import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand/dist'
import { motion } from 'framer-motion'
import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { useMediaQuery } from 'react-responsive'
import { Button } from 'components/buttons'
import { Spinner } from 'components/utils'
import {
  InsuranceTermType,
  SignStatus as GraphQLSignStatus,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { isNorwegian, isSwedish } from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
import { SignStatus } from './SignStatus'

const Wrapper = styled('div')`
  width: 100%;
  padding: 3rem 0;
`

const ButtonWrapper = styled('div')`
  width: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: center;
`

const SpinnerWrapper = styled(motion.div)`
  display: inline-block;
  padding-left: 0.5em;
  margin-top: -1px;
  vertical-align: text-top;
  overflow: hidden;
`

const Disclaimer = styled('div')`
  font-size: 0.75rem;
  margin: 1rem 0 0;
  color: ${colorsV2.gray};
  line-height: 1.5;

  @media (max-width: 600rem) {
    text-align: center;
  }
`

export enum SignUiState {
  NOT_STARTED,
  STARTED_WITH_REDIRECT,
  STARTED,
  FAILED,
}

interface Props {
  offerData: OfferData
  signUiState: SignUiState
  signStatus: GraphQLSignStatus | null
  loading: boolean
  canInitiateSign: boolean
  onSignStart: () => void
}

export const Sign: React.FC<Props> = ({
  offerData,
  signUiState,
  signStatus,
  loading,
  canInitiateSign,
  onSignStart,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          size={isMobile ? 'sm' : 'lg'}
          fullWidth
          disabled={!canInitiateSign}
          onClick={async () => {
            if (!canInitiateSign) {
              return
            }

            onSignStart()
          }}
        >
          {textKeys.CHECKOUT_SIGN_BUTTON_TEXT()}
          <SpinnerWrapper
            initial={{ width: 0, opacity: 0 }}
            animate={
              loading ? { opacity: 1, width: 'auto' } : { opacity: 0, width: 0 }
            }
          >
            <Spinner />
          </SpinnerWrapper>
        </Button>
      </ButtonWrapper>
      <motion.div
        initial={{ height: 'auto', opacity: 1 }}
        animate={
          ![SignUiState.STARTED, SignUiState.FAILED].includes(signUiState)
            ? { opacity: 0, height: 0 }
            : { opacity: 1, height: 'auto' }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 100 }}
      >
        <SignStatus signStatus={signStatus} />
      </motion.div>
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
    </Wrapper>
  )
}
