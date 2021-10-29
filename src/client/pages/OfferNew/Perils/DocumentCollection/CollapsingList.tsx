import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import color from 'color'
import { RawLink, RawLinkProps } from 'components/RawLink'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: -1rem;
  }
`

const StyledTermsLink = styled(RawLink)`
  border-radius: 8px;
  border: 1px solid ${colorsV3.gray900};

  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colorsV3.gray900};
  text-decoration: none;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  padding: 0.75rem 1rem;

  &:hover,
  &:focus {
    color: ${colorsV3.gray700};
    border-color: ${colorsV3.gray700};
  }

  ${Container} &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    border: 0;
    background-color: ${colorsV3.gray300};

    &:hover {
      background-color: ${color(colorsV3.gray300)
        .darken(0.03)
        .toString()};
    }

    ${Container} &:not(:last-child) {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
`

type ExternalLinkProps = RawLinkProps & {
  children: string
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, ...props }) => (
  <StyledTermsLink target="_blank" {...props}>
    {`${children} ↗︎`}
  </StyledTermsLink>
)

type ExternalLinkListType = React.FC & {
  ExternalLink: typeof ExternalLink
}

export const CollapsingList: ExternalLinkListType = ({ children }) => (
  <Container>{children}</Container>
)

CollapsingList.ExternalLink = ExternalLink
