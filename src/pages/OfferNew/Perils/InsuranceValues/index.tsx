import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import color from 'color'
import { DocumentIcon } from 'components/icons/Document'
import { Tooltip } from 'new-components/Tooltip'
import * as React from 'react'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import { SubSubHeadingBlack } from '../../components'
import { insuranceValues } from './mock'
import { Values } from './Values'

interface Props {
  insuranceType: InsuranceType
}

const Wrapper = styled.div`
  margin-top: 4rem;

  @media (max-width: 600px) {
    margin-top: 2.5rem;
  }
`

const Header = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`

const TooltipWrapper = styled.div`
  margin-left: 1rem;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`

const Links = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 4rem;
  align-items: center;

  @media (max-width: 600px) {
    flex-flow: column;
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

export const InsuranceValues: React.FC<Props> = () => (
  <Wrapper>
    <Header>
      <SubSubHeadingBlack>Mer information</SubSubHeadingBlack>
      <TooltipWrapper>
        <Tooltip size="lg" body="Information" />
      </TooltipWrapper>
    </Header>

    <Values insuranceValues={insuranceValues} />

    <Links>
      <Link href="">
        <DocumentIcon />
        Fullständiga villkor
      </Link>
      <Link href="">
        <DocumentIcon /> Förköpsinformation
      </Link>
    </Links>
  </Wrapper>
)
