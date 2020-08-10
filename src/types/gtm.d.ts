declare global {
  interface Window {
    dataLayer?: object[]
  }
}

interface OfferData {
  insurance_type: TypeOfContract
  campaign_code: 'yes' | 'no'
  number_of_people: number
  insurance_price: number
}

export interface DataLayerObject {
  event: string
  offerData?: OfferData
}
