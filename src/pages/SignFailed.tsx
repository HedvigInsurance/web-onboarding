import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { useMemberQuery } from 'data/graphql'
import * as React from 'react'

const ButtonLink = Button.withComponent('a')
const ButtonWrapper = styled('div')`
  padding: 2rem;
`

export const SignFailed: React.FC = () => {
  const { data: memberData, error } = useMemberQuery()
  const currentLocale = useCurrentLocale()

  React.useEffect(() => {
    const { Sentry } = window as any
    if (Sentry && memberData?.member.id) {
      Sentry.captureException(
        new Error(`BankID sign failed for member ${memberData?.member.id}`),
      )
    }

    if (error) {
      Sentry.captureException(
        new Error(
          `BankID sign failed for unknown member id. Error from graphql: ${error}`,
        ),
      )
    }
  }, [memberData?.member.id, error])
  return (
    <div>
      <h1>Unfortunately the attempt to sign your quote failed.</h1>
      <ButtonWrapper>
        <ButtonLink
          background={colorsV3.black}
          foreground={colorsV3.white}
          href={
            currentLocale
              ? `/${currentLocale}/new-member/offer`
              : '/new-member/offer'
          }
        >
          Go back to try again
        </ButtonLink>
      </ButtonWrapper>
      <div>
        We're really sorry this happened, we thought it never would :( However,
        we've notified the Hedvig team so they will be working on a fix shortly.
      </div>
    </div>
  )
}
