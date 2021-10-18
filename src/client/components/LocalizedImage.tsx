import React from 'react'
import styled from '@emotion/styled'
import { useCurrentLocale } from 'components/utils/CurrentLocale'

type Props = React.ComponentPropsWithoutRef<'img'> & {
  src: string
}

const Image = styled.img`
  max-width: 100%;
`

const getLocaleSuffix = (currentLocale: string) => {
  switch (currentLocale) {
    case 'se':
      return 'se'
    case 'no':
      return 'no'
    case 'dk':
      return 'dk'
    default:
      return 'en'
  }
}

const getLocaleSrc = (basePath: string, currentLocale: string) => {
  const pathParts = basePath.split('.')
  const localePath = [
    ...pathParts.slice(0, -1),
    getLocaleSuffix(currentLocale),
    pathParts.slice(-1),
  ].join('.')
  return localePath
}

export const LocalizedImage: React.FC<Props> = ({ src, ...props }) => {
  const currentLocale = useCurrentLocale()
  const localeSrc = getLocaleSrc(src, currentLocale)
  return <Image src={localeSrc} {...props} />
}
