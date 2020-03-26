import React from 'react'

export interface Peril {
  title: React.ReactNode
  description: string
  covered: string[]
  exceptions: string[]
  info?: string
  icon: JSX.Element
}

type IconVariant = {
  svgUrl: string
}

type IconVariants = {
  dark: IconVariant
  light: IconVariant
}

export type PerilIcon = {
  variants: IconVariants
}

export interface PerilV2 {
  title: React.ReactNode
  description: string
  covered: string[]
  exceptions: string[]
  info?: string
  icon: PerilIcon
}
