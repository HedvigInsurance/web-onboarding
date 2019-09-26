import { colors } from '@hedviginsurance/brand'
import Modal from 'components/Modal'
import * as React from 'react'
import styled from 'react-emotion'

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

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  trustlyUrl: string | null
}

const TrustlyModal: React.FC<Props> = ({ isOpen, setIsOpen, trustlyUrl }) => (
  <Modal
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    style={{ content: { padding: 0 } }}
  >
    <Header>Sätt upp betalning</Header>
    {trustlyUrl !== null && <TrustlyIframe src={trustlyUrl} />}
  </Modal>
)

export default TrustlyModal
