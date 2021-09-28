import React, { useMemo } from 'react'
import { QuoteBundleVariant } from 'src/client/data/graphql'
import { Selector } from './Selector'

interface Variation {
  label?: string
  bundle: QuoteBundleVariant
}

interface Props {
  variations: Variation[]
  selectedQuoteBundle?: QuoteBundleVariant
  onChange: (bundle?: QuoteBundleVariant) => void
}

export const InsuranceSelector: React.FC<Props> = ({
  variations,
  selectedQuoteBundle,
  onChange,
}) => {
  const memoizedQuoteMap = useMemo(() => {
    const quoteMap: Record<string, QuoteBundleVariant> = variations.reduce(
      (acc, { bundle }) => {
        return {
          ...acc,
          [bundle.id]: bundle,
        }
      },
      {},
    )
    return quoteMap
  }, [variations])

  const insurances = variations.map(({ label, bundle }) => {
    const {
      id: bundleId,
      bundle: {
        displayName,
        bundleCost: {
          monthlyNet: { amount, currency },
          monthlyGross: { amount: grossAmount, currency: grossCurrency },
        },
      },
    } = bundle

    return {
      id: bundleId,
      label,
      name: displayName,
      price: `${Math.round(Number(amount))} ${currency}`,
      fullPrice:
        amount !== grossAmount
          ? `${Math.round(Number(grossAmount))} ${grossCurrency}`
          : undefined,
      selected: selectedQuoteBundle && bundleId === selectedQuoteBundle.id,
    }
  })

  return (
    <Selector
      insurances={insurances}
      onChange={(id: string) => onChange(memoizedQuoteMap[id])}
    />
  )
}
