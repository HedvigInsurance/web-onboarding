import React from 'react'
import { FormikProps } from 'formik'
import { InputGroup } from 'components/inputs'
import { EditQuoteInput } from 'data/graphql'
import { TextKeyMap } from 'src/client/utils/textKeys'
import {
  isNorwegianHomeContentFieldSchema,
  isNorwegianTravelFieldSchema,
} from '../utils'
import {
  NorwegianTravelContentFieldSchema,
  NorwegianHomeContentFieldSchema,
} from '../types'
import { DetailInput } from './components'
import { SupportSection } from './components'

import { Content, ContentColumnTitle, ContentColumn } from './components'

import { DetailsProps } from './types'

export const NorwegianDetails = ({
  fieldSchema,
  formikProps,
  offerQuote,
  textKeys,
}: DetailsProps) => (
  <>
    {isNorwegianHomeContentFieldSchema(fieldSchema, offerQuote) && (
      <NorwegianHomeContentDetails
        fieldSchema={fieldSchema}
        formikProps={formikProps}
      />
    )}

    {isNorwegianTravelFieldSchema(fieldSchema, offerQuote) && (
      <TravelDetails
        fieldSchema={fieldSchema}
        formikProps={formikProps}
        textKeys={textKeys}
      />
    )}
  </>
)

type NorwegianHomeContentDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: NorwegianHomeContentFieldSchema
}

const NorwegianHomeContentDetails = ({
  formikProps,
  fieldSchema,
}: NorwegianHomeContentDetails) => (
  <Content>
    <ContentColumn>
      <InputGroup>
        <DetailInput
          field={fieldSchema.norwegianHomeContents.street}
          formikProps={formikProps}
          nameRoot="norwegianHomeContents"
          name="street"
        />
        <DetailInput
          field={fieldSchema.norwegianHomeContents.zipCode}
          formikProps={formikProps}
          nameRoot="norwegianHomeContents"
          name="zipCode"
        />
        <DetailInput
          field={fieldSchema.norwegianHomeContents.coInsured}
          formikProps={formikProps}
          nameRoot="norwegianHomeContents"
          name="coInsured"
        />
        <DetailInput
          field={fieldSchema.norwegianHomeContents.isYouth}
          formikProps={formikProps}
          nameRoot="norwegianHomeContents"
          name="isYouth"
        />
        <DetailInput
          field={fieldSchema.norwegianHomeContents.livingSpace}
          formikProps={formikProps}
          nameRoot="norwegianHomeContents"
          name="livingSpace"
        />
        <DetailInput
          field={fieldSchema.norwegianHomeContents.type}
          formikProps={formikProps}
          nameRoot="norwegianHomeContents"
          name="type"
        />
      </InputGroup>
    </ContentColumn>
    <ContentColumn>
      <SupportSection onButtonClick={() => Intercom('show')} />
    </ContentColumn>
  </Content>
)

type TravelDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: NorwegianTravelContentFieldSchema
  textKeys: TextKeyMap
}
const TravelDetails = ({
  fieldSchema,
  formikProps,
  textKeys,
}: TravelDetails) => (
  <Content>
    <ContentColumn>
      <ContentColumnTitle>
        {textKeys.DETAILS_MODULE_TABLE_TITLE()}
      </ContentColumnTitle>
      <InputGroup>
        <DetailInput
          field={fieldSchema.norwegianTravel.coInsured}
          formikProps={formikProps}
          nameRoot="norwegianTravel"
          name="coInsured"
        />
        <DetailInput
          field={fieldSchema.norwegianTravel.isYouth}
          formikProps={formikProps}
          nameRoot="norwegianTravel"
          name="isYouth"
        />
      </InputGroup>
      <SupportSection onButtonClick={() => Intercom('show')} />
    </ContentColumn>
  </Content>
)
