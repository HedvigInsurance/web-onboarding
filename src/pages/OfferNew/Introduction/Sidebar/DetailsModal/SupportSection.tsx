import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { InfoIcon } from 'components/icons/Info'

const Wrapper = styled.div`
  background: ${colorsV2.offwhite};
  border-radius: 8px;
  padding: 1rem 1.5rem 1rem 1.25rem;
  display: flex;
  flex-direction: row;
`

const IconWrapper = styled.div`
  margin-right: 1rem;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Headline = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colorsV2.black};
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Body = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colorsV2.darkgray};
`

const Button = styled.button`
  margin-top: 1.375rem;
  border-radius: 24px;
  border: 1px solid ${colorsV2.gray};
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
  color: ${colorsV2.gray};
  padding: 0.375rem 1.5rem;
  transition: all 200ms;

  :focus {
    outline: none;
  }

  :hover {
    color: ${colorsV2.darkgray};
    border-color: ${colorsV2.darkgray};
  }
`

export const SupportSection: React.FC<{}> = () => (
  <Wrapper>
    <IconWrapper>
      <InfoIcon />
    </IconWrapper>
    <Content>
      <Headline>Frågor?</Headline>
      <Body>
        Har några funderingar kring din information så kan du alltid skriva till
        oss!
      </Body>
      <Button>Ställ en fråga</Button>
    </Content>
  </Wrapper>
)
