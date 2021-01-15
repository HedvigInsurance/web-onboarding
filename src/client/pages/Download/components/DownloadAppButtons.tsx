import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { AppleAppStoreIcon, GooglePlayStoreIcon } from './appStoreIcons'

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/details?id=com.hedvig.app'
const APPLE_APP_STORE_LINK = 'https://apps.apple.com/app/hedvig/id1303668531'

const LogoWrapper = styled.div`
  width: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const DownloadLink = styled.a`
  svg {
    width: 36px;
    fill: ${colorsV3.white};
  }
`

export const DownloadAppButtons = () => {
  return (
    <LogoWrapper>
      <DownloadLink href={APPLE_APP_STORE_LINK}>
        <AppleAppStoreIcon />
      </DownloadLink>
      <DownloadLink href={GOOGLE_PLAY_LINK}>
        <GooglePlayStoreIcon />
      </DownloadLink>
    </LogoWrapper>
  )
}
