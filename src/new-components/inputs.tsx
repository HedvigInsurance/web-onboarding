import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { WarningIcon } from 'components/icons/Warning'
import { Field, GenericFieldHTMLAttributes } from 'formik'
import * as React from 'react'

interface TextInputProps {
  label: string
  touched?: string
  errors?: string
}

const Wrapper = styled.div<{ errors?: string }>`
  background: ${colorsV2.white};
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.errors ? colorsV2.coral500 : colorsV2.lightgray)};
  padding: 0.875rem 1.5rem 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
`

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  font-size: 0.75rem;
  line-height: 0.75rem;
  color: ${colorsV2.gray};
  margin-bottom: 0.125rem;
`

const StyledInput = styled.input`
  background: none;
  border: none;
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-weight: 600;
  color: ${colorsV2.black};
  padding: 0;
  margin: 0;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${colorsV2.semilightgray};
  }
`

const StyledField = StyledInput.withComponent(Field)

const SymbolWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-left: 1rem;
`

const ErrorText = styled.div`
  min-height: 1.375rem;
  font-size: 0.75rem;
  line-height: 1.375rem;
  text-align: center;
  color: ${colorsV2.coral700};
  margin-top: 0.25rem;
`

const createTextInput = <T extends {}>(
  FieldComponent: React.ComponentType<T>,
): React.FC<TextInputProps & T> => ({ label, touched, errors, ...props }) => (
  <>
    <Wrapper errors={errors}>
      <TextWrapper>
        <Label>{label}</Label>
        <FieldComponent {...(props as T)} />
      </TextWrapper>
      <SymbolWrapper>{errors && <WarningIcon />}</SymbolWrapper>
    </Wrapper>
    <ErrorText>{errors}</ErrorText>
  </>
)

export const TextInput = createTextInput<
  React.InputHTMLAttributes<HTMLInputElement>
>(StyledInput)

export const FormikTextInput = createTextInput<GenericFieldHTMLAttributes>(
  StyledField,
)
