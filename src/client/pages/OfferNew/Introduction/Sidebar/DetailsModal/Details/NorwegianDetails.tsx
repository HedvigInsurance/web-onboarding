import React from 'react'
import { FormikProps } from 'formik'
import { InputGroup } from 'components/inputs'
import { EditQuoteInput } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import {
  isNorwegianHomeContentFieldSchema,
  isNorwegianTravelFieldSchema,
} from '../utils'
import {
  NorwegianTravelContentFieldSchema,
  NorwegianHomeContentFieldSchema,
  CommonFieldSchema,
} from '../types'
import { DetailInput } from './components/DetailInput'
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
}) => (
  <>
    {isNorwegianHomeContentFieldSchema(fieldSchema, offerQuote) && (
      <NorwegianHomeContentDetails
        fieldSchema={fieldSchema}
        formikProps={formikProps}
      />
    )}
    {isNorwegianTravelFieldSchema(fieldSchema, offerQuote) && (
      <TravelDetails fieldSchema={fieldSchema} formikProps={formikProps} />
    )}
  </>
)

type NorwegianHomeContentDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: NorwegianHomeContentFieldSchema & CommonFieldSchema
}

const NorwegianHomeContentDetails: React.FC<NorwegianHomeContentDetails> = ({
  formikProps,
  fieldSchema,
}) => {
  const textKeys = useTextKeys()

  return (
    <Content>
      <ContentColumn>
        <ContentColumnTitle>
          {textKeys.DETAILS_MODULE_PERSONAL_INFORMATION()}
        </ContentColumnTitle>
        <InputGroup>
          <DetailInput
            field={fieldSchema.firstName}
            formikProps={formikProps}
            nameRoot=""
            name="firstName"
          />
          <DetailInput
            field={fieldSchema.lastName}
            formikProps={formikProps}
            nameRoot=""
            name="lastName"
          />
          <DetailInput
            field={fieldSchema.birthDate}
            formikProps={formikProps}
            nameRoot=""
            name="birthDate"
          />
        </InputGroup>
      </ContentColumn>
      <ContentColumn>
        <ContentColumnTitle>
          {textKeys.DETAILS_MODULE_TABLE_TITLE()}
        </ContentColumnTitle>
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
    </Content>
  )
}

type TravelDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: NorwegianTravelContentFieldSchema & CommonFieldSchema
}
const TravelDetails: React.FC<TravelDetails> = ({
  fieldSchema,
  formikProps,
}) => {
  const textKeys = useTextKeys()
  return (
    <>
      <Content>
        <ContentColumn>
          <ContentColumnTitle>
            {textKeys.DETAILS_MODULE_PERSONAL_INFORMATION()}
          </ContentColumnTitle>
          <InputGroup>
            <DetailInput
              field={fieldSchema.firstName}
              formikProps={formikProps}
              nameRoot=""
              name="firstName"
            />
            <DetailInput
              field={fieldSchema.lastName}
              formikProps={formikProps}
              nameRoot=""
              name="lastName"
            />
            <DetailInput
              field={fieldSchema.birthDate}
              formikProps={formikProps}
              nameRoot=""
              name="birthDate"
            />
          </InputGroup>
        </ContentColumn>
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
        </ContentColumn>
      </Content>
    </>
  )
}
