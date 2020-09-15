import { colorsV3 } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { useRegisterDirectDebitMutation } from '../containers/RegisterDirectDebitMutation'
import { TrustlyModal } from './TrustlyModal'

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

    const finalUrl = res.data.registerDirectDebit.url.includes('?')
      ? `${res.data.registerDirectDebit.url}&NotifyParent=1`
      : `${res.data.registerDirectDebit.url}?NotifyParent=1`

    return finalUrl
  }

  return (
    <>
      <Button
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
    </>
  )
}
