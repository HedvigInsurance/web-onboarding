import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { css } from '@emotion/core'
import { MEDIA_QUERIES, MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Switch } from 'components/Switch'

type AdditionalProductCardProps = {
  title: string
  price: string
  description: string
  image: string
  checked?: boolean
  onClick?: () => void
  error?: string
}

export const AdditionalProductCard = ({
  title,
  price,
  description,
  image,
  checked = false,
  onClick = () => null,
}: AdditionalProductCardProps) => {
  return (
    <Card checked={checked} onClick={onClick}>
      {image && (
        <ImageFrame>
          <Image src={image} />
        </ImageFrame>
      )}
      <Section>
        <Header>
          <Title>{title}</Title>
          <Price>{price}</Price>
        </Header>
        {description && <Description>{description}</Description>}
      </Section>
      <Checkbox checked={checked} onChange={onClick} />
    </Card>
  )
}

const commonStyles = css({
  all: 'unset',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  minHeight: '8rem',
  borderRadius: 8,

  overflow: 'hidden',
  backgroundColor: colorsV3.white,
  transition: 'all 150ms',
  '&:hover:not([disabled]), &:focus-visible': {
    boxShadow: `0 0 0 1px ${colorsV3.black}, 0px 2px 2px rgba(0, 0, 0, 0.1)`,

    // otherwise text in the LinkCard will turn purple on hover since they're inside an anchor element
    color: 'initial',
  },

  '&:disabled': {
    opacity: 0.5,
  },
})

export const Card = styled.button<Pick<AdditionalProductCardProps, 'checked'>>(
  commonStyles,
  ({ checked }) => ({
    boxShadow: checked
      ? `0 0 0 1px ${colorsV3.black}, 0px 2px 2px rgba(0, 0, 0, 0.1)`
      : 'initial',
    flexDirection: 'column',
    minHeight: '16rem',
    maxHeight: '20rem',

    [MEDIA_QUERIES.mediumScreen]: {
      flexDirection: 'row',
      minHeight: '10rem',
      maxHeight: '16rem',
    },
  }),
)

type LinkCardProps = {
  orientation?: 'row' | 'column'
}

export const LinkCard = styled.a<LinkCardProps>(
  commonStyles,
  ({ orientation = 'row' }) => ({
    flexDirection: orientation === 'row' ? 'row' : 'column',
  }),
)

export const ImageFrame = styled.div({
  flex: '0 0 45%',
  minHeight: 0,

  [MEDIA_QUERIES.mediumScreen]: {
    flex: '0 0 35%',
  },
})

export const Image = styled.img({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

export const Section = styled.section({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '1rem',
  justifyContent: 'space-around',

  [MEDIA_QUERIES.mediumScreen]: {
    padding: '1rem 3rem 1rem 1rem',
  },
})

export const Header = styled.header({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1rem',

  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    fontSize: '1.25rem',
  },
})

export const Title = styled.h1({
  all: 'unset',
  display: 'block',
})

export const Price = styled.span({
  fontSize: '0.87em',
})

export const Description = styled.p({
  all: 'unset',
  color: colorsV3.gray700,
  fontSize: '0.875rem',
})

export const Checkbox = styled(Switch)({
  position: 'absolute',
  top: '1.125rem',
  right: '1.125rem',

  [MEDIA_QUERIES.mediumScreen]: {
    top: '50%',
    right: 0,
    transform: 'translate(-75%, -50%)',
  },
})
