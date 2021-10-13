import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const Underline = styled(motion.div)`
  width: 100%;
  top: 2.2rem;
  position: absolute;
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
