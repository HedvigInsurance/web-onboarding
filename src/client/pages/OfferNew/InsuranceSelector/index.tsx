import React, { useMemo } from 'react'
import { QuoteBundle } from 'src/client/data/graphql'
import { getBundleId } from 'pages/OfferNew/utils'
import { Selector } from './Selector'

// TODO: To be replaced once the new type for variations is in place
interface Variation {
  label?: string
  bundle: QuoteBundle
}

interface Props {
  variations: Variation[]
  selectedQuoteBundle?: QuoteBundle
  onChange: (bundle?: QuoteBundle) => void
}

export const InsuranceSelector: React.FC<Props> = ({
  variations,
  selectedQuoteBundle,
  onChange,
}) => {
  const memoizedQuoteMap = useMemo(() => {
    const quoteMap: Record<string, QuoteBundle> = variations.reduce(
      (acc, { bundle }) => {
        return {
          ...acc,
          [getBundleId(bundle)]: bundle,
        }
      },
      {},
    )
    return quoteMap
  }, [variations])

  const insurances = variations.map(({ label, bundle }) => {
    const {
      displayName,
      bundleCost: {
        monthlyNet: { amount, currency },
      },
    } = bundle
    const bundleId = getBundleId(bundle)
    return {
      id: bundleId,
      label,
      name: displayName,
      price: Math.round(Number(amount)),
      currency,
      selected:
        selectedQuoteBundle && bundleId === getBundleId(selectedQuoteBundle),
    }
  })

  return (
    <Selector
      insurances={insurances}
      onChange={(id: string) => onChange(memoizedQuoteMap[id])}
    />
  )
}
