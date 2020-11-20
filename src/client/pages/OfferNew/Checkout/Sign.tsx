import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { motion } from 'framer-motion'
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

type WrapperProps = {
  width?: number
}

const Wrapper = styled('div')<WrapperProps>`
  background: ${colorsV3.gray100};
  box-shadow: 0 -1px 3px ${colorsV3.gray500};
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: visibility 3s;
`

const SpinnerWrapper = styled(motion.div)`
  display: inline-block;
`

const Disclaimer = styled('div')`
  padding: 0 3rem;
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

const SignStatusWrapper = styled(motion.div)`
  padding: 1rem 3rem 0;
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
  isLoading: boolean
  canInitiateSign: boolean
  onSignStart: () => void
  checkoutWrapperScrollWidth?: number
}

export const Sign: React.FC<Props> = ({
  offerData,
  signUiState,
  signStatus,
  isLoading,
  canInitiateSign,
  onSignStart,
  checkoutWrapperScrollWidth,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const textKeys = useTextKeys()

  return (
    <Wrapper width={checkoutWrapperScrollWidth}>
      <Button
        onClick={async () => {
          if (!canInitiateSign) {
            return
          }

          onSignStart()
        }}
        size={isMobile ? 'sm' : 'lg'}
        fullWidth
        foreground={colorsV3.gray900}
        background={colorsV3.purple500}
        disabled={!canInitiateSign}
      >
        {isLoading ? (
          <SpinnerWrapper
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
          >
            <Spinner />
          </SpinnerWrapper>
        ) : (
          textKeys.CHECKOUT_SIGN_BUTTON_TEXT()
        )}
      </Button>
      <SignStatusWrapper
        initial={{ height: 'auto', opacity: 1 }}
        animate={
          ![SignUiState.STARTED, SignUiState.FAILED].includes(signUiState)
            ? { opacity: 0 }
            : { opacity: 1 }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 100 }}
      >
        <SignStatus signStatus={signStatus} />
      </SignStatusWrapper>
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
