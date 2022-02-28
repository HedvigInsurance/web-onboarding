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
  ADTRACTION_CONTRACT_VALUES,
} from './adtraction'

describe('getBundleAdtractionProductValue', () => {
  it('returns correct swedish adTraction Product', () => {
    expect(getBundleAdtractionProductValue(seApartementBrf)).toBe(
      ADTRACTION_CONTRACT_VALUES.SE_APARTMENT_BRF,
    )
    expect(getBundleAdtractionProductValue(seApartmentBrfAccident)).toBe(
      ADTRACTION_CONTRACT_VALUES.SE_ACCIDENT_BUNDLE_BRF,
    )
  })

  it('returns correct no adTraction Product', () => {
    expect(getBundleAdtractionProductValue(noCombo)).toBe(
      ADTRACTION_CONTRACT_VALUES.NO_COMBO,
    )
    expect(getBundleAdtractionProductValue(noComboYouth)).toBe(
      ADTRACTION_CONTRACT_VALUES.NO_COMBO_YOUTH,
    )
    expect(getBundleAdtractionProductValue(noTravel)).toBe(
      ADTRACTION_CONTRACT_VALUES.NO_TRAVEL,
    )
  })

  it('returns correct danish adTraction Product', () => {
    expect(getBundleAdtractionProductValue(dkHomeContentOwn)).toBe(
      ADTRACTION_CONTRACT_VALUES.DK_HOME_CONTENT_OWN,
    )
    expect(getBundleAdtractionProductValue(dkHomeContentAccidentTravel)).toBe(
      ADTRACTION_CONTRACT_VALUES.DK_TRAVEL_BUNDLE,
    )
  })
})
