import React from 'react'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand'
import { useMediaQuery } from 'react-responsive'

export const UnderlineComponent: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <motion.div
      layoutId="underline"
      style={{
        height: '2px',
        backgroundColor: colorsV3.gray900,
        position: 'absolute',
        bottom: '-2px',
        width: isMobile ? 'calc(100% - 1rem)' : 'calc(100% - 2.5rem)',
        zIndex: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
    />
  )
}
