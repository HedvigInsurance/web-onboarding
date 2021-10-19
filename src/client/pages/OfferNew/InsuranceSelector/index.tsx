import React, { useMemo } from 'react'
import { QuoteBundleVariant } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import {
  ContainerWrapper,
  Container,
  Column,
  HeadingWrapper,
  HeadingBlack,
  Body,
  ColumnSpacing,
} from '../components'
import { Selector } from './Selector'

interface Props {
  variants: QuoteBundleVariant[]
  selectedQuoteBundle?: QuoteBundleVariant
  onChange: (bundle: QuoteBundleVariant) => void
}

export const InsuranceSelector: React.FC<Props> = ({
  variants,
  selectedQuoteBundle,
  onChange,
}) => {
  const textKeys = useTextKeys()
  const variantMap = useMemo(
    () =>
      variants.reduce<Record<string, QuoteBundleVariant>>(
        (acc, variant) => ({ ...acc, [variant.id]: variant }),
        {},
      ),
    [variants],
  )

  const insurances = variants.map(({ id, tag, bundle }) => {
    const {
      displayName,
      bundleCost: {
        monthlyNet: { amount, currency },
        monthlyGross: { amount: grossAmount, currency: grossCurrency },
      },
    } = bundle

    return {
      id,
      label: tag ?? undefined,
      name: displayName,
      price: `${Math.round(Number(amount))} ${currency}`,
      grossPrice:
        amount !== grossAmount
          ? `${Math.round(Number(grossAmount))} ${grossCurrency}`
          : undefined,
      selected: selectedQuoteBundle && id === selectedQuoteBundle.id,
    }
  })

  return (
    <ContainerWrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <HeadingBlack>
              {textKeys.OFFER_BUNDLE_SELECTOR_TITLE()}
            </HeadingBlack>
            <Body>{textKeys.OFFER_BUNDLE_SELECTOR_DESCRIPTION()}</Body>
          </HeadingWrapper>
          <Selector
            insurances={insurances}
            onChange={(id: string) => {
              const variant = variantMap[id]
              variant && onChange(variant)
            }}
          />
        </Column>
        <ColumnSpacing />
      </Container>
    </ContainerWrapper>
  )
}
