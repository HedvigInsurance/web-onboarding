import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { openIntercomChat } from 'utils/intercom.helpers'
import { ErrorModal } from 'components/ErrorModal'
import { Headline } from 'components/Headline/Headline'
import { Button, TextButton, LinkButton } from 'components/buttons'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { landingRoute } from '../../../../routes'

const { gray700, gray900 } = colorsV3
const bodyFontSize = '1rem'

const ContentWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.5rem;
`
const Text = styled.div`
  color: ${gray700};
  font-style: normal;
  font-weight: normal;
  font-size: ${bodyFontSize};
  line-height: 1.5rem;
`
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const OutlinedButton = styled(LinkButton)`
  background-color: transparent;
  border: 1px solid ${gray900};
`
const LoadingDotsContainer = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  left: 0;
`
const InlineTextButton = styled(TextButton)`
  display: inline;
  font-size: ${bodyFontSize};
`

export const CheckoutPageErrorModal = () => {
  const [isReloading, setIsReloading] = useState(false)
  const textKeys = useTextKeys()
  const { go } = useHistory()
  const { path: localePath } = useCurrentLocale()

  const reloadPage = () => {
    setIsReloading(true)
    go(0)
  }

  return (
    <ErrorModal isVisible={true}>
      <ContentWrapper>
        <Headline variant="xs" colorVariant="dark" headingLevel="h3">
          {textKeys.CHECKOUT_PAGE_ERROR_MODAL_HEADING()}
        </Headline>
        <Text>
          {textKeys.CHECKOUT_PAGE_ERROR_MODAL_BODY()}{' '}
          <InlineTextButton onClick={openIntercomChat}>
            {textKeys.CHECKOUT_PAGE_ERROR_MODAL_OPEN_CHAT()}.
          </InlineTextButton>
        </Text>
        <ButtonsContainer>
          <Button background={gray900} onClick={reloadPage}>
            {textKeys.GENERIC_ERROR_ACTION_RETRY()}
          </Button>
          <OutlinedButton
            to={`/${localePath}${landingRoute}`}
            background={gray900}
            foreground={gray900}
          >
            {textKeys.CHECKOUT_PAGE_ERROR_MODAL_BACK_TO_START_BUTTON()}
          </OutlinedButton>
        </ButtonsContainer>
        <LoadingDotsContainer>
          {isReloading && <LoadingDots color={gray700} />}
        </LoadingDotsContainer>
      </ContentWrapper>
    </ErrorModal>
  )
}
