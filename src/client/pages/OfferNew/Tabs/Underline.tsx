import React from 'react'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand'
import { useMediaQuery } from 'react-responsive'
import { BREAKPOINTS } from 'utils/mediaQueries'

export const UnderlineComponent: React.FC = () => {
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.mediumScreen })

  return (
    <motion.div
      layoutId="underline"
      style={{
        height: '2px',
        backgroundColor: colorsV3.gray900,
        position: 'absolute',
        bottom: '0px',
        width: isDesktop ? 'calc(100% - 2.5rem)' : 'calc(100% - 1rem)',
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
    />
  )
}
