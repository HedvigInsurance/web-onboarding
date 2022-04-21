import { GraphQLError } from 'graphql'
import { LimitCode } from 'api/quoteBundleErrorSelectors'

export const checkIsManualReviewRequired = (errors: GraphQLError[]) => {
  const manualReviewRequiredError = errors.find((error) => {
    return error?.extensions?.body?.errorCode === 'MANUAL_REVIEW_REQUIRED'
  })

  return manualReviewRequiredError !== undefined
}

export const isSsnInvalid = (errors: GraphQLError[]) => {
  const invalidSsnError = errors.find((error) => {
    return error?.extensions?.body?.errorCode === LimitCode.INVALID_SSN
  })

  return invalidSsnError !== undefined
}
