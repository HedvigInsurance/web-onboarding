import {
  InsuranceType,
  isApartmentOwner,
  isStudentInsurance,
  mapToStudentVariant,
  qualifiesForStudentInsurance,
} from './insuranceDomainUtils'

describe('isApartmentOwner()', () => {
  it('returns correctly for all insurance types', () => {
    expect(isApartmentOwner(InsuranceType.Rent)).toBe(false)
    expect(isApartmentOwner(InsuranceType.StudentRent)).toBe(false)
    expect(isApartmentOwner(InsuranceType.Brf)).toBe(true)
    expect(isApartmentOwner(InsuranceType.StudentBrf)).toBe(true)
  })
})

describe('isStudentInsurance()', () => {
  it('return correctly for all insurance types', () => {
    expect(isStudentInsurance(InsuranceType.Rent)).toBe(false)
    expect(isStudentInsurance(InsuranceType.Brf)).toBe(false)
    expect(isStudentInsurance(InsuranceType.StudentRent)).toBe(true)
    expect(isStudentInsurance(InsuranceType.StudentBrf)).toBe(true)
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
    expect(mapToStudentVariant(InsuranceType.Rent)).toBe(
      InsuranceType.StudentRent,
    )
  })

  it('maps regular brf to student brf', () => {
    expect(mapToStudentVariant(InsuranceType.Brf)).toBe(
      InsuranceType.StudentBrf,
    )
  })

  it('Does not accept other variants', () => {
    expect(() => mapToStudentVariant(InsuranceType.StudentRent)).toThrow()
    expect(() => mapToStudentVariant(InsuranceType.StudentBrf)).toThrow()
  })
})
