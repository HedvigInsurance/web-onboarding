import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { useRedeemCodeV2Mutation } from 'data/graphql'
import { FormikHelpers } from 'formik'
import { useHistory, useLocation } from 'react-router'
import { stripTrailingCharacter } from 'utils/misc'
import { captureSentryError } from 'utils/sentry-client'
import { RedeemCodeFormValue } from './components/RedeemCode'

export const useRedeemCode = () => {
  const [redeemCode] = useRedeemCodeV2Mutation()
  const locale = useCurrentLocale()
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = async (
    form: RedeemCodeFormValue,
    actions: FormikHelpers<RedeemCodeFormValue>,
  ) => {
    try {
      const result = await redeemCode({ variables: { code: form.code } })
      if (!result) {
        return
      }

      switch (result.data?.redeemCodeV2.__typename) {
        case 'SuccessfulRedeemResult':
          if (
            result.data.redeemCodeV2.campaigns[0]?.incentive?.__typename ===
            'MonthlyCostDeduction'
          ) {
            history.push(
              `${stripTrailingCharacter('/', location.pathname)}/intro`,
            )
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
