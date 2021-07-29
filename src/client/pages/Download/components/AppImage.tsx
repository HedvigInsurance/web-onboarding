import React from 'react'
import styled from '@emotion/styled'
import { useCurrentLocale } from 'components/utils/CurrentLocale'

type Props = {
  width: number
}

const Image = styled.img<{ imageWidth: number }>`
  width: ${({ imageWidth }) => imageWidth}px;
  max-width: 100%;
  height: auto;
`

const getImageProps = (currentLocale: string) => {
  const basePath = '/new-member-assets/download'

  switch (currentLocale) {
    case 'se':
      return {
        src: `${basePath}/hedvig-app-se.png`,
        width: 1660,
        height: 1400,
      }
    case 'no':
      return {
        src: `${basePath}/hedvig-app-no.png`,
        width: 1660,
        height: 1400,
      }
    case 'dk':
      return {
        src: `${basePath}/hedvig-connect-payment-dk.png`,
        width: 755,
        height: 761,
      }
    case 'dk-en':
      return {
        src: `${basePath}/hedvig-connect-payment-dk-en.png`,
        width: 755,
        height: 761,
      }
    default:
      return {
        src: `${basePath}/hedvig-app-en.png`,
        width: 1660,
        height: 1400,
      }
  }
}

export const AppImage: React.FC<Props> = ({ width }) => {
  const currentLocale = useCurrentLocale()
  return <Image {...getImageProps(currentLocale)} imageWidth={width} />
}
