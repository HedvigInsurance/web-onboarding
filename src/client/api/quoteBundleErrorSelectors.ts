import { QuoteBundleError, CreateQuoteBundleMutation } from 'data/graphql'

// Underwriter limit codes
// https://github.com/HedvigInsurance/underwriter/blob/master/src/main/kotlin/com/hedvig/underwriter/service/guidelines/BreachedGuidelinesCodes.kt
export enum LimitCode {
  INVALID_SSN = 'INVALID_SSN',
  INVALID_SSN_LENGTH = 'INVALID_SSN_LENGTH',
  SSN_DOES_NOT_MATCH_BIRTH_DATE = 'SSN_DOES_NOT_MATCH_BIRTH_DATE',

  INVALID_BIRTHDATE = 'INVALID_BIRTHDATE',
  UNDERAGE = 'UNDERAGE',
  DEBT_CHECK = 'DEBT_CHECK',

  NEGATIVE_NUMBER_OF_CO_INSURED = 'NEGATIVE_NUMBER_OF_CO_INSURED',
  TOO_SMALL_LIVING_SPACE = 'TOO_SMALL_LIVING_SPACE',
  TOO_HIGH_NUMBER_OF_CO_INSURED = 'TOO_HIGH_NUMBER_OF_CO_INSURED',
  TOO_MUCH_LIVING_SPACE = 'TOO_MUCH_LIVING_SPACE',
  YOUTH_TOO_HIGH_NUMBER_OF_CO_INSURED = 'YOUTH_TOO_HIGH_NUMBER_OF_CO_INSURED',

  TOO_SMALL_NUMBER_OF_HOUSE_HOLD_SIZE = 'TOO_SMALL_NUMBER_OF_HOUSE_HOLD_SIZE',
  TOO_HIGH_NUMBER_OF_HOUSE_HOLD_SIZE = 'TOO_HIGH_NUMBER_OF_HOUSE_HOLD_SIZE',

  TOO_EARLY_YEAR_OF_CONSTRUCTION = 'TOO_EARLY_YEAR_OF_CONSTRUCTION',
  TOO_MANY_EXTRA_BUILDINGS = 'TOO_MANY_EXTRA_BUILDINGS',
  TOO_BIG_EXTRA_BUILDING_SIZE = 'TOO_BIG_EXTRA_BUILDING_SIZE',
  TOO_SMALL_EXTRA_BUILDING_SIZE = 'TOO_SMALL_EXTRA_BUILDING_SIZE',

  STUDENT_TOO_BIG_HOUSE_HOLD_SIZE = 'STUDENT_TOO_BIG_HOUSE_HOLD_SIZE',
  STUDENT_TOO_MUCH_LIVING_SPACE = 'STUDENT_TOO_MUCH_LIVING_SPACE',
  STUDENT_OVERAGE = 'STUDENT_OVERAGE',

  YOUTH_TOO_MUCH_LIVING_SPACE = 'YOUTH_TOO_MUCH_LIVING_SPACE',
  YOUTH_OVERAGE = 'YOUTH_OVERAGE',
  INVALID_STARTDATE = 'INVALID_STARTDATE',
}

export function isQuoteBundleError(
  quoteCartMutationResult: CreateQuoteBundleMutation['quoteCart_createQuoteBundle'],
): quoteCartMutationResult is QuoteBundleError {
  return quoteCartMutationResult.__typename === 'QuoteBundleError'
}

export function getLimitsHit(
  createQuoteBundleMutation: CreateQuoteBundleMutation | null | undefined,
) {
  if (
    createQuoteBundleMutation &&
    isQuoteBundleError(createQuoteBundleMutation.quoteCart_createQuoteBundle)
  )
    return createQuoteBundleMutation.quoteCart_createQuoteBundle.limits || []

  return []
}

export function isLimitHit(
  createQuoteBundleMutation: CreateQuoteBundleMutation | null | undefined,
) {
  if (
    createQuoteBundleMutation &&
    isQuoteBundleError(createQuoteBundleMutation.quoteCart_createQuoteBundle)
  ) {
    return createQuoteBundleMutation.quoteCart_createQuoteBundle.limits?.length
  }

  return false
}
