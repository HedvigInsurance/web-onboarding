import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import Modal from 'components/Modal'
import { CurrentLocale } from 'components/utils/CurrentLocale'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import { Redirect } from 'react-router'

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
}

const TrustlyModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  trustlyUrl,
  generateTrustlyUrl,
}) => {
  const iframeRef = React.createRef<HTMLIFrameElement>()
  return (
    <Container<State, ActionMap<State, Actions>>
      initialState={{
        isSuccess: false,
      }}
      actions={{
        setIsSuccess: (isSuccess: boolean) => ({
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
                const contentWindow =
                  iframeRef.current && iframeRef.current.contentWindow
                const href = contentWindow && contentWindow.location.href

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

export default TrustlyModal
