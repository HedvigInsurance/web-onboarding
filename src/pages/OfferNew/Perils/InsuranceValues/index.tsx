import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import color from 'color'
import { DocumentIcon } from 'components/icons/Document'
import { TypeOfContract } from 'data/graphql'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  getEUPrebuyPDFTextKey,
  getInsurancePDFTextKey,
  getInsuranceType,
  getPrebuyPDFTextKey,
} from 'utils/insuranceDomainUtils'
import { SubSubHeadingBlack } from '../../components'
import { insuranceValues } from './mock'
import { Values } from './Values'

interface Props {
  contractType: TypeOfContract
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

// const TooltipWrapper = styled.div`
//   margin-left: 1rem;
//   display: none;
//
//   @media (max-width: 600px) {
//     display: block;
//   }
// `

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

export const InsuranceValues: React.FC<Props> = ({ contractType }) => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <Header>
        <SubSubHeadingBlack>
          {textKeys.COVERAGE_INFO_HEADLINE()}
        </SubSubHeadingBlack>
        {/*<TooltipWrapper>
          <Tooltip size="lg" body="Information" />
        </TooltipWrapper>*/}
      </Header>

      <Values
        insuranceValues={insuranceValues(getInsuranceType(contractType))}
      />

      <Links>
        <Link
          href={textKeys[getInsurancePDFTextKey(contractType)]()}
          target="_blank"
        >
          <DocumentIcon />
          {textKeys.COVERAGE_TERMSANDCONDITIONS_BUTTON()}
        </Link>

        <Link
          href={textKeys[getPrebuyPDFTextKey(contractType)]()}
          target="_blank"
        >
          <DocumentIcon />
          {textKeys.COVERAGE_PRESALEINFORMATION_BUTTON()}
        </Link>

        <Link
          href={textKeys[getEUPrebuyPDFTextKey(contractType)]()}
          target="_blank"
        >
          <DocumentIcon />
          {textKeys.COVERAGE_PRESALEINFORMATIONEU_BUTTON()}
        </Link>
      </Links>
    </Wrapper>
  )
}
