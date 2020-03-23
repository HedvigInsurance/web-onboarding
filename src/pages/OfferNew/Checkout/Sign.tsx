import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand/dist'
import { MarkdownTranslation } from '@hedviginsurance/textkeyfy'
import {
  CompleteQuote,
  RedeemedCampaignsQuery,
  useMemberQuery,
  useRedeemedCampaignsQuery,
  useSignQuotesMutation,
} from 'data/graphql'
import { motion } from 'framer-motion'
import { Button } from 'new-components/buttons'
import { getInsuranceType } from 'pages/OfferNew/utils'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  getInsurancePDFTextKey,
  getPrebuyPDFTextKey,
  InsuranceType,
} from 'utils/insuranceDomainUtils'
import { adtraction, trackStudentkortet } from 'utils/tracking'
import { SignStatus } from './SignStatus'
import { emailValidation } from './UserDetailsForm'

export const SignSpacer = styled('div')`
  height: 250px;
`
const Wrapper = styled('div')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 0 8rem 2.5rem 4.5rem;
  background-image: linear-gradient(
    to bottom,
    rgba(249, 250, 252, 0),
    ${colorsV2.offwhite} 50%
  );

  @media (max-width: 40rem) {
    padding: 1rem;
    padding-top: 0;
  }
`

const ButtonWrapper = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
`

const Disclaimer = styled('p')`
  font-size: 0.75rem;
  margin: 1rem 0 0;
  color: ${colorsV2.gray};
  line-height: 1.5;
  padding: 0 0.5rem;

  @media (max-width: 40rem) {
    text-align: center;
  }
`

enum SignState {
  NOT_STARTED,
  STARTED,
  FAILED,
}

interface Props {
  className?: string
  email?: string
  personalNumber: string
  firstQuote: CompleteQuote
}

export const Sign: React.FC<Props> = ({ className, email, firstQuote }) => {
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const textKeys = useTextKeys()
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const { data: memberData } = useMemberQuery()
  const [signQuotes, signQuotesMutation] = useSignQuotesMutation({
    variables: { quoteIds: [firstQuote.id] },
  })
  const [signState, setSignState] = React.useState(SignState.NOT_STARTED)
  const [bankIdUrl, setBankIdUrl] = React.useState<string | null>(null)

  const canInitiateSign =
    signState !== SignState.STARTED &&
    emailValidation.isValidSync(email ?? '') &&
    firstQuote.ssn

  return (
    <Wrapper className={className}>
      {!bankIdUrl && (
        <ButtonWrapper>
          <Button
            size={isMobile ? 'sm' : 'lg'}
            disabled={!canInitiateSign}
            onClick={async () => {
              if (!canInitiateSign || signQuotesMutation.loading) {
                return
              }

              setSignState(SignState.STARTED)
              const result = await signQuotes()
              if (result.data?.signQuotes?.__typename === 'FailedToStartSign') {
                setSignState(SignState.FAILED)
                return
              }
              if (
                result.data?.signQuotes?.__typename === 'NorwegianBankIdSession'
              ) {
                setBankIdUrl(result.data.signQuotes.redirectUrl!)
              }
            }}
          >
            {textKeys.CHECKOUT_SIGN_BUTTON_TEXT()}
          </Button>
        </ButtonWrapper>
      )}

      <motion.div
        initial={{ height: 'auto', opacity: 1 }}
        animate={
          signState === SignState.NOT_STARTED
            ? { opacity: 0, height: 0 }
            : { opacity: 1, height: 'auto' }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 100 }}
      >
        <SignStatus
          bankIdUrl={bankIdUrl}
          isSigning={signState !== SignState.NOT_STARTED}
          onFailure={() => setSignState(SignState.FAILED)}
          onSuccess={() => {
            track(
              email!,
              firstQuote,
              memberData?.member.id!,
              redeemedCampaignsData?.redeemedCampaigns ?? [],
            )
          }}
        />
      </motion.div>

      <Disclaimer>
        <MarkdownTranslation
          textKey="CHECKOUT_SIGN_DISCLAIMER"
          replacements={{
            PREBUY_LINK: textKeys[
              getPrebuyPDFTextKey(getInsuranceType(firstQuote))
            ](),
            TERMS_LINK: textKeys[
              getInsurancePDFTextKey(getInsuranceType(firstQuote))
            ](),
          }}
          markdownProps={{ linkTarget: '_blank' }}
        />
      </Disclaimer>
    </Wrapper>
  )
}

const track = (
  email: string,
  firstQuote: CompleteQuote,
  memberId: string,
  redeemedCampaigns: RedeemedCampaignsQuery['redeemedCampaigns'],
) => {
  if (process.env.NODE_ENV === 'test') {
    return
  }

  const legacyInsuranceType: InsuranceType =
    firstQuote.quoteDetails.__typename === 'SwedishApartmentQuoteDetails'
      ? (firstQuote.quoteDetails.type as any)
      : 'HOUSE' // TODO do we have norway quotes here?

  adtraction(
    parseFloat(firstQuote.insuranceCost.monthlyGross.amount),
    memberId,
    email,
    redeemedCampaigns !== null && redeemedCampaigns.length !== 0
      ? redeemedCampaigns[0].code
      : null,
    legacyInsuranceType,
  )

  if (
    redeemedCampaigns !== null &&
    redeemedCampaigns.length !== 0 &&
    redeemedCampaigns[0].code.toLowerCase() === 'studentkortet'
  ) {
    trackStudentkortet(memberId, firstQuote.insuranceCost.monthlyGross.amount)
  }
}
