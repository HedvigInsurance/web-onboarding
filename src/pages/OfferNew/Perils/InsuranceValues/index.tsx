import styled from '@emotion/styled'
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

export const InsuranceValues: React.FC<Props> = () => (
  <Wrapper>
    <SubSubHeadingBlack>Mer information</SubSubHeadingBlack>

    <Values insuranceValues={insuranceValues} />
  </Wrapper>
)
