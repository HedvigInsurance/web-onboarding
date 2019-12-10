import { Query } from 'generated/graphql'

export interface OfferData {
  quote: Query['quote']
  redeemedCampaigns: Query['redeemedCampaigns']
  member: Query['member']
}
