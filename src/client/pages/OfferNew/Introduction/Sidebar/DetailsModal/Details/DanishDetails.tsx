import React from 'react'
import { InputGroup } from 'components/inputs'
import { isDanishHomeContentFieldSchema } from '../utils'
import { DetailInput } from './components'
import { SupportSection } from './components'
import { Content, ContentColumn } from './components'
import { Details } from './types'

export const DanishDetails = ({
  fieldSchema,
  formikProps,
  offerQuote,
}: Details) => (
  <>
    {isDanishHomeContentFieldSchema(fieldSchema, offerQuote) && (
      <Content>
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
        <ContentColumn>
          <SupportSection onButtonClick={() => Intercom('show')} />
        </ContentColumn>
      </Content>
    )}
  </>
)
