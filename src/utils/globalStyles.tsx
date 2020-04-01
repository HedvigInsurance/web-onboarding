import { css, Global } from '@emotion/core'
import { fonts, getCdnFontFaces } from '@hedviginsurance/brand'
import * as React from 'react'

export const GlobalCss: React.SFC = ({ children }) => (
  <>
    <Global
      styles={css`
        ${getCdnFontFaces()}

        * {
          box-sizing: border-box;
          font-family: ${fonts.FAVORIT}, sans-serif;
        }

        body {
          font-family: ${fonts.FAVORIT}, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${fonts.FAVORIT}, sans-serif;
          font-kerning: none;
        }

        h1,
        h2,
        h3 {
          font-weight: 600;
        }

        h4 {
          font-weight: 500;
        }

        img {
          max-width: 100%;
        }
      `}
    />
    {children}
  </>
)
