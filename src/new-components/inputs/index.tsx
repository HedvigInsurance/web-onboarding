import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { WarningIcon } from 'components/icons/Warning'
import { Field, GenericFieldHTMLAttributes } from 'formik'
import * as React from 'react'
import InputMask from 'react-input-mask'

export type Mask = 'ZipCode'

export const masks: { [key: string]: Mask } = {
  zipCode: 'ZipCode',
}

export const unmaskValue = (value: string, mask?: Mask): string => {
  if (mask === 'ZipCode') {
    return value.replace(/\s+/, '')
  }

  return value
}

const resolveMask = (mask: Mask): string => {
  if (mask === 'ZipCode') {
    return '999 99'
  }

  return ''
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

  select {
    cursor: pointer;
    appearance: none;
  }
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

const StyledField = styled(Field)`
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

const StyledInput = StyledField.withComponent(InputMask)

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

interface CoreInputFieldOptions {
  label: string
  value: string
}

export interface CoreInputFieldProps {
  label: string
  placeholder: string
  type?: 'text' | 'number'
  options?: CoreInputFieldOptions[]
  mask?: Mask
}

export interface TextInputProps extends CoreInputFieldProps {
  showErrorMessage?: boolean
  touched?: string
  errors?: string
}

export const TextInput: React.FC<TextInputProps &
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
              <StyledInput
                placeholder={props.placeholder}
                maskChar={null}
                mask={resolveMask(mask)}
                {...field}
              />
            )}
          </StyledField>
        ) : (
          <>
            {options && options.length > 0 ? (
              <StyledField {...props} component="select">
                {options.map((option) => (
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
      <SymbolWrapper>{errors && <WarningIcon />}</SymbolWrapper>
    </Wrapper>
    {showErrorMessage && <ErrorText>{errors}</ErrorText>}
  </>
)

export const InputGroup = styled.div`
  ${Wrapper} {
    border-radius: 0;
    border-color: ${colorsV2.lightgray};

    :not(:first-of-type) {
      border-top: none;
    }

    :first-of-type {
      border-top-left-radius: 8px;
      border-top-right-radius 8px;
    }

    :last-of-type {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius 8px;
    }
  }
`
