import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'

export const RootElement = styled.div(() => ({
  display: 'flex',
  backgroundColor: colorsV3.purple100,
  padding: '0.75rem 1rem ',
  borderRadius: '0.5rem',
}))

export const Header = styled.p({
  fontSize: '0.875rem',
  color: colorsV3.black,
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  marginBottom: '0.5rem',
})

const IconWrapper = styled.div({
  marginRight: '0.5rem',
  // Without this the div will add a few extra pixels vertically
  lineHeight: 0,
})

const ContentWrapper = styled.div({
  fontSize: '0.75rem',
  lineHeight: '1rem',
  color: colorsV3.gray700,
  // Aligns the content with the icon
  paddingTop: '1px',
})

export type NoticeProps = {
  /**
   * Assuming an icon size of 1.25rem
   */
  icon?: React.ReactElement
  children: React.ReactNode
  className?: string
}

export const Root = ({ icon, children, className }: NoticeProps) => {
  return (
    <RootElement className={className}>
      {icon ? <IconWrapper>{icon}</IconWrapper> : null}
      <ContentWrapper>{children}</ContentWrapper>
    </RootElement>
  )
}
