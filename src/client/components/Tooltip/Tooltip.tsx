import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

import Tippy, { TippyProps } from '@tippyjs/react/headless'

import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const ARROW_WIDTH = 8

const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: ${ARROW_WIDTH}px;
    height: ${ARROW_WIDTH}px;
    background: inherit;
  }

  & {
    visibility: hidden;
  }

  &::before {
    left: 0;
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
`

const TooltipPopup = styled.div`
  width: min(12.5rem, 80vw);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0px 16px 40px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  background-color: ${colorsV3.gray800};
  color: ${colorsV3.gray100};

  &[data-placement^='top'] > ${Arrow} {
    bottom: -${ARROW_WIDTH / 2}px;
  }

  &[data-placement^='bottom'] > ${Arrow} {
    top: -${ARROW_WIDTH / 2}px;
  }

  &[data-placement^='left'] > ${Arrow} {
    right: -${ARROW_WIDTH / 2}px;
  }

  &[data-placement^='right'] > ${Arrow} {
    left: -${ARROW_WIDTH / 2}px;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: max-content;
    max-width: 18.75rem;
  }
`

export type TooltipProps = { body: string } & Pick<
  TippyProps,
  'className' | 'children' | 'placement' | 'visible' | 'onClickOutside'
>

export const Tooltip = ({
  className,
  body,
  placement,
  visible,
  onClickOutside,
  children,
}: TooltipProps) => {
  return (
    <Tippy
      placement={placement}
      visible={visible}
      onClickOutside={onClickOutside}
      render={(attrs) => (
        <TooltipPopup
          className={className}
          role="tooltip"
          tabIndex={-1}
          {...attrs}
        >
          {body}
          <Arrow data-popper-arrow="" />
        </TooltipPopup>
      )}
      popperOptions={{
        // avoid arrow to reach the very edge of the tooltip popout
        // https://popper.js.org/docs/v2/modifiers/arrow/#padding
        modifiers: [
          {
            name: 'arrow',
            options: {
              padding: 8,
            },
          },
        ],
      }}
    >
      {children}
    </Tippy>
  )
}
