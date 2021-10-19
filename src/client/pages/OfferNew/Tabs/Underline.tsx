import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const Underline = styled(motion.div)`
  box-shadow: 0px 2px 0px ${colorsV3.gray900};
  height: 2px;
  position: absolute;
  bottom: 0;
  width: calc(100% - 1rem);

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: calc(100% - 2.5rem);
  }
`

export const UnderlineComponent = (
  <Underline
    layoutId="underline"
    transition={{
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    }}
    initial={false}
  />
)
