import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import color from 'color'
import { DocumentIcon } from 'components/icons/Document'
import { InsuranceType } from 'generated/graphql'
import { Tooltip } from 'new-components/Tooltip'
import * as React from 'react'
import { SubSubHeadingBlack } from '../../components'
import { getInsurancePDFTextKey, getPrebuyPDFTextKey } from '../../utils'
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
  flex-direction: row;
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
  flex-direction: row;
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

export const InsuranceValues: React.FC<Props> = ({ insuranceType }) => (
  <Wrapper>
    <Header>
      <SubSubHeadingBlack>
        <TranslationsConsumer textKey="COVERAGE_INFO_HEADLINE">
          {(t) => t}
        </TranslationsConsumer>
      </SubSubHeadingBlack>
      <TooltipWrapper>
        <Tooltip size="lg" body="Information" />
      </TooltipWrapper>
    </Header>

    <Values insuranceValues={insuranceValues} />

    <Links>
      <TranslationsConsumer textKey={getPrebuyPDFTextKey(insuranceType)}>
        {(prebuyLink) => (
          <Link href={prebuyLink} target="_blank">
            <DocumentIcon />
            <TranslationsConsumer textKey="COVERAGE_TERMSANDCONDITIONS_BUTTON">
              {(t) => t}
            </TranslationsConsumer>
          </Link>
        )}
      </TranslationsConsumer>
      <TranslationsConsumer textKey={getInsurancePDFTextKey(insuranceType)}>
        {(pdfLink) => (
          <Link href={pdfLink} target="_blank">
            <DocumentIcon />
            <TranslationsConsumer textKey="COVERAGE_PRESALEINFORMATION_BUTTON">
              {(t) => t}
            </TranslationsConsumer>
          </Link>
        )}
      </TranslationsConsumer>
    </Links>
  </Wrapper>
)
