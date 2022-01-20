import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Arrow } from '../Arrow'
import { ForwardArrow } from '../ForwardArrow'
import { BackArrow } from '../BackArrow'
import { Checkmark } from '../Checkmark'
import { CheckmarkCircle } from '../CheckmarkCircle'
import { Cross } from '../Cross'
import { Crossmark } from '../Crossmark'
import { HedvigLogo } from '../HedvigLogo'
import { HedvigSymbol } from '../HedvigSymbol'
import { InfoIcon } from '../Info'
import { WarningIcon } from '../Warning'
import { WarningTriangle } from '../WarningTriangle'
import { SelectedOptionCheckmark } from '../SelectedOptionCheckmark'
import { Tick } from '../Tick'
import { Telephone } from '../Telephone'
import { UnselectedOptionCircle } from '../UnselectedOptionCircle'
import { ChevronDown } from '../ChevronDown'

const { gray100, gray300, gray900 } = colorsV3

export type Props = {
  background: 'medium' | 'light' | 'dark'
}

const Container = styled.div<Props>`
  width: 100%;
  padding: 1rem;
  background-color: ${({ background }) =>
    background === 'medium'
      ? gray300
      : background === 'light'
      ? gray100
      : gray900};
  border-radius: 8px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(6, 4.5rem);
`
const IconWrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icons = ({ background }: Props) => {
  return (
    <Container background={background}>
      <IconWrapper title="Arrow, direction 'forward'">
        <Arrow direction="forward" />
      </IconWrapper>
      <IconWrapper title="Arrow, direction 'backward'">
        <Arrow direction="backward" />
      </IconWrapper>
      <IconWrapper title="ForwardArrow">
        <ForwardArrow />
      </IconWrapper>
      <IconWrapper title="BackArrow">
        <BackArrow />
      </IconWrapper>
      <IconWrapper title="ChevronDown">
        <ChevronDown />
      </IconWrapper>
      <IconWrapper title="Cross">
        <Cross />
      </IconWrapper>
      <IconWrapper title="CheckmarkCircle">
        <CheckmarkCircle />
      </IconWrapper>
      <IconWrapper title="SelectedOptionCheckmark">
        <SelectedOptionCheckmark />
      </IconWrapper>
      <IconWrapper title="UnselectedOptionCircle">
        <UnselectedOptionCircle />
      </IconWrapper>
      <IconWrapper title="Checkmark">
        <Checkmark />
      </IconWrapper>
      <IconWrapper title="Crossmark">
        <Crossmark />
      </IconWrapper>
      <IconWrapper title="Info">
        <InfoIcon />
      </IconWrapper>
      <IconWrapper title="Warning">
        <WarningIcon />
      </IconWrapper>
      <IconWrapper title="WarningTriangle">
        <WarningTriangle />
      </IconWrapper>
      <IconWrapper title="Tick">
        <Tick />
      </IconWrapper>
      <IconWrapper title="Telephone">
        <Telephone />
      </IconWrapper>
      <IconWrapper title="HedvigLogo">
        <HedvigLogo width={72} />
      </IconWrapper>
      <IconWrapper title="HedvigSymbol">
        <HedvigSymbol size={24} />
      </IconWrapper>
    </Container>
  )
}
