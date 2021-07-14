import React from 'react'
import { useVariation, Variation } from 'utils/hooks/useVariation'

type RawLinkProps = {
  className?: string
  openInNewTab?: boolean
  href: string
}

export const RawLink: React.FC<RawLinkProps> = ({
  className,
  children,
  openInNewTab,
  href,
}) => {
  const variation = useVariation()
  const linkCondition =
    openInNewTab && ![Variation.IOS, Variation.ANDROID].includes(variation!)
  const linkAttributes = linkCondition
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {}

  return (
    <a className={className} href={href} {...linkAttributes}>
      {children}
    </a>
  )
}
