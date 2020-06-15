import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { InputField } from 'components/inputs'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

interface RedeemCodeProps {
  code?: string
  currentLocale: string
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  color: ${colorsV3.gray500};
  background-color: ${colorsV3.gray900};
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const Main = styled.div`
  padding: 0 1.625rem;
`

const CodeField = styled.div`
  margin: 0 auto;

  @media (min-width: 480px) {
    max-width: 325px;
  }

  input {
    padding-right: 0;
    text-align: center;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 1.625rem 2.5rem;
`

const LogoLink = styled.a`
  color: ${colorsV3.gray100};
`

const Paragraph = styled.p`
  text-align: center;
  color: ${colorsV3.gray500};
  font-size: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`
const SubmitButton = styled(Button)`
  width: 100%;
  min-width: 12rem;
  height: 3.5rem;

  @media (min-width: 480px) {
    width: auto;
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

      <Main>
        <Paragraph>{textKeys.FOREVER_LANDINGPAGE_INPUT_TEXT()}</Paragraph>
        <Formik
          initialValues={{ code }}
          onSubmit={() => {
            // Submit
          }}
        >
          {({ values }) => (
            <Form>
              <CodeField>
                <InputField
                  label=""
                  value={values.code}
                  name="code"
                  type="text"
                  autoComplete="off"
                  placeholder=""
                  touched={false}
                  errors=""
                  variant="dark"
                />
              </CodeField>
            </Form>
          )}
        </Formik>
      </Main>

      <Footer>
        <SubmitButton
          background={colorsV3.purple500}
          foreground={colorsV3.gray900}
        >
          {textKeys.FOREVER_LANDINGPAGE_BTN_LABEL()}
        </SubmitButton>
      </Footer>
    </PageWrapper>
  )
}
