import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Field, GenericFieldHTMLAttributes } from 'formik'
import { FieldInputProps } from 'formik/dist/types'
import React from 'react'
import InputMask from 'react-input-mask'
import { WarningTriangle } from 'components/icons/WarningTriangle'
import { ChevronDown } from 'components/icons/ChevronDown'

export interface Mask {
  name: string
  mask: string
  sanitize: (value: string) => string
}

const INVISIBLE_MASK_CHAR = '\u200b'

export const masks: Record<string, Mask> = {
  fiveDigitZipCode: {
    name: 'ZipCode',
    mask: '999 99',
    sanitize: (value) => value.replace(/\s+/, ''),
  },
  fourDigitZipCode: {
    name: 'ZipCode',
    mask: '9999',
    sanitize: (value) => value.replace(/\s+/, ''),
  },
  area: {
    name: 'Area',
    mask: '99999 m2',
    sanitize: (value) =>
      value.replace(RegExp(`/[\\s${INVISIBLE_MASK_CHAR}]+m2/`), ''),
  },
  year: {
    name: 'Year',
    mask: '9999',
    sanitize: (value) => value,
  },
}

type variantType = 'light' | 'dark'

const InputFieldContainer = styled.div`
  margin-bottom: 1.5rem;
`

const Wrapper = styled.div<{
  errors?: string
  variant: variantType
  disabled?: boolean
}>`
  position: relative;
  background-color: ${(props) =>
    props.disabled ? colorsV3.gray300 : colorsV3.white};
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.errors ? colorsV3.red600 : colorsV3.gray300)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  padding: 1rem 0.875rem;
  margin-top: 0.5rem;

  &:hover {
    border: 1px solid ${colorsV3.gray700};
  }

  &:focus-within {
    color: ${(props) => (props.disabled ? colorsV3.gray500 : colorsV3.gray900)};
    border: 1px solid
      ${(props) => (props.errors ? colorsV3.red600 : colorsV3.gray900)};
  }

  input {
    color: ${(props) => (props.disabled ? colorsV3.gray500 : colorsV3.gray900)};
  }

  select {
    cursor: pointer;
    appearance: none;
  }
`
const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Label = styled.label`
  font-size: 0.875rem;
  line-height: 1.33;
  color: ${colorsV3.gray900};
`

const StyledField = styled(Field)`
  position: relative;
  z-index: 1;
  background: none;
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  color: inherit;
  padding: 1rem 0.875rem;
  margin: 0;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${colorsV3.gray500};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  &input[type='number'] {
    appearence: textfield;
  }
`

const StyledInputMask = StyledField.withComponent(InputMask)

const SymbolWrapper = styled.div`
  position: absolute;
  right: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const ErrorText = styled.div`
  min-height: 1.375rem;
  font-size: 0.75rem;
  line-height: 1.33;
  color: ${colorsV3.red600};
  margin-top: 0.25rem;
  svg {
    vertical-align: middle;
    margin-right: 0.25rem;
  }
`

const HelperText = styled.div`
  min-height: 1.375rem;
  font-size: 0.75rem;
  line-height: 1.33;
  color: ${colorsV3.gray700};
  margin-top: 0.25rem;
`

interface CoreInputFieldOptions {
  label: string
  value: string
}

export const inputTypes: Record<string, string> = {
  text: 'text',
  number: 'number',
}

export interface CoreInputFieldProps {
  label: string
  placeholder?: string
  type?: string
  options?: CoreInputFieldOptions[]
  mask?: Mask
  helperText?: string
  onChange?: FieldInputProps<string>['onChange']
  onBlur?: FieldInputProps<string>['onBlur']
}

export interface TextInputProps extends CoreInputFieldProps {
  showErrorMessage?: boolean
  touched?: boolean
  errors?: string
  variant?: variantType
}

const StyledRawInput = styled.input`
  appearance: none;
  -moz-appearance: textfield;
  background: none;
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0;
  margin: 0;
  width: 100%;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${colorsV3.gray500};
  }
`

export const RawInputField: React.FC<React.InputHTMLAttributes<
  HTMLInputElement
> & {
  label?: string
  errors?: string
  helperText?: string
  variant?: variantType
  showErrorIcon?: boolean
  disabled?: boolean
}> = ({
  errors,
  disabled,
  showErrorIcon = false,
  helperText,
  label,
  className,
  variant = 'light',
  ...props
}) => (
  <InputFieldContainer className={className}>
    {label && <Label htmlFor={props.id}>{label}</Label>}
    <Wrapper errors={errors} variant={variant} disabled={disabled}>
      <StyledRawInput disabled={disabled} {...props} />
    </Wrapper>
    {helperText && <HelperText>{helperText}</HelperText>}
    {errors && (
      <ErrorText>
        <WarningTriangle size={13} />
        {errors}
      </ErrorText>
    )}
  </InputFieldContainer>
)

export const InputField: React.FC<TextInputProps &
  GenericFieldHTMLAttributes> = ({
  label,
  mask,
  showErrorMessage = true,
  type = 'text',
  options,
  touched,
  errors,
  helperText,
  variant = 'light',
  ...props
}) => (
  <>
    <Wrapper errors={errors} variant={variant}>
      <Label>{label}</Label>
      <TextWrapper>
        {mask ? (
          <StyledField {...props}>
            {({ field }: any) => (
              <StyledInputMask
                mask={mask.mask}
                alwaysShowMask={true}
                maskChar={INVISIBLE_MASK_CHAR}
                {...field}
                {...props}
              />
            )}
          </StyledField>
        ) : (
          <>
            {options && options.length > 0 ? (
              <StyledField {...props} component="select">
                {options!.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledField>
            ) : (
              <StyledField type={type} {...props} />
            )}
          </>
        )}
      </TextWrapper>
      <SymbolWrapper>
        {options && options.length > 0 && <ChevronDown />}
      </SymbolWrapper>
      {helperText && <HelperText>help text</HelperText>}
      {errors && (
        <ErrorText>
          <WarningTriangle size={13} />
          {errors}
        </ErrorText>
      )}
    </Wrapper>
  </>
)

export const InputGroupDeleteButton = styled.button`
  background: ${colorsV3.white};
  color: ${colorsV3.red500};
  display: flex;
  width: 100%;
  height: 3.125rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 350ms;
  border: 1px solid ${colorsV3.gray500};
  border-top: 0;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.25rem;

  :focus {
    outline: none;
  }

  :hover {
    /* HEX value with opcaity (1a = 10% transparency) */
    background-color: ${colorsV3.red500}1a;
  }
`

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  > ${Wrapper as any}:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  > ${Wrapper as any}:last-child, ${InputGroupDeleteButton}:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  ${Wrapper as any}, ${InputGroupDeleteButton} {
    border-radius: 0;
    border-color: ${colorsV3.gray500};

    :not(:first-of-type) {
      border-top: none;
    }
  }
`

export const InputGroupRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  ${Wrapper as any} {
    width: 50%;
    border-top: 0;

    :first-of-type {
      border-right: 0;
    }
    ${TextWrapper as any} {
      width: calc(100% - 1.5rem);
    }

    ${SymbolWrapper as any} {
      margin: 0 1rem 0 0;
    }
  }
`
