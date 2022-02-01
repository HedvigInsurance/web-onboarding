import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

export const Content = styled.div`
  @media (max-width: 800px) {
    width: 100%;
    margin: 1.5rem 0 0 0;
    flex-direction: column;
  }
  width: calc(100% + 2rem);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 -1rem;
  margin-top: 2.5rem;
`

export const ContentColumn = styled.div`
  @media (max-width: 800px) {
    width: 100%;
    margin: 0 0 2rem 0;

    :last-child {
      margin-bottom: 0;
    }
  }
  width: calc(50% - 2rem);
  margin: 0 1rem;
`
export const ContentRow = styled(ContentColumn)`
  width: 100%;
`

export const ContentColumnTitle = styled.div`
  @media (max-width: 800px) {
    padding: 0;
  }
  font-size: 1rem;
  color: ${colorsV3.gray500};
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 2rem;
`

export const ContentColumnTitleButton = styled.button`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  color: ${colorsV3.gray500};
  border-radius: 24px;
  border: 1px solid ${colorsV3.gray500};
  cursor: pointer;
  transition: all 250ms;
  background: none;

  :focus {
    outline: none;
  }

  :hover {
    color: ${colorsV3.gray900};
    border-color: ${colorsV3.gray900};
  }
`
