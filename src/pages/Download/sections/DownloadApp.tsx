import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { ActionMap, Container } from 'constate'
import { Form, Formik } from 'formik'
import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import * as Yup from 'yup'
import { Button } from '../../../components/buttons'
import { InputField } from '../../../components/userInput/InputField'
import {
  getUtmParamsFromCookie,
  utmParamsToBranchLinkOptions,
} from '../../../utils/tracking'

const SITEWRAPPER = 1300
const BP = 800

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
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: SITEWRAPPER,
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '20vh',
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

const TextSubColumn = styled('div')({
  width: '65%',
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

const PhoneInput = styled(InputField)({
  width: '100%',
  background: colors.WHITE,
})

const ErrorText = styled('p')({
  margin: '10px 0 20px 0',
  color: colors.PINK,
})

const ButtonWrapper = styled('div')({
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  marginTop: 30,
})

const DownloadButton = styled(Button)({
  marginRight: 24,
  display: 'flex',
  alignItems: 'center',
})

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const Spinner = styled('span')({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  marginLeft: '1em',
  border: `2px solid ${colors.WHITE}`,
  borderTopColor: 'transparent',
  borderRadius: '1em',
  animation: `${spin} 500ms linear infinite`,
})

const AppleLogo = styled('img')({
  width: 24,
  marginRight: 16,
})

const GooglePlayLogo = styled('img')({
  width: 24,
})

const DownloadImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  '@media (max-width: 800px)': {
    marginRight: 'auto',
    width: '80%',
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
}))

const DownloadText = styled('div')({
  marginBottom: '45px',
  color: colors.OFF_BLACK,
})

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Ej giligt telefonnummer'),
})

interface State {
  isSending: boolean
  isSuccess: boolean
}

interface Actions {
  setIsSending: (isSending: boolean) => void
  setIsSuccess: (isSuccess: boolean) => void
}

export const DownloadApp: React.FC = () => (
  <Container<State, ActionMap<State, Actions>>
    initialState={{
      isSending: false,
      isSuccess: false,
    }}
    actions={{
      setIsSending: (isSending: boolean) => ({
        isSending,
      }),
      setIsSuccess: (isSuccess: boolean) => ({
        isSuccess,
      }),
    }}
  >
    {({ isSending, setIsSending, isSuccess, setIsSuccess }) => (
      <>
        <Background />
        <InnerWrapper>
          <TextColumn>
            <Header>
              <HeaderPart color={colors.DARK_YELLOW}>Välkommen! </HeaderPart>
              <HeaderPart color={colors.BLACK}>
                Ladda ner appen för att komma igång
              </HeaderPart>
            </Header>
            <TextSubColumn>
              <DownloadText>
                Du hittar den på App Store och Google Play. Om du är tidigare
                försäkrad kommer vi hålla dig informerad om bytet från ditt
                gamla försäkringsbolag.
              </DownloadText>
              <Formik
                validateOnBlur
                validationSchema={validationSchema}
                initialValues={{ phoneNumber: '' }}
                onSubmit={(form, actions) => {
                  let phoneNumber = form.phoneNumber.trim()

                  if (!phoneNumber) {
                    return
                  }

                  setIsSending(true)

                  if (!phoneNumber.match(/^\+/)) {
                    phoneNumber = `+46${phoneNumber}`
                  }

                  const utmParams = getUtmParamsFromCookie() || {}
                  const defaultBranchLinkOptions = {
                    channel: 'hedvig',
                    feature: 'send-sms',
                  }

                  const linkOptions = utmParamsToBranchLinkOptions(
                    utmParams as any,
                    defaultBranchLinkOptions,
                  )
                  ;(window as any).branch.sendSMS(
                    phoneNumber,
                    {
                      ...linkOptions,
                      data: {
                        ...(linkOptions || {}),
                        $custom_sms_text: 'Ladda ner Hedvig-appen: {{ link }}',
                      },
                    },
                    { make_new_link: false },
                    (err: Error) => {
                      setIsSending(false)

                      if (err) {
                        console.log('Branch.sendSMS error', err) // tslint:disable-line no-console
                        return
                      }

                      setIsSuccess(true)
                    },
                  )
                }}
              >
                {({ touched, errors }) => (
                  <Form>
                    {isSuccess === false ? (
                      <>
                        <PhoneInput
                          placeholder="Telefonnummer"
                          name="phoneNumber"
                          touched={touched.phoneNumber ? 'true' : 'false'}
                          errors={errors.phoneNumber}
                        />
                        {errors.phoneNumber && (
                          <ErrorText>{errors.phoneNumber}</ErrorText>
                        )}
                        <ButtonWrapper>
                          <DownloadButton
                            background={colors.PURPLE}
                            foreground={colors.WHITE}
                            disabled={isSending}
                            type="submit"
                          >
                            Få nedladdningslänk
                            {isSending && <Spinner />}
                          </DownloadButton>

                          <AppleLogo
                            src={'/new-member-assets/download/apple-logo.svg'}
                          />
                          <GooglePlayLogo
                            src={
                              '/new-member-assets/download/google-play-logo.svg'
                            }
                          />
                        </ButtonWrapper>
                      </>
                    ) : (
                      <p>Vi har skickat ett sms med en nedladdningslänk!</p>
                    )}
                  </Form>
                )}
              </Formik>
            </TextSubColumn>
          </TextColumn>
          <ImageColumn>
            <DownloadImage
              src={
                '/new-member-assets/download/balloons-welcome-illustrations.svg'
              }
            />
          </ImageColumn>
        </InnerWrapper>
      </>
    )}
  </Container>
)
