import React from 'react'
import styled from '@emotion/styled'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTextKeys } from 'utils/textKeys'
import { HeadingXS } from '../../components'
import AmountItem from './AmountItem'

const Container = styled.div`
  display: grid;
  gap: 0.75rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    gap: 1.5rem;
  }
`

const Grid = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`

export interface AmountItemData {
  key: string
  label: string
  value: string
}

type AmountCollectionType = React.FC<{ items: Array<AmountItemData> }>

const AmountCollection: AmountCollectionType = ({ items }) => {
  const textKeys = useTextKeys()

  return (
    <Container>
      <HeadingXS>{textKeys.COVERAGE_INFO_HEADLINE()}</HeadingXS>
      <Grid>
        {items.map((item) => (
          <AmountItem key={item.key}>
            <AmountItem.Label>{item.label}</AmountItem.Label>
            <AmountItem.Value>{item.value}</AmountItem.Value>
          </AmountItem>
        ))}
      </Grid>
    </Container>
  )
}

export default AmountCollection
