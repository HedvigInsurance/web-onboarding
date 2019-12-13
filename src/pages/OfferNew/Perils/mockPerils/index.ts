import {
  InsuranceType,
  isApartmentOwner,
  isHouseInsurance,
} from 'utils/insuranceDomainUtils'
import { Peril } from '../types'
import { brfPerils as enBrfPerils } from './en/brf'
import { housePerils as enHousePerils } from './en/house'
import { rentPerils as enRentPerils } from './en/rent'
import { brfPerils as svBrfPerils } from './sv/brf'
import { housePerils as svHousePerils } from './sv/house'
import { rentPerils as svRentPerils } from './sv/rent'

export const getMockPerils = (
  insuranceType: InsuranceType,
  language: 'sv-SE' | 'en-SE',
): Peril[] => {
  if (language === 'sv-SE') {
    if (isHouseInsurance(insuranceType)) {
      return svHousePerils
    }

    if (isApartmentOwner(insuranceType)) {
      return svBrfPerils
    }

    return svRentPerils
  }
  if (isHouseInsurance(insuranceType)) {
    return enHousePerils
  }

  if (isApartmentOwner(insuranceType)) {
    return enBrfPerils
  }

  return enRentPerils
}
