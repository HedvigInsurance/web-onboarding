import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import {
  UserResponse,
  UserSelectInput,
  UserTextInput,
} from 'components/userInput/UserResponse'
import * as React from 'react'
import * as yup from 'yup'
import { NextButton } from '../components/NextButton'
import {
  ChatContainer,
  CurrentInsuranceState,
  Effects as ChatEffects,
  Insurer,
  State as ChatState,
} from '../state'
import { Focusable } from './base'

interface CurrentInsuranceInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
}

const insurerNames = new Map<Insurer, string>([
  [Insurer.IF, 'If'],
  [Insurer.FOLKSAM, 'Folksam'],
  [Insurer.TRYGG_HANSA, 'Trygg Hansa'],
  [Insurer.LANSFORSAKRINGAR, 'Länsförsäkringar'],
  [Insurer.MODERNA, 'Moderna'],
  [Insurer.ICA, 'ICA'],
  [Insurer.GJENSIDIGE, 'Gjensidige'],
  [Insurer.VARDIA, 'Vardia'],
  [Insurer.OTHER, 'Ett annat bolag'],
])

const insuranceOption = (insurer: keyof Insurer) => (
  <option value={insurer} key={insurer}>
    {insurerNames.get(Insurer[insurer as number] as Insurer)}
  </option>
)

const getHasCurrentInsuranceInputValue = (chatState: ChatState) => {
  if (chatState.currentInsurance.hasCurrentInsurance === true) {
    return 'yes'
  }
  if (chatState.currentInsurance.hasCurrentInsurance === false) {
    return 'no'
  }

  return 'select'
}

const getCurrentInsuranceInputMaybe = (
  chatState: ChatState & ChatEffects,
  { onFocus, onBlur }: Focusable,
) => {
  if (chatState.currentInsurance.hasCurrentInsurance === true) {
    return (
      <div>
        <UserSelectInput
          value={
            chatState.currentInsurance.currentInsurer === undefined
              ? 'select'
              : chatState.currentInsurance.currentInsurer
          }
          onChange={chatState.setCurrentInsurer}
          id="currentInsurer"
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <option value="select" disabled />
          {(Object.keys(Insurer) as Array<keyof Insurer>).map(insuranceOption)}
        </UserSelectInput>
      </div>
    )
  }

  return null
}

const getOtherInsuranceInputMaybe = (
  chatState: ChatState & ChatEffects,
  { onFocus, onBlur }: Focusable,
) => {
  if (chatState.currentInsurance.currentInsurer === Insurer.OTHER) {
    return (
      <UserTextInput
        value={chatState.currentInsurance.otherInsurer || ''}
        onChange={chatState.setOtherInsurer}
        id="otherInsurer"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    )
  }
  return null
}

const validationSchema = yup.object<CurrentInsuranceState>({
  hasCurrentInsurance: yup.boolean().required(),
  currentInsurer: yup.mixed().when('hasCurrentInsurance', {
    is: true,
    then: yup
      .mixed()
      .oneOf(Object.values(Insurer))
      .required(),
    otherwise: yup.mixed().nullable(true),
  }),
  otherInsurer: yup.mixed().when('currentInsurer', {
    is: Insurer.OTHER,
    then: yup.string().required(),
    otherwise: yup.mixed().nullable(true),
  }),
})

const getTextKey = (chatState: ChatState): string => {
  if (!chatState.currentInsurance.hasCurrentInsurance) {
    return 'CHAT_INPUT_CURRENT_INSURANCE_TEXT'
  }
  if (chatState.currentInsurance.currentInsurer !== Insurer.OTHER) {
    return 'CHAT_INPUT_CURRENT_INSURANCE_TEXT_HAS_INSURANCE'
  }
  return 'CHAT_INPUT_CURRENT_INSURANCE_TEXT_HAS_INSURANCE_OTHER'
}

export const isCurrentInsuranceDone = (
  values: Partial<CurrentInsuranceState> = {},
) => validationSchema.isValidSync(values)

export const CurrentInsuranceInput: React.SFC<
  CurrentInsuranceInputProps & Focusable
> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  isCurrentMessage,
  onFocus = () => {}, // tslint:disable-line no-empty
  onBlur = () => {}, // tslint:disable-line no-empty
}) => (
  <UserResponse appear={appear}>
    <ChatContainer>
      {(chatState) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!isCurrentInsuranceDone(chatState.currentInsurance)) {
              return
            }

            onSubmit()
          }}
        >
          <TranslationsPlaceholderConsumer
            textKey={getTextKey(chatState)}
            replacements={{
              toggle: (
                <UserSelectInput
                  onChange={chatState.setHasCurrentInsurance}
                  value={getHasCurrentInsuranceInputValue(chatState)}
                  id="hasCurrentInsurance"
                  onFocus={onFocus}
                  onBlur={onBlur}
                >
                  <option value="select" disabled />
                  <TranslationsConsumer textKey="CHAT_INPUT_CURRENT_INSURANCE_HAS_CURRENT_INSURANCE_TRUE">
                    {(yesLabel) => <option value="yes">{yesLabel}</option>}
                  </TranslationsConsumer>
                  <TranslationsConsumer textKey="CHAT_INPUT_CURRENT_INSURANCE_HAS_CURRENT_INSURANCE_FALSE">
                    {(noLabel) => <option value="no">{noLabel}</option>}
                  </TranslationsConsumer>
                </UserSelectInput>
              ),
              currentInsurerMaybe:
                getCurrentInsuranceInputMaybe(chatState, { onFocus, onBlur }) ||
                ' ',
              otherInsurerMaybe:
                getOtherInsuranceInputMaybe(chatState, { onFocus, onBlur }) ||
                ' ',
            }}
          >
            {(t) => t}
          </TranslationsPlaceholderConsumer>

          <NextButton
            disabled={!isCurrentInsuranceDone(chatState.currentInsurance)}
            hidden={
              !isCurrentMessage ||
              !isCurrentInsuranceDone(chatState.currentInsurance)
            }
          />
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
