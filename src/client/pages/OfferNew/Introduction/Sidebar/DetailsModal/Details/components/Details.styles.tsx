import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'

export const Content = styled.div`
  width: calc(100% + 2rem);
  display: flex;
  flex-direction: row;
  margin: 0 -1rem;
  margin-top: 2.5rem;

  @media (max-width: 800px) {
    width: 100%;
    margin: 1.5rem 0 0 0;
    flex-direction: column;
  }
`

export const ContentColumn = styled.div`
  width: calc(50% - 2rem);
  margin: 0 1rem;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0 0 2rem 0;

    :last-child {
      margin-bottom: 0;
    }
  }
`

export const ContentColumnTitle = styled.div`
  font-size: 1rem;
  color: ${colorsV2.gray};
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 2rem;

  @media (max-width: 800px) {
    padding: 0;
  }
`

export const ContentColumnTitleButton = styled.button`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  color: ${colorsV2.gray};
  border-radius: 24px;
  border: 1px solid ${colorsV2.gray};
  cursor: pointer;
  transition: all 250ms;
  background: none;

  :focus {
    outline: none;
  }

  :hover {
    color: ${colorsV2.darkgray};
    border-color: ${colorsV2.darkgray};
  }
`
