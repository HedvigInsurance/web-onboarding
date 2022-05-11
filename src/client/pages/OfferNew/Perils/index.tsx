import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import * as changeCase from 'change-case'
import {
  Body,
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
} from 'pages/OfferNew/components'
import { PerilRow } from 'pages/OfferNew/Perils/PerilRow'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { pushToGTMDataLayer } from 'utils/tracking/gtm/dataLayer'
import { BundledQuote, QuoteBundleVariant } from 'data/graphql'
import { TabItem, Tabs } from '../Tabs/Tabs'

interface Props {
  variants: QuoteBundleVariant[]
}

const Wrapper = styled.div`
  padding: 5rem 0 5rem;
  background-color: ${colorsV3.gray100};
  display: flex;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding: 7.5rem 0 5rem 0;
  }
`

export const Perils = ({ variants }: Props) => {
  const textKeys = useTextKeys()

  const tabItems = React.useMemo(
    () =>
      variants
        .reduce((accumulated, variant) => {
          return accumulated.concat(variant.bundle.quotes)
        }, ([] as unknown) as BundledQuote[])
        // remove duplicates
        .filter(
          (quote, index, allQuotes) =>
            index === allQuotes.findIndex((q) => q.id === quote.id),
        )
        .map(
          (quote) =>
            ({
              id: quote.id,
              name: quote.displayName,
              content: <PerilRow quote={quote} />,
            } as TabItem),
        ),
    [variants],
  )

  const handleChangeTab = (name: string) => {
    pushToGTMDataLayer({
      event: 'perils_tab_click',
      eventData: { type: changeCase.snakeCase(name) },
    })
  }

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <HeadingBlack>{textKeys.COVERAGE_HEADLINE()}</HeadingBlack>
            <Body>{textKeys.COVERAGE_BODY()}</Body>
          </HeadingWrapper>
          <Tabs items={tabItems} onChange={handleChangeTab} />
        </Column>
        <ColumnSpacing />
      </Container>
    </Wrapper>
  )
}
