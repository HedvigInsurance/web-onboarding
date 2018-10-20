import {
  InsuranceType,
  isApartmentOwner,
  isStudentInsurance,
  mapToStudentVariant,
  qualifiesForStudentInsurance,
} from './insuranceDomainUtils'

describe('isApartmentOwner()', () => {
  it('returns correctly for all insurance types', () => {
    expect(isApartmentOwner(InsuranceType.RENT)).toBe(false)
    expect(isApartmentOwner(InsuranceType.STUDENT_RENT)).toBe(false)
    expect(isApartmentOwner(InsuranceType.BRF)).toBe(true)
    expect(isApartmentOwner(InsuranceType.STUDENT_BRF)).toBe(true)
  })
})

describe('isStudentInsurance()', () => {
  it('return correctly for all insurance types', () => {
    expect(isStudentInsurance(InsuranceType.RENT)).toBe(false)
    expect(isStudentInsurance(InsuranceType.BRF)).toBe(false)
    expect(isStudentInsurance(InsuranceType.STUDENT_RENT)).toBe(true)
    expect(isStudentInsurance(InsuranceType.STUDENT_BRF)).toBe(true)
  })
})

describe('qualifiesForStudentInsurance()', () => {
  it('disqualifies people over 30 years old', () => {
    expect(
      qualifiesForStudentInsurance({
        age: 35,
        squareMeters: 40,
        numberOfPeople: 2,
      }),
    ).toBe(false)
    expect(
      qualifiesForStudentInsurance({
        age: 35,
        squareMeters: 55,
        numberOfPeople: 4,
      }),
    ).toBe(false)
    expect(
      qualifiesForStudentInsurance({
        age: 35,
        squareMeters: 55,
        numberOfPeople: 1,
      }),
    ).toBe(false)
  })

  it('disqualifies people with apartments > 50 sqm', () => {
    expect(
      qualifiesForStudentInsurance({
        age: 20,
        squareMeters: 55,
        numberOfPeople: 2,
      }),
    ).toBe(false)
    expect(
      qualifiesForStudentInsurance({
        age: 20,
        squareMeters: 55,
        numberOfPeople: 3,
      }),
    ).toBe(false)
    expect(
      qualifiesForStudentInsurance({
        age: 30,
        squareMeters: 55,
        numberOfPeople: 5,
      }),
    ).toBe(false)
  })

  it('disqualifies apartments with > 2 people', () => {
    expect(
      qualifiesForStudentInsurance({
        age: 20,
        squareMeters: 30,
        numberOfPeople: 3,
      }),
    ).toBe(false)
    expect(
      qualifiesForStudentInsurance({
        age: 20,
        squareMeters: 55,
        numberOfPeople: 3,
      }),
    ).toBe(false)
    expect(
      qualifiesForStudentInsurance({
        age: 35,
        squareMeters: 55,
        numberOfPeople: 3,
      }),
    ).toBe(false)
  })

  it('qualifies people who meet all conditions', () => {
    expect(
      qualifiesForStudentInsurance({
        age: 25,
        squareMeters: 25,
        numberOfPeople: 1,
      }),
    ).toBe(true)
    expect(
      qualifiesForStudentInsurance({
        age: 18,
        squareMeters: 35,
        numberOfPeople: 2,
      }),
    ).toBe(true)
    expect(
      qualifiesForStudentInsurance({
        age: 29,
        squareMeters: 49,
        numberOfPeople: 2,
      }),
    ).toBe(true)
  })
})

describe('mapToStudentVariant()', () => {
  it('maps regular rent to student rent', () => {
    expect(mapToStudentVariant(InsuranceType.RENT)).toBe(
      InsuranceType.STUDENT_RENT,
    )
  })

  it('maps regular brf to student brf', () => {
    expect(mapToStudentVariant(InsuranceType.BRF)).toBe(
      InsuranceType.STUDENT_BRF,
    )
  })

  it('Does not accept other variants', () => {
    expect(() => mapToStudentVariant(InsuranceType.STUDENT_RENT)).toThrow()
    expect(() => mapToStudentVariant(InsuranceType.STUDENT_BRF)).toThrow()
  })
})
