import React from 'react'
import styled from '@emotion/styled'
import { useCurrentLocale } from '../l10n/useCurrentLocale'
import { LocaleLabel } from '../l10n/locales'

type Props = React.ComponentPropsWithoutRef<'img'> & {
  src: string
}

const Image = styled.img`
  max-width: 100%;
`

const getLocaleSuffix = (currentLocale: LocaleLabel) => {
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

type GetLocaleSrcParams = {
  basePath: string
  currentLocale: LocaleLabel
}

const getLocaleSrc = ({ basePath, currentLocale }: GetLocaleSrcParams) => {
  const pathParts = basePath.split('.')
  const localePath = [
    ...pathParts.slice(0, -1),
    getLocaleSuffix(currentLocale),
    pathParts.slice(-1),
  ].join('.')
  return localePath
}

export const LocalizedImage: React.FC<Props> = ({ src, ...props }) => {
  const { path } = useCurrentLocale()
  const localeSrc = getLocaleSrc({ basePath: src, currentLocale: path })
  return <Image src={localeSrc} {...props} />
}
