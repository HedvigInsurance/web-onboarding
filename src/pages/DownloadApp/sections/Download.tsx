import { colors } from '@hedviginsurance/brand'
import { GetInsuredButton } from 'components/get-insured-button'
import { Field, Form, Formik } from 'formik'
import * as React from 'react'
import styled from 'react-emotion'

const IMAGEWIDTH = 450
const CONTENTWIDTH = 1000

const Wrapper = styled('div')({
  marginTop: '84px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  top: 0,
  bottom: 0,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: 'auto',
  marginRight: 'auto',
  minWidth: CONTENTWIDTH,
  maxWidth: CONTENTWIDTH,
  [`@media (max-width: ${CONTENTWIDTH}px)`]: {
    minWidth: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const DownloadButton = styled('button')({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  cursor: 'pointer',
  border: 'none',
  outlineStyle: 'none',
  marginTop: '10px',
})

const CustomForm = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
})

const InputField = styled(Field)({
  fontSize: '16px',
  marginBottom: '10px',
})

const DownloadImage = styled('img')({
  width: IMAGEWIDTH,
  marginBottom: '30px',
  marginTop: '30px',
})

const Header = styled('h1')({
  fontSize: '32px',
  marginTop: '0px',
  marginBottom: '0px',
})

const DownloadHeader = styled('h1')({
  fontSize: '32px',
  marginTop: '30px',
  marginBottom: '30px',
})

const InsuredText = styled('div')({
  fontSize: '16px',
  maxWidth: IMAGEWIDTH,
  textAlign: 'center',
  marginBottom: '30px',
})

const PhoneNumberTitle = styled('div')({
  fontSize: '16px',
  color: colors.DARK_GRAY,
})

const ErrorMessage = styled('div')({
  minHeight: '20px',
  fontSize: '16px',
})

const StoreWrapper = styled('div')({
  marginTop: '130px',
})

const StoreLink = styled('a')({
  marginLeft: '10px',
  marginRight: '10px',
})

const StoreImage = styled('img')({})

const DOWNLOADSTORES = [
  {
    key: 0,
    image: '/assets/download/app-store-badge.svg',
    downloadURL: 'https://itunes.apple.com/se/app/hedvig/id1303668531?mt=8',
  },
  {
    key: 1,
    image: '/assets/download/google-play-badge.svg',
    downloadURL: 'https://play.google.com/store/apps/details?id=com.hedvig.app',
  },
]

const validate = (value: any) => {
  let errorMessage
  if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(value)) {
    errorMessage = 'Whops! Är numret korrekt?'
  }
  return errorMessage
}

interface Props {
  buttonText: string
  phoneNumberLabel: string
  insuredText: string
  downloadHeader: string
  headerOne: string
  headerTwo: string
}

export const Download: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <DownloadImage src={'/assets/offering/placeholder.svg'} />
      <Header>{props.headerOne}</Header>
      <Header>{props.headerTwo}</Header>
      <DownloadHeader>{props.downloadHeader}</DownloadHeader>
      <InsuredText>{props.insuredText}</InsuredText>
      <PhoneNumberTitle>{props.phoneNumberLabel}</PhoneNumberTitle>
      <Formik
        initialValues={{ phoneNumber: '' }}
        // TODO: Make onsubmit send sms with download link to phone number
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ errors, touched }) => (
          <CustomForm>
            <InputField validate={validate} name="phoneNumber" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            ) : (
              <ErrorMessage />
            )}
            <GetInsuredButton>
              <DownloadButton type="submit">{props.buttonText}</DownloadButton>
            </GetInsuredButton>
          </CustomForm>
        )}
      </Formik>
      <StoreWrapper>
        {DOWNLOADSTORES.map((store) => (
          <StoreLink key={store.key} target="_blank" href={store.downloadURL}>
            <StoreImage src={store.image} />
          </StoreLink>
        ))}
      </StoreWrapper>
    </InnerWrapper>
  </Wrapper>
)
