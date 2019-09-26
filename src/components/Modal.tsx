import { colors } from '@hedviginsurance/brand'
import { injectGlobal } from 'emotion'
import * as React from 'react'
import * as ReactModal from 'react-modal'

const cssTransitions = `
.ReactModal__Overlay {
  opacity: 0;
  transition: opacity 100ms ease-in-out;
}

.ReactModal__Overlay--after-open{
  opacity: 1;
}

.ReactModal__Overlay--before-close{
  opacity: 0;
}

.ReactModal__Content {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.90);
  transition: all 150ms ease 150ms;
}

.ReactModal__Content--after-open {
  opacity: 1;
  transform: translateX(-50%) translateY(-50%) scale(1);
}

.ReactModal__Content--before-close {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.90);
}
`

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

const Modal: React.FC<Props> = ({ isOpen, setIsOpen, style, children }) => {
  // tslint:disable-next-line no-unused-expression
  injectGlobal`${cssTransitions}`
  return (
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
}

export default Modal
