import React from 'react'
import { useFeature, Features } from 'utils/hooks/useFeature'
import {
  OldProductSelector,
  OldProductSelectorProps,
} from './OldProductSelector'
import {
  NewProductSelector,
  NewProductSelectorProps,
} from './NewProductSelector'

type ProductSelectorProps = OldProductSelectorProps & NewProductSelectorProps

export const ProductSelector = ({
  quoteCartQueryData,
}: ProductSelectorProps) => {
  const [isTravelAccidentStandaloneEnabled] = useFeature([
    Features.OFFER_PAGE_TRAVEL_ACCIDENT_STANDALONE,
  ])

  if (isTravelAccidentStandaloneEnabled) {
    return <NewProductSelector quoteCartQueryData={quoteCartQueryData} />
  }

  return <OldProductSelector quoteCartQueryData={quoteCartQueryData} />
}
