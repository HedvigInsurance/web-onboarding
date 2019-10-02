import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { Button } from 'components/buttons'
import { ActionMap, Container } from 'constate'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'
import TrustlyModal from '../components/TrustlyModal'

const SITEWRAPPER = 1300
const BP = 800

const START_DIRECT_DEBIT_REGISTRATION_MUTATION = gql`
  mutation StartDirectDebigRegistration {
    startDirectDebitRegistration
  }
`

const Background = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colors.OFF_WHITE,
  zIndex: -1,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: SITEWRAPPER,
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '25vh',
  [`@media (max-width: ${BP}px)`]: {
    maxWidth: '100%',
    flexDirection: 'column',
    paddingTop: 20 + 70,
  },
})

const TextColumn = styled('div')({
  width: '60%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const ImageColumn = styled('div')({
  width: '40%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const Header = styled('h1')({
  marginTop: '0px',
  marginBottom: '30px',
  fontSize: '56px',
  lineHeight: '60px',
})

const HeaderPart = styled('span')(({ color }: { color: string }) => ({
  color,
  display: 'block',
}))

const ConnectText = styled('div')({
  width: '65%',
  marginBottom: '45px',
  color: colors.OFF_BLACK,
})

const ConnectPaymentImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  '@media (max-width: 800px)': {
    marginRight: 'auto',
    width: '80%',
  },
})

interface State {
  trustlyModalIsOpen: boolean
  trustlyUrl: string | null
}

interface Actions {
  setTrustlyModalIsOpen: (trustlyModalIsOpen: boolean) => void
  setTrustlyUrl: (trustlyUrl: string) => void
}

export const ConnectPaymentPage: React.SFC<{}> = () => (
  <Container<State, ActionMap<State, Actions>>
    initialState={{
      trustlyModalIsOpen: false,
      trustlyUrl: null,
    }}
    actions={{
      setTrustlyModalIsOpen: (trustlyModalIsOpen: boolean) => ({
        trustlyModalIsOpen,
      }),
      setTrustlyUrl: (trustlyUrl: string) => ({
        trustlyUrl,
      }),
    }}
  >
    {({
      trustlyModalIsOpen,
      setTrustlyModalIsOpen,
      trustlyUrl,
      setTrustlyUrl,
    }) => (
      <>
        <Background />
        <InnerWrapper>
          <TextColumn>
            <Header>
              <HeaderPart color={colors.DARK_GREEN}>
                <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_PRE_HEADLINE">
                  {(header) => header}
                </TranslationsConsumer>
              </HeaderPart>
              <HeaderPart color={colors.BLACK}>
                <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_HEADLINE">
                  {(header) => header}
                </TranslationsConsumer>
              </HeaderPart>
            </Header>
            <ConnectText>
              <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_BODY">
                {(header) => header}
              </TranslationsConsumer>
            </ConnectText>
            <Mutation mutation={START_DIRECT_DEBIT_REGISTRATION_MUTATION}>
              {(mutate: any) => (
                <Button
                  background={colors.PURPLE}
                  foreground={colors.WHITE}
                  onClick={async () => {
                    setTrustlyModalIsOpen(true)
                    const res = await mutate()
                    setTrustlyUrl(res.data.startDirectDebitRegistration)
                  }}
                >
                  <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_CTA">
                    {(header) => header}
                  </TranslationsConsumer>
                </Button>
              )}
            </Mutation>
          </TextColumn>
          <ImageColumn>
            <ConnectPaymentImage
              src={
                '/new-member-assets/connect-payment/connect-dd-illustration.svg'
              }
            />
          </ImageColumn>
        </InnerWrapper>
        <TrustlyModal
          isOpen={trustlyModalIsOpen}
          setIsOpen={(isOpen) => {
            setTrustlyModalIsOpen(isOpen)
          }}
          trustlyUrl={trustlyUrl}
        />
      </>
    )}
  </Container>
)
