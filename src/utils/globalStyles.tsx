import { css, Global } from '@emotion/core'
import { colorsV3, fonts, getCdnFontFaces } from '@hedviginsurance/brand'
import React from 'react'

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
          line-height: 1.25;
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
          font-weight: 400;
        }

        img {
          max-width: 100%;
        }

        a {
          color: ${colorsV3.purple500};
          &:hover,
          &:focus {
            color: ${colorsV3.purple500};
          }
        }
      `}
    />
    {children}
  </>
)
