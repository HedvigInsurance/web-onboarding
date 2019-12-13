import * as React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useMeasure } from './useMeasure'

const ContentItem = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

export enum AnimationDirection {
  FORWARDS,
  BACKWARDS,
}

const usePrevious = (value: React.ReactNode) => {
  const prevRef = React.useRef<React.ReactNode>()
  const currRef = React.useRef<React.ReactNode>()
  React.useEffect(() => {
    if (!currRef.current) {
      currRef.current = value
    }

    prevRef.current = currRef.current
    currRef.current = value
  }, [value])
  return prevRef.current
}

interface AnimatorProps {
  animationDirection: AnimationDirection
}

export const Animator: React.FC<AnimatorProps> = ({
  children,
  animationDirection,
}) => {
  const prevChildren = usePrevious(children)

  if (!children) {
    return null
  }

  const mainContent = React.Children.toArray(children).filter(
    (child) => child,
  )[0] as React.ReactNode & { key: string }
  const previousContent = React.Children.toArray(prevChildren).filter(
    (child) => child,
  )[0] as React.ReactNode & { key: string }

  if (!mainContent || !previousContent) {
    return null
  }

  return (
    <>
      {previousContent.key !== mainContent.key && (
        <ContentItem
          key={previousContent.key}
          initial={{
            opacity: 1,
            x: 0,
          }}
          animate={{
            opacity: 0,
            x:
              animationDirection == AnimationDirection.FORWARDS
                ? '-100%'
                : '100%',
          }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 800,
          }}
        >
          {previousContent}
        </ContentItem>
      )}
      <ContentItem
        key={mainContent.key}
        initial={{
          opacity: 0,
          x:
            animationDirection == AnimationDirection.FORWARDS
              ? '100%'
              : '-100%',
        }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 800,
        }}
      >
        {mainContent}
      </ContentItem>
    </>
  )
}
