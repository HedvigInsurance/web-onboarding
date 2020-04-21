import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { CircleTick } from 'components/icons/CircleTick'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { Column } from '../components'

const UspsColumn = styled(Column)`
  justify-content: center;
  margin-bottom: 2rem;
`

const UspsContainer = styled.ul`
  font-size: 1.5rem;
  line-height: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${colorsV3.white};
  font-weight: 300;

  @media (max-width: 600px) {
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
`

const Usp = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin: 0;
  line-height: 1;
`

const TickWrapper = styled.div`
  width: 2em;
  height: 2em;
  margin-right: 1em;
  flex-shrink: 0;
`

export const Usps = () => {
  const textKeys = useTextKeys()

  return (
    <UspsColumn>
      <UspsContainer>
        <Usp>
          <TickWrapper>
            <CircleTick />
          </TickWrapper>
          {textKeys.OFFER_USPS_USP_0()}
        </Usp>
        <Usp>
          <TickWrapper>
            <CircleTick />
          </TickWrapper>
          {textKeys.OFFER_USPS_USP_1()}
        </Usp>
        <Usp>
          <TickWrapper>
            <CircleTick />
          </TickWrapper>
          {textKeys.OFFER_USPS_USP_2()}
        </Usp>
      </UspsContainer>
    </UspsColumn>
  )
}
