import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import Modal from 'components/Modal'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import React, { createRef, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const Header = styled('div')({
  width: '100%',
  height: 40,
  background: colors.DARK_GREEN,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.WHITE,
  fontSize: '14px',
  boxShadow: '0 0 11px rgba(0, 0, 0, 0.05)',
})

const TrustlyIframe = styled('iframe')({
  width: '100%',
  height: 'calc(50vh - 45px)',
  minHeight: '500px',
  border: 'none',
})

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  trustlyUrl: string | null
  generateTrustlyUrl: () => Promise<string | null>
  handleIframeLoad?: HandleIframeLoad
  onSuccess?: () => void
}

export const TrustlyModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  trustlyUrl,
  generateTrustlyUrl,
  handleIframeLoad: actualHandleIframeLoad = handleIframeLoad,
  onSuccess = () => {
    /* noop */
  },
}) => {
  const iframeRef = createRef<HTMLIFrameElement>()
  const currentLocale = useCurrentLocale()
  const [isSuccess, setIsSuccess] = useState(false)
  const textKeys = useTextKeys()

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
    }
  }, [isSuccess])

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (
        /*
          JSDOM  doesn't support mocking the event's origin yet
          See https://github.com/jsdom/jsdom/issues/2745
         */
        process.env.NODE_ENV !== 'test' &&
        e.origin !== 'https://trustly.com' &&
        e.origin !== 'https://test.trustly.com'
      ) {
        return
      }

      const trustlyMessage = JSON.parse(e.data)

      if (trustlyMessage.method === 'OPEN_APP') {
        window.location.assign(trustlyMessage.appURL)
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      style={{ content: { padding: 0 } }}
    >
      <Header>{textKeys.ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_TITLE()}</Header>

      {trustlyUrl !== null && (
        <TrustlyIframe
          src={trustlyUrl}
          ref={iframeRef}
          onLoad={async () => {
            const contentWindow = iframeRef.current?.contentWindow
            await actualHandleIframeLoad(
              setIsOpen,
              setIsSuccess,
              generateTrustlyUrl,
            )(contentWindow)
          }}
        />
      )}

      {isSuccess && <Redirect to={`/${currentLocale}/new-member/download`} />}
    </Modal>
  )
}

export type HandleIframeLoad = (
  setIsOpen: (isOpen: boolean) => void,
  setIsSuccess: (isSuccess: boolean) => void,
  generateTrustlyUrl: () => Promise<string | null>,
) => (contentWindow: Window | undefined | null) => Promise<void>

export const handleIframeLoad: HandleIframeLoad = (
  setIsOpen,
  setIsSuccess,
  generateTrustlyUrl,
) => async (contentWindow) => {
  const href = contentWindow?.location.href
  if (!contentWindow || !href) {
    return
  }

  if (href.endsWith('success')) {
    setIsOpen(false)
    setIsSuccess(true)
  } else if (href.endsWith('retry')) {
    const newTrustlyUrl = await generateTrustlyUrl()

    if (newTrustlyUrl !== null) {
      contentWindow.location.href = newTrustlyUrl
    }
  }
}
