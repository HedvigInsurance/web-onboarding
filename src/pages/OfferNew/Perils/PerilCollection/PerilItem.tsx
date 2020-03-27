import styled from '@emotion/styled'
import { colorsV2, colorsV3, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import { Icon } from 'data/graphql'
import { getIconUrl } from '..'

interface PerilItemProps {
  title: React.ReactNode
  icon: Icon
  onClick: () => void
}

const OuterContainer = styled.button`
  width: calc(50% - 0.5rem);

  background-color: transparent;
  border: 0;
  margin: 0.25rem;
  padding: 0;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  @media (min-width: 400px) {
    width: auto;
  }
`

const Container = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  padding: 0.75rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${colorsV2.white};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);

  @media (min-width: 400px) {
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    width: 7.25rem;
    height: 5.75rem;
    padding: 0.5rem;
    border: 1px solid ${colorsV2.lightgray};
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;

    @media (min-width: 400px) {
      margin-right: 0;
      width: 3rem;
      height: 3rem;
    }
  }

  :focus {
    outline: none;
  }

  @media (min-width: 400px) {
    :hover {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
      transform: translateY(-2%);
    }
  }

  :active {
    background-color: ${colorsV2.lightgray};
    box-shadow: none;
  }
`

const Title = styled('div')`
  font-size: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV3.gray900};
  font-family: ${fonts.FAVORIT};
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
        {iconUrl && <img src={iconUrl} />}
        <Title>{title}</Title>
      </Container>
    </OuterContainer>
  )
}
