import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from 'components/icons/Arrow'
import { HedvigSymbol } from 'components/icons/HedvigSymbol'

const CardComponent = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1.25rem 1rem;
  color: ${colorsV3.gray900};
  background: ${colorsV3.gray100};
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.35s;
  text-decoration: none;

  @media (min-width: 600px) {
    padding: 2.5rem 2rem 1.5rem 1.5rem;
  }

  @media (min-width: 850px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 28rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    padding: 1.5rem;
  }

  @media (min-width: 1020px) {
    justify-content: space-between;
    margin-right: 0.75rem;
    margin-left: 0.75rem;
    padding: 2rem;
    border-radius: 0.75rem;
  }

  :hover {
    transform: translateY(-6px);
    color: ${colorsV3.gray900};

    @media (hover: none) {
      transform: none;
    }
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;

  svg {
    display: none;
  }

  @media (min-width: 1020px) {
    padding-bottom: 3rem;
    svg {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`

const CardBanner = styled.div`
  position: absolut;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 0.75rem;
  line-height: 2;
  text-transform: uppercase;
  text-align: center;
  color: ${colorsV3.gray800};
  background-color: ${colorsV3.purple100};
  border-radius: 0.25rem;
`

const CardContent = styled.div`
  padding-right: 2rem;
`

const CardLink = CardComponent.withComponent(Link)

const ArrowWrapper = styled.span`
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  height: 1rem;

  @media (min-width: 600px) {
    right: 1.5rem;
    bottom: 2.5rem;
    svg {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 1020px) {
    right: 2rem;
  }
`

export const Card: React.FC<{ to: string; banner?: string }> = ({
  banner,
  to,
  children,
}) => (
  <CardLink to={to}>
    <CardHeader>
      <HedvigSymbol size="1.25rem" />
      {banner && <CardBanner>{banner}</CardBanner>}
    </CardHeader>
    <CardContent>{children}</CardContent>
    <ArrowWrapper>
      <Arrow size="1.25rem" color={colorsV3.gray900} />
    </ArrowWrapper>
  </CardLink>
)
