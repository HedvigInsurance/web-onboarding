import { colors, fonts } from '@hedviginsurance/brand'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'

const CARDWIDTH = 788
const HEADERWIDTH = 400
const FORMWIDTH = 300

const OuterWrapper = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  bottom: 0,
})

const CardWrapper = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  minWidth: CARDWIDTH,
  maxWidth: CARDWIDTH,
  [`@media (max-width: ${CARDWIDTH}px)`]: {
    minWidth: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const Card = styled('div')({
  marginTop: '140px',
  paddingTop: '30px',
  paddingBottom: '30px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const HeaderWrapper = styled('div')({
  maxWidth: HEADERWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.SORAY,
  fontWeight: 'normal',
  lineHeight: '40px',
  textAlign: 'center',
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '0px',
  paddingTop: '30px',
  marginBottom: '10px',
  fontSize: '32px',
})

const InputTitle = styled('div')({
  marginTop: '20px',
  lineHeight: '23px',
  fontSize: '20px',
})

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: FORMWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
})

const InputField = styled('input')({
  marginTop: '10px',
  marginBottom: '10px',
  minWidth: FORMWIDTH,
  lineHeight: '23px',
  fontSize: '20px',
})

const InputSubmit = styled('input')({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  cursor: 'pointer',
  border: 'none',
  outlineStyle: 'none',
})

const GetInsuredButton = styled('div')({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

const ErrorText = styled('div')({
  textAlign: 'center',
  marginTop: '20px',
  color: 'red',
  fontSize: '16px',
})

interface Props {
  title: string
  adress: string
  buttonText: string
  inputTitleEmail: string
  inputTitlePersonalNumber: string
  errorMessage: string
}

interface State {
  email: string
  personalNumber: number
  signUpError: string
}

interface Actions {
  handleSignup: () => void
  updateEmail: (value: string) => void
  updatePersonalNumber: (value: number) => void
}

export const SignUp: React.SFC<Props> = (props) => (
  <OuterWrapper>
    <Container<State, ActionMap<State, Actions>>
      initialState={{
        email: undefined,
        personalNumber: undefined,
        signUpError: undefined,
      }}
      actions={{
        handleSignup: () => () => ({}),
        updateEmail: (value: string) => () => ({
          email: value,
        }),
        updatePersonalNumber: (value: number) => () => ({
          personalNumber: value,
        }),
      }}
    >
      {(state) => (
        <CardWrapper>
          <Card>
            <HeaderWrapper>
              <Header>
                {props.title} {props.adress}
              </Header>
            </HeaderWrapper>
            <Form onSubmit={state.handleSignup}>
              <InputTitle>{props.inputTitleEmail}</InputTitle>
              <InputField
                type="text"
                value={state.email}
                onChange={() => state.updateEmail(state.email)}
              />
              <InputTitle>{props.inputTitlePersonalNumber}</InputTitle>
              <InputField
                type="text"
                placeholder="ååååmmdd-nnnn"
                value={state.personalNumber}
                onChange={() =>
                  state.updatePersonalNumber(state.personalNumber)
                }
              />
              <GetInsuredButton>
                <InputSubmit type="submit" value={props.buttonText} />
              </GetInsuredButton>
              {state.signUpError ? (
                <ErrorText>{props.errorMessage}</ErrorText>
              ) : null}
            </Form>
          </Card>
        </CardWrapper>
      )}
    </Container>
  </OuterWrapper>
)
