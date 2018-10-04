import {
  UserResponse,
  UserSelectInput,
} from 'components/userInput/UserResponse'
import { always, cond, equals, pathOr } from 'ramda'
import * as React from 'react'
import * as yup from 'yup'
import { ChatContainer, CurrentInsuranceState, Insurer } from '../state'

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
          <UserSelectInput
            onChange={chatState.setHasCurrentInsurance}
            value={cond([
              [equals(undefined), always('select')],
              [equals(false), always('no')],
              [equals(true), always('yes')],
            ])(chatState.currentInsurance.hasCurrentInsurance)}
          >
            <option value="select" disabled />
            <option value="yes">Ja</option>
            <option value="no">Nej</option>
          </UserSelectInput>

          {cond([
            [equals(undefined), always(null)],
            [equals(false), always(null)],
            [
              equals(true),
              () => (
                <div>
                  <UserSelectInput
                    value={pathOr(
                      'select',
                      ['currentInsurance', 'currentInsurer'],
                      chatState,
                    )}
                    onChange={chatState.setCurrentInsurer}
                  >
                    <option value="select" disabled />
                    {(Object.keys(Insurer) as Array<keyof Insurer>).map(
                      insuranceOption,
                    )}
                  </UserSelectInput>
                </div>
              ),
            ],
          ])(chatState.currentInsurance.hasCurrentInsurance)}

          {isDone(chatState.currentInsurance) && (
            <button type="submit">Ok</button>
          )}
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)
