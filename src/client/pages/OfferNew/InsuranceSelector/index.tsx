import React, { useMemo } from 'react'
import { QuoteBundleVariant } from 'src/client/data/graphql'
import { Selector } from './Selector'

interface Props {
  variants: QuoteBundleVariant[]
  selectedQuoteBundle?: QuoteBundleVariant
  onChange: (bundle?: QuoteBundleVariant) => void
}

export const InsuranceSelector: React.FC<Props> = ({
  variants,
  selectedQuoteBundle,
  onChange,
}) => {
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
    <Selector
      insurances={insurances}
      onChange={(id: string) => onChange(variantMap[id])}
    />
  )
}
