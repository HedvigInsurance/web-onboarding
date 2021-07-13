import React from 'react'
import { useVariation, Variation } from 'utils/hooks/useVariation'

type RawLinkProps = {
  className?: string
  external?: boolean
  href: string
}

export const RawLink: React.FC<RawLinkProps> = ({
  className,
  children,
  external,
  href,
}) => {
  const variation = useVariation()
  const externalCondition =
    external && ![Variation.IOS, Variation.ANDROID].includes(variation!)
  const linkAttributes = externalCondition
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {}

  return (
    <a className={className} href={href} {...linkAttributes}>
      {children}
    </a>
  )
}
