import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { ErrorModal } from 'components/ErrorModal'
import { Headline } from 'components/Headline/Headline'
import { Button } from 'components/buttons'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'

const { gray700, gray900 } = colorsV3

const ContentWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 1.5rem;
`
const Text = styled.div`
  color: ${gray700};
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5rem;
`
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const OutlinedButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${gray900};
  color: ${gray900};
`
const LoadingDotsContainer = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1rem;
`

export const CheckoutPageErrorModal = () => {
  const [isReloading, setIsReloading] = useState(false)
  const textKeys = useTextKeys()
  const { go } = useHistory()

  const reloadPage = () => {
    setIsReloading(true)
    go(0) // Reload current page
  }

  return (
    <ErrorModal isVisible={true}>
      <ContentWrapper>
        <Headline variant="xs" colorVariant="dark" headingLevel="h3">
          {textKeys.CHECKOUT_PAGE_ERROR_MODAL_HEADING()}
        </Headline>
        <Text>{textKeys.CHECKOUT_PAGE_ERROR_MODAL_BODY()}</Text>
        <ButtonsContainer>
          <Button background={gray900} onClick={reloadPage}>
            {textKeys.CHECKOUT_PAGE_ERROR_MODAL_RETRY_BUTTON()}
          </Button>
          <OutlinedButton background={gray900}>
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
