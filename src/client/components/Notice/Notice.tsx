import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { MEDIA_QUERIES } from 'utils/mediaQueries'

export const RootElement = styled.div(
  ({ size }: Pick<NoticeProps, 'size'>) => ({
    display: 'flex',
    backgroundColor: colorsV3.purple100,
    padding: size === 'sm' ? '0.75rem 1rem' : '1rem',
    borderRadius: '0.5rem',
    [MEDIA_QUERIES.mediumScreen]: {
      padding: size === 'sm' ? '0.75rem 1rem ' : '1.5rem',
    },
  }),
)

export const Header = styled.p(({ size }: Pick<NoticeProps, 'size'>) => ({
  fontSize: size === 'sm' ? '0.875rem' : '1rem',
  color: colorsV3.black,
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  marginBottom: '0.5rem',
  // Override line-height of the content-wrapper, otherwise heading
  // will not be aligned when size is md
  lineHeight: size === 'sm' ? '1rem' : '1.25rem',
  [MEDIA_QUERIES.mediumScreen]: {
    fontSize: size === 'sm' ? '0.875rem' : '1.25rem',
    lineHeight: size === 'sm' ? '1rem' : '1.5rem',
  },
}))

const IconWrapper = styled.div({
  marginRight: '0.5rem',
  // Without this the div will add a few extra pixels vertically
  lineHeight: 0,
})

const ContentWrapper = styled.div(({ size }: Pick<NoticeProps, 'size'>) => ({
  fontSize: size === 'sm' ? '0.75rem' : '0.875rem',
  lineHeight: size === 'sm' ? '1rem' : '1.25rem',
  color: colorsV3.gray700,
  // Aligns the content with the icon
  marginTop: size === 'sm' ? '1px' : '-2px',
  [MEDIA_QUERIES.mediumScreen]: {
    fontSize: size === 'sm' ? '0.75rem' : '1rem',
    lineHeight: size === 'sm' ? '1rem' : '1.5rem',
  },
}))

export type NoticeProps = {
  /**
   * Assuming an icon size of 1.25rem
   */
  icon?: React.ReactElement
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md'
}

export const Root = ({
  icon,
  children,
  className,
  size = 'md',
}: NoticeProps) => {
  // Passes `size` to any child components (so that any eventual Notice.Header also gets the prop)
  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child
    }

    return React.cloneElement(child, {
      size,
    })
  })

  return (
    <RootElement className={className} size={size}>
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
      <ContentWrapper size={size}>{clonedChildren}</ContentWrapper>
    </RootElement>
  )
}
