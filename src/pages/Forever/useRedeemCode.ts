import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { useRedeemCodeV2Mutation } from 'data/graphql'
import { FormikHelpers } from 'formik'
import { useHistory } from 'react-router'
import { captureSentryError } from 'utils/sentry-client'
import { RedeemCodeFormValue } from './components/RedeemCode'

export const useRedeemCode = () => {
  const [redeemCode] = useRedeemCodeV2Mutation()
  const locale = useCurrentLocale()
  const history = useHistory()

  const handleSubmit = async (
    form: RedeemCodeFormValue,
    actions: FormikHelpers<RedeemCodeFormValue>,
  ) => {
    try {
      const result = await redeemCode({ variables: { code: form.code } })
      if (!result) {
        return
      }

      if (result.data?.redeemCodeV2.__typename === 'SuccessfulRedeemResult') {
        // TODO redirect to correct success screens
        history.push(`/${locale}/new-member`)
        return
      }
      if (result.data?.redeemCodeV2.__typename === 'CannotRedeemOwnCampaign') {
        actions.setErrors({ code: 'FOREVER_ERROR_CANNOT_REDEEM_OWN_CAMPAIGN' })
        return
      }
      if (
        result.data?.redeemCodeV2.__typename ===
        'CampaignCannotBeCombinedWithExisting'
      ) {
        actions.setErrors({
          code: 'FOREVER_ERROR_CAMPAIGN_CANNOT_BE_COMBINED_WITH_EXISTING',
        })
        return
      }
      if (result.data?.redeemCodeV2.__typename === 'CampaignHasExpired') {
        actions.setErrors({ code: 'FOREVER_ERROR_CAMPAIGN_HAS_EXPIRED' })
        return
      }
      if (
        result.data?.redeemCodeV2.__typename ===
        'MemberIsNotEligibleForCampaign'
      ) {
        actions.setErrors({
          code: 'FOREVER_ERROR_CAMPAIGN_CANNOT_BE_COMBINED_WITH_EXISTING',
        })
        return
      }

      if (result.data?.redeemCodeV2.__typename === 'CampaignDoesNotExist') {
        actions.setErrors({ code: 'FOREVER_ERROR_CAMPAIGN_DOES_NOT_EXIST' })
        return
      }

      if (
        result.data?.redeemCodeV2.__typename ===
        'CannotRedeemCampaignFromDifferentMarket'
      ) {
        actions.setErrors({
          code: 'FOREVER_ERROR_CANNOT_REDEEM_CAMPAIGN_FROM_DIFFERENT_MARKET',
        })
        return
      }

      if (result.errors && result.errors.length > 0) {
        // TODO handle errors
        actions.setErrors({ code: 'FOREVER_ERROR_GENERIC' })
        return
      }
    } catch (e) {
      captureSentryError(e)
    }
  }

  return { handleSubmit }
}
