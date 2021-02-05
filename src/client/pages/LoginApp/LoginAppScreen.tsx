import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import Helmet from 'react-helmet-async'
import { FormikHelpers } from 'formik'
import { useTextKeys } from 'utils/textKeys'
import { Page } from 'components/utils/Page'
import { useNorwegianBankIdAuthMutation } from 'data/graphql'
import { captureSentryError } from 'utils/sentry-client'
import { TopBar } from 'components/TopBar'
import { LoginForm, LoginFormValue } from './components/LoginForm'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 1rem;
  padding-right: 1rem;
  color: ${colorsV3.gray500};
  background-color: ${colorsV3.gray900};
`

export const LoginAppScreen: React.FC = () => {
  const textKeys = useTextKeys()
  const [norwegianBankIdAuthMutation] = useNorwegianBankIdAuthMutation()

  const handleSubmit = async (
    form: LoginFormValue,
    actions: FormikHelpers<LoginFormValue>,
  ) => {
    const { ssn } = form

    try {
      const result = await norwegianBankIdAuthMutation({
        variables: { personalNumber: ssn },
      })

      if (!result) {
        return
      }

      if (result.errors && result.errors.length > 0) {
        actions.setErrors({ ssn: 'LOGIN_APP_GENERIC_ERROR' })
        return
      }

      if (result.data?.norwegianBankIdAuth.redirectUrl) {
        window.location.assign(result.data?.norwegianBankIdAuth.redirectUrl)
      }
    } catch (e) {
      actions.setErrors({ ssn: 'LOGIN_APP_GENERIC_ERROR' })
      captureSentryError(e)
    }
  }

  return (
    <>
      <Helmet>
        <title>{textKeys.LOGIN_APP_PAGE_TITLE()}</title>
      </Helmet>
      <Page>
        <TopBar centered />
        <PageWrapper>
          <LoginForm onSubmit={handleSubmit} />
        </PageWrapper>
      </Page>
    </>
  )
}
