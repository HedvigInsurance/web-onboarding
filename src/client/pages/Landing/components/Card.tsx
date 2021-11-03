import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from 'components/icons/Arrow'
import { HedvigSymbol } from 'components/icons/HedvigSymbol'
import { Badge } from 'components/Badge/Badge'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SMALL_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'

const CardComponent = styled.div<{ disabled?: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.35s;
  text-decoration: none;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-bottom: 1rem;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 28rem;
    padding: 1.5rem;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    justify-content: space-between;
    padding: 2rem;
    border-radius: 0.75rem;
  }

  ${(props) =>
    props.disabled
      ? css`
          color: ${colorsV3.gray500};
          background-color: ${colorsV3.gray300};
        `
      : css`
          color: ${colorsV3.gray900};
          background-color: ${colorsV3.gray100};

          :hover {
            transform: translateY(-6px);
            color: ${colorsV3.gray900};

            @media (hover: none) {
              transform: none;
            }
          }
        `}
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 1.5rem;
  padding-bottom: 0.5rem;

  /* HedvigSymbol */
  svg {
    display: none;
  }

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding-bottom: 1rem;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-bottom: 3rem;

    /* HedvigSymbol */
    svg {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      margin-left: auto;
    }
  }
`

const CardContent = styled.div``

const CardLink = CardComponent.withComponent(Link)

const ArrowWrapper = styled.span`
  position: absolute;
  right: 1.25rem;
  bottom: 0.8rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    right: 1.5rem;
    bottom: 1.2rem;

    svg {
      font-size: 1.75rem;
    }
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    right: 2rem;
    bottom: 2rem;
  }
`

export const CardHeadline = styled.h2<{ disabled?: boolean }>`
  width: 100%;
  margin: 0;
  margin-bottom: 0.25rem;
  color: ${(props) => (props.disabled ? colorsV3.gray500 : colorsV3.gray900)};

  font-size: 1.25rem;
  line-height: 1.4;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 1.33;
    letter-spacing: -2%;
  }
`

export const CardParagraph = styled.p`
  margin: 0;
  padding-right: 2rem;
  font-size: 1rem;
  line-height: 1.5;
  /* Gray/@gray600 */
  color: #777777;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding-right: 2.5rem;
  }
`

const CardContainer: React.FC<{
  disabled: boolean
  to: string
}> = ({ children, disabled, to }) => {
  return disabled ? (
    <CardComponent disabled={disabled}>{children}</CardComponent>
  ) : (
    <CardLink to={to}>{children}</CardLink>
  )
}

interface Props {
  to: string
  badge?: string
  disabled?: boolean
}

export const Card: React.FC<Props> = ({
  badge,
  to,
  children,
  disabled = false,
}) => {
  return (
    <>
      <CardContainer disabled={disabled} to={to}>
        <CardHeader>
          {badge && (
            <Badge disabled={disabled} size="lg">
              {badge}
            </Badge>
          )}
          <HedvigSymbol size="1.25rem" />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {!disabled && (
          <ArrowWrapper>
            <Arrow size="1.25rem" color={colorsV3.gray900} />
          </ArrowWrapper>
        )}
      </CardContainer>
    </>
  )
}
