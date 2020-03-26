import { colors } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { useRegisterDirectDebitMutation } from '../containers/RegisterDirectDebitMutation'
import TrustlyModal from './TrustlyModal'

export const TrustlyCheckout: React.FC = () => {
  const textKeys = useTextKeys()
  const [trustlyModalIsOpen, setTrustlyModalIsOpen] = React.useState(false)
  const [trustlyUrl, setTrustlyUrl] = React.useState<string | null>(null)
  const currentLocale = useCurrentLocale()
  const baseUrl = `${window.location.origin}/${currentLocale &&
    currentLocale + '/'}new-member/connect-payment`
  const [createTrustlyUrlMutation] = useRegisterDirectDebitMutation({
    successUrl: `${baseUrl}/success`,
    failureUrl: `${baseUrl}/fail`,
  })

  const generateTrustlyUrl = async () => {
    const res = await createTrustlyUrlMutation()

    if (!res?.data?.registerDirectDebit) {
      return null
    }

    return res.data.registerDirectDebit.url
  }

  return (
    <>
      <Button
        background={colors.PURPLE}
        foreground={colors.WHITE}
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
      />
    </>
  )
}
