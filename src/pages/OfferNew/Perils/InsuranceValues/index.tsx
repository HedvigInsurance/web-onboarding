import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import color from 'color'
import { DocumentIcon } from 'components/icons/Document'
import { QuoteTextKeyType } from 'pages/OfferNew/utils'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { SubSubHeadingBlack } from '../../components'
import { insuranceValues } from './mock'
import { Values } from './Values'

interface Props {
  quoteTextKeyType: QuoteTextKeyType
}

const Wrapper = styled.div`
  margin-top: 4rem;

  @media (max-width: 600px) {
    margin-top: 2.5rem;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4rem;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem 0.75rem 1rem;
  background: ${colorsV2.lightgray};
  border-radius: 1.75rem;
  color: ${colorsV2.black};
  font-size: 1rem;
  text-decoration: none;
  margin-right: 1rem;
  margin-top: 0.5rem;
  transition: all 0.1s;

  :last-child {
    margin-right: 0;
  }

  svg {
    margin-right: 0.5rem;
  }

  :hover {
    background: ${color(colorsV2.lightgray)
      .darken(0.03)
      .toString()};
  }

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`

export const InsuranceValues: React.FC<Props> = ({ quoteTextKeyType }) => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <Header>
        <SubSubHeadingBlack>
          {textKeys.COVERAGE_INFO_HEADLINE()}
        </SubSubHeadingBlack>
      </Header>

      <Values insuranceValues={insuranceValues(quoteTextKeyType)} />

      <Links>
        <Link href="TODO" target="_blank">
          <DocumentIcon />
          TODO
        </Link>

        <Link href="TODO" target="_blank">
          <DocumentIcon />
          TODO
        </Link>

        <Link href="TODO" target="_blank">
          <DocumentIcon />
          TODO
        </Link>
      </Links>
    </Wrapper>
  )
}
