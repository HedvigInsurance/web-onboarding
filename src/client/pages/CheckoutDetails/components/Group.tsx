import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

const { gray300 } = colorsV3

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${gray300};
`
