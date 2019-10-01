import { colors } from '@hedviginsurance/brand'
import Modal from 'components/Modal'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { Redirect } from 'react-router'
import { CurrentLanguage } from '../../../components/utils/CurrentLanguage'

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
  height: 'calc(100% - 40px)',
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
}

const TrustlyModal: React.FC<Props> = ({ isOpen, setIsOpen, trustlyUrl }) => {
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
          <Header>Sätt upp betalning</Header>

          {trustlyUrl !== null && (
            <TrustlyIframe
              src={trustlyUrl}
              innerRef={iframeRef}
              onLoad={() => {
                const iframe = iframeRef.current

                if (!iframe) {
                  return
                }

                const contentWindow = iframe.contentWindow
                if (!contentWindow) {
                  return
                }

                const href = contentWindow.location.href
                if (href.endsWith('success')) {
                  setIsOpen(false)
                  setIsSuccess(true)
                } else if (href.endsWith('retry')) {
                  contentWindow.location.href = trustlyUrl
                }
              }}
            />
          )}

          {isSuccess && (
            <CurrentLanguage>
              {({ currentLanguage }) => (
                <Redirect
                  to={`/${currentLanguage &&
                    currentLanguage + '/'}new-member/download`}
                />
              )}
            </CurrentLanguage>
          )}
        </Modal>
      )}
    </Container>
  )
}

export default TrustlyModal
