import React from 'react'
import { GlobalCss } from '../../src/utils/globalStyles'

export const themeDecorator = (story) => (
  <>
    <GlobalCss />
    {story()}
  </>
)
