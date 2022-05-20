import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  EXTRA_LARGE_SCREEN_MEDIA_QUERY,
  LARGE_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'

type BackgroundImageVariant = 'home' | 'car'
type Props = {
  zIndex: number
  variant?: BackgroundImageVariant
}

const ImageContainer = styled.div<Props>`
  background-color: ${colorsV3.gray900};
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  overflow: hidden;
  z-index: ${({ zIndex }) => zIndex};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: 100%;
  }
`

type ImageProps = {
  hasLoaded: boolean
}

const Image = styled.img<ImageProps>`
  height: auto;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  opacity: ${({ hasLoaded }) => (hasLoaded ? 0.6 : 0)};
  transition: opacity 1s cubic-bezier(0.33, 1, 0.68, 1);
  transition-delay: 150ms;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    object-position: 100% -500px;
  }

  ${EXTRA_LARGE_SCREEN_MEDIA_QUERY} {
    object-position: 100% -600px;
  }
`

type ImageVariantSizes = {
  small: string
  medium: string
}

type ImageVariant = {
  portrait: ImageVariantSizes
  landscape: ImageVariantSizes
}

const variants: Record<BackgroundImageVariant, ImageVariant> = {
  home: {
    portrait: {
      small: '/new-member-assets/landing/hedvig_living_room_portrait_small.jpg',
      medium:
        '/new-member-assets/landing/hedvig_living_room_portrait_medium.jpg',
    },
    landscape: {
      small:
        '/new-member-assets/landing/hedvig_living_room_landscape_small.jpg',
      medium:
        '/new-member-assets/landing/hedvig_living_room_landscape_medium.jpg',
    },
  },
  car: {
    portrait: {
      small: '/new-member-assets/landing/hedvig_garage_portrait_small.jpg',
      medium: '/new-member-assets/landing/hedvig_garage_portrait_medium.jpg',
    },
    landscape: {
      small: '/new-member-assets/landing/hedvig_garage_landscape_small.jpg',
      medium: '/new-member-assets/landing/hedvig_garage_landscape_medium.jpg',
    },
  },
}

export const HeroBackgroundImage = ({ zIndex, variant = 'home' }: Props) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false)

  const images = variants[variant]

  return (
    <ImageContainer zIndex={zIndex}>
      <picture>
        <source
          media="(orientation: portrait)"
          srcSet={`${images.portrait.small} 900w, ${images.portrait.medium} 1600w`}
        />
        <source
          media="(orientation: landscape)"
          srcSet={`${images.landscape.small} 1600w, ${images.landscape.small} 2200w`}
        />
        <Image
          src={images.landscape.small}
          onLoad={() => setHasImageLoaded(true)}
          hasLoaded={hasImageLoaded}
        />
      </picture>
    </ImageContainer>
  )
}
