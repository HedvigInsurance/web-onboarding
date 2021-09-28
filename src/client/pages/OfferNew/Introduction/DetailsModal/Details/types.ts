import { FormikProps } from 'formik'
import { OfferQuote } from 'pages/OfferNew/types'
import { EditQuoteInput } from 'data/graphql'
import { FieldSchema } from '../types'

export type DetailsProps = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: FieldSchema
  offerQuote: OfferQuote
}
