import React from 'react'
import styled from '@emotion/styled'
import { useCurrentLocale } from 'components/utils/CurrentLocale'

type Props = {
  width: number
}

const Image = styled.img<{ imageWidth: Props['width'] }>`
  width: ${({ imageWidth }) => imageWidth}px;
  max-width: 100%;
  height: auto;

  aspect-ratio: 17 / 20;
  object-fit: cover;
`

const getImageProps = (currentLocale: string) => {
  const basePath = '/new-member-assets/download'

  switch (currentLocale) {
    case 'se':
      return {
        src: `${basePath}/app_still-life_daybed_se.png`,
        width: 1080,
        height: 652,
      }
    case 'no':
      return {
        src: `${basePath}/app_still-life_daybed_no.png`,
        width: 1080,
        height: 652,
      }
    case 'dk':
      return {
        src: `${basePath}/app_still-life_daybed_dk.png`,
        width: 1080,
        height: 652,
      }
    default:
      return {
        src: `${basePath}/app_still-life_daybed_en.png`,
        width: 1080,
        height: 652,
      }
  }
}

export const AppImage: React.FC<Props> = ({ width }) => {
  const currentLocale = useCurrentLocale()
  return <Image {...getImageProps(currentLocale)} imageWidth={width} />
}
