import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { GooglePlayIcon } from './GooglePlayIcon'
import { AppStoreIcon } from './AppStoreIcon'

const ICON_COLOR = colorsV3.black

type ButtonData = {
  url: string
  iconComponent: React.ReactNode
}

const buttonData: ButtonData[] = [
  {
    url: 'https://play.google.com/store/apps/details?id=com.hedvig.app',
    iconComponent: <GooglePlayIcon />,
  },
  {
    url: 'https://apps.apple.com/app/hedvig/id1303668531',
    iconComponent: <AppStoreIcon />,
  },
]

const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  justify-content: flex-start;
`

const AnchorLinkButton = styled.a`
  height: 48px;
  padding: 0 24px;
  margin: 8px 0;
  border: 1px solid ${ICON_COLOR};
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  color: ${ICON_COLOR};
  transition: 0.1s ease-in-out;

  svg {
    width: 120px;
  }

  &:hover {
    color: ${colorsV3.gray700};
  }
`

export const GetAppButtons = () => {
  return (
    <ButtonContainer>
      {buttonData.map(({ url, iconComponent }) => (
        <AnchorLinkButton key={url} href={url}>
          {iconComponent}
        </AnchorLinkButton>
      ))}
    </ButtonContainer>
  )
}
