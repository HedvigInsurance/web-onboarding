import { colors, fonts } from '@hedviginsurance/brand'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'

const CARDWIDTH = 788
const HEADERWIDTH = 400
const MOBILESMALL = 640
const MOBILETINY = 400
const INPUTFIELDMINWIDTH = 300
const FORMWIDTH = 260

const OuterWrapper = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  bottom: 0,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
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
  [`@media (max-width: ${MOBILESMALL}px)`]: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  [`@media (max-width: ${MOBILETINY}px)`]: {
    fontSize: '25px',
  },
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

const Form = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: FORMWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
})

const InputField = styled('input')({
  marginTop: '10px',
  marginBottom: '10px',
  minWidth: INPUTFIELDMINWIDTH,
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

interface Props {
  title: string
  adress: string
  buttonText: string
}

interface State {
  email: string
  personalNumber: number
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
        <InnerWrapper>
          <CardWrapper>
            <Card>
              <HeaderWrapper>
                <Header>
                  {props.title} {props.adress}
                </Header>
              </HeaderWrapper>
              <Form onSubmit={state.handleSignup}>
                <InputTitle>Email</InputTitle>
                <InputField
                  type="text"
                  value={state.email}
                  onChange={() => state.updateEmail(state.email)}
                />
                <InputTitle>Personnummer</InputTitle>
                <InputField
                  type="text"
                  placeholder="åååmmdd-nnn"
                  value={state.personalNumber}
                  onChange={() =>
                    state.updatePersonalNumber(state.personalNumber)
                  }
                />
                <GetInsuredButton>
                  <InputSubmit type="submit" value={props.buttonText} />
                </GetInsuredButton>
              </Form>
            </Card>
          </CardWrapper>
        </InnerWrapper>
      )}
    </Container>
  </OuterWrapper>
)
