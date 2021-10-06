import React from 'react'
import { useMarket, Market } from 'components/utils/CurrentLocale'
import { DanishDetails } from './DanishDetails'
import { NorwegianDetails } from './NorwegianDetails'
import { SwedishDetails } from './SwedishDetails'
import { DetailsProps } from './types'

export const Details: React.FC<DetailsProps> = ({
  fieldSchema,
  formikProps,
  offerQuote,
}) => {
  const market = useMarket()
  return (
    <>
      {market === Market.Se && (
        <SwedishDetails
          fieldSchema={fieldSchema}
          formikProps={formikProps}
          offerQuote={offerQuote}
        />
      )}
      {market === Market.No && (
        <NorwegianDetails
          fieldSchema={fieldSchema}
          formikProps={formikProps}
          offerQuote={offerQuote}
        />
      )}
      {market === Market.Dk && (
        <DanishDetails
          fieldSchema={fieldSchema}
          formikProps={formikProps}
          offerQuote={offerQuote}
        />
      )}
    </>
  )
}
