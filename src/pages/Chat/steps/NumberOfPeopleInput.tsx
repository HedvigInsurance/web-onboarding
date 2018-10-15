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
import { NextButton } from '../components/NextButton'
import {
  ChatContainer,
  Effects as ChatActions,
  LivingSituationState,
} from '../state'

interface NumberOfPeopleInputProps {
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
    numberOfPeople: yup
      .number()
      .moreThan(0)
      .lessThan(7)
      .required(),
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

export const NumberOfPeopleInput: React.SFC<NumberOfPeopleInputProps> = ({
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
            textKey="CHAT_INPUT_NUMBER_OF_PEOPLE_TEXT"
            replacements={{
              numberOfPeople: (
                <TranslationsConsumer textKey="CHAT_INPUT_NUMBER_OF_PEOPLE_SELF">
                  {(selfLabel) => (
                    <UserSelectInput
                      id="numberOfPeople"
                      value={chatState.livingSituation.numberOfPeople}
                      onChange={handleChange('numberOfPeople', chatState)}
                    >
                      <option value={0} disabled>
                        {' '}
                      </option>
                      <option value={1}>{selfLabel}</option>
                      {[2, 3, 4, 5, 6, 7].map((numberOfPeople) => (
                        <TranslationsConsumer
                          textKey="CHAT_INPUT_NUMBER_OF_PEOPLE_MULTIPLE"
                          key={numberOfPeople}
                        >
                          {(label) => (
                            <option value={numberOfPeople}>
                              {label.replace(
                                '{numberOfPeople}',
                                String(numberOfPeople),
                              )}
                            </option>
                          )}
                        </TranslationsConsumer>
                      ))}
                    </UserSelectInput>
                  )}
                </TranslationsConsumer>
              ),
            }}
          >
            {(nodes) => nodes}
          </TranslationsPlaceholderConsumer>
          {isDone(chatState.livingSituation) &&
            isCurrentMessage && <NextButton />}
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
