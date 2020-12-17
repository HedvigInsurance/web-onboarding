import React from 'react'
import { InputGroup } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { isDanishHomeContentFieldSchema } from '../utils'
import { DetailInput } from './components/DetailInput'
import {
  Content,
  ContentColumn,
  ContentColumnTitle,
} from './components/Details.styles'
import { DetailsProps } from './types'
import { CommonFields } from './components/CommonFields'

export const DanishDetails: React.FC<DetailsProps> = ({
  fieldSchema,
  formikProps,
  offerQuote,
}) => {
  const textKeys = useTextKeys()
  return (
    <>
      {isDanishHomeContentFieldSchema(fieldSchema, offerQuote) && (
        <Content>
          <ContentColumn>
            <ContentColumnTitle>
              {textKeys.DETAILS_MODULE_PERSONAL_INFORMATION()}
            </ContentColumnTitle>
            <CommonFields fieldSchema={fieldSchema} formikProps={formikProps} />
          </ContentColumn>
          <ContentColumn>
            <ContentColumnTitle>
              {textKeys.DETAILS_MODULE_TABLE_TITLE()}
            </ContentColumnTitle>
            <InputGroup>
              <DetailInput
                field={fieldSchema.danishHomeContents.street}
                formikProps={formikProps}
                nameRoot="danishHomeContents"
                name="street"
              />
              <DetailInput
                field={fieldSchema.danishHomeContents.zipCode}
                formikProps={formikProps}
                nameRoot="danishHomeContents"
                name="zipCode"
              />
              <DetailInput
                field={fieldSchema.danishHomeContents.coInsured}
                formikProps={formikProps}
                nameRoot="danishHomeContents"
                name="coInsured"
              />
              <DetailInput
                field={fieldSchema.danishHomeContents.isStudent}
                formikProps={formikProps}
                nameRoot="danishHomeContents"
                name="isStudent"
              />
              <DetailInput
                field={fieldSchema.danishHomeContents.livingSpace}
                formikProps={formikProps}
                nameRoot="danishHomeContents"
                name="livingSpace"
              />
              <DetailInput
                field={fieldSchema.danishHomeContents.type}
                formikProps={formikProps}
                nameRoot="danishHomeContents"
                name="type"
              />
            </InputGroup>
          </ContentColumn>
        </Content>
      )}
    </>
  )
}
