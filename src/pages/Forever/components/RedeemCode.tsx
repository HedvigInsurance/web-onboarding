import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { InputField } from 'components/inputs'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const INPUT_MAX_WIDTH = '21rem'

interface RedeemCodeProps {
  code?: string
  currentLocale: string
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-left: 1.625rem;
  padding-right: 1.625rem;
  color: ${colorsV3.gray500};
  background-color: ${colorsV3.gray900};
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 1.25rem;
  padding-bottom: 1.15rem;
`

const Main = styled.div``

const CodeField = styled.div`
  margin: 0 auto;

  @media (min-width: 480px) {
    max-width: ${INPUT_MAX_WIDTH};
  }

  input {
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
`

const SubmitButton = styled(Button)`
  width: 100%;
  min-width: 12rem;
  height: 3.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;

  @media (min-width: 480px) {
    width: auto;
  }
`

const Info = styled.p`
  max-width: 25rem;
  margin-top: 0;
  font-size: 0.6875rem;
  color: ${colorsV3.gray500};
  text-align: center;
  line-height: 1.2;

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
        <Info
          dangerouslySetInnerHTML={{
            __html: textKeys.FOREVER_LANDINGPAGE_INFO_TEXT(),
          }}
        />
      </Footer>
    </PageWrapper>
  )
}
