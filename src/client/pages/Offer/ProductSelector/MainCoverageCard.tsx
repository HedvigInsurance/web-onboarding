import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIA_QUERIES } from 'utils/mediaQueries'
import { Switch } from 'components/Switch'

type MainCoverageCardProps = {
  title: string
  price: string
  description: string
  image: string
  checkboxRef?: React.MutableRefObject<HTMLInputElement | null>
  checked?: boolean
  onClick?: () => void
}

export const MainCoverageCard = ({
  title,
  price,
  description,
  image,
  checkboxRef,
  checked = false,
  onClick = () => null,
}: MainCoverageCardProps) => {
  return (
    <Card checked={checked} onClick={onClick}>
      <ImageFrame>
        <Image src={image} />
      </ImageFrame>
      <Section>
        <Header>
          <Title>{title}</Title>
          <Price>{price}</Price>
        </Header>
        <Description>{description}</Description>
      </Section>
      <Checkbox ref={checkboxRef} checked={checked} onChange={onClick} />
    </Card>
  )
}

export const Card = styled.button<Pick<MainCoverageCardProps, 'checked'>>(
  ({ checked }) => ({
    all: 'unset',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    minHeight: '8rem',
    borderRadius: 8,
    boxShadow: checked
      ? `0 0 0 1px ${colorsV3.black}, 0px 2px 2px rgba(0, 0, 0, 0.1)`
      : 'initial',
    overflow: 'hidden',
    backgroundColor: colorsV3.white,
    transition: 'all 150ms',

    '&:hover:not([disabled]), &:focus-visible': {
      boxShadow: `0 0 0 1px ${colorsV3.black}, 0px 2px 2px rgba(0, 0, 0, 0.1)`,
    },

    '&:disabled': {
      opacity: 0.5,
    },

    [MEDIA_QUERIES.mediumScreen]: {
      flexDirection: 'column',
    },
  }),
)

export const ImageFrame = styled.div({
  flex: '0 0 35%',
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
  // padding-right: 3rem to take in the Checkbox
  padding: '1rem 3rem 1rem 1rem',
  gap: '1rem',
  justifyContent: 'space-evenly',

  [MEDIA_QUERIES.mediumScreen]: {
    padding: '1rem',
  },
})

export const Header = styled.header({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1.175rem',
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
})

export const Checkbox = styled(Switch)({
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translate(-75%, -50%)',

  [MEDIA_QUERIES.mediumScreen]: {
    top: '1.125rem',
    right: '1.125rem',
    transform: 'unset',
  },
})
