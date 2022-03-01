import {
  HomeQuoteDetails,
  HouseQuoteDetails,
  QuoteDetails,
  QuoteDetailsData,
} from './quoteDetailsDataTypes'

export type MultipleQuotesDetailsData = {
  quoteDetailsData: QuoteDetailsData
}

export const isHomeQuoteDetailsData = (
  data: QuoteDetails,
): data is HomeQuoteDetails => {
  const isHome = 'street' in data && 'zipCode' in data && 'livingSpace' in data
  return isHome
}

export const isHouseQuoteDetailsData = (
  data: QuoteDetails,
): data is HouseQuoteDetails => {
  const isHouse =
    'ancillaryArea' in data &&
    'yearOfConstruction' in data &&
    'numberOfBathrooms' in data &&
    'isSubleted' in data &&
    'extraBuildings' in data
  return isHouse
}

export const getMainQuoteDetailsData = ({
  quoteDetailsData,
}: MultipleQuotesDetailsData): QuoteDetails => {
  const homeQuoteDetailsData = quoteDetailsData.find((data) => {
    return isHomeQuoteDetailsData(data)
  })

  return homeQuoteDetailsData ? homeQuoteDetailsData : quoteDetailsData[0]
}
