import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { FormikProps } from 'formik'
import { Headline } from 'components/Headline/Headline'
import { useTextKeys } from 'utils/textKeys'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { TextInput } from 'pages/Offer/Checkout/inputFields'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteInput } from 'components/DetailsModal/types'

import { useTrackOfferEvent } from 'utils/tracking/trackOfferEvent'
import { EventName } from 'utils/tracking/gtm'
import { Divider } from '../../shared/Divider'
import { WrapperWidth } from '../../shared/CheckoutPageWrapper'

const DONE_TYPING_INTERVAL = 1500

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding: 0;
    width: 100%;
    max-width: ${WrapperWidth}px;
  }
`

const InputFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    grid-template-columns: 1fr 1fr;
    gap: 0 1.5rem;
  }
`

const SpacerSmall = styled.div`
  height: 1rem;
`

const HorizontalDivider = styled(Divider)`
  margin: 1.5rem 0;
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    margin: 3rem 0;
  }
`

type Props = {
  formikProps: FormikProps<QuoteInput>
}

export const ContactInformation = ({ formikProps }: Props) => {
  const textKeys = useTextKeys()
  const trackOfferEvent = useTrackOfferEvent()

  useEffect(
    () => trackOfferEvent({ eventName: EventName.ContactInformationPageOpen }),
    [],
  )
  const {
    values: { ssn },
    handleChange,
    initialValues,
    submitForm,
  } = formikProps

  const timerRef = useRef<number>()
  const handlePersonalNumberKeyUp = () => {
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (ssn !== initialValues.ssn) {
        submitForm()
      }
    }, DONE_TYPING_INTERVAL)
  }

  const handlePersonNumberKeyDown = () => {
    clearTimeout(timerRef.current)
  }

  const { ssn: ssnFormat } = useCurrentLocale()

  return (
    <Wrapper>
      <Headline variant="xs" headingLevel="h2" colorVariant="dark">
        {textKeys.CHECKOUT_CONTACT_INFO_HEADING()}
      </Headline>
      <SpacerSmall />
      <form onSubmit={formikProps.handleSubmit}>
        <InputFieldsWrapper>
          <TextInput
            label={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
            placeholder={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
            type="text"
            name="firstName"
            formikProps={formikProps}
            onChange={handleChange}
          />
          <TextInput
            label={textKeys.CHECKOUT_LASTNAME_LABEL()}
            placeholder={textKeys.CHECKOUT_LASTNAME_LABEL()}
            type="text"
            name="lastName"
            formikProps={formikProps}
            onChange={handleChange}
          />

          <TextInput
            name="ssn"
            formikProps={formikProps}
            label={textKeys.CHECKOUT_SSN_LABEL_GLOBAL()}
            placeholder={ssnFormat.formatExample}
            onChange={handleChange}
            helperText={textKeys.CHECKOUT_CONTACT_INFO_CREDIT_CHECK_HELPER()}
            onKeyUp={handlePersonalNumberKeyUp}
            onKeyDown={handlePersonNumberKeyDown}
          />

          <div>
            <TextInput
              label={textKeys.CHECKOUT_EMAIL_LABEL()}
              placeholder={textKeys.CHECKOUT_EMAIL_LABEL()}
              helperText={textKeys.CHECKOUT_CONTACT_INFO_EMAIL_HELPER()}
              type="text"
              name="email"
              formikProps={formikProps}
            />
          </div>
        </InputFieldsWrapper>
      </form>
      <HorizontalDivider />
    </Wrapper>
  )
}
