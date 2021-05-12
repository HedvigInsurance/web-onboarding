import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Icon } from 'data/graphql'
import { getIconUrl } from '../index'

interface PerilItemProps {
  title: React.ReactNode
  icon: Icon
  onClick: () => void
}

const OuterContainer = styled.div`
  position: relative;
  display: flex;
  color: ${colorsV3.gray900};

  &:before {
    content: '';

    @media (min-width: 800px) {
      position: relative;
      padding-top: 75%;
    }

    @media (min-width: 1200px) {
      padding-top: 100%;
    }
  }
`

const Container = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  min-height: 3.75rem;
  padding: 0.5rem 1rem 0.5rem 0.375rem;
  color: inherit;
  font-family: inherit;
  border-radius: 0.375rem;
  background-color: ${colorsV3.white};
  border: 0;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  appearance: none;

  @media (min-width: 800px) {
    min-height: 8.75rem;
    padding: 1.25rem;
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    &:hover {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: ${colorsV3.gray300};
    box-shadow: none;
  }
`

const PerilIcon = styled.img`
  display: flex;
  width: 2rem;
  height: 2rem;
  margin-right: 0.375rem;

  @media (min-width: 800px) {
    width: 3rem;
    height: 3rem;
  }

  svg {
    width: 100%;
    height: 100%;
    @media (min-width: 800px) {
      transform: translateX(-0.625rem);
    }

    path {
      fill: currentColor;
    }
  }
`

const Title = styled('h4')`
  margin: 0;
  font-size: 0.875rem;

  @media (min-width: 800px) {
    font-size: 1rem;
  }
`

export const PerilItem: React.FC<PerilItemProps> = ({
  title,
  icon,
  onClick,
}) => {
  const iconUrl = getIconUrl(icon.variants.light.svgUrl)

  return (
    <OuterContainer>
      <Container onClick={onClick}>
        {iconUrl && <PerilIcon src={iconUrl} />}
        <Title>{title}</Title>
      </Container>
    </OuterContainer>
  )
}
