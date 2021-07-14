import React from 'react'
import { useVariation, Variation } from 'utils/hooks/useVariation'

type RawLinkProps = {
  className?: string
  target?: '_blank'
  href: string
}

export const RawLink: React.FC<RawLinkProps> = ({
  className,
  children,
  target,
  href,
}) => {
  const variation = useVariation()
  const linkCondition =
    target === '_blank' &&
    ![Variation.IOS, Variation.ANDROID].includes(variation!)
  const linkAttributes = linkCondition
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {}

  return (
    <a className={className} href={href} {...linkAttributes}>
      {children}
    </a>
  )
}
