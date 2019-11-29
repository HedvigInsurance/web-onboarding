import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { DownArrow } from '../../../../components/icons/DownArrow'
import { InsuranceCompany } from './mock'

interface Props {
  insurances: InsuranceCompany[]
  oldInsurance?: string
}

const Wrapper = styled.div`
  position: relative;
`

const Button = styled.button<{ dropdownIsVisible: boolean }>`
  width: 100%;
  height: 3.5rem;
  border-radius: 8px;
  background: ${colorsV2.white};
  border: 1px solid
    ${(props) =>
      props.dropdownIsVisible ? colorsV2.violet500 : colorsV2.lightgray};
  cursor: pointer;
  transition: all 0.1s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  :hover {
    border: 1px solid
      ${(props) =>
        props.dropdownIsVisible ? colorsV2.violet500 : colorsV2.semilightgray};
  }

  :focus {
    outline: none;
  }
`

const Label = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 600;
  color: ${colorsV2.darkgray};
`

const Value = styled.div<{ dropdownIsVisible: boolean }>`
  display: flex;
  flex-flow: row;
  align-items: center;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    fill: ${(props) =>
      props.dropdownIsVisible ? colorsV2.violet500 : colorsV2.gray};
    margin-left: 0.75rem;
    transition: all 0.1s ease-in-out;
    ${(props) => props.dropdownIsVisible && `transform: rotate(180deg);`}
  }
`

const ValueText = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  text-align: right;
  color: ${colorsV2.semilightgray};

  @media (max-width: 600px) {
    font-size: 0.875rem;
    line-height: 0.875rem;
  }
`

const Dropdown = styled.div<{ visible: boolean }>`
  position: absolute;
  width: 100%;
  border-radius: 4px;
  background: ${colorsV2.white};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
  padding: 1.5rem 2rem;
  margin-top: 0.25rem;
  transition: all 0.2s;
  transform: ${(props) =>
    props.visible ? `translateY(0)` : `translateY(-0.25rem)`};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  z-index: 1;
`

const DropdownChoice = styled.button`
  width: 100%;
  background: none;
  border: none;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 1rem;
  color: ${colorsV2.darkgray};
  cursor: pointer;
  text-align: left;
  padding: 0;

  :last-child {
    margin-bottom: 0;
  }

  :hover {
    color: ${colorsV2.violet500};
  }

  :focus {
    outline: none;
  }
`

export const PreviousInsurancePicker: React.FC<Props> = ({ insurances }) => {
  const [dropdownIsVisible, setDropdownIsVisible] = React.useState(false)

  return (
    <Wrapper>
      <Button
        dropdownIsVisible={dropdownIsVisible}
        onClick={() => setDropdownIsVisible(!dropdownIsVisible)}
      >
        <Label>Ditt gamla bolag</Label>
        <Value dropdownIsVisible={dropdownIsVisible}>
          <ValueText>Välj bolag</ValueText>
          <DownArrow />
        </Value>
      </Button>

      <Dropdown visible={dropdownIsVisible}>
        {insurances.map((insurance) => (
          <DropdownChoice key={insurance.name}>{insurance.name}</DropdownChoice>
        ))}
      </Dropdown>
    </Wrapper>
  )
}
