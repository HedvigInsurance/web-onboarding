import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import {
  UserResponse,
  UserSelectInput,
} from 'components/userInput/UserResponse'
import * as React from 'react'
import * as yup from 'yup'
import {
  ChatContainer,
  CurrentInsuranceState,
  Effects as ChatEffects,
  Insurer,
  State as ChatState,
} from '../state'

interface CurrentInsuranceInputProps {
  appear?: boolean
  onSubmit?: () => void
}

const insurerNames = new Map<Insurer, string>([
  [Insurer.FOLKSAM, 'Folksam'],
  [Insurer.TRYGG_HANSA, 'Trygg Hansa'],
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

const getCurrentInsuranceInputMaybe = (chatState: ChatState & ChatEffects) => {
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
        >
          <option value="select" disabled />
          {(Object.keys(Insurer) as Array<keyof Insurer>).map(insuranceOption)}
        </UserSelectInput>
      </div>
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
})

const isDone = (values: Partial<CurrentInsuranceState> = {}) =>
  validationSchema.isValidSync(values)

export const CurrentInsuranceInput: React.SFC<CurrentInsuranceInputProps> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
}) => (
  <UserResponse appear={appear}>
    <ChatContainer>
      {(chatState) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!isDone(chatState.currentInsurance)) {
              return
            }

            onSubmit()
          }}
        >
          <TranslationsPlaceholderConsumer
            textKey={
              chatState.currentInsurance.hasCurrentInsurance
                ? 'CHAT_INPUT_CURRENT_INSURANCE_TEXT_HAS_INSURANCE'
                : 'CHAT_INPUT_CURRENT_INSURANCE_TEXT'
            }
            replacements={{
              toggle: (
                <TranslationsConsumer textKey="CHAT_INPUT_CURRENT_INSURANCE_HAS_CURRENT_INSURANCE_TRUE">
                  {(yesLabel) => (
                    <TranslationsConsumer textKey="CHAT_INPUT_CURRENT_INSURANCE_HAS_CURRENT_INSURANCE_FALSE">
                      {(noLabel) => (
                        <UserSelectInput
                          onChange={chatState.setHasCurrentInsurance}
                          value={getHasCurrentInsuranceInputValue(chatState)}
                          id="hasCurrentInsurance"
                        >
                          <option value="select" disabled />
                          <option value="yes">{yesLabel}</option>
                          <option value="no">{noLabel}</option>
                        </UserSelectInput>
                      )}
                    </TranslationsConsumer>
                  )}
                </TranslationsConsumer>
              ),
              currentInsurerMaybe:
                getCurrentInsuranceInputMaybe(chatState) || ' ',
            }}
          >
            {(t) => t}
          </TranslationsPlaceholderConsumer>

          {isDone(chatState.currentInsurance) && (
            <TranslationsConsumer textKey="CHAT_INPUT_NEXT_LABEL">
              {(t) => <button type="submit">{t}</button>}
            </TranslationsConsumer>
          )}
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
