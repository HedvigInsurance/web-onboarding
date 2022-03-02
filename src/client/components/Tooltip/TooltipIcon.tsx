import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

import { Tooltip, TooltipProps } from 'components/Tooltip/Tooltip'
import { InfoIcon } from 'components/icons/Info'

const ICON_SIZE = '20px'

const TooltipIconWrapper = styled.div`
  /* remove extra space under child SVG: https://stackoverflow.com/a/51161925 */
  font-size: 0;
  line-height: 0;
`

export type TooltipIconProps = Pick<TooltipProps, 'body' | 'placement'>

export const TooltipIcon = (props: TooltipIconProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Tooltip
      {...props}
      visible={isVisible}
      onClickOutside={() => setIsVisible(false)}
    >
      <TooltipIconWrapper
        onMouseOver={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onTouchStart={() => setIsVisible(true)}
      >
        <InfoIcon
          size={ICON_SIZE}
          color={isVisible ? colorsV3.gray700 : colorsV3.gray900}
        />
      </TooltipIconWrapper>
    </Tooltip>
  )
}
