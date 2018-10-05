import {
  InputValidationError,
  UserResponse,
  UserSelectInput,
  UserTextInput,
} from 'components/userInput/UserResponse'
import { SingletonAction } from 'components/utils/SingletonAction'
import { pathOr, pipe } from 'ramda'
import * as React from 'react'
import * as yup from 'yup'
import {
  ApartmentType,
  ChatContainer,
  Effects as ChatActions,
  LivingSituationState,
} from '../state'

interface LivingSituationInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
}

const apartmentOptions = [
  { type: ApartmentType.OWN, label: 'äger' },
  { type: ApartmentType.RENT, label: 'hyr' },
]

const handleChange = <K extends keyof LivingSituationState>(
  field: K,
  chatState: ChatActions,
  format: (val?: string | number) => undefined | string | number = (value) =>
    value,
) =>
  pipe<
    React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    LivingSituationState[K],
    void
  >(
    pathOr<string>('', ['target', 'value']),
    (val: string | number | undefined) =>
      chatState.setLivingSituationProp(field, format(val)),
  )

const validationSchema = yup
  .object<Partial<LivingSituationState>>({
    streetAddress: yup.string().required(),
    postalCode: yup
      .string()
      .matches(/^[0-9]{3}\s?[0-9]{2}$/)
      .required(),
    numberOfPeople: yup
      .number()
      .moreThan(0)
      .lessThan(7, 'TOO MANY PEEPS') // TODO improve message
      .required(),
    apartmentType: yup
      .mixed()
      .oneOf(Object.keys(ApartmentType))
      .required(),
    size: yup
      .mixed()
      .test({
        name: 'isntTooBig',
        test: (value) => !isNaN(Number(value)) && value < 250,
        message: 'TOO BIG APARTMENT',
      })
      .test({
        test: (value) =>
          value === '' || (!isNaN(Number(value)) && Number(value) > 0),
        message: 'MUST BE VALID NUMBER',
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
const getValidationError = (
  values: Partial<LivingSituationState> = {},
): [string, string] | null => {
  try {
    validationSchema.validateSync(values)
    return null
  } catch (e) {
    return [e.params.path, e.message]
  }
}

const hasValidationErrorForKey = (
  key: keyof LivingSituationState,
  validationError: [string, string] | null,
) => {
  if (validationError === null || validationError === undefined) {
    return false
  }
  if (validationError[0] !== key) {
    return false
  }

  if (validationError[1] === 'noop') {
    return false
  }

  return true
}

interface ValidationErrorMaybeProps {
  field: keyof LivingSituationState
  values: Partial<LivingSituationState>
}

const ValidationErrorMaybe: React.SFC<ValidationErrorMaybeProps> = ({
  field,
  values,
}) => {
  const validationError = getValidationError(values)
  if (
    validationError !== null &&
    hasValidationErrorForKey(field, validationError)
  ) {
    return <InputValidationError>{validationError[1]}</InputValidationError>
  }
  return null
}

export const LivingSituationInput: React.SFC<LivingSituationInputProps> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  isCurrentMessage,
}) => (
  <UserResponse appear={appear}>
    <SingletonAction>
      {(focusState) => (
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
              <div>
                Jag bor på{' '}
                <UserTextInput
                  type="text"
                  maxWidth={Math.max(
                    pathOr(
                      0,
                      ['livingSituation', 'streetAddress', 'length'],
                      chatState,
                    ),
                    20,
                  )}
                  id="streetAddress"
                  placeholder="Storgatan 1"
                  value={pathOr(
                    '',
                    ['livingSituation', 'streetAddress'],
                    chatState,
                  )}
                  onChange={handleChange('streetAddress', chatState)}
                  innerRef={(ref) => {
                    if (!ref || focusState.isActionDone || !isCurrentMessage) {
                      return
                    }
                    ref.focus()
                    focusState.doAction()
                  }}
                />{' '}
                på postnummer{' '}
                <UserTextInput
                  type="number"
                  maxWidth={6}
                  id="postalCode"
                  placeholder="123 45"
                  value={pathOr(
                    '',
                    ['livingSituation', 'postalCode'],
                    chatState,
                  )}
                  onChange={handleChange('postalCode', chatState, (value) =>
                    String(value).replace(/[^\d\s]/g, ''),
                  )}
                  maxLength={6}
                  pattern="[0-9]*"
                />
              </div>
              <div>
                Jag{' '}
                <UserSelectInput
                  id="apartmentType"
                  value={pathOr(
                    'select',
                    ['livingSituation', 'apartmentType'],
                    chatState,
                  )}
                  onChange={handleChange('apartmentType', chatState)}
                >
                  <option value={'select'} disabled>
                    lägenhetstyp
                  </option>
                  {apartmentOptions.map((apartmentOption) => (
                    <option
                      key={apartmentOption.type}
                      value={apartmentOption.type}
                    >
                      {apartmentOption.label}
                    </option>
                  ))}
                </UserSelectInput>
                en lägenhet på{' '}
                <UserTextInput
                  type="number"
                  maxWidth={4}
                  id="size"
                  placeholder="54"
                  value={pathOr('', ['livingSituation', 'size'], chatState)}
                  onChange={handleChange('size', chatState)}
                  pattern="[0-9]*"
                />
                kvadratmeter
                <ValidationErrorMaybe
                  field="size"
                  values={chatState.livingSituation}
                />
              </div>
              <div>
                och där bor{' '}
                <UserSelectInput
                  id="numberOfPeople"
                  value={pathOr(
                    1,
                    ['livingSituation', 'numberOfPeople'],
                    chatState,
                  )}
                  onChange={handleChange('numberOfPeople', chatState)}
                >
                  <option value={1}>jag själv</option>
                  {[2, 3, 4, 5, 6, 7].map((numberOfPeople) => (
                    <option value={numberOfPeople} key={numberOfPeople}>
                      vi {numberOfPeople} personer
                    </option>
                  ))}
                </UserSelectInput>
              </div>
              {isDone(chatState.livingSituation) && (
                <div>
                  <button type="submit">Ok</button>
                </div>
              )}
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)
