import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import { DownArrow } from '../../../../components/icons/DownArrow'
import { CompanyProperties } from '../../types'

interface Props {
  insurances: CompanyProperties[]
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

const Value = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  svg {
    width: 0.875rem;
    height: 0.875rem;
    fill: ${colorsV2.gray};
    margin-left: 0.75rem;
  }
`

const ValueText = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  text-align: right;
  color: ${colorsV2.semilightgray};
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
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`

export const PreviousInsurancePicker: React.FC<Props> = ({ insurances }) => {
  const [dropdownIsVisible, setDropdownIsVisible] = React.useState(false)
  console.log(insurances)
  return (
    <Wrapper>
      <Button
        dropdownIsVisible={dropdownIsVisible}
        onClick={() => setDropdownIsVisible(!dropdownIsVisible)}
      >
        <Label>Ditt gamla bolag</Label>
        <Value>
          <ValueText>Välj bolag</ValueText>
          <DownArrow />
        </Value>
      </Button>

      <Dropdown visible={dropdownIsVisible}></Dropdown>
    </Wrapper>
  )
}
