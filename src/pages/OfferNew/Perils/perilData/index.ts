import {
  InsuranceType,
  isApartmentOwner,
  isHouseInsurance,
} from 'utils/insuranceDomainUtils'
import { Peril } from '../types'

export const getLocalizedPerils = async (
  insuranceType: InsuranceType,
  language: 'sv-SE' | 'en-SE',
): Promise<ReadonlyArray<Peril>> => {
  if (language === 'sv-SE') {
    if (isHouseInsurance(insuranceType)) {
      const { housePerils } = await import('./sv/house')
      return housePerils
    }

    if (isApartmentOwner(insuranceType)) {
      const { brfPerils } = await import('./sv/brf')
      return brfPerils
    }

    const { rentPerils } = await import('./sv/rent')
    return rentPerils
  } else {
    if (isHouseInsurance(insuranceType)) {
      const { housePerils } = await import('./en/house')
      return housePerils
    }

    if (isApartmentOwner(insuranceType)) {
      const { brfPerils } = await import('./en/brf')
      return brfPerils
    }

    const { rentPerils } = await import('./en/rent')
    return rentPerils
  }
}
