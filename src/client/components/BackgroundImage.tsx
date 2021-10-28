import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

type Props = {
  height?: number
  isFullScreen?: boolean
  zIndex: number
  className?: string
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

export const BackgroundImage: React.FC<Props> = ({
  height,
  isFullScreen = false,
  zIndex,
  className,
}) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false)

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
          srcSet="/new-member-assets/landing/hedvig_table_portrait_small.jpg 900w, /new-member-assets/landing/hedvig_table_portrait_medium.jpg 1600w"
        />
        <source
          media="(orientation: landscape)"
          srcSet="/new-member-assets/landing/hedvig_table_landscape_small.jpg 1600w, /new-member-assets/landing/hedvig_table_landscape_medium.jpg 2200w"
        />
        <Image
          src="/new-member-assets/landing/hedvig_table_landscape_small.jpg"
          onLoad={() => setHasImageLoaded(true)}
          hasLoaded={hasImageLoaded}
          isFullScreen={isFullScreen}
        />
      </picture>
    </ImageContainer>
  )
}
