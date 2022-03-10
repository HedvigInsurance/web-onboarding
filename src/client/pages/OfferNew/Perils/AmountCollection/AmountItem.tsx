import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

import { TooltipIcon } from 'components/Tooltip/TooltipIcon'

import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const CONTAINER_PADDING = '0.75rem'
const DESKTOP_CONTAINER_PADDING = '1rem'
const ICON_MARGIN = '0.875rem'
const DESKTOP_ICON_MARGIN = '1.125rem'
const ICON_SIZE = '20px'

const Container = styled.div`
  position: relative;

  display: grid;
  gap: 0.5rem;

  padding: ${CONTAINER_PADDING};
  /* Clear info icon */
  padding-right: calc(
    ${CONTAINER_PADDING} + ${ICON_MARGIN} + ${ICON_SIZE} + 0.5rem
  );
  background: ${colorsV3.white};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding: ${DESKTOP_CONTAINER_PADDING};
    /* Clear info icon */
    padding-right: calc(
      ${DESKTOP_CONTAINER_PADDING} + ${DESKTOP_ICON_MARGIN} + ${ICON_SIZE} +
        0.5rem
    );
  }
`

const Label = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${colorsV3.gray700};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
  }
`

const Value = styled.p`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.4;
  color: ${colorsV3.gray900};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
`

const TooltipWrapper = styled.div`
  position: absolute;
  bottom: ${ICON_MARGIN};
  right: ${ICON_MARGIN};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    bottom: ${DESKTOP_ICON_MARGIN};
    right: ${DESKTOP_ICON_MARGIN};
  }
`

type Props = {
  children?: React.ReactNode
  tooltip?: string
}

export const AmountItem = ({ children, tooltip }: Props) => {
  return (
    <Container>
      {children}
      {tooltip && (
        <TooltipWrapper>
          <TooltipIcon body={tooltip} />
        </TooltipWrapper>
      )}
    </Container>
  )
}

AmountItem.Label = Label
AmountItem.Value = Value
