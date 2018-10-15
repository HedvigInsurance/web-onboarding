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
import { ValidationErrorMaybe } from '../components/validationErrors'
import {
  ApartmentType,
  ChatContainer,
  Effects as ChatActions,
  LivingSituationState,
} from '../state'

interface ApartmentTypeInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
}

const handleChange = <K extends keyof LivingSituationState>(
  field: K,
  chatState: ChatActions,
  format: (val?: string | number) => undefined | string | number = (value) =>
    value,
) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  chatState.setLivingSituationProp(field, format(event.target.value))
}

const validationSchema = yup
  .object<Partial<LivingSituationState>>({
    apartmentType: yup
      .mixed()
      .oneOf(Object.keys(ApartmentType))
      .required(),
    size: yup
      .mixed()
      .test({
        name: 'isntTooBig',
        test: (value) => !isNaN(Number(value)) && value < 250,
        message: 'CHAT_INPUT_APARTMENT_TYPE_SIZE_TOO_BIG',
      })
      .test({
        test: (value) =>
          value === '' || (!isNaN(Number(value)) && Number(value) > 0),
        message: 'UNKNOWN_ERROR',
      })
      .test({
        test: (value) => value !== '',
        message: 'noop',
      }),
  })

  .required()

const isDone = (values: Partial<LivingSituationState> = {}) => {
  try {
    validationSchema.validateSync(values)
    return true
  } catch (e) {
    return false
  }
}

export const ApartmentTypeInput: React.SFC<ApartmentTypeInputProps> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  isCurrentMessage,
}) => (
  <UserResponse appear={appear}>
    <ChatContainer>
      {(chatState) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()

            if (!isDone(chatState.livingSituation)) {
              return
            }

            onSubmit()
            // JSDOM weirdness writes to console.error if one runs window.blur
            if (process.env.NODE_ENV !== 'test') {
              window.blur()
            }
          }}
        >
          <TranslationsPlaceholderConsumer
            textKey="CHAT_INPUT_APARTMENT_TYPE_TEXT"
            replacements={{
              apartmentType: (
                <TranslationsConsumer textKey="CHAT_INPUT_APARTMENT_TYPE_TYPE_RENT">
                  {(rentLabel) => (
                    <TranslationsConsumer textKey="CHAT_INPUT_APARTMENT_TYPE_TYPE_OWN">
                      {(ownLabel) => (
                        <UserSelectInput
                          id="apartmentType"
                          value={
                            chatState.livingSituation.apartmentType || 'select'
                          }
                          onChange={handleChange('apartmentType', chatState)}
                        >
                          <option value="select" disabled>
                            {' '}
                          </option>
                          <option value={ApartmentType.RENT}>
                            {rentLabel}
                          </option>
                          <option value={ApartmentType.OWN}>{ownLabel}</option>
                        </UserSelectInput>
                      )}
                    </TranslationsConsumer>
                  )}
                </TranslationsConsumer>
              ),
              size: (
                <UserTextInput
                  type="number"
                  id="size"
                  maxWidth={4}
                  value={chatState.livingSituation.size}
                  onChange={handleChange('size', chatState)}
                  pattern="[0-9]*"
                />
              ),
            }}
          >
            {(nodes) => nodes}
          </TranslationsPlaceholderConsumer>
          <ValidationErrorMaybe
            field="size"
            values={chatState.livingSituation}
            schema={validationSchema}
          />
          {isDone(chatState.livingSituation) &&
            isCurrentMessage && <NextButton />}
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
