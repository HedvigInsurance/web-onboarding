import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Tooltip } from 'components/Tooltip'
import { InsurableLimit } from 'data/graphql'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

interface Props {
  insurableLimits: ReadonlyArray<InsurableLimit>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.5rem;

  @media (max-width: 600px) {
    flex-flow: row wrap;
    justify-content: space-between;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 2rem;
  margin-bottom: 2rem;
  align-items: flex-end;

  @media (max-width: 800px) {
    margin-right: 3rem;
  }

  @media (max-width: 700px) {
    margin-right: 2rem;
  }

  @media (max-width: 600px) {
    width: 50%;
    margin-right: 0;
    margin-bottom: 2.5rem;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 7rem;
  width: 100%;
`

const Label = styled.div`
  font-size: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV3.gray500};
  margin-bottom: 0.25rem;
`

const Value = styled.div`
  font-size: 1.125rem;
  letter-spacing: -0.26px;
  color: ${colorsV3.gray900};
  white-space: nowrap;
`

const TooltipWrapper = styled.div`
  margin-left: 0.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`

export const Limits: React.FC<Props> = ({ insurableLimits }) => {
  const textKeys = useTextKeys()
  return (
    <Wrapper>
      {Object.entries(insurableLimits).map(([key, insuranceValue]) => {
        return (
          <Container key={key}>
            <TextContainer>
              <Label>{textKeys[insuranceValue.label]()}</Label>
              <Value>{textKeys[insuranceValue.limit]()}</Value>
            </TextContainer>

            <TooltipWrapper>
              <Tooltip
                size="lg"
                body={textKeys[insuranceValue.description]()}
              />
            </TooltipWrapper>
          </Container>
        )
      })}
    </Wrapper>
  )
}
