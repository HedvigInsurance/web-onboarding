import React from 'react'
import { InputGroup } from 'components/inputs'
import { isDanishHomeContentFieldSchema } from '../utils'
import { DetailInput } from './components/DetailInput'
import { Content, ContentColumn } from './components/Details.styles'
import { DetailsProps } from './types'

export const DanishDetails: React.FC<DetailsProps> = ({
  fieldSchema,
  formikProps,
  offerQuote,
}) => {
  return (
    <>
      {isDanishHomeContentFieldSchema(fieldSchema, offerQuote) && (
        <Content>
          <ContentColumn>
            <InputGroup>
              <DetailInput
                field={fieldSchema.firstName}
                formikProps={formikProps}
                name="firstName"
              />
              <DetailInput
                field={fieldSchema.lastName}
                formikProps={formikProps}
                name="lastName"
              />
              <DetailInput
                field={fieldSchema.birthDate}
                formikProps={formikProps}
                name="birthDate"
              />
            </InputGroup>
          </ContentColumn>
          <ContentColumn>
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
