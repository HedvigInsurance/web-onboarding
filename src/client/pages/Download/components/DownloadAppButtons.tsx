import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { GooglePlayIcon } from './GooglePlayIcon'
import { AppStoreIcon } from './AppStoreIcon'

const hrefs = {
  google: 'https://play.google.com/store/apps/details?id=com.hedvig.app',
  apple: 'https://apps.apple.com/app/hedvig/id1303668531',
}

const ICON_COLOR = colorsV3.white
const ICON_WIDTH = 120

const LogoContainer = styled.div`
  width: 18rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const DownloadAppButtons = () => {
  return (
    <LogoContainer>
      <a href={hrefs.google}>
        <GooglePlayIcon color={ICON_COLOR} width={ICON_WIDTH} />
      </a>
      <a href={hrefs.apple}>
        <AppStoreIcon color={ICON_COLOR} width={ICON_WIDTH} />
      </a>
    </LogoContainer>
  )
}
