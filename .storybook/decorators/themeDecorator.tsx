import React from 'react'
import { GlobalCss } from '../../src/client/utils/globalStyles'

export const themeDecorator = (story) => (
  <>
    <GlobalCss />
    {story()}
  </>
)
