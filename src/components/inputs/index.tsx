import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { DownArrow } from 'components/icons/DownArrow'
import { WarningIcon } from 'components/icons/Warning'
import { Field, GenericFieldHTMLAttributes } from 'formik'
import { FieldInputProps } from 'formik/dist/types'
import * as React from 'react'
import InputMask from 'react-input-mask'

interface Mask {
  name: string
  mask: string
  sanitize: (value: string) => string
}

const INVISIBLE_MASK_CHAR = '\u200b'

export const masks: Record<string, Mask> = {
  zipCode: {
    name: 'ZipCode',
    mask: '999 99',
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

const Wrapper = styled.div<{ errors?: string }>`
  position: relative;
  background: ${colorsV2.white};
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.errors ? colorsV2.coral500 : colorsV2.lightgray)};
  padding: 0.875rem 1.5rem 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

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
  font-size: 0.75rem;
  line-height: 0.75rem;
  color: ${colorsV2.gray};
  margin-bottom: 0.125rem;
`

const StyledField = styled(Field)`
  position: relative;
  z-index: 1;
  background: none;
  border: none;
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: ${colorsV2.black};
  padding: 0 2.5rem 0 0;
  margin: 0;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${colorsV2.semilightgray};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  &input[type='number'] {
    appearance: textfield;
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
    width 1rem;
    height: 1rem;
  }
`

const ErrorText = styled.div`
  min-height: 1.375rem;
  font-size: 0.75rem;
  line-height: 1.375rem;
  text-align: center;
  color: ${colorsV2.coral700};
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
  placeholder: string
  type?: string
  options?: CoreInputFieldOptions[]
  mask?: Mask
  onChange?: FieldInputProps<string>['onChange']
  onBlur?: FieldInputProps<string>['onBlur']
}

export interface TextInputProps extends CoreInputFieldProps {
  showErrorMessage?: boolean
  touched?: boolean
  errors?: string
}

const StyledRawInput = styled.input`
  appearance: none;
  -moz-appearance: textfield;
  background: none;
  border: none;
  font-size: 1.125rem;
  line-height: 1.625rem;
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

export const RawInputField: React.FC<React.InputHTMLAttributes<
  HTMLInputElement
> & {
  label: string
  errors?: string
}> = ({ errors, label, className, ...props }) => (
  <>
    <Wrapper errors={errors} className={className}>
      <TextWrapper>
        <Label htmlFor={props.id}>{label}</Label>
        <StyledRawInput {...props} />
      </TextWrapper>
      <SymbolWrapper>{errors && <WarningIcon />}</SymbolWrapper>
    </Wrapper>
    {errors && <ErrorText>{errors}</ErrorText>}
  </>
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
  ...props
}) => (
  <>
    <Wrapper errors={errors}>
      <TextWrapper>
        <Label>{label}</Label>
        {mask ? (
          <StyledField {...props}>
            {({ field }: any) => (
              <StyledInputMask
                placeholder={props.placeholder}
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
        {options && options.length > 0 ? (
          <DownArrow />
        ) : (
          errors && <WarningIcon />
        )}
      </SymbolWrapper>
    </Wrapper>
    {showErrorMessage && <ErrorText>{errors}</ErrorText>}
  </>
)

export const InputGroupDeleteButton = styled.button`
  background: ${colorsV2.white};
  color: ${colorsV2.coral500};
  display: flex;
  width: 100%;
  height: 3.125rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 350ms;
  border: 1px solid ${colorsV2.lightgray};
  border-top: 0;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.25rem;

  :focus {
    outline: none;
  }

  :hover {
    background: ${colorsV2.coral100};
  }
`

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  > ${Wrapper}:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  > ${Wrapper}:last-child, ${InputGroupDeleteButton}:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  ${Wrapper}, ${InputGroupDeleteButton} {
    border-radius: 0;
    border-color: ${colorsV2.lightgray};

    :not(:first-of-type) {
      border-top: none;
    }
  }
`

export const InputGroupRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  ${Wrapper} {
    width: 50%;
    border-top: 0;

    :first-of-type {
      border-right: 0;
    }
    ${TextWrapper} {
      width: calc(100% - 1.5rem);
    }

    ${SymbolWrapper} {
      margin: 0 1rem 0 0;
    }
  }
`
