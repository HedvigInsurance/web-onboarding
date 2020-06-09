import { css, Global } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import { CurrentLocale } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { RedeemCode } from './components/RedeemCode'

type ForeverProps = RouteComponentProps<{
  code: string
}>

export const Forever: React.FC<ForeverProps> = ({
  match: {
    params: { code },
  },
}) => {
  const textKeys = useTextKeys()
  return (
    <>
      <Helmet>
        <title>{textKeys.FOREVER_LANDINGPAGE_TITLE()}</title>
        <meta
          property="og:title"
          content={textKeys.FOREVER_LANDINGPAGE_TITLE()}
        />
        <meta
          property="og:description"
          content={textKeys.FOREVER_LANDINGPAGE_DESCRIPTION()}
        />
        <meta
          property="og:image"
          content="https://www.hedvig.com/new-member-assets/social/hedvig-hemforsakring-2.jpg"
        />
      </Helmet>
      <Page>
        <Global
          styles={css`
            body {
              background-color: ${colorsV3.gray900};
            }
          `}
        />
        <CurrentLocale>
          {({ currentLocale }) => (
            <RedeemCode code={code} currentLocale={currentLocale} />
          )}
        </CurrentLocale>
      </Page>
    </>
  )
}
