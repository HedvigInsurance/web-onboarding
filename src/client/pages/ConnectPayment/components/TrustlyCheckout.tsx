import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'components/buttons'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useRegisterDirectDebitMutation } from '../containers/RegisterDirectDebitMutation'
import { TrustlyModal } from './TrustlyModal'

const ButtonWrapper = styled.div`
  width: 100%;
  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin-top: 5rem;
    max-width: 400px;
  }
`
interface Props {
  onSuccess?: () => void
}

export const TrustlyCheckout: React.FC<Props> = ({ onSuccess }) => {
  const textKeys = useTextKeys()
  const [trustlyModalIsOpen, setTrustlyModalIsOpen] = React.useState(false)
  const [trustlyUrl, setTrustlyUrl] = React.useState<string | null>(null)
  const currentLocale = useCurrentLocale()
  const [createTrustlyUrlMutation] = useRegisterDirectDebitMutation()

  const generateTrustlyUrl = async () => {
    const baseUrl = `${window.location.origin}/${currentLocale}/new-member/connect-payment`

    const res = await createTrustlyUrlMutation({
      variables: {
        clientContext: {
          successUrl: `${baseUrl}/success`,
          failureUrl: `${baseUrl}/fail`,
        },
      },
    })

    if (!res?.data?.registerDirectDebit) {
      return null
    }

    return res.data.registerDirectDebit.url
  }

  return (
    <ButtonWrapper>
      <Button
        fullWidth
        background={colorsV3.purple500}
        foreground={colorsV3.gray900}
        onClick={async () => {
          setTrustlyModalIsOpen(true)

          const url = await generateTrustlyUrl()

          if (url !== null) {
            setTrustlyUrl(url)
          }
        }}
      >
        {textKeys.ONBOARDING_CONNECT_DD_CTA()}
      </Button>
      <TrustlyModal
        isOpen={trustlyModalIsOpen}
        setIsOpen={(isOpen) => {
          setTrustlyModalIsOpen(isOpen)
        }}
        trustlyUrl={trustlyUrl}
        generateTrustlyUrl={generateTrustlyUrl}
        onSuccess={onSuccess}
      />
    </ButtonWrapper>
  )
}
