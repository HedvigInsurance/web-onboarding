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
          font-family: ${fonts.HEDVIG_LETTERS_STANDARD}, sans-serif;
          font-feature-settings: 'liga';
        }

        body {
          font-family: ${fonts.HEDVIG_LETTERS_STANDARD}, sans-serif;
          font-size: 16px;
          line-height: 1.25;
          margin: 0;
          padding: 0;
          color: ${colorsV3.gray900};
          background-color: ${colorsV3.gray100};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${fonts.HEDVIG_LETTERS_STANDARD}, sans-serif;
          font-kerning: none;
          font-weight: 400;
        }

        img {
          max-width: 100%;
        }

        a {
          color: ${colorsV3.purple900};
          &:hover,
          &:focus {
            color: ${colorsV3.purple900};
          }
        }
      `}
    />
    {children}
  </>
)
