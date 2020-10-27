import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { ForwardArrow } from 'components/icons/ForwardArrow'

const CardComponent = styled.div<{ banner?: boolean }>`
  position: relative;
  width: 100%;
  background: ${colorsV3.white};
  border-radius: 8px;
  margin-top: ${(props) => (props.banner ? '-2rem' : 0)};
  margin-right: 1rem;
  margin-left: 1rem;
  padding: 3.5rem 2.5rem 2.5rem 2.5rem;
  padding-top: ${(props) => (props.banner ? '5.5rem' : '3.5rem')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.35s;
  text-decoration: none;

  :hover {
    transform: translateY(-6px);

    @media (hover: none) {
      transform: none;
    }
  }

  @media (max-width: 1020px) {
    justify-content: flex-end;
    padding: 2.5rem 2rem 2rem 2rem;
    padding-top: ${(props) => (props.banner ? '4.5rem' : '2.5rem')};
    margin-right: 1.125rem;
    margin-left: 1.125rem;
  }

  @media (max-width: 850px) {
    margin: 0 0 1rem 0;
    padding-right: 4rem;
  }

  @media (max-width: 600px) {
    padding: 2rem 4rem 1.5rem 1.5rem;
    padding-top: ${(props) => (props.banner ? '4rem' : '2rem')};
    align-items: center;
    box-shadow: 0 8px 13px rgba(0, 0, 0, 0.18);
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
