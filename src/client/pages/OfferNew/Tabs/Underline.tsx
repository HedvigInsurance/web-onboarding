import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const Underline = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: 1.9rem;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    top: 2.125rem;
  }
`

export const UnderlineComponent = (
  <Underline
    layoutId="underline"
    animate={{ borderBottom: '2px solid black' }}
    transition={{
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    }}
    initial={false}
  />
)
