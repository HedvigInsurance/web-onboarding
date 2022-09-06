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

const ButtonContainer = styled.div({
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
})

const AnchorLinkButton = styled.a(
  ({ fill }: Pick<GetAppButtonsProps, 'fill'>) => ({
    height: '48px',
    padding: '0 24px',
    margin: '8px 0',
    borderRadius: '8px',
    display: 'inline-flex',
    justifyContent: 'center',
    color: ICON_COLOR,
    transition: '0.1s ease-in-out',
    backgroundColor: fill,

    svg: {
      width: '120px',
    },

    '&:hover': {
      color: colorsV3.gray700,
    },
  }),
)

type GetAppButtonsProps = {
  fill?: string
}

export const GetAppButtons = ({ fill }: GetAppButtonsProps) => {
  return (
    <ButtonContainer>
      {buttonData.map(({ url, iconComponent }) => (
        <AnchorLinkButton key={url} href={url} fill={fill}>
          {iconComponent}
        </AnchorLinkButton>
      ))}
    </ButtonContainer>
  )
}
