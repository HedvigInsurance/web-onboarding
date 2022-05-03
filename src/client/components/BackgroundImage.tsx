import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

type BackgroundImageVariant = 'home' | 'car'
type Props = {
  height?: number
  isFullScreen?: boolean
  zIndex: number
  className?: string
  variant?: BackgroundImageVariant
}

const ImageContainer = styled.div<Props>`
  background-color: ${colorsV3.gray900};
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  position: absolute;
  top: 0;
  overflow: hidden;
  z-index: ${({ zIndex }) => zIndex};
  ${({ isFullScreen }) =>
    isFullScreen &&
    css`
      height: 100vh;
    `}
`

type ImageProps = {
  hasLoaded: boolean
} & Pick<Props, 'isFullScreen'>

const Image = styled.img<ImageProps>`
  height: auto;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  opacity: ${({ hasLoaded }) => (hasLoaded ? 0.6 : 0)};
  transition: opacity 1s cubic-bezier(0.33, 1, 0.68, 1);
  transition-delay: 150ms;
  object-position: ${({ isFullScreen }) =>
    isFullScreen ? '50% 50%' : '100% -100px'};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    object-position: 100% 50%;
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

export const BackgroundImage = ({
  height,
  isFullScreen = false,
  zIndex,
  className,
  variant = 'home',
}: Props) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false)

  const images = variants[variant]

  return (
    <ImageContainer
      className={className}
      height={height}
      isFullScreen={isFullScreen}
      zIndex={zIndex}
    >
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
          isFullScreen={isFullScreen}
        />
      </picture>
    </ImageContainer>
  )
}
