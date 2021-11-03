import {
  seApartementBrf,
  seApartmentBrfAccident,
  noCombo,
  noComboYouth,
  noTravel,
  dkHomeContentOwn,
  dkHomeContentAccidentTravel,
} from 'utils/testData/offerDataMock'
import {
  getBundleAdtractionProductValue,
  adtractionContractValues,
} from './adtraction'

describe('getBundleAdtractionProductValue', () => {
  it('returns correct swedish adTraction Product', () => {
    expect(getBundleAdtractionProductValue(seApartementBrf)).toBe(
      adtractionContractValues.SE_APARTMENT_BRF,
    )
    expect(getBundleAdtractionProductValue(seApartmentBrfAccident)).toBe(
      adtractionContractValues.SE_ACCIDENT_BUNDLE_BRF,
    )
  })

  it('returns correct no adTraction Product', () => {
    expect(getBundleAdtractionProductValue(noCombo)).toBe(
      adtractionContractValues.NO_COMBO,
    )
    expect(getBundleAdtractionProductValue(noComboYouth)).toBe(
      adtractionContractValues.NO_COMBO_YOUTH,
    )
    expect(getBundleAdtractionProductValue(noTravel)).toBe(
      adtractionContractValues.NO_TRAVEL,
    )
  })

  it('returns correct danish adTraction Product', () => {
    expect(getBundleAdtractionProductValue(dkHomeContentOwn)).toBe(
      adtractionContractValues.DK_HOME_CONTENT_OWN,
    )
    expect(getBundleAdtractionProductValue(dkHomeContentAccidentTravel)).toBe(
      adtractionContractValues.DK_TRAVEL_BUNDLE,
    )
  })
})
