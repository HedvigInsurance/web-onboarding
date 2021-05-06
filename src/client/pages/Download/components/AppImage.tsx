import React from 'react'
import styled from '@emotion/styled'
import { useCurrentLocale } from 'components/utils/CurrentLocale'

type Props = {
  width: number
}

const Image = styled.img<Props>`
  width: ${({ width }) => width}px;
  max-width: 100%;
  height: auto;
`

const getImageSrc = (currentLocale: string) => {
  const basePath = '/new-member-assets/download'

  switch (currentLocale) {
    case 'se':
      return `${basePath}/hedvig-app-se.png`
    case 'no':
      return `${basePath}/hedvig-app-no.png`
    case 'dk':
      return `${basePath}/hedvig-connect-payment-dk.png`
    case 'dk-en':
      return `${basePath}/hedvig-connect-payment-dk-en.png`
    default:
      return `${basePath}/hedvig-app-en.png`
  }
}

export const AppImage: React.FC<Props> = ({ width }) => {
  const currentLocale = useCurrentLocale()

  const imageSrc = getImageSrc(currentLocale)

  return <Image width={width} src={imageSrc} />
}
