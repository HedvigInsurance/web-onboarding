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
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: SITEWRAPPER,
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '25vh',
  [`@media (max-width: ${BP}px)`]: {
    maxWidth: '100%',
    flexDirection: 'column',
    paddingTop: 30 + 70,
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
  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
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

const PhoneInput = styled(InputField)({
  width: '100%',
  maxWidth: '400px',
  background: colors.WHITE,
  [`@media (max-width: ${MOBILE}px)`]: {
    minWidth: '100%',
    maxWidth: '100%',
  },
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
  [`@media (max-width: ${BP}px)`]: {
    justifyContent: 'center',
  },
  [`@media (max-width: ${MOBILE}px)`]: {
    flexFlow: 'column',
  },
})

const DownloadButton = styled(Button)({
  marginRight: 24,
  display: 'flex',
  alignItems: 'center',
  [`@media (max-width: ${MOBILE}px)`]: {
    marginRight: 0,
    marginBottom: 20,
  },
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

const LogoWrapper = styled('div')({
  display: 'flex',
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
  [`@media (max-width: ${BP}px)`]: {
    marginRight: 'auto',
    width: '80%',
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

const HeaderPart = styled('span')(({ color }: { color: string }) => ({
  color,
}))

const DownloadText = styled('div')({
  marginBottom: 45,
  color: colors.OFF_BLACK,
  [`@media (max-width: ${MOBILE}px)`]: {
    marginBottom: 25,
  },
})

const phoneNumberRegex = /^([0-9+-])+$/

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('ONBOARDING_DOWNLOAD_INPUT_ERROR')
    .matches(phoneNumberRegex, 'ONBOARDING_DOWNLOAD_INPUT_ERROR'),
})

interface State {
  isSending: boolean
  isSuccess: boolean
}

interface Actions {
  setIsSending: (isSending: boolean) => void
  setIsSuccess: (isSuccess: boolean) => void
}

interface DownloadAppProps {
  hasCurrentInsurer?: boolean
}

export const DownloadApp: React.FC<DownloadAppProps> = () => (
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
              <HeaderPart color={colors.DARK_YELLOW}>
                <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_PRE_HEADLINE">
                  {(t) => t}
                </TranslationsConsumer>
              </HeaderPart>
              <HeaderPart color={colors.BLACK}>
                <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_HEADLINE">
                  {(t) => t}
                </TranslationsConsumer>
              </HeaderPart>
            </Header>
            <TextSubColumn>
              <DownloadText>
                <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_BODY">
                  {(t) => t}
                </TranslationsConsumer>
              </DownloadText>
              <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_SMS_TEXT">
                {(smsText) => (
                  <Formik
                    validateOnBlur
                    validationSchema={validationSchema}
                    initialValues={{ phoneNumber: '' }}
                    onSubmit={(form) => {
                      let phoneNumber = form.phoneNumber.trim()

                      if (!phoneNumber) {
                        return
                      }

                      setIsSending(true)

                      if (!phoneNumber.match(/^\+/)) {
                        phoneNumber = `+46${phoneNumber.replace(/^0/, '')}`
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
                            $custom_sms_text: `${smsText} {{ link }}`,
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
                            <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_INPUT_PLACEHOLDER">
                              {(t) => (
                                <PhoneInput
                                  placeholder={t}
                                  name="phoneNumber"
                                  touched={touched.phoneNumber}
                                  errors={errors.phoneNumber}
                                />
                              )}
                            </TranslationsConsumer>

                            {errors.phoneNumber && (
                              <TranslationsConsumer
                                textKey={errors.phoneNumber}
                              >
                                {(t) => <ErrorText>{t}</ErrorText>}
                              </TranslationsConsumer>
                            )}
                            <ButtonWrapper>
                              <DownloadButton
                                background={colors.PURPLE}
                                foreground={colors.WHITE}
                                disabled={isSending}
                                type="submit"
                              >
                                <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_CTA">
                                  {(t) => t}
                                </TranslationsConsumer>
                                {isSending && <Spinner />}
                              </DownloadButton>
                              <LogoWrapper>
                                <AppleLogo
                                  src={
                                    '/new-member-assets/download/apple-logo.svg'
                                  }
                                />
                                <GooglePlayLogo
                                  src={
                                    '/new-member-assets/download/google-play-logo.svg'
                                  }
                                />
                              </LogoWrapper>
                            </ButtonWrapper>
                          </>
                        ) : (
                          <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_SUCCESS_TEXT">
                            {(t) => <p>{t}</p>}
                          </TranslationsConsumer>
                        )}
                      </Form>
                    )}
                  </Formik>
                )}
              </TranslationsConsumer>
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
