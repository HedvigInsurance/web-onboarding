import { CookieStorage } from 'cookie-storage'

const CAMPAIGN_CODE_COOKIE_KEY = '_hvcode'

const cookieStorage = new CookieStorage()

const getPersistedCampaignCode = () => {
  return cookieStorage.getItem(CAMPAIGN_CODE_COOKIE_KEY)
}

const saveCampaignCode = (campaignCode: string) => {
  cookieStorage.setItem(CAMPAIGN_CODE_COOKIE_KEY, campaignCode)
}

const removeCampaignCode = () => {
  cookieStorage.removeItem(CAMPAIGN_CODE_COOKIE_KEY)
}

export const CampaignCode = {
  get: getPersistedCampaignCode,
  save: saveCampaignCode,
  remove: removeCampaignCode,
}
