import React from 'react'
import styled from '@emotion/styled'
import { useCurrentLocale } from 'components/utils/CurrentLocale'

const Image = styled.img`
  width: 560px;
  max-width: 100%;
  height: auto;
  flex-shrink: 0;
`

const getImageSrc = (currentLocale: string) => {
  const basePath = '/new-member-assets/download'

  switch (currentLocale) {
    case 'se':
      return `${basePath}/hedvig-app-se.png`
    case 'no':
      return `${basePath}/hedvig-app-no.png`
    case 'dk':
    default:
      return `${basePath}/hedvig-app-en.png`
  }
}

export const AppImage: React.FC = () => {
  const currentLocale = useCurrentLocale()

  const imageSrc = getImageSrc(currentLocale)

  return <Image src={imageSrc} />
}
