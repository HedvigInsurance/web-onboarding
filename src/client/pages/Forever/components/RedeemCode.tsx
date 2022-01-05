import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import * as Yup from 'yup'
import { Button } from 'components/buttons'
import { InputField } from 'components/inputs'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { useTextKeys } from 'utils/textKeys'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'
export interface RedeemCodeFormValue {
  code: string
}
interface RedeemCodeProps {
  referralCode?: string
  onSubmit: (
    values: RedeemCodeFormValue,
    actions: FormikHelpers<RedeemCodeFormValue>,
  ) => void
}

const codeSchema = Yup.object({
  code: Yup.string().required('FOREVER_CODE_ERROR'),
})

const INPUT_MAX_WIDTH = '21rem'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const RedeemForm = styled(Form)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-width: 800px) {
    justify-content: center;
  }
`

const Main = styled.div`
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;

  @media (min-width: 800px) {
    margin: 0;
  }
`

const CodeField = styled.div`
  margin: 0 auto;

  @media (min-width: 480px) {
    max-width: ${INPUT_MAX_WIDTH};
    margin-bottom: 1.125rem;
  }

  input {
    width: 100%;
    padding-right: 0;
    text-align: center;
    text-transform: uppercase;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 6rem;
`

const Paragraph = styled.p`
  text-align: center;
  color: ${colorsV3.gray700};
  font-size: 1rem;

  @media (min-width: 800px) {
    margin-bottom: 1.25rem;
  }
`

const SubmitButton = styled(Button)<{ disabled?: boolean }>`
  width: 100%;
  height: 3.5rem;
  margin: 0 auto 1rem;
  font-size: 1rem;
  color: ${(props) => (props.disabled ? colorsV3.gray500 : colorsV3.gray900)};
  background-color: ${(props) =>
    props.disabled ? colorsV3.gray300 : colorsV3.purple500};

  @media (min-width: 480px) {
    max-width: ${INPUT_MAX_WIDTH};
  }
`

const Info = styled.div`
  max-width: calc(${INPUT_MAX_WIDTH} + 2 * 2rem);
  margin-top: 0;
  font-size: 0.6875rem;
  color: ${colorsV3.gray700};
  text-align: center;
  line-height: 1.2;
  padding-bottom: 1.5rem;

  @media (min-width: 800px) {
    max-width: 37.5rem;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  a {
    color: ${colorsV3.purple900};

    &:hover {
      color: ${colorsV3.purple900};
    }
  }
`

export const RedeemCode: React.FC<RedeemCodeProps> = ({
  referralCode = '',
  onSubmit,
}) => {
  const textKeys = useTextKeys()
  const [writtenCode, setWrittenCode] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    setWrittenCode(e.target.value)
    setFieldValue('code', e.target.value)
  }

  useEffect(() => {
    const printCode = () => {
      if (charIndex === referralCode.length) {
        window.clearTimeout(printCodeTimeout)
      }

      if (charIndex < referralCode.length) {
        setWrittenCode(writtenCode + referralCode[charIndex])
        setCharIndex(charIndex + 1)
      }
    }

    const isInitialTimeout = charIndex === 0

    const printCodeTimeout = window.setTimeout(
      printCode,
      isInitialTimeout ? 250 : 120,
    )

    return () => {
      window.clearTimeout(printCodeTimeout)
    }
  }, [charIndex, referralCode, writtenCode])

  return (
    <Wrapper>
      <Formik
        initialValues={{ code: referralCode }}
        validationSchema={codeSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, values, isSubmitting, setFieldValue }) => (
          <RedeemForm>
            <Main>
              <Paragraph>{textKeys.FOREVER_LANDINGPAGE_INPUT_TEXT()}</Paragraph>

              <CodeField>
                <InputField
                  label=""
                  value={writtenCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, setFieldValue)
                  }
                  name="code"
                  type="text"
                  placeholder="7VEKCAG"
                  touched={touched.code}
                  errors={errors.code ? textKeys[errors.code]() : ''}
                />
              </CodeField>
            </Main>
            <SubmitButton
              background={colorsV3.purple500}
              foreground={colorsV3.gray900}
              disabled={!values.code}
              type="submit"
            >
              {isSubmitting ? (
                <LoadingDots color={colorsV3.gray800} />
              ) : (
                textKeys.FOREVER_LANDINGPAGE_BTN_LABEL()
              )}
            </SubmitButton>
          </RedeemForm>
        )}
      </Formik>

      <Footer>
        <Info>
          <ReactMarkdown source={textKeys.FOREVER_LANDINGPAGE_INFO_TEXT()} />
        </Info>
        <LanguagePicker color="black" path={`/forever/${referralCode}`} />
      </Footer>
    </Wrapper>
  )
}
