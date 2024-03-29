import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import ReactMarkdown from 'react-markdown'
import { useInitiateCarCancellationMutation } from 'data/graphql'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { Page } from 'components/utils/Page'
import { ErrorHeading, ErrorModal, ErrorText } from 'components/ErrorModal'
import { useTextKeys } from 'utils/textKeys'
import { useSendDatadogAction } from 'utils/tracking/hooks/useSendDatadogAction'

const CenteredWrapper = styled.div({
  width: '100%',
  height: '90vh', // 100 shows scroll bars since we have padding on parent elements
  display: 'flex',
  justifyContent: 'center',
})

export const InitiateCarCancellationPage = () => {
  const { search } = useLocation()
  const textKeys = useTextKeys()

  const queryParams = new URLSearchParams(search)
  const contractId = queryParams.get('contractId')

  const sendDatadogAction = useSendDatadogAction()
  const [
    initiateCarCancellationMutation,
    { loading, error },
  ] = useInitiateCarCancellationMutation({
    variables: {
      input: {
        contractId: contractId || '',
      },
    },

    onCompleted(data) {
      if (data.initiateCancelOldCarInsurance?.url) {
        sendDatadogAction('car_switching_redirect')
        window.location.href = data.initiateCancelOldCarInsurance.url
      } else {
        sendDatadogAction('car_switching_redirect_failed')
      }
    },
  })

  useEffect(() => {
    initiateCarCancellationMutation()
  }, [initiateCarCancellationMutation])

  return (
    <Page>
      <CenteredWrapper>
        {loading && <LoadingDots color={colorsV3.gray500} />}
      </CenteredWrapper>
      <ErrorModal isVisible={!!error}>
        <ErrorHeading>{textKeys.GENERIC_ERROR_HEADING()}</ErrorHeading>
        <ErrorText>
          <ReactMarkdown source={textKeys.GENERIC_ERROR_TEXT()} />
        </ErrorText>
      </ErrorModal>
    </Page>
  )
}
