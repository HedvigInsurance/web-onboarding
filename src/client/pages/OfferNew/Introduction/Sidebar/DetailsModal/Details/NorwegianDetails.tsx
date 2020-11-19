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
import { DetailInput } from './components/DetailInput'
import { SupportSection } from './components/SupportSection'
import {
  Content,
  ContentColumnTitle,
  ContentColumn,
} from './components/Details.styles'
import { DetailsProps } from './types'

export const NorwegianDetails: React.FC<DetailsProps> = ({
  fieldSchema,
  formikProps,
  offerQuote,
  textKeys,
}) => (
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

const NorwegianHomeContentDetails: React.FC<NorwegianHomeContentDetails> = ({
  formikProps,
  fieldSchema,
}) => (
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
const TravelDetails: React.FC<TravelDetails> = ({
  fieldSchema,
  formikProps,
  textKeys,
}) => (
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
