import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { ForwardArrow } from 'components/icons/ForwardArrow'

const CardComponent = styled.div<{ banner?: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 2.5rem 3rem 1rem 1rem;
  padding-top: ${(props) => (props.banner ? '4rem' : '2.5rem')};
  background: ${colorsV3.gray100};
  border-radius: 0.5rem;
  transition: all 0.35s;
  text-decoration: none;

  @media (min-width: 600px) {
    padding: 2.5rem 2rem 1.5rem 1.5rem;
  }

  @media (min-width: 850px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-width: 29rem;
    margin-top: ${(props) => (props.banner ? '-2rem' : 0)};
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    padding: 2rem;
    padding-top: ${(props) => (props.banner ? '4.5rem' : '2.5rem')};
    text-align: center;
  }

  @media (min-width: 1020px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 1rem;
    margin-left: 1rem;
    padding: 2.5rem;
    padding-top: ${(props) => (props.banner ? '5.5rem' : '3.5rem')};
  }

  :hover {
    transform: translateY(-6px);

    @media (hover: none) {
      transform: none;
    }
  }
`

const CardLink = CardComponent.withComponent(Link)

const ChevronWrapper = styled.span<{ pushDown?: boolean }>`
  display: none;
  position: absolute;
  right: 1.5rem;
  top: 50%;
  height: 1rem;
  ${({ pushDown }) =>
    pushDown
      ? css`
          transform: translateY(calc(-50% + 1rem));
        `
      : css`
          transform: translateY(-50%);
        `};

  @media (max-width: 850px) {
    display: block;
  }
`

export const Card: React.FC<{ to: string; banner?: boolean }> = ({
  banner,
  to,
  children,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })

  return isMobile ? (
    <CardLink to={to} banner={banner}>
      {children}
      <ChevronWrapper pushDown={banner}>
        <ForwardArrow />
      </ChevronWrapper>
    </CardLink>
  ) : (
    <CardComponent banner={banner}>
      {children}
      <ChevronWrapper>
        <ForwardArrow />
      </ChevronWrapper>
    </CardComponent>
  )
}
