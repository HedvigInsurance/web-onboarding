import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { Questionmark } from '../../../../components/icons/Questionmark'

interface Props {
  insuredAtOtherCompany: boolean
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
`

const Label = styled.div`
  display: flex;
  flex-flow: column;
  align-items: left;
  justify-content: center;
`

const Title = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: ${colorsV2.darkgray};
`

const SubTitle = styled.div`
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-weight: 500;
  color: ${colorsV2.gray};
`

const Value = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV2.darkgray};
  display: flex;
  flex-flow: row;
  justify-content: right;
  align-items: center;
`

const HelpButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: ${colorsV2.lightgray};
  margin-left: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  :focus {
    outline: none;
  }

  svg {
    width: 0.625rem;
    height: 0.625rem;
  }
`

export const StartDate: React.FC<Props> = ({ insuredAtOtherCompany }) => (
  <Wrapper>
    <Label>
      <Title>Startdatum</Title>
      <SubTitle>hos Hedvig</SubTitle>
    </Label>

    <Value>
      {insuredAtOtherCompany ? 'När din gamla löper ut' : 'Idag'}

      <HelpButton>
        <Questionmark />
      </HelpButton>
    </Value>
  </Wrapper>
)
