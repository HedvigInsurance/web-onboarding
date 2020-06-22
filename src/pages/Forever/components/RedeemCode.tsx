import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { InputField } from 'components/inputs'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import * as Yup from 'yup'

interface RedeemCodeProps {
  code?: string
  currentLocale: string
}

const codeSchema = Yup.object({
  code: Yup.string().required('FOREVER_CODE_ERROR'),
})

const INPUT_MAX_WIDTH = '21rem'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 1.625rem;
  padding-right: 1.625rem;
  color: ${colorsV3.gray500};
  background-color: ${colorsV3.gray900};

  @media (min-width: 800px) {
    padding-left: 3.75rem;
    padding-right: 3.75rem;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 1.25rem;
  padding-bottom: 1.15rem;

  @media (min-width: 800px) {
    justify-content: space-between;
    padding-top: 2.5rem;
  }
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
  padding: 1rem 0 2.5rem;
`

const LogoLink = styled.a`
  color: ${colorsV3.gray100};
`

const Paragraph = styled.p`
  text-align: center;
  color: ${colorsV3.gray500};
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
    props.disabled ? colorsV3.gray800 : colorsV3.purple500};

  @media (min-width: 480px) {
    max-width: ${INPUT_MAX_WIDTH};
  }
`

const Info = styled.p`
  max-width: 25rem;
  margin-top: 0;
  font-size: 0.6875rem;
  color: ${colorsV3.gray500};
  text-align: center;
  line-height: 1.2;

  @media (min-width: 800px) {
    max-width: 37.5rem;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  a {
    color: ${colorsV3.gray100};
  }
`

export const RedeemCode: React.FC<RedeemCodeProps> = ({
  code,
  currentLocale,
}) => {
  const textKeys = useTextKeys()
  return (
    <PageWrapper>
      <Header>
        <LogoLink href={'/' + currentLocale}>
          <HedvigLogo width={94} />
        </LogoLink>
      </Header>

      <Formik
        initialValues={{ code }}
        validationSchema={codeSchema}
        onSubmit={() => {
          // Submit
        }}
      >
        {({ touched, errors, values }) => (
          <RedeemForm>
            <Main>
              <Paragraph>{textKeys.FOREVER_LANDINGPAGE_INPUT_TEXT()}</Paragraph>

              <CodeField>
                <InputField
                  label=""
                  value={values.code}
                  name="code"
                  type="text"
                  autoComplete="off"
                  placeholder=""
                  touched={touched.code}
                  errors={errors.code ? textKeys[errors.code]() : ''}
                  variant="dark"
                />
              </CodeField>
            </Main>
            <SubmitButton
              background={colorsV3.purple500}
              foreground={colorsV3.gray900}
              disabled={!values.code}
            >
              {textKeys.FOREVER_LANDINGPAGE_BTN_LABEL()}
            </SubmitButton>
          </RedeemForm>
        )}
      </Formik>

      <Footer>
        <Info
          dangerouslySetInnerHTML={{
            __html: textKeys.FOREVER_LANDINGPAGE_INFO_TEXT(),
          }}
        />
      </Footer>
    </PageWrapper>
  )
}
