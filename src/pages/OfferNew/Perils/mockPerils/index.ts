import {
  InsuranceType,
  isApartmentOwner,
  isHouseInsurance,
} from 'utils/insuranceDomainUtils'
import { Peril } from '../types'
import { brfPerils } from './brf'
import { housePerils } from './house'
import { rentPerils } from './rent'

export const getMockPerils = (insuranceType: InsuranceType): Peril[] => {
  if (isHouseInsurance(insuranceType)) {
    return housePerils
  }

  if (isApartmentOwner(insuranceType)) {
    return brfPerils
  }

  return rentPerils
}
