import React from 'react'

export interface Peril {
  title: React.ReactNode
  description: string
  covered: string[]
  exceptions: string[]
  info?: string
  icon: JSX.Element
}

export interface PerilV2 {
  title: React.ReactNode
  description: string
  covered: string[]
  exceptions: string[]
  info?: string
  icon: any
}
