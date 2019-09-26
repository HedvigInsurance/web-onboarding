import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import * as ReactModal from 'react-modal'

const defaultStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  content: {
    width: 500,
    height: 400,
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    borderRadius: 10,
    border: 'none',
    backgroundColor: colors.WHITE,
  },
}

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  style?: ReactModal.Styles
}

const Modal: React.FC<Props> = ({ isOpen, setIsOpen, style, children }) => (
  <ReactModal
    isOpen={isOpen}
    style={{
      overlay: {
        ...defaultStyle.overlay,
        ...(style ? style.overlay : {}),
      },
      content: {
        ...defaultStyle.content,
        ...(style ? style.content : {}),
      },
    }}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    ariaHideApp={false}
    onRequestClose={() => {
      setIsOpen(false)
    }}
  >
    {children}
  </ReactModal>
)

export default Modal
