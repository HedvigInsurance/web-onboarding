import { FormikHelpers } from 'formik'
import { useHistory, useLocation } from 'react-router'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { ReferrerNameDocument, useRedeemCodeV2Mutation } from 'data/graphql'
import { stripTrailingCharacter } from 'utils/misc'
import { captureSentryError } from 'utils/sentry-client'
import { RedeemCodeFormValue } from './components/RedeemCode'

export const getSuccessPath = (
  locationPathname: string,
  code: RedeemCodeFormValue['code'],
) => {
  if (!locationPathname.includes('forever')) {
    throw new Error('The path should include the word "forever"')
  }

  const pathWithoutTrailingSlash = stripTrailingCharacter('/', locationPathname)
  const pathSplit = pathWithoutTrailingSlash.split('/')
  const lastWordInPath = pathSplit[pathSplit.length - 1]

  if (lastWordInPath === code) {
    return pathWithoutTrailingSlash
  }
  if (lastWordInPath !== 'forever') {
    return `${pathWithoutTrailingSlash.split('forever')[0]}forever/${code}`
  }
  return `${pathWithoutTrailingSlash}/${code}`
}

export const useRedeemCode = () => {
  const [redeemCode] = useRedeemCodeV2Mutation({
    refetchQueries: () => [
      {
        query: ReferrerNameDocument,
      },
    ],
    // TODO put 👇 back when apollo has a solution to infinite spinner on errors in refetch queries
    // awaitRefetchQueries: true,
  })
  const locale = useCurrentLocale()
  const history = useHistory()
  const { pathname } = useLocation()

  const handleSubmit = async (
    form: RedeemCodeFormValue,
    actions: FormikHelpers<RedeemCodeFormValue>,
  ) => {
    const { code } = form

    try {
      const result = await redeemCode({ variables: { code } })
      if (!result) {
        return
      }

      switch (result.data?.redeemCodeV2.__typename) {
        case 'SuccessfulRedeemResult':
          if (
            result.data.redeemCodeV2.campaigns[0]?.incentive?.__typename ===
            'MonthlyCostDeduction'
          ) {
            const successPath = getSuccessPath(pathname, code)
            history.push(`${successPath}/intro`)
          } else {
            history.push(`/${locale}/new-member`)
          }
          return
        case 'CannotRedeemOwnCampaign':
          actions.setErrors({
            code: 'FOREVER_ERROR_CANNOT_REDEEM_OWN_CAMPAIGN',
          })
          return
        case 'CampaignCannotBeCombinedWithExisting':
          actions.setErrors({
            code: 'FOREVER_ERROR_CAMPAIGN_CANNOT_BE_COMBINED_WITH_EXISTING',
          })
          return
        case 'CampaignHasExpired':
          actions.setErrors({
            code: 'FOREVER_ERROR_CAMPAIGN_HAS_EXPIRED',
          })
          return
        case 'MemberIsNotEligibleForCampaign':
          actions.setErrors({
            code: 'FOREVER_ERROR_MEMBER_IS_NOT_ELIGIBLE_FOR_CAMPAIGN',
          })
          return
        case 'CampaignDoesNotExist':
          actions.setErrors({
            code: 'FOREVER_ERROR_CAMPAIGN_DOES_NOT_EXIST',
          })
          return
        case 'CannotRedeemCampaignFromDifferentMarket':
          actions.setErrors({
            code: 'FOREVER_ERROR_CANNOT_REDEEM_CAMPAIGN_FROM_DIFFERENT_MARKET',
          })
          return
      }

      if (result.errors && result.errors.length > 0) {
        actions.setErrors({ code: 'FOREVER_ERROR_GENERIC' })
        return
      }
    } catch (e) {
      captureSentryError(e)
    }
  }

  return { handleSubmit }
}
