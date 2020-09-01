import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import Modal from 'components/Modal'
import { CurrentLocale } from 'components/utils/CurrentLocale'
import { Container } from 'constate'
import React from 'react'
import { Redirect } from 'react-router-dom'

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

interface State {
  isSuccess: boolean
}

interface Actions {
  setIsSuccess: (isSuccess: boolean) => void
}

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  trustlyUrl: string | null
  generateTrustlyUrl: () => Promise<string | null>
  handleIframeLoad?: HandleIframeLoad
}

export const TrustlyModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  trustlyUrl,
  generateTrustlyUrl,
  handleIframeLoad: handleIframeLoad_ = handleIframeLoad,
}) => {
  const iframeRef = React.createRef<HTMLIFrameElement>()

  React.useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (
        /*
          JSDOM  doesn't support mocking the event's origin yet
          See https://github.com/jsdom/jsdom/issues/2745
         */
        process.env.NODE_ENV !== 'test' &&
        e.origin !== 'https://trustly.com'
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
    <Container<State, Actions>
      initialState={{
        isSuccess: false,
      }}
      actions={{
        setIsSuccess: (isSuccess: boolean) => (_state) => ({
          isSuccess,
        }),
      }}
    >
      {({ isSuccess, setIsSuccess }) => (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          style={{ content: { padding: 0 } }}
        >
          <Header>
            <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_TITLE">
              {(header) => header}
            </TranslationsConsumer>
          </Header>

          {trustlyUrl !== null && (
            <TrustlyIframe
              src={trustlyUrl}
              ref={iframeRef}
              onLoad={async () => {
                const contentWindow = iframeRef.current?.contentWindow
                await handleIframeLoad_(
                  setIsOpen,
                  setIsSuccess,
                  generateTrustlyUrl,
                )(contentWindow)
              }}
            />
          )}

          {isSuccess && (
            <CurrentLocale>
              {({ currentLocale }) => (
                <Redirect to={`/${currentLocale}/new-member/download`} />
              )}
            </CurrentLocale>
          )}
        </Modal>
      )}
    </Container>
  )
}

export type HandleIframeLoad = (
  setIsOpen: (isOpen: boolean) => void,
  setIsSuccess: (isSuccess: boolean) => void,
  generateTrustlyUrl: () => Promise<string | null>,
) => (contentWindow: Window) => Promise<void>

export const handleIframeLoad: HandleIframeLoad = (
  setIsOpen: (isOpen: boolean) => void,
  setIsSuccess: (isSuccess: boolean) => void,
  generateTrustlyUrl: () => Promise<string | null>,
) => async (contentWindow: any) => {
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
