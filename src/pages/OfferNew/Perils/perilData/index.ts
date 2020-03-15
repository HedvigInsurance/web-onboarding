import {
  InsuranceType,
  isApartmentOwner,
  isHouseInsurance,
} from 'utils/insuranceDomainUtils'
import { Peril } from '../types'

export const getLocalizedPerils = async (
  insuranceType: InsuranceType,
  locale: string,
): Promise<ReadonlyArray<Peril>> => {
  if (locale === 'sv-SE') {
    if (isHouseInsurance(insuranceType)) {
      const { housePerils } = await import(
        /* webpackChunkName: 'peril-sv-house' */ './sv/house'
      )
      return housePerils
    }

    if (isApartmentOwner(insuranceType)) {
      const { brfPerils } = await import(
        /* webpackChunkName: 'peril-sv-brf' */ './sv/brf'
      )
      return brfPerils
    }

    const { rentPerils } = await import(
      /* webpackChunkName: 'peril-sv-rent' */ './sv/rent'
    )
    return rentPerils
  } else {
    if (isHouseInsurance(insuranceType)) {
      const { housePerils } = await import(
        /* webpackChunkName: 'peril-en-house' */ './en/house'
      )
      return housePerils
    }

    if (isApartmentOwner(insuranceType)) {
      const { brfPerils } = await import(
        /* webpackChunkName: 'peril-en-brf' */ './en/brf'
      )
      return brfPerils
    }

    const { rentPerils } = await import(
      /* webpackChunkName: 'peril-en-rent' */ './en/rent'
    )
    return rentPerils
  }
}
