import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { Button } from 'components/buttons'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import { CurrentLanguage } from '../../../components/utils/CurrentLanguage'
import TrustlyModal from '../components/TrustlyModal'
import { RegisterDirectDebitMutation } from '../containers/RegisterDirectDebitMutation'

const SITEWRAPPER = 1300
const BP = 800
const MOBILE = 450

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
    paddingTop: 40 + 70,
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
  [`@media (max-width: ${MOBILE}px)`]: {
    fontSize: '44px',
    lineHeight: '52px',
  },
})

const HeaderPart = styled('span')<{ color: string }>(({ color }) => ({
  color,
  display: 'block',
}))

const ConnectText = styled('div')({
  width: '65%',
  marginBottom: '45px',
  color: colors.OFF_BLACK,
  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
  },
})

const ConnectPaymentImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  [`@media (max-width: ${BP}px)`]: {
    marginRight: 'auto',
    width: '80%',
  },
  [`@media (max-width: ${MOBILE}px)`]: {
    width: '100%',
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
      <RegisterDirectDebitMutation>
        {(mutate) => (
          <CurrentLanguage>
            {({ currentLanguage }) => {
              const generateTrustlyUrl = async () => {
                const baseUrl = `${window.location.origin}/${currentLanguage &&
                  currentLanguage + '/'}new-member/connect-payment`

                const res = await mutate({
                  variables: {
                    clientContext: {
                      successUrl: `${baseUrl}/success`,
                      failureUrl: `${baseUrl}/fail`,
                    },
                  },
                })

                if (!res || !res.data) {
                  return null
                }

                return res.data.registerDirectDebit.url
              }

              return (
                <>
                  <Background />
                  <InnerWrapper>
                    <TextColumn>
                      <Header>
                        <HeaderPart color={colors.DARK_GREEN}>
                          <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_PRE_HEADLINE">
                            {(t) => t}
                          </TranslationsConsumer>
                        </HeaderPart>
                        <HeaderPart color={colors.BLACK}>
                          <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_HEADLINE">
                            {(t) => t}
                          </TranslationsConsumer>
                        </HeaderPart>
                      </Header>
                      <ConnectText>
                        <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_BODY">
                          {(t) => t}
                        </TranslationsConsumer>
                      </ConnectText>
                      <Button
                        background={colors.PURPLE}
                        foreground={colors.WHITE}
                        onClick={async () => {
                          setTrustlyModalIsOpen(true)

                          const url = await generateTrustlyUrl()

                          if (url !== null) {
                            setTrustlyUrl(url)
                          }
                        }}
                      >
                        <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_CTA">
                          {(t) => t}
                        </TranslationsConsumer>
                      </Button>
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
                    generateTrustlyUrl={generateTrustlyUrl}
                  />
                </>
              )
            }}
          </CurrentLanguage>
        )}
      </RegisterDirectDebitMutation>
    )}
  </Container>
)
