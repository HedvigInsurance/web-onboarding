import { gql } from '@apollo/client'
import * as ApolloReactCommon from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the date-timeformat outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representationof dates and times using the Gregorian calendar. */
  DateTime: any
  LocalDate: any
  Object: any
  URL: any
  /** A String-representation of Adyen's PaymentMethodsResponse */
  PaymentMethodsResponse: any
  /** An ISO-8601 String representation of a `java.time.Instant`, e.g. 2019-07-03T19:07:38.494081Z */
  Instant: any
  JSONString: any
  UUID: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
  TimeStamp: any
  JSONObject: any
  /** A String-representation of Adyen's payment method details */
  PaymentMethodDetails: any
  /** A String-representation of Adyen's checkout payments action */
  CheckoutPaymentsAction: any
  /** A String-representation of Adyen's payments details request */
  PaymentsDetailsRequest: any
  /** Raw JSON value */
  Json: any
  /** The Long scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any
  Hex: any
  RGBAHue: any
  RGBATransparency: any
  /** A date string, such as 2007-12-03 (YYYY-MM-DD), compliant with ISO 8601 standard for representation of dates using the Gregorian calendar. */
  Date: any
  /** Slate-compatible RichText AST */
  RichTextAST: any
}

export enum _FilterKind {
  Search = 'search',
  And = 'AND',
  Or = 'OR',
  Not = 'NOT',
  Eq = 'eq',
  EqNot = 'eq_not',
  In = 'in',
  NotIn = 'not_in',
  Lt = 'lt',
  Lte = 'lte',
  Gt = 'gt',
  Gte = 'gte',
  Contains = 'contains',
  NotContains = 'not_contains',
  StartsWith = 'starts_with',
  NotStartsWith = 'not_starts_with',
  EndsWith = 'ends_with',
  NotEndsWith = 'not_ends_with',
  ContainsAll = 'contains_all',
  ContainsSome = 'contains_some',
  ContainsNone = 'contains_none',
  RelationalSingle = 'relational_single',
  RelationalEvery = 'relational_every',
  RelationalSome = 'relational_some',
  RelationalNone = 'relational_none',
}

export enum _MutationInputFieldKind {
  Scalar = 'scalar',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Enum = 'enum',
  Relation = 'relation',
  Union = 'union',
  Virtual = 'virtual',
}

export enum _MutationKind {
  Create = 'create',
  Publish = 'publish',
  Unpublish = 'unpublish',
  Update = 'update',
  Upsert = 'upsert',
  Delete = 'delete',
  UpdateMany = 'updateMany',
  PublishMany = 'publishMany',
  UnpublishMany = 'unpublishMany',
  DeleteMany = 'deleteMany',
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum _RelationInputCardinality {
  One = 'one',
  Many = 'many',
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update',
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union',
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Localization = 'localization',
  Combined = 'combined',
}

export type AcceptedReferral = {
  __typename?: 'AcceptedReferral'
  quantity?: Maybe<Scalars['Int']>
}

/** The contract has an inception date in the future and a termination date in the future */
export type ActiveInFutureAndTerminatedInFutureStatus = {
  __typename?: 'ActiveInFutureAndTerminatedInFutureStatus'
  futureInception?: Maybe<Scalars['LocalDate']>
  futureTermination?: Maybe<Scalars['LocalDate']>
}

/** The contract has an inception date set in the future */
export type ActiveInFutureStatus = {
  __typename?: 'ActiveInFutureStatus'
  futureInception?: Maybe<Scalars['LocalDate']>
}

export type ActivePaymentMethodsResponse = {
  __typename?: 'ActivePaymentMethodsResponse'
  storedPaymentMethodsDetails: StoredPaymentMethodsDetails
}

export type ActivePayoutMethodsResponse = {
  __typename?: 'ActivePayoutMethodsResponse'
  status: PayoutMethodStatus
}

export type ActiveReferral = {
  __typename?: 'ActiveReferral'
  name?: Maybe<Scalars['String']>
  discount: MonetaryAmountV2
}

/** The contract has an inception date set today or in the past without a termination date set */
export type ActiveStatus = {
  __typename?: 'ActiveStatus'
  pastInception?: Maybe<Scalars['LocalDate']>
  upcomingAgreementChange?: Maybe<UpcomingAgreementChange>
}

export type AdditionalPaymentsDetailsRequest = {
  paymentsDetailsRequest: Scalars['PaymentsDetailsRequest']
}

export type AdditionalPaymentsDetailsResponse =
  | AdditionalPaymentsDetailsResponseFinished
  | AdditionalPaymentsDetailsResponseAction

export type AdditionalPaymentsDetailsResponseAction = {
  __typename?: 'AdditionalPaymentsDetailsResponseAction'
  action: Scalars['CheckoutPaymentsAction']
}

export type AdditionalPaymentsDetailsResponseFinished = {
  __typename?: 'AdditionalPaymentsDetailsResponseFinished'
  resultCode: Scalars['String']
  tokenizationResult: TokenizationResultType
}

export type AddPhotoToKeyGearItemInput = {
  itemId: Scalars['ID']
  file: S3FileInput
}

export type AddReceiptToKeyGearItemInput = {
  itemId: Scalars['ID']
  file: S3FileInput
}

export type Address = {
  __typename?: 'Address'
  street: Scalars['String']
  postalCode: Scalars['String']
  city?: Maybe<Scalars['String']>
}

export type Aggregate = {
  __typename?: 'Aggregate'
  count: Scalars['Int']
}

export type Agreement =
  | SwedishApartmentAgreement
  | SwedishHouseAgreement
  | NorwegianHomeContentAgreement
  | NorwegianTravelAgreement
  | DanishHomeContentAgreement
  | DanishAccidentAgreement
  | DanishTravelAgreement

export type AgreementCore = {
  id: Scalars['ID']
  status: AgreementStatus
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  termsAndConditions?: Maybe<InsuranceTerm>
}

export enum AgreementStatus {
  /** An agreement with no activation date, waiting to be activated */
  Pending = 'PENDING',
  /** An agreement that will be active on a future date */
  ActiveInFuture = 'ACTIVE_IN_FUTURE',
  /** An agreement that is active today */
  Active = 'ACTIVE',
  /** An agreement that either was never active that is now terminated or was active in the past of a now terminated contract */
  Terminated = 'TERMINATED',
}

export type AngelStory = {
  __typename?: 'AngelStory'
  content: Scalars['String']
}

export enum ApartmentType {
  StudentRent = 'STUDENT_RENT',
  Rent = 'RENT',
  StudentBrf = 'STUDENT_BRF',
  Brf = 'BRF',
}

/** The background image for the login screen */
export type AppMarketingImage = Node & {
  __typename?: 'AppMarketingImage'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<AppMarketingImage>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  image?: Maybe<Asset>
  language?: Maybe<Language>
  blurhash?: Maybe<Scalars['String']>
  userInterfaceStyle: UserInterfaceStyle
  /** List of AppMarketingImage versions */
  history: Array<Version>
}

/** The background image for the login screen */
export type AppMarketingImageDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** The background image for the login screen */
export type AppMarketingImageImageArgs = {
  locales?: Maybe<Array<Locale>>
}

/** The background image for the login screen */
export type AppMarketingImageLanguageArgs = {
  locales?: Maybe<Array<Locale>>
}

/** The background image for the login screen */
export type AppMarketingImageHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type AppMarketingImageConnectInput = {
  /** Document to connect */
  where: AppMarketingImageWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type AppMarketingImageConnection = {
  __typename?: 'AppMarketingImageConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<AppMarketingImageEdge>
  aggregate: Aggregate
}

export type AppMarketingImageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  image?: Maybe<AssetCreateOneInlineInput>
  language?: Maybe<LanguageCreateOneInlineInput>
  blurhash?: Maybe<Scalars['String']>
  userInterfaceStyle: UserInterfaceStyle
}

export type AppMarketingImageCreateManyInlineInput = {
  /** Create and connect multiple existing AppMarketingImage documents */
  create?: Maybe<Array<AppMarketingImageCreateInput>>
  /** Connect multiple existing AppMarketingImage documents */
  connect?: Maybe<Array<AppMarketingImageWhereUniqueInput>>
}

export type AppMarketingImageCreateOneInlineInput = {
  /** Create and connect one AppMarketingImage document */
  create?: Maybe<AppMarketingImageCreateInput>
  /** Connect one existing AppMarketingImage document */
  connect?: Maybe<AppMarketingImageWhereUniqueInput>
}

/** An edge in a connection. */
export type AppMarketingImageEdge = {
  __typename?: 'AppMarketingImageEdge'
  /** The item at the end of the edge. */
  node: AppMarketingImage
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type AppMarketingImageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AppMarketingImageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AppMarketingImageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AppMarketingImageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  image?: Maybe<AssetWhereInput>
  language?: Maybe<LanguageWhereInput>
  blurhash?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  blurhash_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  blurhash_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  blurhash_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  blurhash_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  blurhash_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  blurhash_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  blurhash_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  blurhash_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  blurhash_not_ends_with?: Maybe<Scalars['String']>
  userInterfaceStyle?: Maybe<UserInterfaceStyle>
  /** All values that are not equal to given value. */
  userInterfaceStyle_not?: Maybe<UserInterfaceStyle>
  /** All values that are contained in given list. */
  userInterfaceStyle_in?: Maybe<Array<UserInterfaceStyle>>
  /** All values that are not contained in given list. */
  userInterfaceStyle_not_in?: Maybe<Array<UserInterfaceStyle>>
}

export enum AppMarketingImageOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  BlurhashAsc = 'blurhash_ASC',
  BlurhashDesc = 'blurhash_DESC',
  UserInterfaceStyleAsc = 'userInterfaceStyle_ASC',
  UserInterfaceStyleDesc = 'userInterfaceStyle_DESC',
}

export type AppMarketingImageUpdateInput = {
  image?: Maybe<AssetUpdateOneInlineInput>
  language?: Maybe<LanguageUpdateOneInlineInput>
  blurhash?: Maybe<Scalars['String']>
  userInterfaceStyle?: Maybe<UserInterfaceStyle>
}

export type AppMarketingImageUpdateManyInlineInput = {
  /** Create and connect multiple AppMarketingImage documents */
  create?: Maybe<Array<AppMarketingImageCreateInput>>
  /** Connect multiple existing AppMarketingImage documents */
  connect?: Maybe<Array<AppMarketingImageConnectInput>>
  /** Override currently-connected documents with multiple existing AppMarketingImage documents */
  set?: Maybe<Array<AppMarketingImageWhereUniqueInput>>
  /** Update multiple AppMarketingImage documents */
  update?: Maybe<Array<AppMarketingImageUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple AppMarketingImage documents */
  upsert?: Maybe<Array<AppMarketingImageUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple AppMarketingImage documents */
  disconnect?: Maybe<Array<AppMarketingImageWhereUniqueInput>>
  /** Delete multiple AppMarketingImage documents */
  delete?: Maybe<Array<AppMarketingImageWhereUniqueInput>>
}

export type AppMarketingImageUpdateManyInput = {
  blurhash?: Maybe<Scalars['String']>
  userInterfaceStyle?: Maybe<UserInterfaceStyle>
}

export type AppMarketingImageUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: AppMarketingImageWhereInput
  /** Update many input */
  data: AppMarketingImageUpdateManyInput
}

export type AppMarketingImageUpdateOneInlineInput = {
  /** Create and connect one AppMarketingImage document */
  create?: Maybe<AppMarketingImageCreateInput>
  /** Update single AppMarketingImage document */
  update?: Maybe<AppMarketingImageUpdateWithNestedWhereUniqueInput>
  /** Upsert single AppMarketingImage document */
  upsert?: Maybe<AppMarketingImageUpsertWithNestedWhereUniqueInput>
  /** Connect existing AppMarketingImage document */
  connect?: Maybe<AppMarketingImageWhereUniqueInput>
  /** Disconnect currently connected AppMarketingImage document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected AppMarketingImage document */
  delete?: Maybe<Scalars['Boolean']>
}

export type AppMarketingImageUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: AppMarketingImageWhereUniqueInput
  /** Document to update */
  data: AppMarketingImageUpdateInput
}

export type AppMarketingImageUpsertInput = {
  /** Create document if it didn't exist */
  create: AppMarketingImageCreateInput
  /** Update document if it exists */
  update: AppMarketingImageUpdateInput
}

export type AppMarketingImageUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: AppMarketingImageWhereUniqueInput
  /** Upsert data */
  data: AppMarketingImageUpsertInput
}

/** Identifies documents */
export type AppMarketingImageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AppMarketingImageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AppMarketingImageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AppMarketingImageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  image?: Maybe<AssetWhereInput>
  language?: Maybe<LanguageWhereInput>
  blurhash?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  blurhash_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  blurhash_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  blurhash_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  blurhash_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  blurhash_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  blurhash_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  blurhash_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  blurhash_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  blurhash_not_ends_with?: Maybe<Scalars['String']>
  userInterfaceStyle?: Maybe<UserInterfaceStyle>
  /** All values that are not equal to given value. */
  userInterfaceStyle_not?: Maybe<UserInterfaceStyle>
  /** All values that are contained in given list. */
  userInterfaceStyle_in?: Maybe<Array<UserInterfaceStyle>>
  /** All values that are not contained in given list. */
  userInterfaceStyle_not_in?: Maybe<Array<UserInterfaceStyle>>
}

/** References AppMarketingImage record uniquely */
export type AppMarketingImageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type ArrangedPerilCategories = {
  __typename?: 'ArrangedPerilCategories'
  me?: Maybe<PerilCategory>
  home?: Maybe<PerilCategory>
  stuff?: Maybe<PerilCategory>
}

/** Asset system model */
export type Asset = Node & {
  __typename?: 'Asset'
  /** System stage field */
  stage: Stage
  /** System Locale field */
  locale: Locale
  /** Get the other localizations for this document */
  localizations: Array<Asset>
  /** Get the document in other stages */
  documentInStages: Array<Asset>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  /** The file handle */
  handle: Scalars['String']
  /** The file name */
  fileName: Scalars['String']
  /** The height of the file */
  height?: Maybe<Scalars['Float']>
  /** The file width */
  width?: Maybe<Scalars['Float']>
  /** The file size */
  size?: Maybe<Scalars['Float']>
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>
  assetMarketingStory: Array<MarketingStory>
  fileCoreMLModel: Array<CoreMlModel>
  imageAppMarketingImage: Array<AppMarketingImage>
  /** List of Asset versions */
  history: Array<Version>
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String']
}

/** Asset system model */
export type AssetLocalizationsArgs = {
  locales?: Array<Locale>
  includeCurrent?: Scalars['Boolean']
}

/** Asset system model */
export type AssetDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation
}

/** Asset system model */
export type AssetAssetMarketingStoryArgs = {
  where?: Maybe<MarketingStoryWhereInput>
  orderBy?: Maybe<MarketingStoryOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

/** Asset system model */
export type AssetFileCoreMlModelArgs = {
  where?: Maybe<CoreMlModelWhereInput>
  orderBy?: Maybe<CoreMlModelOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

/** Asset system model */
export type AssetImageAppMarketingImageArgs = {
  where?: Maybe<AppMarketingImageWhereInput>
  orderBy?: Maybe<AppMarketingImageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

/** Asset system model */
export type AssetUrlArgs = {
  transformation?: Maybe<AssetTransformationInput>
}

export type AssetConnectInput = {
  /** Document to connect */
  where: AssetWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<AssetEdge>
  aggregate: Aggregate
}

export type AssetCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  assetMarketingStory?: Maybe<MarketingStoryCreateManyInlineInput>
  fileCoreMLModel?: Maybe<CoreMlModelCreateManyInlineInput>
  imageAppMarketingImage?: Maybe<AppMarketingImageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<AssetCreateLocalizationsInput>
}

export type AssetCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput
  locale: Locale
}

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<AssetCreateLocalizationInput>>
}

export type AssetCreateManyInlineInput = {
  /** Create and connect multiple existing Asset documents */
  create?: Maybe<Array<AssetCreateInput>>
  /** Connect multiple existing Asset documents */
  connect?: Maybe<Array<AssetWhereUniqueInput>>
}

export type AssetCreateOneInlineInput = {
  /** Create and connect one Asset document */
  create?: Maybe<AssetCreateInput>
  /** Connect one existing Asset document */
  connect?: Maybe<AssetWhereUniqueInput>
}

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge'
  /** The item at the end of the edge. */
  node: Asset
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  assetMarketingStory_every?: Maybe<MarketingStoryWhereInput>
  assetMarketingStory_some?: Maybe<MarketingStoryWhereInput>
  assetMarketingStory_none?: Maybe<MarketingStoryWhereInput>
  fileCoreMLModel_every?: Maybe<CoreMlModelWhereInput>
  fileCoreMLModel_some?: Maybe<CoreMlModelWhereInput>
  fileCoreMLModel_none?: Maybe<CoreMlModelWhereInput>
  imageAppMarketingImage_every?: Maybe<AppMarketingImageWhereInput>
  imageAppMarketingImage_some?: Maybe<AppMarketingImageWhereInput>
  imageAppMarketingImage_none?: Maybe<AppMarketingImageWhereInput>
}

export enum AssetOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
}

/** Transformations for Assets */
export type AssetTransformationInput = {
  image?: Maybe<ImageTransformationInput>
  document?: Maybe<DocumentTransformationInput>
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: Maybe<Scalars['Boolean']>
}

export type AssetUpdateInput = {
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  assetMarketingStory?: Maybe<MarketingStoryUpdateManyInlineInput>
  fileCoreMLModel?: Maybe<CoreMlModelUpdateManyInlineInput>
  imageAppMarketingImage?: Maybe<AppMarketingImageUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<AssetUpdateLocalizationsInput>
}

export type AssetUpdateLocalizationDataInput = {
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput
  locale: Locale
}

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<AssetCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<AssetUpdateLocalizationInput>>
  upsert?: Maybe<Array<AssetUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<Locale>>
}

export type AssetUpdateManyInlineInput = {
  /** Create and connect multiple Asset documents */
  create?: Maybe<Array<AssetCreateInput>>
  /** Connect multiple existing Asset documents */
  connect?: Maybe<Array<AssetConnectInput>>
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: Maybe<Array<AssetWhereUniqueInput>>
  /** Update multiple Asset documents */
  update?: Maybe<Array<AssetUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Asset documents */
  upsert?: Maybe<Array<AssetUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Asset documents */
  disconnect?: Maybe<Array<AssetWhereUniqueInput>>
  /** Delete multiple Asset documents */
  delete?: Maybe<Array<AssetWhereUniqueInput>>
}

export type AssetUpdateManyInput = {
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  /** Optional updates to localizations */
  localizations?: Maybe<AssetUpdateManyLocalizationsInput>
}

export type AssetUpdateManyLocalizationDataInput = {
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type AssetUpdateManyLocalizationInput = {
  data: AssetUpdateManyLocalizationDataInput
  locale: Locale
}

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: Maybe<Array<AssetUpdateManyLocalizationInput>>
}

export type AssetUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: AssetWhereInput
  /** Update many input */
  data: AssetUpdateManyInput
}

export type AssetUpdateOneInlineInput = {
  /** Create and connect one Asset document */
  create?: Maybe<AssetCreateInput>
  /** Update single Asset document */
  update?: Maybe<AssetUpdateWithNestedWhereUniqueInput>
  /** Upsert single Asset document */
  upsert?: Maybe<AssetUpsertWithNestedWhereUniqueInput>
  /** Connect existing Asset document */
  connect?: Maybe<AssetWhereUniqueInput>
  /** Disconnect currently connected Asset document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Asset document */
  delete?: Maybe<Scalars['Boolean']>
}

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: AssetWhereUniqueInput
  /** Document to update */
  data: AssetUpdateInput
}

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput
  /** Update document if it exists */
  update: AssetUpdateInput
}

export type AssetUpsertLocalizationInput = {
  update: AssetUpdateLocalizationDataInput
  create: AssetCreateLocalizationDataInput
  locale: Locale
}

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: AssetWhereUniqueInput
  /** Upsert data */
  data: AssetUpsertInput
}

/** Identifies documents */
export type AssetWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  handle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  handle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  handle_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  handle_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  handle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  handle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  handle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  handle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  handle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  handle_not_ends_with?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  fileName_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  fileName_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  fileName_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  fileName_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  fileName_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  fileName_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  fileName_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  fileName_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  fileName_not_ends_with?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  height_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  height_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  height_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  height_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  height_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  height_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  height_gte?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  width_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  width_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  width_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  width_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  width_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  width_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  width_gte?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  size_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  size_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  size_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  size_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  size_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  size_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  size_gte?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  mimeType_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  mimeType_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  mimeType_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  mimeType_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  mimeType_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  mimeType_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  mimeType_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  mimeType_not_ends_with?: Maybe<Scalars['String']>
  assetMarketingStory_every?: Maybe<MarketingStoryWhereInput>
  assetMarketingStory_some?: Maybe<MarketingStoryWhereInput>
  assetMarketingStory_none?: Maybe<MarketingStoryWhereInput>
  fileCoreMLModel_every?: Maybe<CoreMlModelWhereInput>
  fileCoreMLModel_some?: Maybe<CoreMlModelWhereInput>
  fileCoreMLModel_none?: Maybe<CoreMlModelWhereInput>
  imageAppMarketingImage_every?: Maybe<AppMarketingImageWhereInput>
  imageAppMarketingImage_some?: Maybe<AppMarketingImageWhereInput>
  imageAppMarketingImage_none?: Maybe<AppMarketingImageWhereInput>
}

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type AuthEvent = {
  __typename?: 'AuthEvent'
  status?: Maybe<AuthState>
}

export enum AuthState {
  Initiated = 'INITIATED',
  InProgress = 'IN_PROGRESS',
  Failed = 'FAILED',
  Success = 'SUCCESS',
}

export type AutoCompleteResponse = {
  __typename?: 'AutoCompleteResponse'
  id?: Maybe<Scalars['String']>
  address: Scalars['String']
  houseNumber?: Maybe<Scalars['String']>
  streetCode?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  kommuneCode?: Maybe<Scalars['String']>
  floor?: Maybe<Scalars['String']>
  doorNumber?: Maybe<Scalars['String']>
}

export type AvailablePaymentMethodsResponse = {
  __typename?: 'AvailablePaymentMethodsResponse'
  paymentMethodsResponse: Scalars['PaymentMethodsResponse']
}

export type Avatar = {
  __typename?: 'Avatar'
  name: Scalars['String']
  URL: Scalars['String']
  width: Scalars['Int']
  height: Scalars['Int']
  duration: Scalars['Int']
  data?: Maybe<Scalars['Object']>
}

export type Balance = {
  __typename?: 'Balance'
  currentBalance: MonetaryAmountV2
  failedCharges?: Maybe<Scalars['Int']>
}

export type BankAccount = {
  __typename?: 'BankAccount'
  bankName: Scalars['String']
  descriptor: Scalars['String']
  directDebitStatus?: Maybe<DirectDebitStatus>
}

export type BankIdAuthResponse = {
  __typename?: 'BankIdAuthResponse'
  autoStartToken: Scalars['String']
}

export type BankIdExtraInfo = SwedishBankIdExtraInfo | NorwegianBankIdExtraInfo

export type BankIdSignResponse = {
  __typename?: 'BankIdSignResponse'
  autoStartToken?: Maybe<Scalars['String']>
  redirectUrl?: Maybe<Scalars['String']>
}

export enum BankIdStatus {
  Pending = 'pending',
  Failed = 'failed',
  Complete = 'complete',
}

export type BatchPayload = {
  __typename?: 'BatchPayload'
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long']
}

export type BrowserInfo = {
  userAgent: Scalars['String']
  acceptHeader: Scalars['String']
  language: Scalars['String']
  colorDepth: Scalars['Int']
  screenHeight: Scalars['Int']
  screenWidth: Scalars['Int']
  timeZoneOffset: Scalars['Int']
  javaEnabled: Scalars['Boolean']
}

export type BulletPoints = {
  __typename?: 'BulletPoints'
  icon: Icon
  title: Scalars['String']
  description: Scalars['String']
}

export type BundledQuote = {
  __typename?: 'BundledQuote'
  id: Scalars['ID']
  currentInsurer?: Maybe<CurrentInsurer>
  price: MonetaryAmountV2
  firstName: Scalars['String']
  lastName: Scalars['String']
  ssn?: Maybe<Scalars['String']>
  birthDate: Scalars['LocalDate']
  quoteDetails: QuoteDetails
  startDate?: Maybe<Scalars['LocalDate']>
  expiresAt: Scalars['LocalDate']
  email?: Maybe<Scalars['String']>
  dataCollectionId?: Maybe<Scalars['ID']>
  typeOfContract: TypeOfContract
  perils: Array<PerilV2>
  insurableLimits: Array<InsurableLimit>
  termsAndConditions: InsuranceTerm
  insuranceTerms: Array<InsuranceTerm>
}

export type BundledQuotePerilsArgs = {
  locale: Locale
}

export type BundledQuoteInsurableLimitsArgs = {
  locale: Locale
}

export type BundledQuoteTermsAndConditionsArgs = {
  locale: Locale
}

export type BundledQuoteInsuranceTermsArgs = {
  locale: Locale
}

export type Campaign = {
  __typename?: 'Campaign'
  incentive?: Maybe<Incentive>
  code: Scalars['String']
  /** Will be null if campaign is of type referralCampaign */
  owner?: Maybe<CampaignOwner>
}

export type CampaignCannotBeCombinedWithExisting = {
  __typename?: 'CampaignCannotBeCombinedWithExisting'
  existingCampaigns: Array<Campaign>
}

export type CampaignDoesNotExist = {
  __typename?: 'CampaignDoesNotExist'
  code: Scalars['String']
}

export type CampaignHasExpired = {
  __typename?: 'CampaignHasExpired'
  code: Scalars['String']
}

export type CampaignInput = {
  source?: Maybe<Scalars['String']>
  medium?: Maybe<Scalars['String']>
  term?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export enum CampaignMarket {
  Se = 'SE',
  No = 'NO',
  Dk = 'DK',
}

export type CampaignOwner = {
  __typename?: 'CampaignOwner'
  id: Scalars['ID']
  displayName: Scalars['String']
}

export enum CancelDirectDebitStatus {
  Accepted = 'ACCEPTED',
  DeclinedMissingToken = 'DECLINED_MISSING_TOKEN',
  DeclinedMissingRequest = 'DECLINED_MISSING_REQUEST',
}

export type CannotRedeemCampaignFromDifferentMarket = {
  __typename?: 'CannotRedeemCampaignFromDifferentMarket'
  code: Scalars['String']
  campaignMarket: CampaignMarket
}

export type CannotRedeemEmptyCode = {
  __typename?: 'CannotRedeemEmptyCode'
  code: Scalars['String']
}

export type CannotRedeemOwnCampaign = {
  __typename?: 'CannotRedeemOwnCampaign'
  code: Scalars['String']
}

export type CannotRemoveActiveCampaignCode = {
  __typename?: 'CannotRemoveActiveCampaignCode'
  activeCampaignCodes: Array<Scalars['String']>
}

export type Cashback = {
  __typename?: 'Cashback'
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  selectedUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  paragraph?: Maybe<Scalars['String']>
}

export type Charge = {
  __typename?: 'Charge'
  amount: MonetaryAmountV2
  date: Scalars['LocalDate']
}

export type ChargeEstimation = {
  __typename?: 'ChargeEstimation'
  charge: MonetaryAmountV2
  discount: MonetaryAmountV2
  subscription: MonetaryAmountV2
}

export type ChatAction = {
  __typename?: 'ChatAction'
  text?: Maybe<Scalars['String']>
  triggerUrl?: Maybe<Scalars['URL']>
  enabled?: Maybe<Scalars['Boolean']>
}

export type ChatResponse = {
  __typename?: 'ChatResponse'
  globalId: Scalars['ID']
  id: Scalars['ID']
  body: MessageBody
  header: MessageHeader
}

export type ChatResponseAudioInput = {
  globalId: Scalars['ID']
  file: Scalars['Upload']
}

export type ChatResponseBodyAudioInput = {
  url: Scalars['String']
}

export type ChatResponseBodyFileInput = {
  key: Scalars['String']
  mimeType: Scalars['String']
}

export type ChatResponseBodySingleSelectInput = {
  selectedValue: Scalars['ID']
}

export type ChatResponseBodyTextInput = {
  text: Scalars['String']
}

export type ChatResponseFileInput = {
  globalId: Scalars['ID']
  body: ChatResponseBodyFileInput
}

export type ChatResponseSingleSelectInput = {
  globalId: Scalars['ID']
  body: ChatResponseBodySingleSelectInput
}

export type ChatResponseTextInput = {
  globalId: Scalars['ID']
  body: ChatResponseBodyTextInput
}

export type ChatState = {
  __typename?: 'ChatState'
  ongoingClaim: Scalars['Boolean']
  showOfferScreen: Scalars['Boolean']
  onboardingDone: Scalars['Boolean']
}

/** A page in the `How Claims Work`-screen in the app */
export type ClaimsExplainerPage = {
  __typename?: 'ClaimsExplainerPage'
  id: Scalars['ID']
  /** Illustration shown for the page */
  illustration: Icon
  /** Text for the body shown below the title */
  body: Scalars['String']
}

export type CodeAlreadyTaken = {
  __typename?: 'CodeAlreadyTaken'
  code: Scalars['String']
}

export type CodeTooLong = {
  __typename?: 'CodeTooLong'
  maxCharacters: Scalars['Int']
}

export type CodeTooShort = {
  __typename?: 'CodeTooShort'
  minCharacters: Scalars['Int']
}

export type CollectStatus = {
  __typename?: 'CollectStatus'
  status?: Maybe<BankIdStatus>
  code?: Maybe<Scalars['String']>
}

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color'
  hex: Scalars['Hex']
  rgba: Rgba
  css: Scalars['String']
}

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: Maybe<Scalars['Hex']>
  rgba?: Maybe<RgbaInput>
}

export type CommonClaim = {
  __typename?: 'CommonClaim'
  icon: Icon
  title: Scalars['String']
  layout: CommonClaimLayouts
}

export type CommonClaimLayouts = TitleAndBulletPoints | Emergency

export type CompleteApartmentQuoteDetails = {
  __typename?: 'CompleteApartmentQuoteDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  type: ApartmentType
}

export type CompleteHouseQuoteDetails = {
  __typename?: 'CompleteHouseQuoteDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  ancillarySpace: Scalars['Int']
  extraBuildings: Array<ExtraBuilding>
  numberOfBathrooms: Scalars['Int']
  yearOfConstruction: Scalars['Int']
  isSubleted: Scalars['Boolean']
}

export type CompleteQuote = {
  __typename?: 'CompleteQuote'
  id: Scalars['ID']
  currentInsurer?: Maybe<CurrentInsurer>
  /** @deprecated Use insuranceCost */
  price: MonetaryAmountV2
  insuranceCost: InsuranceCost
  firstName: Scalars['String']
  lastName: Scalars['String']
  ssn?: Maybe<Scalars['String']>
  birthDate: Scalars['LocalDate']
  /** @deprecated Use quoteDetails */
  details: CompleteQuoteDetails
  quoteDetails: QuoteDetails
  startDate?: Maybe<Scalars['LocalDate']>
  expiresAt: Scalars['LocalDate']
  email?: Maybe<Scalars['String']>
  dataCollectionId?: Maybe<Scalars['ID']>
  typeOfContract: TypeOfContract
  phoneNumber?: Maybe<Scalars['String']>
  perils: Array<PerilV2>
  insurableLimits: Array<InsurableLimit>
  termsAndConditions: InsuranceTerm
  insuranceTerms: Array<InsuranceTerm>
}

export type CompleteQuotePerilsArgs = {
  locale: Locale
}

export type CompleteQuoteInsurableLimitsArgs = {
  locale: Locale
}

export type CompleteQuoteTermsAndConditionsArgs = {
  locale: Locale
}

export type CompleteQuoteInsuranceTermsArgs = {
  locale: Locale
}

export type CompleteQuoteDetails =
  | CompleteApartmentQuoteDetails
  | CompleteHouseQuoteDetails
  | UnknownQuoteDetails

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: Maybe<Scalars['ID']>
  /** Connect document before specified document */
  before?: Maybe<Scalars['ID']>
  /** Connect document at first position */
  start?: Maybe<Scalars['Boolean']>
  /** Connect document at last position */
  end?: Maybe<Scalars['Boolean']>
}

export type Contract = {
  __typename?: 'Contract'
  id: Scalars['ID']
  holderMember: Scalars['ID']
  typeOfContract: TypeOfContract
  switchedFromInsuranceProvider?: Maybe<Scalars['String']>
  status: ContractStatus
  displayName: Scalars['String']
  /**
   * "The 'best guess' of the agreement that depicts the member's insurance, either
   * the pending, future, current or, if terminated, past agreement
   */
  currentAgreement: Agreement
  /** The date the contract agreement timeline begin, if it has been activated */
  inception?: Maybe<Scalars['LocalDate']>
  /** The date the contract agreement timelinen end, on if it has been terminated */
  termination?: Maybe<Scalars['LocalDate']>
  /** An upcoming renewal, present if the member has been notified and the renewal is within 31 days */
  upcomingRenewal?: Maybe<UpcomingRenewal>
  createdAt: Scalars['Instant']
  perils: Array<PerilV2>
  insurableLimits: Array<InsurableLimit>
  termsAndConditions: InsuranceTerm
  insuranceTerms: Array<InsuranceTerm>
}

export type ContractPerilsArgs = {
  locale: Locale
}

export type ContractInsurableLimitsArgs = {
  locale: Locale
}

export type ContractTermsAndConditionsArgs = {
  locale: Locale
}

export type ContractInsuranceTermsArgs = {
  locale: Locale
}

export type ContractStatus =
  | PendingStatus
  | ActiveInFutureStatus
  | ActiveStatus
  | ActiveInFutureAndTerminatedInFutureStatus
  | TerminatedInFutureStatus
  | TerminatedTodayStatus
  | TerminatedStatus

/** All of our CoreML models used in the iOS app */
export type CoreMlModel = Node & {
  __typename?: 'CoreMLModel'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<CoreMlModel>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  type?: Maybe<CoreMlModelType>
  file?: Maybe<Asset>
  /** List of CoreMLModel versions */
  history: Array<Version>
}

/** All of our CoreML models used in the iOS app */
export type CoreMlModelDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** All of our CoreML models used in the iOS app */
export type CoreMlModelFileArgs = {
  locales?: Maybe<Array<Locale>>
}

/** All of our CoreML models used in the iOS app */
export type CoreMlModelHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type CoreMlModelConnectInput = {
  /** Document to connect */
  where: CoreMlModelWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type CoreMlModelConnection = {
  __typename?: 'CoreMLModelConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<CoreMlModelEdge>
  aggregate: Aggregate
}

export type CoreMlModelCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  type?: Maybe<CoreMlModelType>
  file?: Maybe<AssetCreateOneInlineInput>
}

export type CoreMlModelCreateManyInlineInput = {
  /** Create and connect multiple existing CoreMLModel documents */
  create?: Maybe<Array<CoreMlModelCreateInput>>
  /** Connect multiple existing CoreMLModel documents */
  connect?: Maybe<Array<CoreMlModelWhereUniqueInput>>
}

export type CoreMlModelCreateOneInlineInput = {
  /** Create and connect one CoreMLModel document */
  create?: Maybe<CoreMlModelCreateInput>
  /** Connect one existing CoreMLModel document */
  connect?: Maybe<CoreMlModelWhereUniqueInput>
}

/** An edge in a connection. */
export type CoreMlModelEdge = {
  __typename?: 'CoreMLModelEdge'
  /** The item at the end of the edge. */
  node: CoreMlModel
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type CoreMlModelManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<CoreMlModelWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<CoreMlModelWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<CoreMlModelWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  type?: Maybe<CoreMlModelType>
  /** All values that are not equal to given value. */
  type_not?: Maybe<CoreMlModelType>
  /** All values that are contained in given list. */
  type_in?: Maybe<Array<CoreMlModelType>>
  /** All values that are not contained in given list. */
  type_not_in?: Maybe<Array<CoreMlModelType>>
  file?: Maybe<AssetWhereInput>
}

export enum CoreMlModelOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
}

export enum CoreMlModelType {
  KeyGearClassifier = 'KeyGearClassifier',
}

export type CoreMlModelUpdateInput = {
  type?: Maybe<CoreMlModelType>
  file?: Maybe<AssetUpdateOneInlineInput>
}

export type CoreMlModelUpdateManyInlineInput = {
  /** Create and connect multiple CoreMLModel documents */
  create?: Maybe<Array<CoreMlModelCreateInput>>
  /** Connect multiple existing CoreMLModel documents */
  connect?: Maybe<Array<CoreMlModelConnectInput>>
  /** Override currently-connected documents with multiple existing CoreMLModel documents */
  set?: Maybe<Array<CoreMlModelWhereUniqueInput>>
  /** Update multiple CoreMLModel documents */
  update?: Maybe<Array<CoreMlModelUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple CoreMLModel documents */
  upsert?: Maybe<Array<CoreMlModelUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple CoreMLModel documents */
  disconnect?: Maybe<Array<CoreMlModelWhereUniqueInput>>
  /** Delete multiple CoreMLModel documents */
  delete?: Maybe<Array<CoreMlModelWhereUniqueInput>>
}

export type CoreMlModelUpdateManyInput = {
  type?: Maybe<CoreMlModelType>
}

export type CoreMlModelUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: CoreMlModelWhereInput
  /** Update many input */
  data: CoreMlModelUpdateManyInput
}

export type CoreMlModelUpdateOneInlineInput = {
  /** Create and connect one CoreMLModel document */
  create?: Maybe<CoreMlModelCreateInput>
  /** Update single CoreMLModel document */
  update?: Maybe<CoreMlModelUpdateWithNestedWhereUniqueInput>
  /** Upsert single CoreMLModel document */
  upsert?: Maybe<CoreMlModelUpsertWithNestedWhereUniqueInput>
  /** Connect existing CoreMLModel document */
  connect?: Maybe<CoreMlModelWhereUniqueInput>
  /** Disconnect currently connected CoreMLModel document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected CoreMLModel document */
  delete?: Maybe<Scalars['Boolean']>
}

export type CoreMlModelUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: CoreMlModelWhereUniqueInput
  /** Document to update */
  data: CoreMlModelUpdateInput
}

export type CoreMlModelUpsertInput = {
  /** Create document if it didn't exist */
  create: CoreMlModelCreateInput
  /** Update document if it exists */
  update: CoreMlModelUpdateInput
}

export type CoreMlModelUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: CoreMlModelWhereUniqueInput
  /** Upsert data */
  data: CoreMlModelUpsertInput
}

/** Identifies documents */
export type CoreMlModelWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<CoreMlModelWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<CoreMlModelWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<CoreMlModelWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  type?: Maybe<CoreMlModelType>
  /** All values that are not equal to given value. */
  type_not?: Maybe<CoreMlModelType>
  /** All values that are contained in given list. */
  type_in?: Maybe<Array<CoreMlModelType>>
  /** All values that are not contained in given list. */
  type_not_in?: Maybe<Array<CoreMlModelType>>
  file?: Maybe<AssetWhereInput>
}

/** References CoreMLModel record uniquely */
export type CoreMlModelWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type CreateApartmentInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  type: ApartmentType
}

export type CreateDanishAccidentInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
}

export type CreateDanishHomeContentsInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  livingSpace: Scalars['Int']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
  type: DanishHomeContentsType
}

export type CreateDanishTravelInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
}

export type CreateHouseInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  ancillarySpace: Scalars['Int']
  yearOfConstruction: Scalars['Int']
  numberOfBathrooms: Scalars['Int']
  isSubleted: Scalars['Boolean']
  extraBuildings: Array<ExtraBuildingInput>
}

export type CreateKeyGearItemInput = {
  photos: Array<S3FileInput>
  category: KeyGearItemCategory
  purchasePrice?: Maybe<MonetaryAmountV2Input>
  physicalReferenceHash?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type CreateNorwegianHomeContentsInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  livingSpace: Scalars['Int']
  isYouth: Scalars['Boolean']
  type: NorwegianHomeContentsType
}

export type CreateNorwegianTravelInput = {
  coInsured: Scalars['Int']
  isYouth: Scalars['Boolean']
}

export type CreateQuoteInput = {
  id: Scalars['ID']
  firstName: Scalars['String']
  lastName: Scalars['String']
  currentInsurer?: Maybe<Scalars['String']>
  ssn?: Maybe<Scalars['String']>
  birthDate?: Maybe<Scalars['LocalDate']>
  startDate?: Maybe<Scalars['LocalDate']>
  apartment?: Maybe<CreateApartmentInput>
  house?: Maybe<CreateHouseInput>
  swedishApartment?: Maybe<CreateSwedishApartmentInput>
  swedishHouse?: Maybe<CreateSwedishHouseInput>
  norwegianHomeContents?: Maybe<CreateNorwegianHomeContentsInput>
  norwegianTravel?: Maybe<CreateNorwegianTravelInput>
  danishHomeContents?: Maybe<CreateDanishHomeContentsInput>
  danishAccident?: Maybe<CreateDanishAccidentInput>
  danishTravel?: Maybe<CreateDanishTravelInput>
  email?: Maybe<Scalars['String']>
  dataCollectionId?: Maybe<Scalars['ID']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type CreateQuoteResult = CompleteQuote | UnderwritingLimitsHit

export type CreateSwedishApartmentInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  type: ApartmentType
}

export type CreateSwedishHouseInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  ancillarySpace: Scalars['Int']
  yearOfConstruction: Scalars['Int']
  numberOfBathrooms: Scalars['Int']
  isSubleted: Scalars['Boolean']
  extraBuildings: Array<ExtraBuildingInput>
}

export type CurrentInsurer = {
  __typename?: 'CurrentInsurer'
  id?: Maybe<Scalars['String']>
  displayName?: Maybe<Scalars['String']>
  switchable?: Maybe<Scalars['Boolean']>
}

export type DanishAccidentAgreement = AgreementCore & {
  __typename?: 'DanishAccidentAgreement'
  id: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  termsAndConditions?: Maybe<InsuranceTerm>
  address: Address
  numberCoInsured: Scalars['Int']
  type?: Maybe<DanishAccidentLineOfBusiness>
}

export type DanishAccidentDetails = {
  __typename?: 'DanishAccidentDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
}

export enum DanishAccidentLineOfBusiness {
  Regular = 'REGULAR',
  Student = 'STUDENT',
}

export type DanishBankIdAuthResponse = {
  __typename?: 'DanishBankIdAuthResponse'
  redirectUrl: Scalars['String']
}

export type DanishBankIdSession = {
  __typename?: 'DanishBankIdSession'
  redirectUrl?: Maybe<Scalars['String']>
}

export type DanishHomeContentAgreement = AgreementCore & {
  __typename?: 'DanishHomeContentAgreement'
  id: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  termsAndConditions?: Maybe<InsuranceTerm>
  address: Address
  numberCoInsured: Scalars['Int']
  squareMeters: Scalars['Int']
  type?: Maybe<DanishHomeContentLineOfBusiness>
}

export enum DanishHomeContentLineOfBusiness {
  Rent = 'RENT',
  Own = 'OWN',
  StudentRent = 'STUDENT_RENT',
  StudentOwn = 'STUDENT_OWN',
}

export type DanishHomeContentsDetails = {
  __typename?: 'DanishHomeContentsDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  livingSpace: Scalars['Int']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
  type: DanishHomeContentsType
}

export enum DanishHomeContentsType {
  Rent = 'RENT',
  Own = 'OWN',
}

export type DanishTravelAgreement = AgreementCore & {
  __typename?: 'DanishTravelAgreement'
  id: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  termsAndConditions?: Maybe<InsuranceTerm>
  address: Address
  numberCoInsured: Scalars['Int']
  type?: Maybe<DanishTravelLineOfBusiness>
}

export type DanishTravelDetails = {
  __typename?: 'DanishTravelDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
}

export enum DanishTravelLineOfBusiness {
  Regular = 'REGULAR',
  Student = 'STUDENT',
}

export type DataCollectingStatusResponse = {
  __typename?: 'DataCollectingStatusResponse'
  status: DataCollectionStatus
  imageValue?: Maybe<Scalars['String']>
  token?: Maybe<Scalars['String']>
}

export type DataCollectingStatusResponseV2 = {
  __typename?: 'DataCollectingStatusResponseV2'
  extraInformation?: Maybe<BankIdExtraInfo>
  id: Scalars['String']
  insuranceCompany?: Maybe<Scalars['String']>
  status: DataCollectionStatus
}

export type DataCollectionPersonalNumberInput = {
  reference: Scalars['ID']
  insuranceProvider: Scalars['String']
  personalNumber: Scalars['String']
}

export type DataCollectionPhoneNumberInput = {
  reference: Scalars['ID']
  insuranceProvider: Scalars['String']
  phoneNumber: Scalars['String']
}

export enum DataCollectionStatus {
  Running = 'RUNNING',
  Login = 'LOGIN',
  Collecting = 'COLLECTING',
  CompletedPartial = 'COMPLETED_PARTIAL',
  Completed = 'COMPLETED',
  CompletedEmpty = 'COMPLETED_EMPTY',
  Failed = 'FAILED',
  UserInput = 'USER_INPUT',
  WaitingForAuthentication = 'WAITING_FOR_AUTHENTICATION',
}

export type DirectDebitResponse = {
  __typename?: 'DirectDebitResponse'
  url: Scalars['String']
  orderId: Scalars['String']
}

export enum DirectDebitStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  NeedsSetup = 'NEEDS_SETUP',
}

export enum DocumentFileTypes {
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Png = 'png',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Docx = 'docx',
  Pdf = 'pdf',
  Html = 'html',
  Doc = 'doc',
  Xlsx = 'xlsx',
  Xls = 'xls',
  Pptx = 'pptx',
  Ppt = 'ppt',
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  format?: Maybe<DocumentFileTypes>
}

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: Maybe<DocumentOutputInput>
}

export type DocumentVersion = {
  __typename?: 'DocumentVersion'
  id: Scalars['ID']
  stage: Stage
  revision: Scalars['Int']
  createdAt: Scalars['DateTime']
  data?: Maybe<Scalars['Json']>
}

export type EditApartmentInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  type?: Maybe<ApartmentType>
}

export type EditDanishAccidentInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  coInsured?: Maybe<Scalars['Int']>
  isStudent?: Maybe<Scalars['Boolean']>
}

export type EditDanishHomeContentsInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  coInsured?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  isStudent?: Maybe<Scalars['Boolean']>
  type?: Maybe<DanishHomeContentsType>
}

export type EditDanishTravelInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  coInsured?: Maybe<Scalars['Int']>
  isStudent?: Maybe<Scalars['Boolean']>
}

export type EditHouseInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  ancillarySpace?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  isSubleted?: Maybe<Scalars['Boolean']>
  extraBuildings?: Maybe<Array<ExtraBuildingInput>>
}

export type EditNorwegianHomeContentsInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  coInsured?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  isYouth?: Maybe<Scalars['Boolean']>
  type?: Maybe<NorwegianHomeContentsType>
}

export type EditNorwegianTravelInput = {
  coInsured?: Maybe<Scalars['Int']>
  isYouth?: Maybe<Scalars['Boolean']>
}

export type EditQuoteInput = {
  id: Scalars['ID']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  currentInsurer?: Maybe<Scalars['String']>
  ssn?: Maybe<Scalars['String']>
  birthDate?: Maybe<Scalars['LocalDate']>
  startDate?: Maybe<Scalars['LocalDate']>
  apartment?: Maybe<EditApartmentInput>
  swedishApartment?: Maybe<EditSwedishApartmentInput>
  house?: Maybe<EditHouseInput>
  swedishHouse?: Maybe<EditSwedishHouseInput>
  norwegianHomeContents?: Maybe<EditNorwegianHomeContentsInput>
  norwegianTravel?: Maybe<EditNorwegianTravelInput>
  danishHomeContents?: Maybe<EditDanishHomeContentsInput>
  danishAccident?: Maybe<EditDanishAccidentInput>
  danishTravel?: Maybe<EditDanishTravelInput>
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type EditSwedishApartmentInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  type?: Maybe<ApartmentType>
}

export type EditSwedishHouseInput = {
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  ancillarySpace?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  isSubleted?: Maybe<Scalars['Boolean']>
  extraBuildings?: Maybe<Array<ExtraBuildingInput>>
}

export type EmbarkAction =
  | EmbarkExternalInsuranceProviderAction
  | EmbarkPreviousInsuranceProviderAction
  | EmbarkNumberActionSet
  | EmbarkTextActionSet
  | EmbarkTextAction
  | EmbarkSelectAction
  | EmbarkNumberAction
  | EmbarkMultiAction
  | EmbarkDatePickerAction

export type EmbarkActionCore = {
  component: Scalars['String']
}

export type EmbarkApi =
  | EmbarkApiPersonalInformation
  | EmbarkApiHouseInformation
  | EmbarkApiCreateQuote
  | EmbarkApiGraphQlQuery
  | EmbarkApiGraphQlMutation

export type EmbarkApiCore = {
  component: Scalars['String']
}

export type EmbarkApiCreateQuote = EmbarkApiCore & {
  __typename?: 'EmbarkApiCreateQuote'
  component: Scalars['String']
  data: EmbarkApiCreateQuoteData
}

export type EmbarkApiCreateQuoteData = {
  __typename?: 'EmbarkApiCreateQuoteData'
  uwlimits: EmbarkLink
  success: EmbarkLink
  error: EmbarkLink
}

export type EmbarkApiGraphQlError = {
  __typename?: 'EmbarkAPIGraphQLError'
  contains?: Maybe<Scalars['String']>
  next: EmbarkLink
}

export type EmbarkApiGraphQlGeneratedVariable = {
  __typename?: 'EmbarkAPIGraphQLGeneratedVariable'
  key: Scalars['String']
  storeAs: Scalars['String']
  type: EmbarkApiGraphQlVariableGeneratedType
}

export type EmbarkApiGraphQlMultiActionVariable = {
  __typename?: 'EmbarkAPIGraphQLMultiActionVariable'
  key: Scalars['String']
  variables: Array<EmbarkApiGraphQlVariable>
}

export type EmbarkApiGraphQlMutation = {
  __typename?: 'EmbarkApiGraphQLMutation'
  component: Scalars['String']
  data: EmbarkApiGraphQlMutationData
}

export type EmbarkApiGraphQlMutationData = {
  __typename?: 'EmbarkApiGraphQLMutationData'
  next?: Maybe<EmbarkLink>
  mutation: Scalars['String']
  variables: Array<EmbarkApiGraphQlVariable>
  errors: Array<EmbarkApiGraphQlError>
  results: Array<Maybe<EmbarkApiGraphQlResult>>
}

export type EmbarkApiGraphQlQuery = {
  __typename?: 'EmbarkApiGraphQLQuery'
  component: Scalars['String']
  data: EmbarkApiGraphQlQueryData
}

export type EmbarkApiGraphQlQueryData = {
  __typename?: 'EmbarkApiGraphQLQueryData'
  next?: Maybe<EmbarkLink>
  query: Scalars['String']
  variables: Array<EmbarkApiGraphQlVariable>
  errors: Array<EmbarkApiGraphQlError>
  results: Array<EmbarkApiGraphQlResult>
}

export type EmbarkApiGraphQlResult = {
  __typename?: 'EmbarkAPIGraphQLResult'
  key: Scalars['String']
  as: Scalars['String']
}

export type EmbarkApiGraphQlSingleVariable = {
  __typename?: 'EmbarkAPIGraphQLSingleVariable'
  key: Scalars['String']
  from: Scalars['String']
  as: EmbarkApiGraphQlSingleVariableCasting
}

export enum EmbarkApiGraphQlSingleVariableCasting {
  String = 'string',
  Int = 'int',
  Boolean = 'boolean',
}

export type EmbarkApiGraphQlVariable =
  | EmbarkApiGraphQlSingleVariable
  | EmbarkApiGraphQlGeneratedVariable
  | EmbarkApiGraphQlMultiActionVariable

export enum EmbarkApiGraphQlVariableGeneratedType {
  Uuid = 'uuid',
}

export type EmbarkApiHouseInformation = EmbarkApiCore & {
  __typename?: 'EmbarkApiHouseInformation'
  component: Scalars['String']
  data: EmbarkApiHouseInformationData
}

export type EmbarkApiHouseInformationData = {
  __typename?: 'EmbarkApiHouseInformationData'
  match: EmbarkLink
  noMatch: EmbarkLink
  error: EmbarkLink
}

export type EmbarkApiPersonalInformation = EmbarkApiCore & {
  __typename?: 'EmbarkApiPersonalInformation'
  component: Scalars['String']
  data: EmbarkApiPersonalInformationData
}

export type EmbarkApiPersonalInformationData = {
  __typename?: 'EmbarkApiPersonalInformationData'
  match: EmbarkLink
  noMatch: EmbarkLink
  error: EmbarkLink
}

export type EmbarkComputedStoreValue = {
  __typename?: 'EmbarkComputedStoreValue'
  key: Scalars['String']
  value: Scalars['String']
}

export type EmbarkDatePickerAction = EmbarkActionCore & {
  __typename?: 'EmbarkDatePickerAction'
  component: Scalars['String']
  next: EmbarkLink
  storeKey: Scalars['String']
  label: Scalars['String']
  tooltip?: Maybe<EmbarkTooltip>
}

export type EmbarkDropdownAction = EmbarkActionCore & {
  __typename?: 'EmbarkDropdownAction'
  component: Scalars['String']
  data: EmbarkDropdownActionData
}

export type EmbarkDropdownActionData = {
  __typename?: 'EmbarkDropdownActionData'
  label: Scalars['String']
  key: Scalars['String']
  options: Array<EmbarkDropdownOption>
}

export type EmbarkDropdownOption = {
  __typename?: 'EmbarkDropdownOption'
  value: Scalars['String']
  text: Scalars['String']
}

export type EmbarkExpression =
  | EmbarkExpressionUnary
  | EmbarkExpressionBinary
  | EmbarkExpressionMultiple

export type EmbarkExpressionBinary = {
  __typename?: 'EmbarkExpressionBinary'
  type: EmbarkExpressionTypeBinary
  key: Scalars['String']
  value: Scalars['String']
  text?: Maybe<Scalars['String']>
}

export type EmbarkExpressionMultiple = {
  __typename?: 'EmbarkExpressionMultiple'
  type: EmbarkExpressionTypeMultiple
  text?: Maybe<Scalars['String']>
  subExpressions: Array<EmbarkExpression>
}

export enum EmbarkExpressionTypeBinary {
  Equals = 'EQUALS',
  NotEquals = 'NOT_EQUALS',
  MoreThan = 'MORE_THAN',
  LessThan = 'LESS_THAN',
  MoreThanOrEquals = 'MORE_THAN_OR_EQUALS',
  LessThanOrEquals = 'LESS_THAN_OR_EQUALS',
}

export enum EmbarkExpressionTypeMultiple {
  And = 'AND',
  Or = 'OR',
}

export enum EmbarkExpressionTypeUnary {
  Always = 'ALWAYS',
  Never = 'NEVER',
}

export type EmbarkExpressionUnary = {
  __typename?: 'EmbarkExpressionUnary'
  type: EmbarkExpressionTypeUnary
  text?: Maybe<Scalars['String']>
}

export type EmbarkExternalInsuranceProviderAction = EmbarkActionCore & {
  __typename?: 'EmbarkExternalInsuranceProviderAction'
  component: Scalars['String']
  data: EmbarkExternalInsuranceProviderActionData
}

export type EmbarkExternalInsuranceProviderActionData = {
  __typename?: 'EmbarkExternalInsuranceProviderActionData'
  next: EmbarkLink
  skip: EmbarkLink
}

export type EmbarkExternalRedirect = {
  __typename?: 'EmbarkExternalRedirect'
  component: Scalars['String']
  data: EmbarkExternalRedirectData
}

export type EmbarkExternalRedirectData = {
  __typename?: 'EmbarkExternalRedirectData'
  location: EmbarkExternalRedirectLocation
}

export enum EmbarkExternalRedirectLocation {
  MailingList = 'MailingList',
  Offer = 'Offer',
}

export type EmbarkGroupedResponse = {
  __typename?: 'EmbarkGroupedResponse'
  component: Scalars['String']
  title: EmbarkResponseExpression
  items: Array<EmbarkMessage>
  each: Array<EmbarkGroupedResponseEach>
}

export type EmbarkGroupedResponseEach = {
  __typename?: 'EmbarkGroupedResponseEach'
  key: Scalars['String']
  content: EmbarkMessage
}

export type EmbarkKeywords = {
  __typename?: 'EmbarkKeywords'
  selectActionSelectLabel?: Maybe<Scalars['String']>
  tooltipModalInformationLabel?: Maybe<Scalars['String']>
  backButton?: Maybe<Scalars['String']>
  externalInsuranceProviderConfirmTitle?: Maybe<Scalars['String']>
  externalInsuranceProviderConfirmPrivacyPolicy?: Maybe<Scalars['String']>
  externalInsuranceProviderConfirmMessage?: Maybe<Scalars['String']>
  externalInsuranceProviderConfirmButton?: Maybe<Scalars['String']>
  externalInsuranceProviderConfirmRejectButton?: Maybe<Scalars['String']>
  externalInsuranceProviderFailureTitle?: Maybe<Scalars['String']>
  externalInsuranceProviderFailureMessage?: Maybe<Scalars['String']>
  externalInsuranceProviderFailureButton?: Maybe<Scalars['String']>
  externalInsuranceProviderSelectTitle?: Maybe<Scalars['String']>
  externalInsuranceProviderPersonalNumberTitle?: Maybe<Scalars['String']>
  externalInsuranceProviderPersonalNumberSubtitle?: Maybe<Scalars['String']>
  externalInsuranceProviderOtherProviderButton?: Maybe<Scalars['String']>
  externalInsuranceProviderGoBackButton?: Maybe<Scalars['String']>
  externalInsuranceProviderContinueButton?: Maybe<Scalars['String']>
  externalInsuranceProviderSetupTitle?: Maybe<Scalars['String']>
  externalInsuranceProviderAuthScanBankID?: Maybe<Scalars['String']>
  externalInsuranceProviderAuthOpenBankId?: Maybe<Scalars['String']>
  externalInsuranceProviderBackgroundFetchTitle?: Maybe<Scalars['String']>
  externalInsuranceProviderBackgroundFetchBody?: Maybe<Scalars['String']>
  externalInsuranceProviderBETATag?: Maybe<Scalars['String']>
  previousInsuranceProviderOtherProviderModal?: Maybe<Scalars['String']>
  previousInsuranceProviderOtherProviderModalButton?: Maybe<Scalars['String']>
}

export type EmbarkLink = {
  __typename?: 'EmbarkLink'
  name: Scalars['String']
  label: Scalars['String']
}

export type EmbarkMessage = {
  __typename?: 'EmbarkMessage'
  expressions: Array<EmbarkExpression>
  text: Scalars['String']
}

export type EmbarkMultiAction = EmbarkActionCore & {
  __typename?: 'EmbarkMultiAction'
  component: Scalars['String']
  data: EmbarkMultiActionData
}

export type EmbarkMultiActionComponent =
  | EmbarkNumberAction
  | EmbarkDropdownAction
  | EmbarkSwitchAction

export type EmbarkMultiActionData = {
  __typename?: 'EmbarkMultiActionData'
  components: Array<EmbarkMultiActionComponent>
}

export type EmbarkNumberAction = EmbarkActionCore & {
  __typename?: 'EmbarkNumberAction'
  component: Scalars['String']
  data: EmbarkNumberActionData
}

export type EmbarkNumberActionData = {
  __typename?: 'EmbarkNumberActionData'
  key: Scalars['String']
  placeholder: Scalars['String']
  unit?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  maxValue?: Maybe<Scalars['Int']>
  minValue?: Maybe<Scalars['Int']>
  link: EmbarkLink
}

export type EmbarkNumberActionSet = EmbarkActionCore & {
  __typename?: 'EmbarkNumberActionSet'
  component: Scalars['String']
  data?: Maybe<EmbarkNumberActionSetData>
}

export type EmbarkNumberActionSetData = {
  __typename?: 'EmbarkNumberActionSetData'
  link: EmbarkLink
}

export type EmbarkPartnerConfig = {
  __typename?: 'EmbarkPartnerConfig'
  alignment: EmbarkPartnerConfigAlignment
  image: Scalars['String']
  isDefault: Scalars['Boolean']
  name: Scalars['String']
}

export enum EmbarkPartnerConfigAlignment {
  Center = 'center',
  Left = 'left',
}

export type EmbarkPassage = {
  __typename?: 'EmbarkPassage'
  id: Scalars['String']
  text: Scalars['String']
  name: Scalars['String']
  url?: Maybe<Scalars['String']>
  allLinks: Array<EmbarkLink>
  api?: Maybe<EmbarkApi>
  messages: Array<EmbarkMessage>
  externalRedirect?: Maybe<EmbarkExternalRedirect>
  action?: Maybe<EmbarkAction>
  response: EmbarkResponse
  tooltips: Array<EmbarkTooltip>
  tracks: Array<EmbarkTrack>
  redirects: Array<EmbarkRedirect>
}

export type EmbarkPreviousInsuranceProviderAction = EmbarkActionCore & {
  __typename?: 'EmbarkPreviousInsuranceProviderAction'
  component: Scalars['String']
  data: EmbarkPreviousInsuranceProviderActionData
}

export type EmbarkPreviousInsuranceProviderActionData = {
  __typename?: 'EmbarkPreviousInsuranceProviderActionData'
  next: EmbarkLink
  skip: EmbarkLink
  providers?: Maybe<EmbarkPreviousInsuranceProviderActionDataProviders>
  storeKey: Scalars['String']
  tooltip?: Maybe<EmbarkTooltip>
  insuranceProviders: Array<InsuranceProvider>
}

export enum EmbarkPreviousInsuranceProviderActionDataProviders {
  Norwegian = 'NORWEGIAN',
  Swedish = 'SWEDISH',
}

export type EmbarkRedirect =
  | EmbarkRedirectUnaryExpression
  | EmbarkRedirectBinaryExpression
  | EmbarkRedirectMultipleExpressions

export type EmbarkRedirectBinaryExpression = {
  __typename?: 'EmbarkRedirectBinaryExpression'
  type: EmbarkExpressionTypeBinary
  to: Scalars['String']
  key: Scalars['String']
  value: Scalars['String']
  passedExpressionKey?: Maybe<Scalars['String']>
  passedExpressionValue?: Maybe<Scalars['String']>
}

export type EmbarkRedirectMultipleExpressions = {
  __typename?: 'EmbarkRedirectMultipleExpressions'
  type: EmbarkExpressionTypeMultiple
  to: Scalars['String']
  subExpressions: Array<EmbarkExpression>
  passedExpressionKey?: Maybe<Scalars['String']>
  passedExpressionValue?: Maybe<Scalars['String']>
}

export type EmbarkRedirectUnaryExpression = {
  __typename?: 'EmbarkRedirectUnaryExpression'
  type: EmbarkExpressionTypeUnary
  to: Scalars['String']
  passedExpressionKey?: Maybe<Scalars['String']>
  passedExpressionValue?: Maybe<Scalars['String']>
}

export type EmbarkResponse =
  | EmbarkGroupedResponse
  | EmbarkResponseExpression
  | EmbarkMessage

export type EmbarkResponseExpression = {
  __typename?: 'EmbarkResponseExpression'
  text: Scalars['String']
  expressions: Array<EmbarkExpression>
}

export type EmbarkSelectAction = EmbarkActionCore & {
  __typename?: 'EmbarkSelectAction'
  component: Scalars['String']
  data: EmbarkSelectActionData
}

export type EmbarkSelectActionData = {
  __typename?: 'EmbarkSelectActionData'
  options: Array<EmbarkSelectActionOption>
}

export type EmbarkSelectActionOption = {
  __typename?: 'EmbarkSelectActionOption'
  keys: Array<Scalars['String']>
  values: Array<Scalars['String']>
  link: EmbarkLink
  tooltip?: Maybe<EmbarkTooltip>
  api?: Maybe<EmbarkApi>
}

export type EmbarkStory = {
  __typename?: 'EmbarkStory'
  id: Scalars['String']
  startPassage: Scalars['String']
  name: Scalars['String']
  keywords: EmbarkKeywords
  computedStoreValues?: Maybe<Array<EmbarkComputedStoreValue>>
  partnerConfigs: Array<EmbarkPartnerConfig>
  passages: Array<EmbarkPassage>
}

export type EmbarkStoryMetadata = {
  __typename?: 'EmbarkStoryMetadata'
  name: Scalars['String']
  type: EmbarkStoryType
  /** Localized */
  title: Scalars['String']
  /** Localized */
  description: Scalars['String']
  metadata: Array<EmbarkStoryMetadataEntry>
}

export type EmbarkStoryMetadataEntry =
  | EmbarkStoryMetadataEntryDiscount
  | EmbarkStoryMetaDataEntryWebUrlPath
  | EmbarkStoryMetadataEntryPill
  | EmbarkStoryMetadataEntryBackground

export type EmbarkStoryMetadataEntryBackground = {
  __typename?: 'EmbarkStoryMetadataEntryBackground'
  background: EmbarkStoryMetadataEntryBackgroundOption
}

export enum EmbarkStoryMetadataEntryBackgroundOption {
  GradientOne = 'GRADIENT_ONE',
  GradientTwo = 'GRADIENT_TWO',
  GradientThree = 'GRADIENT_THREE',
}

export type EmbarkStoryMetadataEntryDiscount = {
  __typename?: 'EmbarkStoryMetadataEntryDiscount'
  /** @deprecated Use `EmbarkStoryMetadataEntryPill`. */
  discount: Scalars['String']
}

export type EmbarkStoryMetadataEntryPill = {
  __typename?: 'EmbarkStoryMetadataEntryPill'
  /** Localized */
  pill: Scalars['String']
}

export type EmbarkStoryMetaDataEntryWebUrlPath = {
  __typename?: 'EmbarkStoryMetaDataEntryWebUrlPath'
  path: Scalars['String']
}

export enum EmbarkStoryType {
  WebOnboarding = 'WEB_ONBOARDING',
  AppOnboarding = 'APP_ONBOARDING',
}

export type EmbarkSwitchAction = EmbarkActionCore & {
  __typename?: 'EmbarkSwitchAction'
  component: Scalars['String']
  data: EmbarkSwitchActionData
}

export type EmbarkSwitchActionData = {
  __typename?: 'EmbarkSwitchActionData'
  label: Scalars['String']
  key: Scalars['String']
  defaultValue: Scalars['Boolean']
}

export type EmbarkTextAction = EmbarkActionCore & {
  __typename?: 'EmbarkTextAction'
  component: Scalars['String']
  data: EmbarkTextActionData
}

export type EmbarkTextActionData = {
  __typename?: 'EmbarkTextActionData'
  placeholder: Scalars['String']
  key: Scalars['String']
  api?: Maybe<EmbarkApi>
  link: EmbarkLink
  large?: Maybe<Scalars['Boolean']>
  mask?: Maybe<Scalars['String']>
  tooltip?: Maybe<EmbarkTooltip>
}

export type EmbarkTextActionSet = EmbarkActionCore & {
  __typename?: 'EmbarkTextActionSet'
  component: Scalars['String']
  data?: Maybe<EmbarkTextActionSetData>
}

export type EmbarkTextActionSetData = {
  __typename?: 'EmbarkTextActionSetData'
  link: EmbarkLink
  api?: Maybe<EmbarkApi>
  textActions: Array<EmbarkTextActionSetTextAction>
}

export type EmbarkTextActionSetTextAction = {
  __typename?: 'EmbarkTextActionSetTextAction'
  data?: Maybe<EmbarkTextActionSetTextActionData>
}

export type EmbarkTextActionSetTextActionData = {
  __typename?: 'EmbarkTextActionSetTextActionData'
  placeholder: Scalars['String']
  key: Scalars['String']
  api?: Maybe<EmbarkApi>
  large?: Maybe<Scalars['Boolean']>
  mask?: Maybe<Scalars['String']>
  tooltip?: Maybe<EmbarkTooltip>
  title: Scalars['String']
}

export type EmbarkTooltip = {
  __typename?: 'EmbarkTooltip'
  title: Scalars['String']
  description: Scalars['String']
}

export type EmbarkTrack = {
  __typename?: 'EmbarkTrack'
  eventName: Scalars['String']
  eventKeys: Array<Maybe<Scalars['String']>>
  includeAllKeys: Scalars['Boolean']
  customData?: Maybe<Scalars['JSONString']>
}

export type Emergency = {
  __typename?: 'Emergency'
  color: HedvigColor
  title: Scalars['String']
}

export enum Environment {
  Production = 'Production',
  Staging = 'Staging',
}

export type ExceededMaximumUpdates = {
  __typename?: 'ExceededMaximumUpdates'
  maximumNumberOfUpdates: Scalars['Int']
  updatesByMember: Scalars['Int']
}

export type ExchangeTokenExpiredResponse = {
  __typename?: 'ExchangeTokenExpiredResponse'
  _?: Maybe<Scalars['Boolean']>
}

export type ExchangeTokenInput = {
  exchangeToken: Scalars['String']
}

export type ExchangeTokenInvalidResponse = {
  __typename?: 'ExchangeTokenInvalidResponse'
  _?: Maybe<Scalars['Boolean']>
}

export type ExchangeTokenResponse =
  | ExchangeTokenSuccessResponse
  | ExchangeTokenExpiredResponse
  | ExchangeTokenInvalidResponse

export type ExchangeTokenSuccessResponse = {
  __typename?: 'ExchangeTokenSuccessResponse'
  token: Scalars['String']
}

export type ExternalInsuranceProvider = {
  __typename?: 'ExternalInsuranceProvider'
  /** @deprecated Use providerStatusV2 instead */
  providerStatus: Array<ProviderStatus>
  providerStatusV2: Array<ProviderStatusV2>
  /** @deprecated Use dataCollectionV2 instead */
  dataCollection: Array<InsuranceDataCollection>
  dataCollectionV2: Array<InsuranceDataCollectionV2>
  /** @deprecated use dataCollectionStatusV2 instead */
  dataCollectionStatus: DataCollectingStatusResponse
  dataCollectionStatusV2: DataCollectingStatusResponseV2
}

export type ExternalInsuranceProviderDataCollectionArgs = {
  reference: Scalars['ID']
}

export type ExternalInsuranceProviderDataCollectionV2Args = {
  reference: Scalars['ID']
}

export type ExternalInsuranceProviderDataCollectionStatusArgs = {
  reference: Scalars['ID']
}

export type ExternalInsuranceProviderDataCollectionStatusV2Args = {
  reference: Scalars['ID']
}

export type ExternalInsuranceProviderMutation = {
  __typename?: 'ExternalInsuranceProviderMutation'
  /** @deprecated Use initiateDataCollectionWithSwedishPersonalNumber, initiateDataCollectionWithNorwegianPersonalNumber or initiateDataCollectionWithNorwegianPhoneNumber */
  initiateDataCollection: DataCollectionStatus
  initiateDataCollectionWithSwedishPersonalNumber: DataCollectionStatus
  initiateDataCollectionWithNorwegianPersonalNumber: DataCollectionStatus
  initiateDataCollectionWithNorwegianPhoneNumber: DataCollectionStatus
}

export type ExternalInsuranceProviderMutationInitiateDataCollectionArgs = {
  input: InitiateDataCollectionInput
}

export type ExternalInsuranceProviderMutationInitiateDataCollectionWithSwedishPersonalNumberArgs = {
  input: DataCollectionPersonalNumberInput
}

export type ExternalInsuranceProviderMutationInitiateDataCollectionWithNorwegianPersonalNumberArgs = {
  input: DataCollectionPersonalNumberInput
}

export type ExternalInsuranceProviderMutationInitiateDataCollectionWithNorwegianPhoneNumberArgs = {
  input: DataCollectionPhoneNumberInput
}

export type ExtraBuilding =
  | ExtraBuildingGarage
  | ExtraBuildingCarport
  | ExtraBuildingShed
  | ExtraBuildingStorehouse
  | ExtraBuildingFriggebod
  | ExtraBuildingAttefall
  | ExtraBuildingOuthouse
  | ExtraBuildingGuesthouse
  | ExtraBuildingGazebo
  | ExtraBuildingGreenhouse
  | ExtraBuildingSauna
  | ExtraBuildingBarn
  | ExtraBuildingBoathouse
  | ExtraBuildingOther

export type ExtraBuildingAttefall = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingAttefall'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingBarn = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingBarn'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingBoathouse = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingBoathouse'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingCarport = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingCarport'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingCore = {
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingFriggebod = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingFriggebod'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingGarage = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingGarage'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingGazebo = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingGazebo'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingGreenhouse = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingGreenhouse'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingGuesthouse = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingGuesthouse'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingInput = {
  type: ExtraBuildingType
  area: Scalars['Int']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingOther = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingOther'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingOuthouse = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingOuthouse'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingSauna = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingSauna'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingShed = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingShed'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export type ExtraBuildingStorehouse = ExtraBuildingCore & {
  __typename?: 'ExtraBuildingStorehouse'
  area: Scalars['Int']
  displayName: Scalars['String']
  hasWaterConnected: Scalars['Boolean']
}

export enum ExtraBuildingType {
  Garage = 'GARAGE',
  Carport = 'CARPORT',
  Shed = 'SHED',
  Storehouse = 'STOREHOUSE',
  Friggebod = 'FRIGGEBOD',
  Attefall = 'ATTEFALL',
  Outhouse = 'OUTHOUSE',
  Guesthouse = 'GUESTHOUSE',
  Gazebo = 'GAZEBO',
  Greenhouse = 'GREENHOUSE',
  Sauna = 'SAUNA',
  Barn = 'BARN',
  Boathouse = 'BOATHOUSE',
  Other = 'OTHER',
}

export type FailedToStartSign = {
  __typename?: 'FailedToStartSign'
  errorMessage: Scalars['String']
  errorCode: Scalars['String']
}

/** Frequently asked questions */
export type Faq = Node & {
  __typename?: 'Faq'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<Faq>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  language?: Maybe<Language>
  headline?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  /** List of Faq versions */
  history: Array<Version>
}

/** Frequently asked questions */
export type FaqDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** Frequently asked questions */
export type FaqLanguageArgs = {
  locales?: Maybe<Array<Locale>>
}

/** Frequently asked questions */
export type FaqHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type FaqConnectInput = {
  /** Document to connect */
  where: FaqWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type FaqConnection = {
  __typename?: 'FaqConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<FaqEdge>
  aggregate: Aggregate
}

export type FaqCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  language?: Maybe<LanguageCreateOneInlineInput>
  headline?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
}

export type FaqCreateManyInlineInput = {
  /** Create and connect multiple existing Faq documents */
  create?: Maybe<Array<FaqCreateInput>>
  /** Connect multiple existing Faq documents */
  connect?: Maybe<Array<FaqWhereUniqueInput>>
}

export type FaqCreateOneInlineInput = {
  /** Create and connect one Faq document */
  create?: Maybe<FaqCreateInput>
  /** Connect one existing Faq document */
  connect?: Maybe<FaqWhereUniqueInput>
}

/** An edge in a connection. */
export type FaqEdge = {
  __typename?: 'FaqEdge'
  /** The item at the end of the edge. */
  node: Faq
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type FaqManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<FaqWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<FaqWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<FaqWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  language?: Maybe<LanguageWhereInput>
  headline?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  headline_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  headline_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  headline_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  headline_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  headline_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  headline_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  headline_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  headline_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  headline_not_ends_with?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  body_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  body_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  body_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  body_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  body_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  body_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  body_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  body_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  body_not_ends_with?: Maybe<Scalars['String']>
}

export enum FaqOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  BodyAsc = 'body_ASC',
  BodyDesc = 'body_DESC',
}

export type FaqUpdateInput = {
  language?: Maybe<LanguageUpdateOneInlineInput>
  headline?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
}

export type FaqUpdateManyInlineInput = {
  /** Create and connect multiple Faq documents */
  create?: Maybe<Array<FaqCreateInput>>
  /** Connect multiple existing Faq documents */
  connect?: Maybe<Array<FaqConnectInput>>
  /** Override currently-connected documents with multiple existing Faq documents */
  set?: Maybe<Array<FaqWhereUniqueInput>>
  /** Update multiple Faq documents */
  update?: Maybe<Array<FaqUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Faq documents */
  upsert?: Maybe<Array<FaqUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Faq documents */
  disconnect?: Maybe<Array<FaqWhereUniqueInput>>
  /** Delete multiple Faq documents */
  delete?: Maybe<Array<FaqWhereUniqueInput>>
}

export type FaqUpdateManyInput = {
  headline?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
}

export type FaqUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: FaqWhereInput
  /** Update many input */
  data: FaqUpdateManyInput
}

export type FaqUpdateOneInlineInput = {
  /** Create and connect one Faq document */
  create?: Maybe<FaqCreateInput>
  /** Update single Faq document */
  update?: Maybe<FaqUpdateWithNestedWhereUniqueInput>
  /** Upsert single Faq document */
  upsert?: Maybe<FaqUpsertWithNestedWhereUniqueInput>
  /** Connect existing Faq document */
  connect?: Maybe<FaqWhereUniqueInput>
  /** Disconnect currently connected Faq document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Faq document */
  delete?: Maybe<Scalars['Boolean']>
}

export type FaqUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: FaqWhereUniqueInput
  /** Document to update */
  data: FaqUpdateInput
}

export type FaqUpsertInput = {
  /** Create document if it didn't exist */
  create: FaqCreateInput
  /** Update document if it exists */
  update: FaqUpdateInput
}

export type FaqUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: FaqWhereUniqueInput
  /** Upsert data */
  data: FaqUpsertInput
}

/** Identifies documents */
export type FaqWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<FaqWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<FaqWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<FaqWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  language?: Maybe<LanguageWhereInput>
  headline?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  headline_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  headline_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  headline_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  headline_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  headline_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  headline_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  headline_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  headline_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  headline_not_ends_with?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  body_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  body_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  body_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  body_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  body_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  body_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  body_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  body_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  body_not_ends_with?: Maybe<Scalars['String']>
}

/** References Faq record uniquely */
export type FaqWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum Feature {
  KeyGear = 'KeyGear',
  Referrals = 'Referrals',
}

export type File = {
  __typename?: 'File'
  /** signedUrl is valid for 30 minutes after upload, don't hang on to this. */
  signedUrl: Scalars['String']
  /** S3 key that can be used to retreive new signed urls in the future. */
  key: Scalars['String']
  /** S3 bucket that the file was uploaded to. */
  bucket: Scalars['String']
}

export type FreeMonths = {
  __typename?: 'FreeMonths'
  quantity?: Maybe<Scalars['Int']>
}

export type Geo = {
  __typename?: 'Geo'
  countryISOCode: Scalars['String']
}

export type Gif = {
  __typename?: 'Gif'
  url?: Maybe<Scalars['String']>
}

export enum HedvigColor {
  Pink = 'Pink',
  Turquoise = 'Turquoise',
  Purple = 'Purple',
  DarkPurple = 'DarkPurple',
  BlackPurple = 'BlackPurple',
  DarkGray = 'DarkGray',
  LightGray = 'LightGray',
  White = 'White',
  Black = 'Black',
  OffBlack = 'OffBlack',
  OffWhite = 'OffWhite',
  Yellow = 'Yellow',
}

export type HouseInformation = {
  __typename?: 'HouseInformation'
  livingSpace: Scalars['Int']
  ancillaryArea: Scalars['Int']
  yearOfConstruction: Scalars['Int']
}

export type HouseInformationInput = {
  streetAddress: Scalars['String']
  postalNumber: Scalars['String']
}

export type HouseInsuranceCollection = {
  __typename?: 'HouseInsuranceCollection'
  insuranceProvider?: Maybe<Scalars['String']>
  insuranceHolderAddress?: Maybe<Scalars['String']>
  insuranceHolderName?: Maybe<Scalars['String']>
  insuranceName?: Maybe<Scalars['String']>
  insuranceSubType?: Maybe<Scalars['String']>
  insuranceType?: Maybe<Scalars['String']>
  renewalDate?: Maybe<Scalars['LocalDate']>
  monthlyNetPremium?: Maybe<MonetaryAmountV2>
  monthlyGrossPremium?: Maybe<MonetaryAmountV2>
  monthlyDiscount?: Maybe<MonetaryAmountV2>
  insuranceObjectAddress?: Maybe<Scalars['String']>
  livingArea?: Maybe<Scalars['Int']>
  postalCode?: Maybe<Scalars['String']>
}

/** A vectorized image to show to the user */
export type Icon = {
  __typename?: 'Icon'
  /**
   * For iOS use
   * @deprecated use an icon from a variant instead
   */
  pdfUrl: Scalars['String']
  /**
   * For Web use
   * @deprecated use an icon from a variant instead
   */
  svgUrl: Scalars['String']
  /**
   * For Android use
   * @deprecated use an icon from a variant instead
   */
  vectorDrawableUrl: Scalars['String']
  /** Icons with variants for light and dark mode */
  variants: IconVariants
}

/** A vectorized image to show to the user */
export type IconVariant = {
  __typename?: 'IconVariant'
  /** For iOS use */
  pdfUrl: Scalars['String']
  /** For Web use */
  svgUrl: Scalars['String']
  /** For Android use */
  vectorDrawableUrl: Scalars['String']
}

/** Icons with variants for light and dark mode */
export type IconVariants = {
  __typename?: 'IconVariants'
  /** A variant to use for dark user interfaces */
  dark: IconVariant
  /** A variant to use for light user interfaces */
  light: IconVariant
}

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /**
   * Resizes the image to fit the specified parameters exactly by removing any
   * parts of the image that don't fit within the boundaries.
   */
  Crop = 'crop',
  /**
   * Resizes the image to fit the specified parameters exactly by scaling the image
   * to the desired size. The aspect ratio of the image is not respected and the
   * image can be distorted using this method.
   */
  Scale = 'scale',
  /**
   * Resizes the image to fit within the parameters, but as opposed to 'fit:clip'
   * will not scale the image if the image is smaller than the output size.
   */
  Max = 'max',
}

export type ImageResizeInput = {
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: Maybe<Scalars['Int']>
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: Maybe<Scalars['Int']>
  /** The default value for the fit parameter is fit:clip. */
  fit?: Maybe<ImageFit>
}

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: Maybe<ImageResizeInput>
}

export type ImportantMessage = Node & {
  __typename?: 'ImportantMessage'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<ImportantMessage>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  button?: Maybe<Scalars['String']>
  link?: Maybe<Scalars['String']>
  /** List of ImportantMessage versions */
  history: Array<Version>
}

export type ImportantMessageDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type ImportantMessageLanguageArgs = {
  locales?: Maybe<Array<Locale>>
}

export type ImportantMessageHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type ImportantMessageConnectInput = {
  /** Document to connect */
  where: ImportantMessageWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type ImportantMessageConnection = {
  __typename?: 'ImportantMessageConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<ImportantMessageEdge>
  aggregate: Aggregate
}

export type ImportantMessageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  language?: Maybe<LanguageCreateOneInlineInput>
  button?: Maybe<Scalars['String']>
  link?: Maybe<Scalars['String']>
}

export type ImportantMessageCreateManyInlineInput = {
  /** Create and connect multiple existing ImportantMessage documents */
  create?: Maybe<Array<ImportantMessageCreateInput>>
  /** Connect multiple existing ImportantMessage documents */
  connect?: Maybe<Array<ImportantMessageWhereUniqueInput>>
}

export type ImportantMessageCreateOneInlineInput = {
  /** Create and connect one ImportantMessage document */
  create?: Maybe<ImportantMessageCreateInput>
  /** Connect one existing ImportantMessage document */
  connect?: Maybe<ImportantMessageWhereUniqueInput>
}

/** An edge in a connection. */
export type ImportantMessageEdge = {
  __typename?: 'ImportantMessageEdge'
  /** The item at the end of the edge. */
  node: ImportantMessage
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type ImportantMessageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<ImportantMessageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<ImportantMessageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<ImportantMessageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  message_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  message_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  message_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  message_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  message_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  message_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  message_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  message_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  message_not_ends_with?: Maybe<Scalars['String']>
  language?: Maybe<LanguageWhereInput>
  button?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  button_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  button_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  button_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  button_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  button_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  button_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  button_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  button_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  button_not_ends_with?: Maybe<Scalars['String']>
  link?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  link_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  link_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  link_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  link_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  link_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  link_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  link_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  link_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  link_not_ends_with?: Maybe<Scalars['String']>
}

export enum ImportantMessageOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  MessageAsc = 'message_ASC',
  MessageDesc = 'message_DESC',
  ButtonAsc = 'button_ASC',
  ButtonDesc = 'button_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
}

export type ImportantMessageUpdateInput = {
  title?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  language?: Maybe<LanguageUpdateOneInlineInput>
  button?: Maybe<Scalars['String']>
  link?: Maybe<Scalars['String']>
}

export type ImportantMessageUpdateManyInlineInput = {
  /** Create and connect multiple ImportantMessage documents */
  create?: Maybe<Array<ImportantMessageCreateInput>>
  /** Connect multiple existing ImportantMessage documents */
  connect?: Maybe<Array<ImportantMessageConnectInput>>
  /** Override currently-connected documents with multiple existing ImportantMessage documents */
  set?: Maybe<Array<ImportantMessageWhereUniqueInput>>
  /** Update multiple ImportantMessage documents */
  update?: Maybe<Array<ImportantMessageUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple ImportantMessage documents */
  upsert?: Maybe<Array<ImportantMessageUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple ImportantMessage documents */
  disconnect?: Maybe<Array<ImportantMessageWhereUniqueInput>>
  /** Delete multiple ImportantMessage documents */
  delete?: Maybe<Array<ImportantMessageWhereUniqueInput>>
}

export type ImportantMessageUpdateManyInput = {
  title?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  button?: Maybe<Scalars['String']>
  link?: Maybe<Scalars['String']>
}

export type ImportantMessageUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: ImportantMessageWhereInput
  /** Update many input */
  data: ImportantMessageUpdateManyInput
}

export type ImportantMessageUpdateOneInlineInput = {
  /** Create and connect one ImportantMessage document */
  create?: Maybe<ImportantMessageCreateInput>
  /** Update single ImportantMessage document */
  update?: Maybe<ImportantMessageUpdateWithNestedWhereUniqueInput>
  /** Upsert single ImportantMessage document */
  upsert?: Maybe<ImportantMessageUpsertWithNestedWhereUniqueInput>
  /** Connect existing ImportantMessage document */
  connect?: Maybe<ImportantMessageWhereUniqueInput>
  /** Disconnect currently connected ImportantMessage document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected ImportantMessage document */
  delete?: Maybe<Scalars['Boolean']>
}

export type ImportantMessageUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: ImportantMessageWhereUniqueInput
  /** Document to update */
  data: ImportantMessageUpdateInput
}

export type ImportantMessageUpsertInput = {
  /** Create document if it didn't exist */
  create: ImportantMessageCreateInput
  /** Update document if it exists */
  update: ImportantMessageUpdateInput
}

export type ImportantMessageUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: ImportantMessageWhereUniqueInput
  /** Upsert data */
  data: ImportantMessageUpsertInput
}

/** Identifies documents */
export type ImportantMessageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<ImportantMessageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<ImportantMessageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<ImportantMessageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  message_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  message_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  message_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  message_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  message_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  message_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  message_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  message_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  message_not_ends_with?: Maybe<Scalars['String']>
  language?: Maybe<LanguageWhereInput>
  button?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  button_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  button_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  button_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  button_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  button_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  button_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  button_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  button_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  button_not_ends_with?: Maybe<Scalars['String']>
  link?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  link_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  link_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  link_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  link_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  link_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  link_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  link_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  link_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  link_not_ends_with?: Maybe<Scalars['String']>
}

/** References ImportantMessage record uniquely */
export type ImportantMessageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type Incentive =
  | MonthlyCostDeduction
  | FreeMonths
  | NoDiscount
  | VisibleNoDiscount
  | PercentageDiscountMonths
  | IndefinitePercentageDiscount

export type IncompleteApartmentQuoteDetails = {
  __typename?: 'IncompleteApartmentQuoteDetails'
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  type?: Maybe<ApartmentType>
}

export type IncompleteHouseQuoteDetails = {
  __typename?: 'IncompleteHouseQuoteDetails'
  street?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  ancillarySpace?: Maybe<Scalars['Int']>
  extraBuildings?: Maybe<Array<ExtraBuilding>>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  isSubleted?: Maybe<Scalars['Boolean']>
}

export type IncompleteQuote = {
  __typename?: 'IncompleteQuote'
  id: Scalars['ID']
  currentInsurer?: Maybe<CurrentInsurer>
  startDate?: Maybe<Scalars['LocalDate']>
  details?: Maybe<IncompleteQuoteDetails>
  email?: Maybe<Scalars['String']>
  dataCollectionId?: Maybe<Scalars['ID']>
}

export type IncompleteQuoteDetails =
  | IncompleteApartmentQuoteDetails
  | IncompleteHouseQuoteDetails

export type IndefinitePercentageDiscount = {
  __typename?: 'IndefinitePercentageDiscount'
  percentageDiscount: Scalars['Float']
}

export type InitiateDataCollectionInput = {
  reference: Scalars['ID']
  insuranceProvider: Scalars['String']
  personalNumber: Scalars['String']
}

export type InProgressReferral = {
  __typename?: 'InProgressReferral'
  name?: Maybe<Scalars['String']>
}

export type InsurableLimit = {
  __typename?: 'InsurableLimit'
  label: Scalars['String']
  limit: Scalars['String']
  description: Scalars['String']
  type: InsurableLimitType
}

export enum InsurableLimitType {
  Deductible = 'DEDUCTIBLE',
  DeductibleNatureDamage = 'DEDUCTIBLE_NATURE_DAMAGE',
  DeductibleAllRisk = 'DEDUCTIBLE_ALL_RISK',
  InsuredAmount = 'INSURED_AMOUNT',
  GoodsIndividual = 'GOODS_INDIVIDUAL',
  GoodsFamily = 'GOODS_FAMILY',
  TravelDays = 'TRAVEL_DAYS',
  MedicalExpenses = 'MEDICAL_EXPENSES',
}

export type Insurance = {
  __typename?: 'Insurance'
  address?: Maybe<Scalars['String']>
  postalNumber?: Maybe<Scalars['String']>
  cost?: Maybe<InsuranceCost>
  personsInHousehold?: Maybe<Scalars['Int']>
  certificateUrl?: Maybe<Scalars['String']>
  status: InsuranceStatus
  type?: Maybe<InsuranceType>
  activeFrom?: Maybe<Scalars['LocalDate']>
  /** @deprecated Use previousInsurer instead */
  insuredAtOtherCompany?: Maybe<Scalars['Boolean']>
  presaleInformationUrl?: Maybe<Scalars['String']>
  policyUrl?: Maybe<Scalars['String']>
  /** @deprecated Use previousInsurer instead */
  currentInsurerName?: Maybe<Scalars['String']>
  livingSpace?: Maybe<Scalars['Int']>
  /** @deprecated Use arrangedPerilCategories instead */
  perilCategories?: Maybe<Array<Maybe<PerilCategory>>>
  /** @deprecated Use cost instead */
  monthlyCost?: Maybe<Scalars['Int']>
  /** @deprecated Field no longer supported */
  safetyIncreasers?: Maybe<Array<Scalars['String']>>
  arrangedPerilCategories: ArrangedPerilCategories
  renewal?: Maybe<Renewal>
  previousInsurer?: Maybe<PreviousInsurer>
  ancillaryArea?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  extraBuildings?: Maybe<Array<ExtraBuilding>>
  isSubleted?: Maybe<Scalars['Boolean']>
}

export type InsuranceCost = {
  __typename?: 'InsuranceCost'
  monthlyGross: MonetaryAmountV2
  monthlyDiscount: MonetaryAmountV2
  monthlyNet: MonetaryAmountV2
  freeUntil?: Maybe<Scalars['LocalDate']>
}

export type InsuranceDataCollection = {
  __typename?: 'InsuranceDataCollection'
  insuranceObjectStreetAddress?: Maybe<Scalars['String']>
  postalNumber?: Maybe<Scalars['String']>
  insuranceName?: Maybe<Scalars['String']>
  insuranceType?: Maybe<Scalars['String']>
  insuranceProvider?: Maybe<Scalars['String']>
  renewalDate?: Maybe<Scalars['LocalDate']>
  /** @deprecated Use monthlyNetPremium or monthlyGrossPremium */
  monthlyPremium?: Maybe<MonetaryAmountV2>
  monthlyNetPremium?: Maybe<MonetaryAmountV2>
  monthlyGrossPremium?: Maybe<MonetaryAmountV2>
  monthlyDiscount?: Maybe<MonetaryAmountV2>
}

export type InsuranceDataCollectionV2 =
  | PersonTravelInsuranceCollection
  | HouseInsuranceCollection

export type InsuranceProvider = {
  __typename?: 'InsuranceProvider'
  name: Scalars['String']
  switchable: Scalars['Boolean']
  externalCollectionId?: Maybe<Scalars['String']>
  hasExternalCapabilities: Scalars['Boolean']
  logo: Icon
}

export enum InsuranceProviderAvailability {
  Ok = 'OK',
  Beta = 'BETA',
  NotImplemented = 'NOT_IMPLEMENTED',
}

export enum InsuranceStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  InactiveWithStartDate = 'INACTIVE_WITH_START_DATE',
  Terminated = 'TERMINATED',
}

export type InsuranceTerm = {
  __typename?: 'InsuranceTerm'
  displayName: Scalars['String']
  url: Scalars['String']
  type?: Maybe<InsuranceTermType>
}

export enum InsuranceTermType {
  TermsAndConditions = 'TERMS_AND_CONDITIONS',
  PreSaleInfoEuStandard = 'PRE_SALE_INFO_EU_STANDARD',
  GeneralTerms = 'GENERAL_TERMS',
  PrivacyPolicy = 'PRIVACY_POLICY',
}

export enum InsuranceType {
  Rent = 'RENT',
  Brf = 'BRF',
  StudentRent = 'STUDENT_RENT',
  StudentBrf = 'STUDENT_BRF',
  House = 'HOUSE',
}

export type Key = Node & {
  __typename?: 'Key'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<Key>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  value: Scalars['String']
  /** Describe what the translation is for, never shown to a user. */
  description?: Maybe<Scalars['String']>
  translations: Array<Translation>
  keyGearItemCoverageTitle?: Maybe<KeyGearItemCoverage>
  keyGearItemCoverageDescription?: Maybe<KeyGearItemCoverage>
  /** List of Key versions */
  history: Array<Version>
}

export type KeyDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type KeyTranslationsArgs = {
  where?: Maybe<TranslationWhereInput>
  orderBy?: Maybe<TranslationOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

export type KeyKeyGearItemCoverageTitleArgs = {
  locales?: Maybe<Array<Locale>>
}

export type KeyKeyGearItemCoverageDescriptionArgs = {
  locales?: Maybe<Array<Locale>>
}

export type KeyHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export enum KeyboardType {
  Default = 'DEFAULT',
  Numberpad = 'NUMBERPAD',
  Decimalpad = 'DECIMALPAD',
  Numeric = 'NUMERIC',
  Email = 'EMAIL',
  Phone = 'PHONE',
}

export type KeyConnectInput = {
  /** Document to connect */
  where: KeyWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type KeyConnection = {
  __typename?: 'KeyConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<KeyEdge>
  aggregate: Aggregate
}

export type KeyCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  value: Scalars['String']
  description?: Maybe<Scalars['String']>
  translations?: Maybe<TranslationCreateManyInlineInput>
  keyGearItemCoverageTitle?: Maybe<KeyGearItemCoverageCreateOneInlineInput>
  keyGearItemCoverageDescription?: Maybe<
    KeyGearItemCoverageCreateOneInlineInput
  >
}

export type KeyCreateManyInlineInput = {
  /** Create and connect multiple existing Key documents */
  create?: Maybe<Array<KeyCreateInput>>
  /** Connect multiple existing Key documents */
  connect?: Maybe<Array<KeyWhereUniqueInput>>
}

export type KeyCreateOneInlineInput = {
  /** Create and connect one Key document */
  create?: Maybe<KeyCreateInput>
  /** Connect one existing Key document */
  connect?: Maybe<KeyWhereUniqueInput>
}

/** An edge in a connection. */
export type KeyEdge = {
  __typename?: 'KeyEdge'
  /** The item at the end of the edge. */
  node: Key
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

export type KeyGearItem = {
  __typename?: 'KeyGearItem'
  id: Scalars['ID']
  deleted: Scalars['Boolean']
  /**
   * If this item was added automatically - what was the Hash of the identifiable information?
   * Use this to avoid automatically adding an Item which the user has already automatically added or
   * does not wish to have automatically added
   */
  name?: Maybe<Scalars['String']>
  physicalReferenceHash?: Maybe<Scalars['String']>
  photos: Array<KeyGearItemPhoto>
  category: KeyGearItemCategory
  receipts: Array<KeyGearItemReceipt>
  purchasePrice?: Maybe<MonetaryAmountV2>
  timeOfPurchase?: Maybe<Scalars['LocalDate']>
  valuation?: Maybe<KeyGearItemValuation>
  maxInsurableAmount?: Maybe<MonetaryAmountV2>
  deductible: MonetaryAmountV2
  covered: Array<KeyGearItemCoverage>
  exceptions: Array<KeyGearItemCoverage>
}

export enum KeyGearItemCategory {
  Phone = 'PHONE',
  Computer = 'COMPUTER',
  Tv = 'TV',
  Bike = 'BIKE',
  Jewelry = 'JEWELRY',
  Watch = 'WATCH',
  SmartWatch = 'SMART_WATCH',
  Tablet = 'TABLET',
}

export type KeyGearItemCoverage = Node & {
  __typename?: 'KeyGearItemCoverage'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<KeyGearItemCoverage>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Key>
  description?: Maybe<Key>
  /** List of KeyGearItemCoverage versions */
  history: Array<Version>
}

export type KeyGearItemCoverageDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type KeyGearItemCoverageTitleArgs = {
  locales?: Maybe<Array<Locale>>
}

export type KeyGearItemCoverageDescriptionArgs = {
  locales?: Maybe<Array<Locale>>
}

export type KeyGearItemCoverageHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type KeyGearItemCoverageConnectInput = {
  /** Document to connect */
  where: KeyGearItemCoverageWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type KeyGearItemCoverageConnection = {
  __typename?: 'KeyGearItemCoverageConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<KeyGearItemCoverageEdge>
  aggregate: Aggregate
}

export type KeyGearItemCoverageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<KeyCreateOneInlineInput>
  description?: Maybe<KeyCreateOneInlineInput>
}

export type KeyGearItemCoverageCreateManyInlineInput = {
  /** Create and connect multiple existing KeyGearItemCoverage documents */
  create?: Maybe<Array<KeyGearItemCoverageCreateInput>>
  /** Connect multiple existing KeyGearItemCoverage documents */
  connect?: Maybe<Array<KeyGearItemCoverageWhereUniqueInput>>
}

export type KeyGearItemCoverageCreateOneInlineInput = {
  /** Create and connect one KeyGearItemCoverage document */
  create?: Maybe<KeyGearItemCoverageCreateInput>
  /** Connect one existing KeyGearItemCoverage document */
  connect?: Maybe<KeyGearItemCoverageWhereUniqueInput>
}

/** An edge in a connection. */
export type KeyGearItemCoverageEdge = {
  __typename?: 'KeyGearItemCoverageEdge'
  /** The item at the end of the edge. */
  node: KeyGearItemCoverage
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type KeyGearItemCoverageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<KeyGearItemCoverageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<KeyGearItemCoverageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<KeyGearItemCoverageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<KeyWhereInput>
  description?: Maybe<KeyWhereInput>
}

export enum KeyGearItemCoverageOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type KeyGearItemCoverageUpdateInput = {
  title?: Maybe<KeyUpdateOneInlineInput>
  description?: Maybe<KeyUpdateOneInlineInput>
}

export type KeyGearItemCoverageUpdateManyInlineInput = {
  /** Create and connect multiple KeyGearItemCoverage documents */
  create?: Maybe<Array<KeyGearItemCoverageCreateInput>>
  /** Connect multiple existing KeyGearItemCoverage documents */
  connect?: Maybe<Array<KeyGearItemCoverageConnectInput>>
  /** Override currently-connected documents with multiple existing KeyGearItemCoverage documents */
  set?: Maybe<Array<KeyGearItemCoverageWhereUniqueInput>>
  /** Update multiple KeyGearItemCoverage documents */
  update?: Maybe<Array<KeyGearItemCoverageUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple KeyGearItemCoverage documents */
  upsert?: Maybe<Array<KeyGearItemCoverageUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple KeyGearItemCoverage documents */
  disconnect?: Maybe<Array<KeyGearItemCoverageWhereUniqueInput>>
  /** Delete multiple KeyGearItemCoverage documents */
  delete?: Maybe<Array<KeyGearItemCoverageWhereUniqueInput>>
}

export type KeyGearItemCoverageUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: Maybe<Scalars['String']>
}

export type KeyGearItemCoverageUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: KeyGearItemCoverageWhereInput
  /** Update many input */
  data: KeyGearItemCoverageUpdateManyInput
}

export type KeyGearItemCoverageUpdateOneInlineInput = {
  /** Create and connect one KeyGearItemCoverage document */
  create?: Maybe<KeyGearItemCoverageCreateInput>
  /** Update single KeyGearItemCoverage document */
  update?: Maybe<KeyGearItemCoverageUpdateWithNestedWhereUniqueInput>
  /** Upsert single KeyGearItemCoverage document */
  upsert?: Maybe<KeyGearItemCoverageUpsertWithNestedWhereUniqueInput>
  /** Connect existing KeyGearItemCoverage document */
  connect?: Maybe<KeyGearItemCoverageWhereUniqueInput>
  /** Disconnect currently connected KeyGearItemCoverage document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected KeyGearItemCoverage document */
  delete?: Maybe<Scalars['Boolean']>
}

export type KeyGearItemCoverageUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: KeyGearItemCoverageWhereUniqueInput
  /** Document to update */
  data: KeyGearItemCoverageUpdateInput
}

export type KeyGearItemCoverageUpsertInput = {
  /** Create document if it didn't exist */
  create: KeyGearItemCoverageCreateInput
  /** Update document if it exists */
  update: KeyGearItemCoverageUpdateInput
}

export type KeyGearItemCoverageUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: KeyGearItemCoverageWhereUniqueInput
  /** Upsert data */
  data: KeyGearItemCoverageUpsertInput
}

/** Identifies documents */
export type KeyGearItemCoverageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<KeyGearItemCoverageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<KeyGearItemCoverageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<KeyGearItemCoverageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<KeyWhereInput>
  description?: Maybe<KeyWhereInput>
}

/** References KeyGearItemCoverage record uniquely */
export type KeyGearItemCoverageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type KeyGearItemPhoto = {
  __typename?: 'KeyGearItemPhoto'
  id: Scalars['ID']
  file: S3File
  markedAsDeleted: Scalars['Boolean']
}

export type KeyGearItemReceipt = {
  __typename?: 'KeyGearItemReceipt'
  id: Scalars['ID']
  file: S3File
  markedAsDeleted: Scalars['Boolean']
}

export type KeyGearItemsFilter = {
  /** default: false */
  deleted?: Maybe<Scalars['Boolean']>
}

export type KeyGearItemValuation =
  | KeyGearItemValuationFixed
  | KeyGearItemValuationMarketValue

export type KeyGearItemValuationFixed = {
  __typename?: 'KeyGearItemValuationFixed'
  /** Value between 100 and 0 which corresponds to the percentage of the item's value relative to purchase price */
  ratio: Scalars['Int']
  valuation: MonetaryAmountV2
}

export type KeyGearItemValuationMarketValue = {
  __typename?: 'KeyGearItemValuationMarketValue'
  /** Value between 100 and 0 which corresponds to the percentage of the item's value relative to current market value */
  ratio: Scalars['Int']
}

/** Identifies documents */
export type KeyManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<KeyWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<KeyWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<KeyWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  value?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  value_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  value_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  value_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  value_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  value_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  value_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  value_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  value_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  value_not_ends_with?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  description_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  description_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  description_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  description_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  description_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  description_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  description_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  description_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  description_not_ends_with?: Maybe<Scalars['String']>
  translations_every?: Maybe<TranslationWhereInput>
  translations_some?: Maybe<TranslationWhereInput>
  translations_none?: Maybe<TranslationWhereInput>
  keyGearItemCoverageTitle?: Maybe<KeyGearItemCoverageWhereInput>
  keyGearItemCoverageDescription?: Maybe<KeyGearItemCoverageWhereInput>
}

export enum KeyOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ValueAsc = 'value_ASC',
  ValueDesc = 'value_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
}

export type KeyUpdateInput = {
  value?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  translations?: Maybe<TranslationUpdateManyInlineInput>
  keyGearItemCoverageTitle?: Maybe<KeyGearItemCoverageUpdateOneInlineInput>
  keyGearItemCoverageDescription?: Maybe<
    KeyGearItemCoverageUpdateOneInlineInput
  >
}

export type KeyUpdateManyInlineInput = {
  /** Create and connect multiple Key documents */
  create?: Maybe<Array<KeyCreateInput>>
  /** Connect multiple existing Key documents */
  connect?: Maybe<Array<KeyConnectInput>>
  /** Override currently-connected documents with multiple existing Key documents */
  set?: Maybe<Array<KeyWhereUniqueInput>>
  /** Update multiple Key documents */
  update?: Maybe<Array<KeyUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Key documents */
  upsert?: Maybe<Array<KeyUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Key documents */
  disconnect?: Maybe<Array<KeyWhereUniqueInput>>
  /** Delete multiple Key documents */
  delete?: Maybe<Array<KeyWhereUniqueInput>>
}

export type KeyUpdateManyInput = {
  description?: Maybe<Scalars['String']>
}

export type KeyUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: KeyWhereInput
  /** Update many input */
  data: KeyUpdateManyInput
}

export type KeyUpdateOneInlineInput = {
  /** Create and connect one Key document */
  create?: Maybe<KeyCreateInput>
  /** Update single Key document */
  update?: Maybe<KeyUpdateWithNestedWhereUniqueInput>
  /** Upsert single Key document */
  upsert?: Maybe<KeyUpsertWithNestedWhereUniqueInput>
  /** Connect existing Key document */
  connect?: Maybe<KeyWhereUniqueInput>
  /** Disconnect currently connected Key document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Key document */
  delete?: Maybe<Scalars['Boolean']>
}

export type KeyUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: KeyWhereUniqueInput
  /** Document to update */
  data: KeyUpdateInput
}

export type KeyUpsertInput = {
  /** Create document if it didn't exist */
  create: KeyCreateInput
  /** Update document if it exists */
  update: KeyUpdateInput
}

export type KeyUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: KeyWhereUniqueInput
  /** Upsert data */
  data: KeyUpsertInput
}

/** Identifies documents */
export type KeyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<KeyWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<KeyWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<KeyWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  value?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  value_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  value_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  value_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  value_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  value_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  value_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  value_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  value_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  value_not_ends_with?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  description_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  description_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  description_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  description_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  description_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  description_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  description_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  description_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  description_not_ends_with?: Maybe<Scalars['String']>
  translations_every?: Maybe<TranslationWhereInput>
  translations_some?: Maybe<TranslationWhereInput>
  translations_none?: Maybe<TranslationWhereInput>
  keyGearItemCoverageTitle?: Maybe<KeyGearItemCoverageWhereInput>
  keyGearItemCoverageDescription?: Maybe<KeyGearItemCoverageWhereInput>
}

/** References Key record uniquely */
export type KeyWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  value?: Maybe<Scalars['String']>
}

export type Language = Node & {
  __typename?: 'Language'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<Language>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  translations: Array<Translation>
  name: Scalars['String']
  code: Scalars['String']
  marketingStories: Array<MarketingStory>
  faqs: Array<Faq>
  importantMessageses: Array<ImportantMessage>
  appMarketingImages: Array<AppMarketingImage>
  /** List of Language versions */
  history: Array<Version>
}

export type LanguageDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type LanguageTranslationsArgs = {
  where?: Maybe<TranslationWhereInput>
  orderBy?: Maybe<TranslationOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

export type LanguageMarketingStoriesArgs = {
  where?: Maybe<MarketingStoryWhereInput>
  orderBy?: Maybe<MarketingStoryOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

export type LanguageFaqsArgs = {
  where?: Maybe<FaqWhereInput>
  orderBy?: Maybe<FaqOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

export type LanguageImportantMessagesesArgs = {
  where?: Maybe<ImportantMessageWhereInput>
  orderBy?: Maybe<ImportantMessageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

export type LanguageAppMarketingImagesArgs = {
  where?: Maybe<AppMarketingImageWhereInput>
  orderBy?: Maybe<AppMarketingImageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  locales?: Maybe<Array<Locale>>
}

export type LanguageHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type LanguageConnectInput = {
  /** Document to connect */
  where: LanguageWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type LanguageConnection = {
  __typename?: 'LanguageConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<LanguageEdge>
  aggregate: Aggregate
}

export type LanguageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  translations?: Maybe<TranslationCreateManyInlineInput>
  name: Scalars['String']
  code: Scalars['String']
  marketingStories?: Maybe<MarketingStoryCreateManyInlineInput>
  faqs?: Maybe<FaqCreateManyInlineInput>
  importantMessageses?: Maybe<ImportantMessageCreateManyInlineInput>
  appMarketingImages?: Maybe<AppMarketingImageCreateManyInlineInput>
}

export type LanguageCreateManyInlineInput = {
  /** Create and connect multiple existing Language documents */
  create?: Maybe<Array<LanguageCreateInput>>
  /** Connect multiple existing Language documents */
  connect?: Maybe<Array<LanguageWhereUniqueInput>>
}

export type LanguageCreateOneInlineInput = {
  /** Create and connect one Language document */
  create?: Maybe<LanguageCreateInput>
  /** Connect one existing Language document */
  connect?: Maybe<LanguageWhereUniqueInput>
}

/** An edge in a connection. */
export type LanguageEdge = {
  __typename?: 'LanguageEdge'
  /** The item at the end of the edge. */
  node: Language
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type LanguageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<LanguageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<LanguageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<LanguageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  translations_every?: Maybe<TranslationWhereInput>
  translations_some?: Maybe<TranslationWhereInput>
  translations_none?: Maybe<TranslationWhereInput>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  code_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  code_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  code_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  code_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  code_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  code_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  code_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  code_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  code_not_ends_with?: Maybe<Scalars['String']>
  marketingStories_every?: Maybe<MarketingStoryWhereInput>
  marketingStories_some?: Maybe<MarketingStoryWhereInput>
  marketingStories_none?: Maybe<MarketingStoryWhereInput>
  faqs_every?: Maybe<FaqWhereInput>
  faqs_some?: Maybe<FaqWhereInput>
  faqs_none?: Maybe<FaqWhereInput>
  importantMessageses_every?: Maybe<ImportantMessageWhereInput>
  importantMessageses_some?: Maybe<ImportantMessageWhereInput>
  importantMessageses_none?: Maybe<ImportantMessageWhereInput>
  appMarketingImages_every?: Maybe<AppMarketingImageWhereInput>
  appMarketingImages_some?: Maybe<AppMarketingImageWhereInput>
  appMarketingImages_none?: Maybe<AppMarketingImageWhereInput>
}

export enum LanguageOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  CodeAsc = 'code_ASC',
  CodeDesc = 'code_DESC',
}

export type LanguageUpdateInput = {
  translations?: Maybe<TranslationUpdateManyInlineInput>
  name?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  marketingStories?: Maybe<MarketingStoryUpdateManyInlineInput>
  faqs?: Maybe<FaqUpdateManyInlineInput>
  importantMessageses?: Maybe<ImportantMessageUpdateManyInlineInput>
  appMarketingImages?: Maybe<AppMarketingImageUpdateManyInlineInput>
}

export type LanguageUpdateManyInlineInput = {
  /** Create and connect multiple Language documents */
  create?: Maybe<Array<LanguageCreateInput>>
  /** Connect multiple existing Language documents */
  connect?: Maybe<Array<LanguageConnectInput>>
  /** Override currently-connected documents with multiple existing Language documents */
  set?: Maybe<Array<LanguageWhereUniqueInput>>
  /** Update multiple Language documents */
  update?: Maybe<Array<LanguageUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Language documents */
  upsert?: Maybe<Array<LanguageUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Language documents */
  disconnect?: Maybe<Array<LanguageWhereUniqueInput>>
  /** Delete multiple Language documents */
  delete?: Maybe<Array<LanguageWhereUniqueInput>>
}

export type LanguageUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: Maybe<Scalars['String']>
}

export type LanguageUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: LanguageWhereInput
  /** Update many input */
  data: LanguageUpdateManyInput
}

export type LanguageUpdateOneInlineInput = {
  /** Create and connect one Language document */
  create?: Maybe<LanguageCreateInput>
  /** Update single Language document */
  update?: Maybe<LanguageUpdateWithNestedWhereUniqueInput>
  /** Upsert single Language document */
  upsert?: Maybe<LanguageUpsertWithNestedWhereUniqueInput>
  /** Connect existing Language document */
  connect?: Maybe<LanguageWhereUniqueInput>
  /** Disconnect currently connected Language document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Language document */
  delete?: Maybe<Scalars['Boolean']>
}

export type LanguageUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: LanguageWhereUniqueInput
  /** Document to update */
  data: LanguageUpdateInput
}

export type LanguageUpsertInput = {
  /** Create document if it didn't exist */
  create: LanguageCreateInput
  /** Update document if it exists */
  update: LanguageUpdateInput
}

export type LanguageUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: LanguageWhereUniqueInput
  /** Upsert data */
  data: LanguageUpsertInput
}

/** Identifies documents */
export type LanguageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<LanguageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<LanguageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<LanguageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  translations_every?: Maybe<TranslationWhereInput>
  translations_some?: Maybe<TranslationWhereInput>
  translations_none?: Maybe<TranslationWhereInput>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  code_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  code_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  code_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  code_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  code_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  code_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  code_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  code_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  code_not_ends_with?: Maybe<Scalars['String']>
  marketingStories_every?: Maybe<MarketingStoryWhereInput>
  marketingStories_some?: Maybe<MarketingStoryWhereInput>
  marketingStories_none?: Maybe<MarketingStoryWhereInput>
  faqs_every?: Maybe<FaqWhereInput>
  faqs_some?: Maybe<FaqWhereInput>
  faqs_none?: Maybe<FaqWhereInput>
  importantMessageses_every?: Maybe<ImportantMessageWhereInput>
  importantMessageses_some?: Maybe<ImportantMessageWhereInput>
  importantMessageses_none?: Maybe<ImportantMessageWhereInput>
  appMarketingImages_every?: Maybe<AppMarketingImageWhereInput>
  appMarketingImages_some?: Maybe<AppMarketingImageWhereInput>
  appMarketingImages_none?: Maybe<AppMarketingImageWhereInput>
}

/** References Language record uniquely */
export type LanguageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
}

export enum Locale {
  SvSe = 'sv_SE',
  EnSe = 'en_SE',
  NbNo = 'nb_NO',
  EnNo = 'en_NO',
  DaDk = 'da_DK',
  EnDk = 'en_DK',
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location'
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  distance: Scalars['Float']
}

/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput
}

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

export type LoggingInput = {
  timestamp: Scalars['TimeStamp']
  source: LoggingSource
  payload: Scalars['JSONObject']
  severity: LoggingSeverity
}

export enum LoggingSeverity {
  Default = 'DEFAULT',
  Debug = 'DEBUG',
  Info = 'INFO',
  Notice = 'NOTICE',
  Warning = 'WARNING',
  Error = 'ERROR',
  Critical = 'CRITICAL',
  Alert = 'ALERT',
  Emergency = 'EMERGENCY',
}

export enum LoggingSource {
  Ios = 'IOS',
  Android = 'ANDROID',
}

export type MarketingStory = Node & {
  __typename?: 'MarketingStory'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<MarketingStory>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  asset: Asset
  duration?: Maybe<Scalars['Float']>
  importance?: Maybe<Scalars['Int']>
  backgroundColor: HedvigColor
  environment?: Maybe<Environment>
  language?: Maybe<Language>
  /** List of MarketingStory versions */
  history: Array<Version>
}

export type MarketingStoryDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type MarketingStoryAssetArgs = {
  locales?: Maybe<Array<Locale>>
}

export type MarketingStoryLanguageArgs = {
  locales?: Maybe<Array<Locale>>
}

export type MarketingStoryHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type MarketingStoryConnectInput = {
  /** Document to connect */
  where: MarketingStoryWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type MarketingStoryConnection = {
  __typename?: 'MarketingStoryConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<MarketingStoryEdge>
  aggregate: Aggregate
}

export type MarketingStoryCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  asset: AssetCreateOneInlineInput
  duration?: Maybe<Scalars['Float']>
  importance?: Maybe<Scalars['Int']>
  backgroundColor: HedvigColor
  environment?: Maybe<Environment>
  language?: Maybe<LanguageCreateOneInlineInput>
}

export type MarketingStoryCreateManyInlineInput = {
  /** Create and connect multiple existing MarketingStory documents */
  create?: Maybe<Array<MarketingStoryCreateInput>>
  /** Connect multiple existing MarketingStory documents */
  connect?: Maybe<Array<MarketingStoryWhereUniqueInput>>
}

export type MarketingStoryCreateOneInlineInput = {
  /** Create and connect one MarketingStory document */
  create?: Maybe<MarketingStoryCreateInput>
  /** Connect one existing MarketingStory document */
  connect?: Maybe<MarketingStoryWhereUniqueInput>
}

/** An edge in a connection. */
export type MarketingStoryEdge = {
  __typename?: 'MarketingStoryEdge'
  /** The item at the end of the edge. */
  node: MarketingStory
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type MarketingStoryManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<MarketingStoryWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<MarketingStoryWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<MarketingStoryWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  asset?: Maybe<AssetWhereInput>
  duration?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  duration_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  duration_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  duration_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  duration_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  duration_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  duration_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  duration_gte?: Maybe<Scalars['Float']>
  importance?: Maybe<Scalars['Int']>
  /** All values that are not equal to given value. */
  importance_not?: Maybe<Scalars['Int']>
  /** All values that are contained in given list. */
  importance_in?: Maybe<Array<Scalars['Int']>>
  /** All values that are not contained in given list. */
  importance_not_in?: Maybe<Array<Scalars['Int']>>
  /** All values less than the given value. */
  importance_lt?: Maybe<Scalars['Int']>
  /** All values less than or equal the given value. */
  importance_lte?: Maybe<Scalars['Int']>
  /** All values greater than the given value. */
  importance_gt?: Maybe<Scalars['Int']>
  /** All values greater than or equal the given value. */
  importance_gte?: Maybe<Scalars['Int']>
  backgroundColor?: Maybe<HedvigColor>
  /** All values that are not equal to given value. */
  backgroundColor_not?: Maybe<HedvigColor>
  /** All values that are contained in given list. */
  backgroundColor_in?: Maybe<Array<HedvigColor>>
  /** All values that are not contained in given list. */
  backgroundColor_not_in?: Maybe<Array<HedvigColor>>
  environment?: Maybe<Environment>
  /** All values that are not equal to given value. */
  environment_not?: Maybe<Environment>
  /** All values that are contained in given list. */
  environment_in?: Maybe<Array<Environment>>
  /** All values that are not contained in given list. */
  environment_not_in?: Maybe<Array<Environment>>
  language?: Maybe<LanguageWhereInput>
}

export enum MarketingStoryOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  ImportanceAsc = 'importance_ASC',
  ImportanceDesc = 'importance_DESC',
  BackgroundColorAsc = 'backgroundColor_ASC',
  BackgroundColorDesc = 'backgroundColor_DESC',
  EnvironmentAsc = 'environment_ASC',
  EnvironmentDesc = 'environment_DESC',
}

export type MarketingStoryUpdateInput = {
  asset?: Maybe<AssetUpdateOneInlineInput>
  duration?: Maybe<Scalars['Float']>
  importance?: Maybe<Scalars['Int']>
  backgroundColor?: Maybe<HedvigColor>
  environment?: Maybe<Environment>
  language?: Maybe<LanguageUpdateOneInlineInput>
}

export type MarketingStoryUpdateManyInlineInput = {
  /** Create and connect multiple MarketingStory documents */
  create?: Maybe<Array<MarketingStoryCreateInput>>
  /** Connect multiple existing MarketingStory documents */
  connect?: Maybe<Array<MarketingStoryConnectInput>>
  /** Override currently-connected documents with multiple existing MarketingStory documents */
  set?: Maybe<Array<MarketingStoryWhereUniqueInput>>
  /** Update multiple MarketingStory documents */
  update?: Maybe<Array<MarketingStoryUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple MarketingStory documents */
  upsert?: Maybe<Array<MarketingStoryUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple MarketingStory documents */
  disconnect?: Maybe<Array<MarketingStoryWhereUniqueInput>>
  /** Delete multiple MarketingStory documents */
  delete?: Maybe<Array<MarketingStoryWhereUniqueInput>>
}

export type MarketingStoryUpdateManyInput = {
  duration?: Maybe<Scalars['Float']>
  importance?: Maybe<Scalars['Int']>
  backgroundColor?: Maybe<HedvigColor>
  environment?: Maybe<Environment>
}

export type MarketingStoryUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: MarketingStoryWhereInput
  /** Update many input */
  data: MarketingStoryUpdateManyInput
}

export type MarketingStoryUpdateOneInlineInput = {
  /** Create and connect one MarketingStory document */
  create?: Maybe<MarketingStoryCreateInput>
  /** Update single MarketingStory document */
  update?: Maybe<MarketingStoryUpdateWithNestedWhereUniqueInput>
  /** Upsert single MarketingStory document */
  upsert?: Maybe<MarketingStoryUpsertWithNestedWhereUniqueInput>
  /** Connect existing MarketingStory document */
  connect?: Maybe<MarketingStoryWhereUniqueInput>
  /** Disconnect currently connected MarketingStory document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected MarketingStory document */
  delete?: Maybe<Scalars['Boolean']>
}

export type MarketingStoryUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: MarketingStoryWhereUniqueInput
  /** Document to update */
  data: MarketingStoryUpdateInput
}

export type MarketingStoryUpsertInput = {
  /** Create document if it didn't exist */
  create: MarketingStoryCreateInput
  /** Update document if it exists */
  update: MarketingStoryUpdateInput
}

export type MarketingStoryUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: MarketingStoryWhereUniqueInput
  /** Upsert data */
  data: MarketingStoryUpsertInput
}

/** Identifies documents */
export type MarketingStoryWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<MarketingStoryWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<MarketingStoryWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<MarketingStoryWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  asset?: Maybe<AssetWhereInput>
  duration?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  duration_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  duration_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  duration_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  duration_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  duration_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  duration_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  duration_gte?: Maybe<Scalars['Float']>
  importance?: Maybe<Scalars['Int']>
  /** All values that are not equal to given value. */
  importance_not?: Maybe<Scalars['Int']>
  /** All values that are contained in given list. */
  importance_in?: Maybe<Array<Scalars['Int']>>
  /** All values that are not contained in given list. */
  importance_not_in?: Maybe<Array<Scalars['Int']>>
  /** All values less than the given value. */
  importance_lt?: Maybe<Scalars['Int']>
  /** All values less than or equal the given value. */
  importance_lte?: Maybe<Scalars['Int']>
  /** All values greater than the given value. */
  importance_gt?: Maybe<Scalars['Int']>
  /** All values greater than or equal the given value. */
  importance_gte?: Maybe<Scalars['Int']>
  backgroundColor?: Maybe<HedvigColor>
  /** All values that are not equal to given value. */
  backgroundColor_not?: Maybe<HedvigColor>
  /** All values that are contained in given list. */
  backgroundColor_in?: Maybe<Array<HedvigColor>>
  /** All values that are not contained in given list. */
  backgroundColor_not_in?: Maybe<Array<HedvigColor>>
  environment?: Maybe<Environment>
  /** All values that are not equal to given value. */
  environment_not?: Maybe<Environment>
  /** All values that are contained in given list. */
  environment_in?: Maybe<Array<Environment>>
  /** All values that are not contained in given list. */
  environment_not_in?: Maybe<Array<Environment>>
  language?: Maybe<LanguageWhereInput>
}

/** References MarketingStory record uniquely */
export type MarketingStoryWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type Member = {
  __typename?: 'Member'
  id?: Maybe<Scalars['ID']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  acceptLanguage?: Maybe<Scalars['String']>
  features: Array<Feature>
}

export type MemberIsNotEligibleForCampaign = {
  __typename?: 'MemberIsNotEligibleForCampaign'
  code: Scalars['String']
}

export type Message = {
  __typename?: 'Message'
  globalId: Scalars['ID']
  id: Scalars['ID']
  body: MessageBody
  header: MessageHeader
}

export type MessageBody =
  | MessageBodySingleSelect
  | MessageBodyMultipleSelect
  | MessageBodyText
  | MessageBodyNumber
  | MessageBodyAudio
  | MessageBodyBankIdCollect
  | MessageBodyFile
  | MessageBodyParagraph
  | MessageBodyUndefined

export type MessageBodyAudio = MessageBodyCore & {
  __typename?: 'MessageBodyAudio'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
  url?: Maybe<Scalars['String']>
}

export type MessageBodyBankIdCollect = MessageBodyCore & {
  __typename?: 'MessageBodyBankIdCollect'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
  referenceId?: Maybe<Scalars['String']>
}

export type MessageBodyChoices =
  | MessageBodyChoicesUndefined
  | MessageBodyChoicesSelection
  | MessageBodyChoicesLink

export type MessageBodyChoicesCore = {
  type: Scalars['String']
  value: Scalars['String']
  text: Scalars['String']
  selected: Scalars['Boolean']
}

export type MessageBodyChoicesLink = MessageBodyChoicesCore & {
  __typename?: 'MessageBodyChoicesLink'
  type: Scalars['String']
  value: Scalars['String']
  text: Scalars['String']
  selected: Scalars['Boolean']
  view?: Maybe<MessageBodyChoicesLinkView>
  appUrl?: Maybe<Scalars['String']>
  webUrl?: Maybe<Scalars['String']>
}

export enum MessageBodyChoicesLinkView {
  Offer = 'OFFER',
  Dashboard = 'DASHBOARD',
}

export type MessageBodyChoicesSelection = MessageBodyChoicesCore & {
  __typename?: 'MessageBodyChoicesSelection'
  type: Scalars['String']
  value: Scalars['String']
  text: Scalars['String']
  selected: Scalars['Boolean']
  clearable?: Maybe<Scalars['Boolean']>
}

export type MessageBodyChoicesUndefined = MessageBodyChoicesCore & {
  __typename?: 'MessageBodyChoicesUndefined'
  type: Scalars['String']
  value: Scalars['String']
  text: Scalars['String']
  selected: Scalars['Boolean']
}

export type MessageBodyCore = {
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
}

export type MessageBodyFile = MessageBodyCore & {
  __typename?: 'MessageBodyFile'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
  key?: Maybe<Scalars['String']>
  mimeType?: Maybe<Scalars['String']>
  file: File
}

export type MessageBodyMultipleSelect = MessageBodyCore & {
  __typename?: 'MessageBodyMultipleSelect'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
  choices?: Maybe<Array<Maybe<MessageBodyChoices>>>
}

export type MessageBodyNumber = MessageBodyCore & {
  __typename?: 'MessageBodyNumber'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
  placeholder?: Maybe<Scalars['String']>
  keyboard?: Maybe<KeyboardType>
  textContentType?: Maybe<TextContentType>
}

export type MessageBodyParagraph = MessageBodyCore & {
  __typename?: 'MessageBodyParagraph'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
}

export type MessageBodySingleSelect = MessageBodyCore & {
  __typename?: 'MessageBodySingleSelect'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
  choices?: Maybe<Array<Maybe<MessageBodyChoices>>>
}

export type MessageBodyText = MessageBodyCore & {
  __typename?: 'MessageBodyText'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
  placeholder?: Maybe<Scalars['String']>
  keyboard?: Maybe<KeyboardType>
  textContentType?: Maybe<TextContentType>
}

export type MessageBodyUndefined = MessageBodyCore & {
  __typename?: 'MessageBodyUndefined'
  type: Scalars['String']
  id: Scalars['ID']
  text: Scalars['String']
}

export type MessageHeader = {
  __typename?: 'MessageHeader'
  messageId: Scalars['ID']
  fromMyself: Scalars['Boolean']
  timeStamp: Scalars['String']
  richTextChatCompatible: Scalars['Boolean']
  editAllowed: Scalars['Boolean']
  shouldRequestPushNotifications: Scalars['Boolean']
  pollingInterval: Scalars['Int']
  loadingIndicator?: Maybe<Scalars['String']>
  markedAsRead: Scalars['Boolean']
  statusMessage?: Maybe<Scalars['String']>
}

export type MonetaryAmountInput = {
  amount: Scalars['String']
  currency: Scalars['String']
}

export type MonetaryAmountV2 = {
  __typename?: 'MonetaryAmountV2'
  amount: Scalars['String']
  currency: Scalars['String']
}

export type MonetaryAmountV2Input = {
  amount: Scalars['String']
  currency: Scalars['String']
}

export type MonthlyCostDeduction = {
  __typename?: 'MonthlyCostDeduction'
  amount?: Maybe<MonetaryAmountV2>
}

export type Mutation = {
  __typename?: 'Mutation'
  logout: Scalars['Boolean']
  createSession: Scalars['String']
  createSessionV2?: Maybe<SessionInformation>
  /** @deprecated Use Quotes instead */
  createOffer?: Maybe<Scalars['Boolean']>
  /** @deprecated Use `signOfferV2`. */
  signOffer?: Maybe<Scalars['Boolean']>
  /** @deprecated Use Quotes instead */
  signOfferV2: BankIdSignResponse
  uploadFile: File
  uploadFiles?: Maybe<Array<File>>
  selectCashbackOption: Cashback
  /** @deprecated Use Quotes instead */
  offerClosed: Scalars['Boolean']
  startDirectDebitRegistration: Scalars['URL']
  sendChatTextResponse: Scalars['Boolean']
  sendChatSingleSelectResponse: Scalars['Boolean']
  sendChatFileResponse: Scalars['Boolean']
  sendChatAudioResponse: Scalars['Boolean']
  resetConversation: Scalars['Boolean']
  editLastResponse: Scalars['Boolean']
  updateEmail: Member
  updatePhoneNumber: Member
  registerPushToken?: Maybe<Scalars['Boolean']>
  triggerFreeTextChat?: Maybe<Scalars['Boolean']>
  triggerClaimChat?: Maybe<Scalars['Boolean']>
  triggerCallMeChat?: Maybe<Scalars['Boolean']>
  emailSign?: Maybe<Scalars['Boolean']>
  markMessageAsRead: Message
  log?: Maybe<Scalars['Boolean']>
  /** @deprecated Use `swedishBankIdAuth`. */
  bankIdAuth: BankIdAuthResponse
  swedishBankIdAuth: BankIdAuthResponse
  norwegianBankIdAuth: NorwegianBankIdAuthResponse
  danishBankIdAuth: DanishBankIdAuthResponse
  registerBranchCampaign?: Maybe<Scalars['Boolean']>
  updateLanguage: Scalars['Boolean']
  updatePickedLocale: Member
  createSelfChangeQuote: SelfChangeQuoteOutput
  exchangeToken: ExchangeTokenResponse
  registerDirectDebit: DirectDebitResponse
  cancelDirectDebitRequest: CancelDirectDebitStatus
  /** Tokenize payment details per member in order to be used in future and returns the status */
  tokenizePaymentDetails?: Maybe<TokenizationResponse>
  /** Tokenize payout details per member in order to be used in future and returns the status */
  tokenizePayoutDetails?: Maybe<TokenizationResponse>
  /** Submit additional payment details */
  submitAdditionalPaymentDetails: AdditionalPaymentsDetailsResponse
  submitAdyenRedirection: SubmitAdyenRedirectionResponse
  /**
   * Will be called from the client when 1) redeem manually a code, 2) click the link  --Fails if the code is invalid?--
   * @deprecated Use redeemCodeOnV2
   */
  redeemCode: RedemedCodeResult
  redeemCodeV2: RedeemedCodeV2Result
  /** @deprecated Use removeDiscountCodeV2 */
  removeDiscountCode: RedemedCodeResult
  removeAllDiscountCodes: RemoveCampaignCodeResult
  updateReferralCampaignCode: UpdateReferralCampaignCodeResult
  externalInsuranceProvider?: Maybe<ExternalInsuranceProviderMutation>
  createQuote: CreateQuoteResult
  editQuote: CreateQuoteResult
  removeCurrentInsurer: CreateQuoteResult
  removeStartDate: CreateQuoteResult
  signQuotes: StartSignResponse
  createKeyGearItem: KeyGearItem
  addPhotoToKeyGearItem: KeyGearItem
  deletePhotoFromKeyGearItem: KeyGearItem
  addReceiptToKeyGearItem: KeyGearItem
  deleteReceiptFromKeyGearItem: KeyGearItem
  updateCategoryForKeyGearItem: KeyGearItem
  /** # send null to remove */
  updatePurchasePriceForKeyGearItem: KeyGearItem
  /** # send null to remove */
  updateTimeOfPurchaseForKeyGearItem: KeyGearItem
  updateKeyGearItemName: KeyGearItem
  /**
   * """
   * When we've deleted an item, we mark it as deleted and should probably redact all information
   * except for the physicalReferenceHash.
   * """
   */
  deleteKeyGearItem: KeyGearItem
}

export type MutationCreateSessionArgs = {
  campaign?: Maybe<CampaignInput>
  trackingId?: Maybe<Scalars['UUID']>
}

export type MutationCreateOfferArgs = {
  details: OfferInput
}

export type MutationSignOfferArgs = {
  details: SignInput
}

export type MutationSignOfferV2Args = {
  details?: Maybe<SignInput>
}

export type MutationUploadFileArgs = {
  file: Scalars['Upload']
}

export type MutationUploadFilesArgs = {
  files: Array<Scalars['Upload']>
}

export type MutationSelectCashbackOptionArgs = {
  id: Scalars['ID']
  locale?: Maybe<Locale>
}

export type MutationSendChatTextResponseArgs = {
  input: ChatResponseTextInput
}

export type MutationSendChatSingleSelectResponseArgs = {
  input: ChatResponseSingleSelectInput
}

export type MutationSendChatFileResponseArgs = {
  input: ChatResponseFileInput
}

export type MutationSendChatAudioResponseArgs = {
  input: ChatResponseAudioInput
}

export type MutationUpdateEmailArgs = {
  input: Scalars['String']
}

export type MutationUpdatePhoneNumberArgs = {
  input: Scalars['String']
}

export type MutationRegisterPushTokenArgs = {
  pushToken: Scalars['String']
}

export type MutationTriggerClaimChatArgs = {
  input: TriggerClaimChatInput
}

export type MutationMarkMessageAsReadArgs = {
  globalId: Scalars['ID']
}

export type MutationLogArgs = {
  input: LoggingInput
}

export type MutationNorwegianBankIdAuthArgs = {
  personalNumber?: Maybe<Scalars['String']>
}

export type MutationRegisterBranchCampaignArgs = {
  campaign: CampaignInput
}

export type MutationUpdateLanguageArgs = {
  input: Scalars['String']
}

export type MutationUpdatePickedLocaleArgs = {
  pickedLocale: Locale
}

export type MutationCreateSelfChangeQuoteArgs = {
  quoteInput: SelfChangeQuoteInput
}

export type MutationExchangeTokenArgs = {
  input: ExchangeTokenInput
}

export type MutationRegisterDirectDebitArgs = {
  clientContext?: Maybe<RegisterDirectDebitClientContext>
}

export type MutationTokenizePaymentDetailsArgs = {
  req?: Maybe<TokenizationRequest>
}

export type MutationTokenizePayoutDetailsArgs = {
  req?: Maybe<TokenizationRequest>
}

export type MutationSubmitAdditionalPaymentDetailsArgs = {
  req?: Maybe<AdditionalPaymentsDetailsRequest>
}

export type MutationSubmitAdyenRedirectionArgs = {
  req?: Maybe<SubmitAdyenRedirectionRequest>
}

export type MutationRedeemCodeArgs = {
  code: Scalars['String']
}

export type MutationRedeemCodeV2Args = {
  code: Scalars['String']
  grossPrice?: Maybe<MonetaryAmountInput>
}

export type MutationRemoveAllDiscountCodesArgs = {
  grossPrice?: Maybe<MonetaryAmountInput>
}

export type MutationUpdateReferralCampaignCodeArgs = {
  code: Scalars['String']
}

export type MutationCreateQuoteArgs = {
  input: CreateQuoteInput
}

export type MutationEditQuoteArgs = {
  input: EditQuoteInput
}

export type MutationRemoveCurrentInsurerArgs = {
  input: RemoveCurrentInsurerInput
}

export type MutationRemoveStartDateArgs = {
  input: RemoveStartDateInput
}

export type MutationSignQuotesArgs = {
  input: SignQuotesInput
}

export type MutationCreateKeyGearItemArgs = {
  input: CreateKeyGearItemInput
}

export type MutationAddPhotoToKeyGearItemArgs = {
  input: AddPhotoToKeyGearItemInput
}

export type MutationDeletePhotoFromKeyGearItemArgs = {
  itemId: Scalars['ID']
  id: Scalars['ID']
}

export type MutationAddReceiptToKeyGearItemArgs = {
  input: AddReceiptToKeyGearItemInput
}

export type MutationDeleteReceiptFromKeyGearItemArgs = {
  itemId: Scalars['ID']
  id: Scalars['ID']
}

export type MutationUpdateCategoryForKeyGearItemArgs = {
  itemId: Scalars['ID']
  category: KeyGearItemCategory
}

export type MutationUpdatePurchasePriceForKeyGearItemArgs = {
  itemId: Scalars['ID']
  newPrice?: Maybe<MonetaryAmountV2Input>
}

export type MutationUpdateTimeOfPurchaseForKeyGearItemArgs = {
  id: Scalars['ID']
  newTimeOfPurchase?: Maybe<Scalars['LocalDate']>
}

export type MutationUpdateKeyGearItemNameArgs = {
  itemId: Scalars['ID']
  updatedName?: Maybe<Scalars['String']>
}

export type MutationDeleteKeyGearItemArgs = {
  id: Scalars['ID']
}

/** A page in the `What's new`-screen in the app */
export type News = {
  __typename?: 'News'
  /** Illustration shown for the page */
  illustration: Icon
  /** Text for the title of the page */
  title: Scalars['String']
  /** Text for the paragraph shown below the title */
  paragraph: Scalars['String']
}

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID']
  /** The Stage of an object */
  stage: Stage
}

export type NoDiscount = {
  __typename?: 'NoDiscount'
  _?: Maybe<Scalars['Boolean']>
}

export type NorwegianBankIdAuthResponse = {
  __typename?: 'NorwegianBankIdAuthResponse'
  redirectUrl: Scalars['String']
}

export type NorwegianBankIdExtraInfo = {
  __typename?: 'NorwegianBankIdExtraInfo'
  norwegianBankIdWords?: Maybe<Scalars['String']>
}

export type NorwegianBankIdSession = {
  __typename?: 'NorwegianBankIdSession'
  redirectUrl?: Maybe<Scalars['String']>
}

export type NorwegianHomeContentAgreement = AgreementCore & {
  __typename?: 'NorwegianHomeContentAgreement'
  id: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  termsAndConditions?: Maybe<InsuranceTerm>
  address: Address
  numberCoInsured: Scalars['Int']
  squareMeters: Scalars['Int']
  type?: Maybe<NorwegianHomeContentLineOfBusiness>
}

export enum NorwegianHomeContentLineOfBusiness {
  Rent = 'RENT',
  Own = 'OWN',
  YouthRent = 'YOUTH_RENT',
  YouthOwn = 'YOUTH_OWN',
}

export type NorwegianHomeContentsDetails = {
  __typename?: 'NorwegianHomeContentsDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  livingSpace: Scalars['Int']
  isYouth: Scalars['Boolean']
  type: NorwegianHomeContentsType
}

export enum NorwegianHomeContentsType {
  Rent = 'RENT',
  Own = 'OWN',
}

export type NorwegianTravelAgreement = AgreementCore & {
  __typename?: 'NorwegianTravelAgreement'
  id: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  termsAndConditions?: Maybe<InsuranceTerm>
  numberCoInsured: Scalars['Int']
  type?: Maybe<NorwegianTravelLineOfBusiness>
}

export type NorwegianTravelDetails = {
  __typename?: 'NorwegianTravelDetails'
  coInsured: Scalars['Int']
  isYouth: Scalars['Boolean']
}

export enum NorwegianTravelLineOfBusiness {
  Regular = 'REGULAR',
  Youth = 'YOUTH',
}

export type OfferEvent = {
  __typename?: 'OfferEvent'
  status: OfferStatus
  insurance?: Maybe<Insurance>
}

export type OfferInput = {
  firstName: Scalars['String']
  lastName: Scalars['String']
  age: Scalars['Int']
  address: Scalars['String']
  postalNumber: Scalars['String']
  city?: Maybe<Scalars['String']>
  insuranceType: InsuranceType
  squareMeters: Scalars['Int']
  personsInHousehold: Scalars['Int']
  previousInsurer?: Maybe<Scalars['String']>
}

export enum OfferStatus {
  Success = 'SUCCESS',
  Fail = 'FAIL',
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']>
}

export enum PayinMethodStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  NeedsSetup = 'NEEDS_SETUP',
}

export enum PayoutMethodStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  NeedsSetup = 'NEEDS_SETUP',
}

/** The contract is neither active or terminated, waiting to have an inception date set */
export type PendingStatus = {
  __typename?: 'PendingStatus'
  pendingSince?: Maybe<Scalars['LocalDate']>
}

export type PercentageDiscountMonths = {
  __typename?: 'PercentageDiscountMonths'
  percentageDiscount: Scalars['Float']
  quantity: Scalars['Int']
}

export type Peril = {
  __typename?: 'Peril'
  id?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type PerilCategory = {
  __typename?: 'PerilCategory'
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  iconUrl?: Maybe<Scalars['String']>
  perils?: Maybe<Array<Maybe<Peril>>>
}

export type PerilV2 = {
  __typename?: 'PerilV2'
  title: Scalars['String']
  shortDescription: Scalars['String']
  description: Scalars['String']
  covered: Array<Scalars['String']>
  exceptions: Array<Scalars['String']>
  info: Scalars['String']
  icon: Icon
  iconName: Scalars['String']
}

export type PersonalInformation = {
  __typename?: 'PersonalInformation'
  firstName: Scalars['String']
  lastName: Scalars['String']
  streetAddress: Scalars['String']
  postalNumber: Scalars['String']
  city: Scalars['String']
}

export type PersonalInformationInput = {
  personalNumber: Scalars['String']
}

export type PersonTravelInsuranceCollection = {
  __typename?: 'PersonTravelInsuranceCollection'
  insuranceProvider?: Maybe<Scalars['String']>
  insuranceHolderAddress?: Maybe<Scalars['String']>
  insuranceHolderName?: Maybe<Scalars['String']>
  insuranceName?: Maybe<Scalars['String']>
  insuranceSubType?: Maybe<Scalars['String']>
  insuranceType?: Maybe<Scalars['String']>
  renewalDate?: Maybe<Scalars['LocalDate']>
  monthlyNetPremium?: Maybe<MonetaryAmountV2>
  monthlyGrossPremium?: Maybe<MonetaryAmountV2>
  monthlyDiscount?: Maybe<MonetaryAmountV2>
}

export enum Platform {
  Android = 'Android',
  IOs = 'iOS',
}

export type PreviousInsurer = {
  __typename?: 'PreviousInsurer'
  displayName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  switchable: Scalars['Boolean']
}

export enum Project {
  All = 'All',
  Android = 'Android',
  App = 'App',
  AppContentService = 'AppContentService',
  BotService = 'BotService',
  Ios = 'IOS',
  MemberService = 'MemberService',
  NotificationService = 'NotificationService',
  ProductPricing = 'ProductPricing',
  Underwriter = 'Underwriter',
  Web = 'Web',
  WebOnboarding = 'WebOnboarding',
}

export type ProviderStatus = {
  __typename?: 'ProviderStatus'
  functional: Scalars['Boolean']
  insuranceProvider: Scalars['String']
}

export type ProviderStatusV2 = {
  __typename?: 'ProviderStatusV2'
  functional: Scalars['Boolean']
  insuranceProvider: Scalars['String']
  status: InsuranceProviderAvailability
}

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale
  /** Stages to publish selected locales to */
  stages: Array<Stage>
}

export type Query = {
  __typename?: 'Query'
  /** Retrieve multiple appMarketingImages */
  appMarketingImages: Array<AppMarketingImage>
  /** Retrieve multiple coreMLModels */
  coreMLModels: Array<CoreMlModel>
  /** Retrieve multiple importantMessages */
  importantMessages: Array<ImportantMessage>
  /** Retrieve multiple keyGearItemCoverages */
  keyGearItemCoverages: Array<KeyGearItemCoverage>
  /** Retrieve multiple languages */
  languages: Array<Language>
  /** Retrieve multiple marketingStories */
  marketingStories: Array<MarketingStory>
  /** @deprecated Use `contracts` instead */
  insurance: Insurance
  cashback?: Maybe<Cashback>
  cashbackOptions: Array<Maybe<Cashback>>
  signStatus?: Maybe<SignStatus>
  member: Member
  gifs: Array<Maybe<Gif>>
  file: File
  messages: Array<Maybe<Message>>
  currentChatResponse?: Maybe<ChatResponse>
  chatState: ChatState
  avatars?: Maybe<Array<Maybe<Avatar>>>
  chatActions?: Maybe<Array<Maybe<ChatAction>>>
  geo: Geo
  angelStory?: Maybe<AngelStory>
  gateway__?: Maybe<Scalars['Boolean']>
  bankAccount?: Maybe<BankAccount>
  /** @deprecated Use `nextChargeDate` */
  chargeDate: Scalars['LocalDate']
  nextChargeDate?: Maybe<Scalars['LocalDate']>
  /** @deprecated Use `directDebitStatus` */
  registerAccountProcessingStatus: RegisterAccountProcessingStatus
  /** @deprecated Use `payinMethodStatus` */
  directDebitStatus: DirectDebitStatus
  /** Returns the status for the payin method (Trustly's direct debit for Sweden) (Adyen for Norway) */
  payinMethodStatus: PayinMethodStatus
  /** Returns all the available payments methods before the client requests a tokenization */
  availablePaymentMethods: AvailablePaymentMethodsResponse
  /** Returns the active payment method which the member chose to tokenize */
  activePaymentMethods?: Maybe<ActivePaymentMethodsResponse>
  adyenPublicKey: Scalars['String']
  /** Returns all the available payouts methods before the client requests a payout tokenization */
  availablePayoutMethods: AvailablePaymentMethodsResponse
  /** Returns the active payout method which the member chose to tokenize */
  activePayoutMethods?: Maybe<ActivePayoutMethodsResponse>
  /** Returns campaign associated with code */
  campaign: Campaign
  /** Returns information about the authed member's referralCampaign and referrals */
  referralInformation: Referrals
  /** Returns redeemed campaigns belonging to authedUser */
  redeemedCampaigns: Array<Campaign>
  /** Returns all contracts the member currently holds, regardless of activation/termination status */
  contracts: Array<Contract>
  /** Returns a type describing whether the 'Self Change' functionality is possible. */
  selfChangeEligibility: SelfChangeEligibility
  /** Returns the aggregated insurance cost of a member's PENDING, ACTIVE or ACTIVE_IN_FUTURE current agreements */
  insuranceCost?: Maybe<InsuranceCost>
  /** Returns whether a member has at least one contract */
  hasContract: Scalars['Boolean']
  /** Returns whether a member is eligible to create a claim, i.e. if a member has an active contract */
  isEligibleToCreateClaim: Scalars['Boolean']
  balance: Balance
  chargeEstimation: ChargeEstimation
  chargeHistory: Array<Charge>
  personalInformation?: Maybe<PersonalInformation>
  houseInformation?: Maybe<HouseInformation>
  externalInsuranceProvider?: Maybe<ExternalInsuranceProvider>
  autoCompleteAddress: Array<AutoCompleteResponse>
  quote: Quote
  lastQuoteOfMember: Quote
  quoteBundle: QuoteBundle
  signMethodForQuotes: SignMethod
  commonClaims: Array<CommonClaim>
  news: Array<News>
  welcome: Array<Welcome>
  perils: Array<PerilV2>
  insuranceTerms: Array<InsuranceTerm>
  termsAndConditions: InsuranceTerm
  /** other external insurance providers, use to figure out if we can switch and or fetch data externally */
  insuranceProviders: Array<InsuranceProvider>
  insurableLimits: Array<InsurableLimit>
  referralTerms: ReferralTerm
  howClaimsWork: Array<ClaimsExplainerPage>
  embarkStory?: Maybe<EmbarkStory>
  /** returns names of all available embark stories */
  embarkStoryNames: Array<Scalars['String']>
  embarkStories: Array<EmbarkStoryMetadata>
  /** Used */
  keyGearItems: Array<KeyGearItem>
  keyGearItem?: Maybe<KeyGearItem>
}

export type QueryAppMarketingImagesArgs = {
  where?: Maybe<AppMarketingImageWhereInput>
  orderBy?: Maybe<AppMarketingImageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryCoreMlModelsArgs = {
  where?: Maybe<CoreMlModelWhereInput>
  orderBy?: Maybe<CoreMlModelOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryImportantMessagesArgs = {
  where?: Maybe<ImportantMessageWhereInput>
  orderBy?: Maybe<ImportantMessageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryKeyGearItemCoveragesArgs = {
  where?: Maybe<KeyGearItemCoverageWhereInput>
  orderBy?: Maybe<KeyGearItemCoverageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryLanguagesArgs = {
  where?: Maybe<LanguageWhereInput>
  orderBy?: Maybe<LanguageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryMarketingStoriesArgs = {
  where?: Maybe<MarketingStoryWhereInput>
  orderBy?: Maybe<MarketingStoryOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: Stage
  locales?: Array<Locale>
}

export type QueryCashbackArgs = {
  locale?: Maybe<Locale>
}

export type QueryCashbackOptionsArgs = {
  locale?: Maybe<Locale>
}

export type QueryGifsArgs = {
  query: Scalars['String']
}

export type QueryFileArgs = {
  key: Scalars['String']
}

export type QueryAngelStoryArgs = {
  name: Scalars['String']
  locale?: Maybe<Scalars['String']>
}

export type QueryCampaignArgs = {
  code: Scalars['String']
}

export type QueryPersonalInformationArgs = {
  input: PersonalInformationInput
}

export type QueryHouseInformationArgs = {
  input: HouseInformationInput
}

export type QueryAutoCompleteAddressArgs = {
  input: Scalars['String']
}

export type QueryQuoteArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QueryQuoteBundleArgs = {
  input: QuoteBundleInput
}

export type QuerySignMethodForQuotesArgs = {
  input: Array<Scalars['ID']>
}

export type QueryCommonClaimsArgs = {
  locale: Locale
}

export type QueryNewsArgs = {
  platform: Platform
  sinceVersion: Scalars['String']
  locale: Locale
}

export type QueryWelcomeArgs = {
  platform: Platform
  locale: Locale
}

export type QueryPerilsArgs = {
  contractType: TypeOfContract
  locale: Locale
}

export type QueryInsuranceTermsArgs = {
  contractType: TypeOfContract
  locale: Locale
  date?: Maybe<Scalars['LocalDate']>
}

export type QueryTermsAndConditionsArgs = {
  contractType: TypeOfContract
  locale: Locale
  date?: Maybe<Scalars['LocalDate']>
}

export type QueryInsuranceProvidersArgs = {
  locale: Locale
}

export type QueryInsurableLimitsArgs = {
  contractType: TypeOfContract
  locale: Locale
}

export type QueryReferralTermsArgs = {
  locale: Locale
}

export type QueryHowClaimsWorkArgs = {
  locale: Locale
}

export type QueryEmbarkStoryArgs = {
  name: Scalars['String']
  locale: Scalars['String']
}

export type QueryEmbarkStoriesArgs = {
  locale: Scalars['String']
}

export type QueryKeyGearItemsArgs = {
  where?: Maybe<KeyGearItemsFilter>
}

export type QueryKeyGearItemArgs = {
  id: Scalars['ID']
}

export type Quote = CompleteQuote | IncompleteQuote

export type QuoteBundle = {
  __typename?: 'QuoteBundle'
  quotes: Array<BundledQuote>
  bundleCost: InsuranceCost
}

export type QuoteBundleInput = {
  ids: Array<Scalars['ID']>
}

export type QuoteDetails =
  | SwedishApartmentQuoteDetails
  | SwedishHouseQuoteDetails
  | NorwegianHomeContentsDetails
  | NorwegianTravelDetails
  | DanishHomeContentsDetails
  | DanishAccidentDetails
  | DanishTravelDetails

export type RedeemedCodeV2Result =
  | SuccessfulRedeemResult
  | CannotRedeemOwnCampaign
  | CampaignCannotBeCombinedWithExisting
  | CannotRedeemEmptyCode
  | CampaignHasExpired
  | MemberIsNotEligibleForCampaign
  | CampaignDoesNotExist
  | CannotRedeemCampaignFromDifferentMarket

export type RedemedCodeResult = {
  __typename?: 'RedemedCodeResult'
  /** The currently redeemed incentive, this can be null */
  campaigns: Array<Campaign>
  cost: InsuranceCost
}

export type Referral =
  | ActiveReferral
  | InProgressReferral
  | AcceptedReferral
  | TerminatedReferral

export type Referrals = {
  __typename?: 'Referrals'
  campaign: Campaign
  referredBy?: Maybe<Referral>
  invitations: Array<Referral>
  costReducedIndefiniteDiscount?: Maybe<InsuranceCost>
}

export type ReferralTerm = {
  __typename?: 'ReferralTerm'
  url: Scalars['URL']
}

export enum RegisterAccountProcessingStatus {
  NotInitiated = 'NOT_INITIATED',
  Initiated = 'INITIATED',
  Requested = 'REQUESTED',
  InProgress = 'IN_PROGRESS',
  Confirmed = 'CONFIRMED',
  Cancelled = 'CANCELLED',
}

export type RegisterDirectDebitClientContext = {
  successUrl: Scalars['String']
  failureUrl: Scalars['String']
}

export type RemoveCampaignCodeResult =
  | SuccessfullyRemovedCampaignsResult
  | CannotRemoveActiveCampaignCode

export type RemoveCurrentInsurerInput = {
  id: Scalars['ID']
}

export type RemoveStartDateInput = {
  id: Scalars['ID']
}

export type Renewal = {
  __typename?: 'Renewal'
  certificateUrl: Scalars['String']
  date: Scalars['LocalDate']
}

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA'
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText'
  /** Returns AST representation */
  raw: Scalars['RichTextAST']
  /** Returns HTMl representation */
  html: Scalars['String']
  /** Returns Markdown representation */
  markdown: Scalars['String']
  /** Returns plain-text contents of RichText */
  text: Scalars['String']
}

export type S3File = {
  __typename?: 'S3File'
  preSignedUrl: Scalars['String']
}

export type S3FileInput = {
  bucket: Scalars['String']
  key: Scalars['String']
}

/** These types represent reasons for why the self-change flow cannot be run. */
export enum SelfChangeBlocker {
  /** Contract is still pending, it can't be changed until it is active. */
  StillPending = 'STILL_PENDING',
  /** Contract has a termination date set. */
  HasTermination = 'HAS_TERMINATION',
  /** Contract is already undergoing future changes. */
  HasFutureChanges = 'HAS_FUTURE_CHANGES',
  /** Contract is not currently active. */
  NotActiveToday = 'NOT_ACTIVE_TODAY',
  /** Member has multiple contracts with mismatching number of co-insured. */
  CoinsuredMismatch = 'COINSURED_MISMATCH',
  /** Member has multiple contracts with mismatching 'youth' status. */
  YouthMismatch = 'YOUTH_MISMATCH',
  /** Member has too many contracts. */
  TooManyContracts = 'TOO_MANY_CONTRACTS',
}

export type SelfChangeCreateDanishAccidentInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
}

export type SelfChangeCreateDanishHomeContentsInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  livingSpace: Scalars['Int']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
  type: SelfChangeDanishHomeContentsType
}

export type SelfChangeCreateDanishTravelInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  isStudent: Scalars['Boolean']
}

export type SelfChangeCreateNorwegianHomeContentsInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  coInsured: Scalars['Int']
  livingSpace: Scalars['Int']
  isYouth: Scalars['Boolean']
  type: SelfChangeNorwegianHomeContentsType
}

export type SelfChangeCreateNorwegianTravelInput = {
  coInsured: Scalars['Int']
  isYouth: Scalars['Boolean']
}

export type SelfChangeCreateSwedishApartmentInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  type: SelfChangeSwedishApartmentType
}

export type SelfChangeCreateSwedishHouseInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  ancillarySpace: Scalars['Int']
  yearOfConstruction: Scalars['Int']
  numberOfBathrooms: Scalars['Int']
  isSubleted: Scalars['Boolean']
  extraBuildings: Array<SelfChangeExtraBuildingInput>
}

export enum SelfChangeDanishHomeContentsType {
  Rent = 'RENT',
  Own = 'OWN',
}

export type SelfChangeEligibility = {
  __typename?: 'SelfChangeEligibility'
  /** A list of reasons for why 'Self Change' is not possible - if empty 'Self Change' can be done. */
  blockers: Array<SelfChangeBlocker>
}

export type SelfChangeExtraBuildingInput = {
  type: SelfChangeExtraBuildingType
  area: Scalars['Int']
  hasWaterConnected: Scalars['Boolean']
}

export enum SelfChangeExtraBuildingType {
  Garage = 'GARAGE',
  Carport = 'CARPORT',
  Shed = 'SHED',
  Storehouse = 'STOREHOUSE',
  Friggebod = 'FRIGGEBOD',
  Attefall = 'ATTEFALL',
  Outhouse = 'OUTHOUSE',
  Guesthouse = 'GUESTHOUSE',
  Gazebo = 'GAZEBO',
  Greenhouse = 'GREENHOUSE',
  Sauna = 'SAUNA',
  Barn = 'BARN',
  Boathouse = 'BOATHOUSE',
  Other = 'OTHER',
}

export enum SelfChangeNorwegianHomeContentsType {
  Rent = 'RENT',
  Own = 'OWN',
}

export type SelfChangeQuoteInput = {
  startDate: Scalars['LocalDate']
  swedishApartment?: Maybe<SelfChangeCreateSwedishApartmentInput>
  swedishHouse?: Maybe<SelfChangeCreateSwedishHouseInput>
  norwegianHomeContents?: Maybe<SelfChangeCreateNorwegianHomeContentsInput>
  norwegianTravel?: Maybe<SelfChangeCreateNorwegianTravelInput>
  danishHomeContents?: Maybe<SelfChangeCreateDanishHomeContentsInput>
  danishAccident?: Maybe<SelfChangeCreateDanishAccidentInput>
  danishTravel?: Maybe<SelfChangeCreateDanishTravelInput>
}

export type SelfChangeQuoteOutput = {
  __typename?: 'SelfChangeQuoteOutput'
  id: Scalars['ID']
  price: Scalars['Int']
  validTo: Scalars['TimeStamp']
}

export enum SelfChangeSwedishApartmentType {
  StudentRent = 'STUDENT_RENT',
  Rent = 'RENT',
  StudentBrf = 'STUDENT_BRF',
  Brf = 'BRF',
}

export type SessionInformation = {
  __typename?: 'SessionInformation'
  token: Scalars['String']
  memberId: Scalars['String']
}

export type SignEvent = {
  __typename?: 'SignEvent'
  status?: Maybe<SignStatus>
}

export type SignInput = {
  personalNumber: Scalars['String']
  email: Scalars['String']
}

export enum SignMethod {
  SwedishBankId = 'SWEDISH_BANK_ID',
  NorwegianBankId = 'NORWEGIAN_BANK_ID',
  DanishBankId = 'DANISH_BANK_ID',
  SimpleSign = 'SIMPLE_SIGN',
}

export type SignQuotesInput = {
  quoteIds: Array<Scalars['ID']>
  successUrl?: Maybe<Scalars['String']>
  failUrl?: Maybe<Scalars['String']>
}

export enum SignState {
  Initiated = 'INITIATED',
  InProgress = 'IN_PROGRESS',
  Failed = 'FAILED',
  Completed = 'COMPLETED',
}

export type SignStatus = {
  __typename?: 'SignStatus'
  collectStatus?: Maybe<CollectStatus>
  signState?: Maybe<SignState>
}

export type SimpleSignSession = {
  __typename?: 'SimpleSignSession'
  id: Scalars['ID']
}

/** Stage system enumeration */
export enum Stage {
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED',
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
}

export type StartSignResponse =
  | SwedishBankIdSession
  | NorwegianBankIdSession
  | DanishBankIdSession
  | SimpleSignSession
  | FailedToStartSign

export type StoredPaymentMethodsDetails = {
  __typename?: 'StoredPaymentMethodsDetails'
  id: Scalars['String']
  cardName?: Maybe<Scalars['String']>
  brand?: Maybe<Scalars['String']>
  lastFourDigits: Scalars['String']
  expiryMonth: Scalars['String']
  expiryYear: Scalars['String']
  holderName?: Maybe<Scalars['String']>
}

export type SubmitAdyenRedirectionRequest = {
  md: Scalars['String']
  pares: Scalars['String']
}

export type SubmitAdyenRedirectionResponse = {
  __typename?: 'SubmitAdyenRedirectionResponse'
  resultCode: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  /** @deprecated Use Quotes instead */
  offer?: Maybe<OfferEvent>
  /** @deprecated Use Quotes instead */
  signStatus?: Maybe<SignEvent>
  message: Message
  currentChatResponse?: Maybe<ChatResponse>
  chatState: ChatState
  authStatus?: Maybe<AuthEvent>
  /** @deprecated use dataCollectionStatusV2 instead */
  dataCollectionStatus?: Maybe<DataCollectingStatusResponse>
  dataCollectionStatusV2: DataCollectingStatusResponseV2
}

export type SubscriptionCurrentChatResponseArgs = {
  mostRecentTimestamp: Scalars['String']
}

export type SubscriptionChatStateArgs = {
  mostRecentTimestamp: Scalars['String']
}

export type SubscriptionDataCollectionStatusArgs = {
  reference: Scalars['ID']
}

export type SubscriptionDataCollectionStatusV2Args = {
  reference: Scalars['ID']
}

export type SuccessfullyRemovedCampaignsResult = {
  __typename?: 'SuccessfullyRemovedCampaignsResult'
  campaignCodes: Array<Scalars['String']>
  insuranceCost?: Maybe<InsuranceCost>
}

export type SuccessfullyUpdatedCode = {
  __typename?: 'SuccessfullyUpdatedCode'
  code: Scalars['String']
}

export type SuccessfulRedeemResult = {
  __typename?: 'SuccessfulRedeemResult'
  campaigns: Array<Campaign>
  cost?: Maybe<InsuranceCost>
}

export type SwedishApartmentAgreement = AgreementCore & {
  __typename?: 'SwedishApartmentAgreement'
  id: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  termsAndConditions?: Maybe<InsuranceTerm>
  address: Address
  numberCoInsured: Scalars['Int']
  squareMeters: Scalars['Int']
  type: SwedishApartmentLineOfBusiness
}

export enum SwedishApartmentLineOfBusiness {
  Rent = 'RENT',
  Brf = 'BRF',
  StudentRent = 'STUDENT_RENT',
  StudentBrf = 'STUDENT_BRF',
}

export type SwedishApartmentQuoteDetails = {
  __typename?: 'SwedishApartmentQuoteDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  type: ApartmentType
}

export type SwedishBankIdExtraInfo = {
  __typename?: 'SwedishBankIdExtraInfo'
  autoStartToken?: Maybe<Scalars['ID']>
  swedishBankIdQrCode?: Maybe<Scalars['String']>
}

export type SwedishBankIdSession = {
  __typename?: 'SwedishBankIdSession'
  autoStartToken?: Maybe<Scalars['String']>
}

export type SwedishHouseAgreement = AgreementCore & {
  __typename?: 'SwedishHouseAgreement'
  id: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  termsAndConditions?: Maybe<InsuranceTerm>
  address: Address
  numberCoInsured: Scalars['Int']
  squareMeters: Scalars['Int']
  ancillaryArea: Scalars['Int']
  yearOfConstruction: Scalars['Int']
  numberOfBathrooms: Scalars['Int']
  extraBuildings: Array<Maybe<ExtraBuilding>>
  isSubleted: Scalars['Boolean']
}

export type SwedishHouseQuoteDetails = {
  __typename?: 'SwedishHouseQuoteDetails'
  street: Scalars['String']
  zipCode: Scalars['String']
  householdSize: Scalars['Int']
  livingSpace: Scalars['Int']
  ancillarySpace: Scalars['Int']
  extraBuildings: Array<ExtraBuilding>
  numberOfBathrooms: Scalars['Int']
  yearOfConstruction: Scalars['Int']
  isSubleted: Scalars['Boolean']
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Localization = 'LOCALIZATION',
  Combined = 'COMBINED',
}

/** The contract is active today but will be terminated in the future, i.e. is active today but will not be in the future */
export type TerminatedInFutureStatus = {
  __typename?: 'TerminatedInFutureStatus'
  futureTermination?: Maybe<Scalars['LocalDate']>
  upcomingAgreementChange?: Maybe<UpcomingAgreementChange>
}

export type TerminatedReferral = {
  __typename?: 'TerminatedReferral'
  name?: Maybe<Scalars['String']>
}

/**
 * The contract has been terminated in the past, terminated on the same date as its
 * start date or has never been activated and has a termination date set
 */
export type TerminatedStatus = {
  __typename?: 'TerminatedStatus'
  termination?: Maybe<Scalars['LocalDate']>
}

/** The contract has been active and has its termination date set to today, i.e. today is the last day the contract is active */
export type TerminatedTodayStatus = {
  __typename?: 'TerminatedTodayStatus'
  today?: Maybe<Scalars['LocalDate']>
  upcomingAgreementChange?: Maybe<UpcomingAgreementChange>
}

export enum TextContentType {
  None = 'NONE',
  Url = 'URL',
  AddressCity = 'ADDRESS_CITY',
  AddressCityState = 'ADDRESS_CITY_STATE',
  AddressState = 'ADDRESS_STATE',
  CountryName = 'COUNTRY_NAME',
  CreditCardNumber = 'CREDIT_CARD_NUMBER',
  EmailAddress = 'EMAIL_ADDRESS',
  FamilyName = 'FAMILY_NAME',
  FullStreetAddress = 'FULL_STREET_ADDRESS',
  GivenName = 'GIVEN_NAME',
  JobTitle = 'JOB_TITLE',
  Location = 'LOCATION',
  MiddleName = 'MIDDLE_NAME',
  Name = 'NAME',
  NamePrefix = 'NAME_PREFIX',
  NameSuffix = 'NAME_SUFFIX',
  NickName = 'NICK_NAME',
  OrganizationName = 'ORGANIZATION_NAME',
  PostalCode = 'POSTAL_CODE',
  StreetAddressLine1 = 'STREET_ADDRESS_LINE1',
  StreetAddressLine2 = 'STREET_ADDRESS_LINE2',
  Sublocality = 'SUBLOCALITY',
  TelephoneNumber = 'TELEPHONE_NUMBER',
  Username = 'USERNAME',
  Password = 'PASSWORD',
}

export type TitleAndBulletPoints = {
  __typename?: 'TitleAndBulletPoints'
  color: HedvigColor
  icon: Icon
  title: Scalars['String']
  buttonTitle: Scalars['String']
  /** @deprecated not used */
  claimFirstMessage: Scalars['String']
  bulletPoints: Array<BulletPoints>
}

export enum TokenizationChannel {
  Android = 'ANDROID',
  Ios = 'IOS',
  Web = 'WEB',
}

export type TokenizationRequest = {
  paymentMethodDetails: Scalars['PaymentMethodDetails']
  channel: TokenizationChannel
  browserInfo?: Maybe<BrowserInfo>
  returnUrl: Scalars['String']
}

export type TokenizationResponse =
  | TokenizationResponseFinished
  | TokenizationResponseAction

export type TokenizationResponseAction = {
  __typename?: 'TokenizationResponseAction'
  action: Scalars['CheckoutPaymentsAction']
}

export type TokenizationResponseFinished = {
  __typename?: 'TokenizationResponseFinished'
  resultCode: Scalars['String']
  tokenizationResult: TokenizationResultType
}

export enum TokenizationResultType {
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Failed = 'FAILED',
}

export type Translation = Node & {
  __typename?: 'Translation'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<Translation>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  language?: Maybe<Language>
  project?: Maybe<Project>
  key?: Maybe<Key>
  text: Scalars['String']
  /** List of Translation versions */
  history: Array<Version>
}

export type TranslationDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type TranslationLanguageArgs = {
  locales?: Maybe<Array<Locale>>
}

export type TranslationKeyArgs = {
  locales?: Maybe<Array<Locale>>
}

export type TranslationHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

export type TranslationConnectInput = {
  /** Document to connect */
  where: TranslationWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<ConnectPositionInput>
}

/** A connection to a list of items. */
export type TranslationConnection = {
  __typename?: 'TranslationConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<TranslationEdge>
  aggregate: Aggregate
}

export type TranslationCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  language?: Maybe<LanguageCreateOneInlineInput>
  project?: Maybe<Project>
  key?: Maybe<KeyCreateOneInlineInput>
  text: Scalars['String']
}

export type TranslationCreateManyInlineInput = {
  /** Create and connect multiple existing Translation documents */
  create?: Maybe<Array<TranslationCreateInput>>
  /** Connect multiple existing Translation documents */
  connect?: Maybe<Array<TranslationWhereUniqueInput>>
}

export type TranslationCreateOneInlineInput = {
  /** Create and connect one Translation document */
  create?: Maybe<TranslationCreateInput>
  /** Connect one existing Translation document */
  connect?: Maybe<TranslationWhereUniqueInput>
}

/** An edge in a connection. */
export type TranslationEdge = {
  __typename?: 'TranslationEdge'
  /** The item at the end of the edge. */
  node: Translation
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type TranslationManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<TranslationWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<TranslationWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<TranslationWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  language?: Maybe<LanguageWhereInput>
  project?: Maybe<Project>
  /** All values that are not equal to given value. */
  project_not?: Maybe<Project>
  /** All values that are contained in given list. */
  project_in?: Maybe<Array<Project>>
  /** All values that are not contained in given list. */
  project_not_in?: Maybe<Array<Project>>
  key?: Maybe<KeyWhereInput>
  text?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  text_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  text_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  text_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  text_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  text_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  text_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  text_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  text_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  text_not_ends_with?: Maybe<Scalars['String']>
}

export enum TranslationOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ProjectAsc = 'project_ASC',
  ProjectDesc = 'project_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
}

export type TranslationUpdateInput = {
  language?: Maybe<LanguageUpdateOneInlineInput>
  project?: Maybe<Project>
  key?: Maybe<KeyUpdateOneInlineInput>
  text?: Maybe<Scalars['String']>
}

export type TranslationUpdateManyInlineInput = {
  /** Create and connect multiple Translation documents */
  create?: Maybe<Array<TranslationCreateInput>>
  /** Connect multiple existing Translation documents */
  connect?: Maybe<Array<TranslationConnectInput>>
  /** Override currently-connected documents with multiple existing Translation documents */
  set?: Maybe<Array<TranslationWhereUniqueInput>>
  /** Update multiple Translation documents */
  update?: Maybe<Array<TranslationUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Translation documents */
  upsert?: Maybe<Array<TranslationUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Translation documents */
  disconnect?: Maybe<Array<TranslationWhereUniqueInput>>
  /** Delete multiple Translation documents */
  delete?: Maybe<Array<TranslationWhereUniqueInput>>
}

export type TranslationUpdateManyInput = {
  project?: Maybe<Project>
  text?: Maybe<Scalars['String']>
}

export type TranslationUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: TranslationWhereInput
  /** Update many input */
  data: TranslationUpdateManyInput
}

export type TranslationUpdateOneInlineInput = {
  /** Create and connect one Translation document */
  create?: Maybe<TranslationCreateInput>
  /** Update single Translation document */
  update?: Maybe<TranslationUpdateWithNestedWhereUniqueInput>
  /** Upsert single Translation document */
  upsert?: Maybe<TranslationUpsertWithNestedWhereUniqueInput>
  /** Connect existing Translation document */
  connect?: Maybe<TranslationWhereUniqueInput>
  /** Disconnect currently connected Translation document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Translation document */
  delete?: Maybe<Scalars['Boolean']>
}

export type TranslationUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: TranslationWhereUniqueInput
  /** Document to update */
  data: TranslationUpdateInput
}

export type TranslationUpsertInput = {
  /** Create document if it didn't exist */
  create: TranslationCreateInput
  /** Update document if it exists */
  update: TranslationUpdateInput
}

export type TranslationUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: TranslationWhereUniqueInput
  /** Upsert data */
  data: TranslationUpsertInput
}

/** Identifies documents */
export type TranslationWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<TranslationWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<TranslationWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<TranslationWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  language?: Maybe<LanguageWhereInput>
  project?: Maybe<Project>
  /** All values that are not equal to given value. */
  project_not?: Maybe<Project>
  /** All values that are contained in given list. */
  project_in?: Maybe<Array<Project>>
  /** All values that are not contained in given list. */
  project_not_in?: Maybe<Array<Project>>
  key?: Maybe<KeyWhereInput>
  text?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  text_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  text_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  text_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  text_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  text_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  text_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  text_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  text_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  text_not_ends_with?: Maybe<Scalars['String']>
}

/** References Translation record uniquely */
export type TranslationWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type TriggerClaimChatInput = {
  claimTypeId?: Maybe<Scalars['ID']>
}

export enum TypeOfContract {
  SeHouse = 'SE_HOUSE',
  SeApartmentBrf = 'SE_APARTMENT_BRF',
  SeApartmentRent = 'SE_APARTMENT_RENT',
  SeApartmentStudentBrf = 'SE_APARTMENT_STUDENT_BRF',
  SeApartmentStudentRent = 'SE_APARTMENT_STUDENT_RENT',
  NoHomeContentOwn = 'NO_HOME_CONTENT_OWN',
  NoHomeContentRent = 'NO_HOME_CONTENT_RENT',
  NoHomeContentYouthOwn = 'NO_HOME_CONTENT_YOUTH_OWN',
  NoHomeContentYouthRent = 'NO_HOME_CONTENT_YOUTH_RENT',
  NoTravel = 'NO_TRAVEL',
  NoTravelYouth = 'NO_TRAVEL_YOUTH',
  DkHomeContentOwn = 'DK_HOME_CONTENT_OWN',
  DkHomeContentRent = 'DK_HOME_CONTENT_RENT',
  DkHomeContentStudentOwn = 'DK_HOME_CONTENT_STUDENT_OWN',
  DkHomeContentStudentRent = 'DK_HOME_CONTENT_STUDENT_RENT',
  DkAccident = 'DK_ACCIDENT',
  DkAccidentStudent = 'DK_ACCIDENT_STUDENT',
  DkTravel = 'DK_TRAVEL',
  DkTravelStudent = 'DK_TRAVEL_STUDENT',
}

export type UnderwritingLimit = {
  __typename?: 'UnderwritingLimit'
  /** @deprecated Use code */
  description: Scalars['String']
  code: Scalars['String']
}

export type UnderwritingLimitsHit = {
  __typename?: 'UnderwritingLimitsHit'
  limits: Array<UnderwritingLimit>
}

export type UnknownQuoteDetails = {
  __typename?: 'UnknownQuoteDetails'
  unknown?: Maybe<Scalars['String']>
}

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>
}

/** If present, the upcomingAgreementChange contains info regarding the agreement that will succeed the current one */
export type UpcomingAgreementChange = {
  __typename?: 'UpcomingAgreementChange'
  newAgreement: Agreement
}

export type UpcomingRenewal = {
  __typename?: 'UpcomingRenewal'
  renewalDate: Scalars['LocalDate']
  draftCertificateUrl: Scalars['String']
}

export type UpdateReferralCampaignCodeResult =
  | SuccessfullyUpdatedCode
  | CodeAlreadyTaken
  | CodeTooLong
  | CodeTooShort
  | ExceededMaximumUpdates

export type UserFeature = Node & {
  __typename?: 'UserFeature'
  /** System stage field */
  stage: Stage
  /** Get the document in other stages */
  documentInStages: Array<UserFeature>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  feature?: Maybe<Feature>
  memberId?: Maybe<Scalars['String']>
  /** List of UserFeature versions */
  history: Array<Version>
}

export type UserFeatureDocumentInStagesArgs = {
  stages?: Array<Stage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type UserFeatureHistoryArgs = {
  limit?: Scalars['Int']
  skip?: Scalars['Int']
  stageOverride?: Maybe<Stage>
}

/** A connection to a list of items. */
export type UserFeatureConnection = {
  __typename?: 'UserFeatureConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges: Array<UserFeatureEdge>
  aggregate: Aggregate
}

export type UserFeatureCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  feature?: Maybe<Feature>
  memberId?: Maybe<Scalars['String']>
}

/** An edge in a connection. */
export type UserFeatureEdge = {
  __typename?: 'UserFeatureEdge'
  /** The item at the end of the edge. */
  node: UserFeature
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
export type UserFeatureManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<UserFeatureWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<UserFeatureWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<UserFeatureWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  feature?: Maybe<Feature>
  /** All values that are not equal to given value. */
  feature_not?: Maybe<Feature>
  /** All values that are contained in given list. */
  feature_in?: Maybe<Array<Feature>>
  /** All values that are not contained in given list. */
  feature_not_in?: Maybe<Array<Feature>>
  memberId?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  memberId_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  memberId_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  memberId_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  memberId_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  memberId_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  memberId_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  memberId_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  memberId_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  memberId_not_ends_with?: Maybe<Scalars['String']>
}

export enum UserFeatureOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  FeatureAsc = 'feature_ASC',
  FeatureDesc = 'feature_DESC',
  MemberIdAsc = 'memberId_ASC',
  MemberIdDesc = 'memberId_DESC',
}

export type UserFeatureUpdateInput = {
  feature?: Maybe<Feature>
  memberId?: Maybe<Scalars['String']>
}

export type UserFeatureUpdateManyInput = {
  feature?: Maybe<Feature>
  memberId?: Maybe<Scalars['String']>
}

export type UserFeatureUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: UserFeatureWhereInput
  /** Update many input */
  data: UserFeatureUpdateManyInput
}

export type UserFeatureUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: UserFeatureWhereUniqueInput
  /** Document to update */
  data: UserFeatureUpdateInput
}

export type UserFeatureUpsertInput = {
  /** Create document if it didn't exist */
  create: UserFeatureCreateInput
  /** Update document if it exists */
  update: UserFeatureUpdateInput
}

export type UserFeatureUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: UserFeatureWhereUniqueInput
  /** Upsert data */
  data: UserFeatureUpsertInput
}

/** Identifies documents */
export type UserFeatureWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<UserFeatureWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<UserFeatureWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<UserFeatureWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  feature?: Maybe<Feature>
  /** All values that are not equal to given value. */
  feature_not?: Maybe<Feature>
  /** All values that are contained in given list. */
  feature_in?: Maybe<Array<Feature>>
  /** All values that are not contained in given list. */
  feature_not_in?: Maybe<Array<Feature>>
  memberId?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  memberId_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  memberId_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  memberId_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  memberId_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  memberId_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  memberId_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  memberId_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  memberId_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  memberId_not_ends_with?: Maybe<Scalars['String']>
}

/** References UserFeature record uniquely */
export type UserFeatureWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum UserInterfaceStyle {
  Dark = 'Dark',
  Light = 'Light',
}

/** System User Kind */
export enum UserKind {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK',
}

export type Version = {
  __typename?: 'Version'
  id: Scalars['ID']
  stage: Stage
  revision: Scalars['Int']
  createdAt: Scalars['DateTime']
}

export type VersionWhereInput = {
  id: Scalars['ID']
  stage: Stage
  revision: Scalars['Int']
}

export type VisibleNoDiscount = {
  __typename?: 'VisibleNoDiscount'
  _?: Maybe<Scalars['Boolean']>
}

/** A page in the `Welcome`-screen in the app */
export type Welcome = {
  __typename?: 'Welcome'
  /** Illustration shown for the page */
  illustration: Icon
  /** Text for the title of the page */
  title: Scalars['String']
  /** Text for the paragraph shown below the title */
  paragraph: Scalars['String']
}

export type AvailablePaymentMethodsQueryVariables = Exact<{
  [key: string]: never
}>

export type AvailablePaymentMethodsQuery = { __typename?: 'Query' } & {
  availablePaymentMethods: {
    __typename?: 'AvailablePaymentMethodsResponse'
  } & Pick<AvailablePaymentMethodsResponse, 'paymentMethodsResponse'>
}

export type ContractsQueryVariables = Exact<{ [key: string]: never }>

export type ContractsQuery = { __typename?: 'Query' } & {
  contracts: Array<
    { __typename?: 'Contract' } & Pick<Contract, 'id' | 'typeOfContract'>
  >
}

export type CreateDanishHomeAccidentQuoteMutationVariables = Exact<{
  homeInput: CreateQuoteInput
  accidentInput: CreateQuoteInput
}>

export type CreateDanishHomeAccidentQuoteMutation = {
  __typename?: 'Mutation'
} & {
  createHomeContents:
    | ({ __typename: 'CompleteQuote' } & Pick<CompleteQuote, 'id'> & {
          quoteDetails:
            | { __typename: 'SwedishApartmentQuoteDetails' }
            | { __typename: 'SwedishHouseQuoteDetails' }
            | { __typename: 'NorwegianHomeContentsDetails' }
            | { __typename: 'NorwegianTravelDetails' }
            | { __typename: 'DanishHomeContentsDetails' }
            | { __typename: 'DanishAccidentDetails' }
            | { __typename: 'DanishTravelDetails' }
        })
    | { __typename: 'UnderwritingLimitsHit' }
  createAccident:
    | ({ __typename: 'CompleteQuote' } & Pick<CompleteQuote, 'id'> & {
          quoteDetails:
            | { __typename: 'SwedishApartmentQuoteDetails' }
            | { __typename: 'SwedishHouseQuoteDetails' }
            | { __typename: 'NorwegianHomeContentsDetails' }
            | { __typename: 'NorwegianTravelDetails' }
            | { __typename: 'DanishHomeContentsDetails' }
            | { __typename: 'DanishAccidentDetails' }
            | { __typename: 'DanishTravelDetails' }
        })
    | { __typename: 'UnderwritingLimitsHit' }
}

export type CreateDanishHomeAccidentTravelQuoteMutationVariables = Exact<{
  homeInput: CreateQuoteInput
  accidentInput: CreateQuoteInput
  travelInput: CreateQuoteInput
}>

export type CreateDanishHomeAccidentTravelQuoteMutation = {
  __typename?: 'Mutation'
} & {
  createHomeContents:
    | ({ __typename: 'CompleteQuote' } & Pick<CompleteQuote, 'id'> & {
          quoteDetails:
            | { __typename: 'SwedishApartmentQuoteDetails' }
            | { __typename: 'SwedishHouseQuoteDetails' }
            | { __typename: 'NorwegianHomeContentsDetails' }
            | { __typename: 'NorwegianTravelDetails' }
            | { __typename: 'DanishHomeContentsDetails' }
            | { __typename: 'DanishAccidentDetails' }
            | { __typename: 'DanishTravelDetails' }
        })
    | { __typename: 'UnderwritingLimitsHit' }
  createAccident:
    | ({ __typename: 'CompleteQuote' } & Pick<CompleteQuote, 'id'> & {
          quoteDetails:
            | { __typename: 'SwedishApartmentQuoteDetails' }
            | { __typename: 'SwedishHouseQuoteDetails' }
            | { __typename: 'NorwegianHomeContentsDetails' }
            | { __typename: 'NorwegianTravelDetails' }
            | { __typename: 'DanishHomeContentsDetails' }
            | { __typename: 'DanishAccidentDetails' }
            | { __typename: 'DanishTravelDetails' }
        })
    | { __typename: 'UnderwritingLimitsHit' }
  createTravel:
    | ({ __typename: 'CompleteQuote' } & Pick<CompleteQuote, 'id'> & {
          quoteDetails:
            | { __typename: 'SwedishApartmentQuoteDetails' }
            | { __typename: 'SwedishHouseQuoteDetails' }
            | { __typename: 'NorwegianHomeContentsDetails' }
            | { __typename: 'NorwegianTravelDetails' }
            | { __typename: 'DanishHomeContentsDetails' }
            | { __typename: 'DanishAccidentDetails' }
            | { __typename: 'DanishTravelDetails' }
        })
    | { __typename: 'UnderwritingLimitsHit' }
}

export type EditQuoteMutationVariables = Exact<{
  input: EditQuoteInput
}>

export type EditQuoteMutation = { __typename?: 'Mutation' } & {
  editQuote:
    | ({ __typename?: 'CompleteQuote' } & Pick<CompleteQuote, 'id'>)
    | ({ __typename?: 'UnderwritingLimitsHit' } & {
        limits: Array<
          { __typename?: 'UnderwritingLimit' } & Pick<
            UnderwritingLimit,
            'description' | 'code'
          >
        >
      })
}

export type ExchangeTokenMutationVariables = Exact<{
  exchangeToken: Scalars['String']
}>

export type ExchangeTokenMutation = { __typename?: 'Mutation' } & {
  exchangeToken:
    | ({ __typename: 'ExchangeTokenSuccessResponse' } & Pick<
        ExchangeTokenSuccessResponse,
        'token'
      >)
    | ({ __typename: 'ExchangeTokenExpiredResponse' } & Pick<
        ExchangeTokenExpiredResponse,
        '_'
      >)
    | ({ __typename: 'ExchangeTokenInvalidResponse' } & Pick<
        ExchangeTokenInvalidResponse,
        '_'
      >)
}

export type ExternalInsuranceDataQueryVariables = Exact<{
  reference: Scalars['ID']
}>

export type ExternalInsuranceDataQuery = { __typename?: 'Query' } & {
  externalInsuranceProvider?: Maybe<
    { __typename?: 'ExternalInsuranceProvider' } & {
      dataCollection: Array<
        { __typename?: 'InsuranceDataCollection' } & Pick<
          InsuranceDataCollection,
          'renewalDate' | 'insuranceProvider'
        > & {
            monthlyPremium?: Maybe<
              { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'currency' | 'amount'
              >
            >
          }
      >
    }
  >
}

export type ExternalInsuranceDataStatusSubscriptionVariables = Exact<{
  reference: Scalars['ID']
}>

export type ExternalInsuranceDataStatusSubscription = {
  __typename?: 'Subscription'
} & {
  dataCollectionStatus?: Maybe<
    { __typename?: 'DataCollectingStatusResponse' } & Pick<
      DataCollectingStatusResponse,
      'status'
    >
  >
}

export type FaqsQueryVariables = Exact<{
  language: Scalars['String']
}>

export type FaqsQuery = { __typename?: 'Query' } & {
  languages: Array<
    { __typename?: 'Language' } & {
      faqs: Array<
        { __typename?: 'Faq' } & Pick<Faq, 'id' | 'headline' | 'body'>
      >
    }
  >
}

export type MemberQueryVariables = Exact<{ [key: string]: never }>

export type MemberQuery = { __typename?: 'Query' } & {
  member: { __typename?: 'Member' } & Pick<
    Member,
    'id' | 'firstName' | 'lastName'
  >
}

export type MemberOfferQueryVariables = Exact<{ [key: string]: never }>

export type MemberOfferQuery = { __typename?: 'Query' } & {
  lastQuoteOfMember:
    | ({ __typename?: 'CompleteQuote' } & Pick<
        CompleteQuote,
        | 'id'
        | 'dataCollectionId'
        | 'ssn'
        | 'email'
        | 'firstName'
        | 'lastName'
        | 'startDate'
      > & {
          currentInsurer?: Maybe<
            { __typename?: 'CurrentInsurer' } & Pick<
              CurrentInsurer,
              'id' | 'displayName' | 'switchable'
            >
          >
          insuranceCost: { __typename?: 'InsuranceCost' } & Pick<
            InsuranceCost,
            'freeUntil'
          > & {
              monthlyDiscount: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
              monthlyGross: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
              monthlyNet: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
            }
          details:
            | ({ __typename?: 'CompleteApartmentQuoteDetails' } & Pick<
                CompleteApartmentQuoteDetails,
                'street' | 'zipCode' | 'householdSize' | 'livingSpace' | 'type'
              >)
            | ({ __typename?: 'CompleteHouseQuoteDetails' } & Pick<
                CompleteHouseQuoteDetails,
                | 'street'
                | 'zipCode'
                | 'householdSize'
                | 'livingSpace'
                | 'ancillarySpace'
                | 'numberOfBathrooms'
                | 'yearOfConstruction'
                | 'isSubleted'
              > & {
                  extraBuildings: Array<
                    | ({ __typename?: 'ExtraBuildingGarage' } & Pick<
                        ExtraBuildingGarage,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingCarport' } & Pick<
                        ExtraBuildingCarport,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingShed' } & Pick<
                        ExtraBuildingShed,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingStorehouse' } & Pick<
                        ExtraBuildingStorehouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingFriggebod' } & Pick<
                        ExtraBuildingFriggebod,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingAttefall' } & Pick<
                        ExtraBuildingAttefall,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingOuthouse' } & Pick<
                        ExtraBuildingOuthouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGuesthouse' } & Pick<
                        ExtraBuildingGuesthouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGazebo' } & Pick<
                        ExtraBuildingGazebo,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGreenhouse' } & Pick<
                        ExtraBuildingGreenhouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingSauna' } & Pick<
                        ExtraBuildingSauna,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingBarn' } & Pick<
                        ExtraBuildingBarn,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingBoathouse' } & Pick<
                        ExtraBuildingBoathouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingOther' } & Pick<
                        ExtraBuildingOther,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                  >
                })
            | { __typename?: 'UnknownQuoteDetails' }
        })
    | ({ __typename?: 'IncompleteQuote' } & Pick<IncompleteQuote, 'id'>)
  redeemedCampaigns: Array<
    { __typename?: 'Campaign' } & Pick<Campaign, 'code'> & {
        incentive?: Maybe<
          | ({ __typename?: 'MonthlyCostDeduction' } & {
              amount?: Maybe<
                { __typename?: 'MonetaryAmountV2' } & Pick<
                  MonetaryAmountV2,
                  'amount' | 'currency'
                >
              >
            })
          | ({ __typename?: 'FreeMonths' } & Pick<FreeMonths, 'quantity'>)
          | { __typename?: 'NoDiscount' }
          | { __typename?: 'VisibleNoDiscount' }
          | ({ __typename?: 'PercentageDiscountMonths' } & Pick<
              PercentageDiscountMonths,
              'percentageDiscount'
            > & { quantityMonths: PercentageDiscountMonths['quantity'] })
          | { __typename?: 'IndefinitePercentageDiscount' }
        >
        owner?: Maybe<
          { __typename?: 'CampaignOwner' } & Pick<CampaignOwner, 'displayName'>
        >
      }
  >
  member: { __typename?: 'Member' } & Pick<
    Member,
    'id' | 'firstName' | 'lastName' | 'email'
  >
}

export type NorwegianBankIdAuthMutationVariables = Exact<{
  personalNumber: Scalars['String']
}>

export type NorwegianBankIdAuthMutation = { __typename?: 'Mutation' } & {
  norwegianBankIdAuth: { __typename?: 'NorwegianBankIdAuthResponse' } & Pick<
    NorwegianBankIdAuthResponse,
    'redirectUrl'
  >
}

export type QuoteQueryVariables = Exact<{
  id: Scalars['ID']
  perilsLocale: Locale
}>

export type QuoteQuery = { __typename?: 'Query' } & {
  quote:
    | ({ __typename?: 'CompleteQuote' } & Pick<
        CompleteQuote,
        | 'id'
        | 'dataCollectionId'
        | 'ssn'
        | 'email'
        | 'firstName'
        | 'lastName'
        | 'startDate'
      > & {
          currentInsurer?: Maybe<
            { __typename?: 'CurrentInsurer' } & Pick<
              CurrentInsurer,
              'id' | 'displayName' | 'switchable'
            >
          >
          insuranceCost: { __typename?: 'InsuranceCost' } & Pick<
            InsuranceCost,
            'freeUntil'
          > & {
              monthlyDiscount: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
              monthlyGross: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
              monthlyNet: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
            }
          perils: Array<
            { __typename?: 'PerilV2' } & Pick<
              PerilV2,
              'title' | 'description' | 'covered' | 'exceptions' | 'info'
            > & {
                icon: { __typename?: 'Icon' } & {
                  variants: { __typename?: 'IconVariants' } & {
                    light: { __typename?: 'IconVariant' } & Pick<
                      IconVariant,
                      'svgUrl'
                    >
                  }
                }
              }
          >
          quoteDetails:
            | ({ __typename?: 'SwedishApartmentQuoteDetails' } & Pick<
                SwedishApartmentQuoteDetails,
                'street' | 'zipCode' | 'householdSize' | 'livingSpace' | 'type'
              >)
            | ({ __typename?: 'SwedishHouseQuoteDetails' } & Pick<
                SwedishHouseQuoteDetails,
                | 'street'
                | 'zipCode'
                | 'householdSize'
                | 'livingSpace'
                | 'ancillarySpace'
                | 'numberOfBathrooms'
                | 'yearOfConstruction'
                | 'isSubleted'
              > & {
                  extraBuildings: Array<
                    | ({ __typename?: 'ExtraBuildingGarage' } & Pick<
                        ExtraBuildingGarage,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingCarport' } & Pick<
                        ExtraBuildingCarport,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingShed' } & Pick<
                        ExtraBuildingShed,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingStorehouse' } & Pick<
                        ExtraBuildingStorehouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingFriggebod' } & Pick<
                        ExtraBuildingFriggebod,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingAttefall' } & Pick<
                        ExtraBuildingAttefall,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingOuthouse' } & Pick<
                        ExtraBuildingOuthouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGuesthouse' } & Pick<
                        ExtraBuildingGuesthouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGazebo' } & Pick<
                        ExtraBuildingGazebo,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGreenhouse' } & Pick<
                        ExtraBuildingGreenhouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingSauna' } & Pick<
                        ExtraBuildingSauna,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingBarn' } & Pick<
                        ExtraBuildingBarn,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingBoathouse' } & Pick<
                        ExtraBuildingBoathouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingOther' } & Pick<
                        ExtraBuildingOther,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                  >
                })
            | ({ __typename?: 'NorwegianHomeContentsDetails' } & Pick<
                NorwegianHomeContentsDetails,
                'coInsured' | 'livingSpace' | 'street' | 'zipCode' | 'isYouth'
              > & { norwegianHomeType: NorwegianHomeContentsDetails['type'] })
            | ({ __typename?: 'NorwegianTravelDetails' } & Pick<
                NorwegianTravelDetails,
                'coInsured' | 'isYouth'
              >)
            | ({ __typename?: 'DanishHomeContentsDetails' } & Pick<
                DanishHomeContentsDetails,
                'coInsured' | 'livingSpace' | 'street' | 'zipCode' | 'isStudent'
              > & { danishHomeType: DanishHomeContentsDetails['type'] })
            | { __typename?: 'DanishAccidentDetails' }
            | { __typename?: 'DanishTravelDetails' }
        })
    | ({ __typename?: 'IncompleteQuote' } & Pick<IncompleteQuote, 'id'>)
}

export type QuoteBundleQueryVariables = Exact<{
  input: QuoteBundleInput
  locale: Locale
}>

export type QuoteBundleQuery = { __typename?: 'Query' } & {
  quoteBundle: { __typename?: 'QuoteBundle' } & {
    quotes: Array<
      { __typename?: 'BundledQuote' } & Pick<
        BundledQuote,
        | 'id'
        | 'dataCollectionId'
        | 'firstName'
        | 'lastName'
        | 'ssn'
        | 'birthDate'
        | 'startDate'
        | 'expiresAt'
        | 'email'
        | 'typeOfContract'
      > & {
          currentInsurer?: Maybe<
            { __typename?: 'CurrentInsurer' } & Pick<
              CurrentInsurer,
              'id' | 'displayName' | 'switchable'
            >
          >
          price: { __typename?: 'MonetaryAmountV2' } & Pick<
            MonetaryAmountV2,
            'amount' | 'currency'
          >
          perils: Array<
            { __typename?: 'PerilV2' } & Pick<
              PerilV2,
              'title' | 'description' | 'covered' | 'exceptions' | 'info'
            > & {
                icon: { __typename?: 'Icon' } & {
                  variants: { __typename?: 'IconVariants' } & {
                    light: { __typename?: 'IconVariant' } & Pick<
                      IconVariant,
                      'svgUrl'
                    >
                  }
                }
              }
          >
          insurableLimits: Array<
            { __typename?: 'InsurableLimit' } & Pick<
              InsurableLimit,
              'label' | 'limit' | 'description' | 'type'
            >
          >
          insuranceTerms: Array<
            { __typename?: 'InsuranceTerm' } & Pick<
              InsuranceTerm,
              'displayName' | 'url' | 'type'
            >
          >
          quoteDetails:
            | ({ __typename?: 'SwedishApartmentQuoteDetails' } & Pick<
                SwedishApartmentQuoteDetails,
                'street' | 'zipCode' | 'householdSize' | 'livingSpace' | 'type'
              >)
            | ({ __typename?: 'SwedishHouseQuoteDetails' } & Pick<
                SwedishHouseQuoteDetails,
                | 'street'
                | 'zipCode'
                | 'householdSize'
                | 'livingSpace'
                | 'ancillarySpace'
                | 'numberOfBathrooms'
                | 'yearOfConstruction'
                | 'isSubleted'
              > & {
                  extraBuildings: Array<
                    | ({ __typename?: 'ExtraBuildingGarage' } & Pick<
                        ExtraBuildingGarage,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingCarport' } & Pick<
                        ExtraBuildingCarport,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingShed' } & Pick<
                        ExtraBuildingShed,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingStorehouse' } & Pick<
                        ExtraBuildingStorehouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingFriggebod' } & Pick<
                        ExtraBuildingFriggebod,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingAttefall' } & Pick<
                        ExtraBuildingAttefall,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingOuthouse' } & Pick<
                        ExtraBuildingOuthouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGuesthouse' } & Pick<
                        ExtraBuildingGuesthouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGazebo' } & Pick<
                        ExtraBuildingGazebo,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingGreenhouse' } & Pick<
                        ExtraBuildingGreenhouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingSauna' } & Pick<
                        ExtraBuildingSauna,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingBarn' } & Pick<
                        ExtraBuildingBarn,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingBoathouse' } & Pick<
                        ExtraBuildingBoathouse,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                    | ({ __typename?: 'ExtraBuildingOther' } & Pick<
                        ExtraBuildingOther,
                        'area' | 'displayName' | 'hasWaterConnected'
                      >)
                  >
                })
            | ({ __typename?: 'NorwegianHomeContentsDetails' } & Pick<
                NorwegianHomeContentsDetails,
                'coInsured' | 'livingSpace' | 'street' | 'zipCode' | 'isYouth'
              > & { norwegianHomeType: NorwegianHomeContentsDetails['type'] })
            | ({ __typename?: 'NorwegianTravelDetails' } & Pick<
                NorwegianTravelDetails,
                'coInsured' | 'isYouth'
              >)
            | ({ __typename?: 'DanishHomeContentsDetails' } & Pick<
                DanishHomeContentsDetails,
                'street' | 'zipCode' | 'livingSpace' | 'coInsured' | 'isStudent'
              > & { danishHomeType: DanishHomeContentsDetails['type'] })
            | ({ __typename?: 'DanishAccidentDetails' } & Pick<
                DanishAccidentDetails,
                'street' | 'zipCode' | 'coInsured' | 'isStudent'
              >)
            | ({ __typename?: 'DanishTravelDetails' } & Pick<
                DanishTravelDetails,
                'street' | 'zipCode' | 'coInsured' | 'isStudent'
              >)
        }
    >
    bundleCost: { __typename?: 'InsuranceCost' } & Pick<
      InsuranceCost,
      'freeUntil'
    > & {
        monthlyDiscount: { __typename?: 'MonetaryAmountV2' } & Pick<
          MonetaryAmountV2,
          'amount' | 'currency'
        >
        monthlyGross: { __typename?: 'MonetaryAmountV2' } & Pick<
          MonetaryAmountV2,
          'amount' | 'currency'
        >
        monthlyNet: { __typename?: 'MonetaryAmountV2' } & Pick<
          MonetaryAmountV2,
          'amount' | 'currency'
        >
      }
  }
}

export type RedeemCodeMutationVariables = Exact<{
  code: Scalars['String']
}>

export type RedeemCodeMutation = { __typename?: 'Mutation' } & {
  redeemCode: { __typename?: 'RedemedCodeResult' } & {
    campaigns: Array<
      { __typename?: 'Campaign' } & {
        incentive?: Maybe<
          | ({ __typename?: 'MonthlyCostDeduction' } & {
              amount?: Maybe<
                { __typename?: 'MonetaryAmountV2' } & Pick<
                  MonetaryAmountV2,
                  'amount' | 'currency'
                >
              >
            })
          | ({ __typename?: 'FreeMonths' } & Pick<FreeMonths, 'quantity'>)
          | { __typename?: 'NoDiscount' }
          | { __typename?: 'VisibleNoDiscount' }
          | { __typename?: 'PercentageDiscountMonths' }
          | { __typename?: 'IndefinitePercentageDiscount' }
        >
        owner?: Maybe<
          { __typename?: 'CampaignOwner' } & Pick<
            CampaignOwner,
            'id' | 'displayName'
          >
        >
      }
    >
    cost: { __typename?: 'InsuranceCost' } & {
      monthlyGross: { __typename?: 'MonetaryAmountV2' } & Pick<
        MonetaryAmountV2,
        'amount' | 'currency'
      >
      monthlyNet: { __typename?: 'MonetaryAmountV2' } & Pick<
        MonetaryAmountV2,
        'amount' | 'currency'
      >
    }
  }
}

export type RedeemCodeV2MutationVariables = Exact<{
  code: Scalars['String']
}>

export type RedeemCodeV2Mutation = { __typename?: 'Mutation' } & {
  redeemCodeV2:
    | ({ __typename?: 'SuccessfulRedeemResult' } & {
        campaigns: Array<
          { __typename?: 'Campaign' } & {
            incentive?: Maybe<
              | ({ __typename?: 'MonthlyCostDeduction' } & {
                  amount?: Maybe<
                    { __typename?: 'MonetaryAmountV2' } & Pick<
                      MonetaryAmountV2,
                      'amount' | 'currency'
                    >
                  >
                })
              | { __typename?: 'FreeMonths' }
              | { __typename?: 'NoDiscount' }
              | { __typename?: 'VisibleNoDiscount' }
              | { __typename?: 'PercentageDiscountMonths' }
              | { __typename?: 'IndefinitePercentageDiscount' }
            >
            owner?: Maybe<
              { __typename?: 'CampaignOwner' } & Pick<
                CampaignOwner,
                'id' | 'displayName'
              >
            >
          }
        >
      })
    | { __typename?: 'CannotRedeemOwnCampaign' }
    | { __typename?: 'CampaignCannotBeCombinedWithExisting' }
    | { __typename?: 'CannotRedeemEmptyCode' }
    | { __typename?: 'CampaignHasExpired' }
    | { __typename?: 'MemberIsNotEligibleForCampaign' }
    | { __typename?: 'CampaignDoesNotExist' }
    | { __typename?: 'CannotRedeemCampaignFromDifferentMarket' }
}

export type RedeemedCampaignsQueryVariables = Exact<{ [key: string]: never }>

export type RedeemedCampaignsQuery = { __typename?: 'Query' } & {
  redeemedCampaigns: Array<
    { __typename?: 'Campaign' } & Pick<Campaign, 'code'> & {
        incentive?: Maybe<
          | ({ __typename?: 'MonthlyCostDeduction' } & {
              amount?: Maybe<
                { __typename?: 'MonetaryAmountV2' } & Pick<
                  MonetaryAmountV2,
                  'amount' | 'currency'
                >
              >
            })
          | ({ __typename?: 'FreeMonths' } & Pick<FreeMonths, 'quantity'>)
          | { __typename: 'NoDiscount' }
          | { __typename?: 'VisibleNoDiscount' }
          | ({ __typename?: 'PercentageDiscountMonths' } & Pick<
              PercentageDiscountMonths,
              'percentageDiscount'
            > & { quantityMonths: PercentageDiscountMonths['quantity'] })
          | ({ __typename: 'IndefinitePercentageDiscount' } & {
              indefinitiePercentageDiscount: IndefinitePercentageDiscount['percentageDiscount']
            })
        >
        owner?: Maybe<
          { __typename?: 'CampaignOwner' } & Pick<CampaignOwner, 'displayName'>
        >
      }
  >
}

export type ReferrerNameQueryVariables = Exact<{ [key: string]: never }>

export type ReferrerNameQuery = { __typename?: 'Query' } & {
  referralInformation: { __typename?: 'Referrals' } & {
    referredBy?: Maybe<
      | ({ __typename?: 'ActiveReferral' } & Pick<ActiveReferral, 'name'> & {
            discount: { __typename?: 'MonetaryAmountV2' } & Pick<
              MonetaryAmountV2,
              'amount' | 'currency'
            >
          })
      | ({ __typename?: 'InProgressReferral' } & Pick<
          InProgressReferral,
          'name'
        >)
      | { __typename?: 'AcceptedReferral' }
      | { __typename?: 'TerminatedReferral' }
    >
  }
}

export type RemoveDiscountCodeMutationVariables = Exact<{
  [key: string]: never
}>

export type RemoveDiscountCodeMutation = { __typename?: 'Mutation' } & {
  removeDiscountCode: { __typename: 'RedemedCodeResult' }
}

export type RemoveStartDateMutationVariables = Exact<{
  quoteId: Scalars['ID']
}>

export type RemoveStartDateMutation = { __typename?: 'Mutation' } & {
  removeStartDate:
    | ({ __typename?: 'CompleteQuote' } & Pick<CompleteQuote, 'startDate'>)
    | { __typename?: 'UnderwritingLimitsHit' }
}

export type SignMethodForQuotesQueryVariables = Exact<{
  input: Array<Scalars['ID']>
}>

export type SignMethodForQuotesQuery = { __typename?: 'Query' } & Pick<
  Query,
  'signMethodForQuotes'
>

export type SignQuotesMutationVariables = Exact<{
  quoteIds: Array<Scalars['ID']>
  successUrl?: Maybe<Scalars['String']>
  failUrl?: Maybe<Scalars['String']>
}>

export type SignQuotesMutation = { __typename?: 'Mutation' } & {
  signQuotes:
    | ({ __typename: 'SwedishBankIdSession' } & Pick<
        SwedishBankIdSession,
        'autoStartToken'
      >)
    | ({ __typename: 'NorwegianBankIdSession' } & Pick<
        NorwegianBankIdSession,
        'redirectUrl'
      >)
    | ({ __typename: 'DanishBankIdSession' } & Pick<
        DanishBankIdSession,
        'redirectUrl'
      >)
    | { __typename: 'SimpleSignSession' }
    | ({ __typename: 'FailedToStartSign' } & Pick<
        FailedToStartSign,
        'errorMessage'
      >)
}

export type SignStatusQueryVariables = Exact<{ [key: string]: never }>

export type SignStatusQuery = { __typename?: 'Query' } & {
  signStatus?: Maybe<
    { __typename?: 'SignStatus' } & Pick<SignStatus, 'signState'> & {
        collectStatus?: Maybe<
          { __typename?: 'CollectStatus' } & Pick<
            CollectStatus,
            'status' | 'code'
          >
        >
      }
  >
}

export type SignStatusListenerSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type SignStatusListenerSubscription = { __typename?: 'Subscription' } & {
  signStatus?: Maybe<
    { __typename?: 'SignEvent' } & {
      status?: Maybe<
        { __typename?: 'SignStatus' } & Pick<SignStatus, 'signState'> & {
            collectStatus?: Maybe<
              { __typename?: 'CollectStatus' } & Pick<
                CollectStatus,
                'status' | 'code'
              >
            >
          }
      >
    }
  >
}

export type StartDateMutationVariables = Exact<{
  quoteId: Scalars['ID']
  date?: Maybe<Scalars['LocalDate']>
}>

export type StartDateMutation = { __typename?: 'Mutation' } & {
  editQuote:
    | ({ __typename?: 'CompleteQuote' } & Pick<CompleteQuote, 'startDate'>)
    | { __typename?: 'UnderwritingLimitsHit' }
}

export type SubmitAdditionalPaymentDetialsMutationVariables = Exact<{
  request: AdditionalPaymentsDetailsRequest
}>

export type SubmitAdditionalPaymentDetialsMutation = {
  __typename?: 'Mutation'
} & {
  submitAdditionalPaymentDetails:
    | ({ __typename?: 'AdditionalPaymentsDetailsResponseFinished' } & Pick<
        AdditionalPaymentsDetailsResponseFinished,
        'resultCode'
      >)
    | ({ __typename?: 'AdditionalPaymentsDetailsResponseAction' } & Pick<
        AdditionalPaymentsDetailsResponseAction,
        'action'
      >)
}

export type TokenizePaymentDetailsMutationVariables = Exact<{
  paymentsRequest: TokenizationRequest
}>

export type TokenizePaymentDetailsMutation = { __typename?: 'Mutation' } & {
  tokenizePaymentDetails?: Maybe<
    | ({ __typename?: 'TokenizationResponseFinished' } & Pick<
        TokenizationResponseFinished,
        'resultCode'
      >)
    | ({ __typename?: 'TokenizationResponseAction' } & Pick<
        TokenizationResponseAction,
        'action'
      >)
  >
}

export type UpdatePickedLocaleMutationVariables = Exact<{
  pickedLocale: Locale
}>

export type UpdatePickedLocaleMutation = { __typename?: 'Mutation' } & {
  updatePickedLocale: { __typename?: 'Member' } & Pick<Member, 'id'>
}

export const AvailablePaymentMethodsDocument = gql`
  query AvailablePaymentMethods {
    availablePaymentMethods {
      paymentMethodsResponse
    }
  }
`

/**
 * __useAvailablePaymentMethodsQuery__
 *
 * To run a query within a React component, call `useAvailablePaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailablePaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailablePaymentMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailablePaymentMethodsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AvailablePaymentMethodsQuery,
    AvailablePaymentMethodsQueryVariables
  >,
) {
  return Apollo.useQuery<
    AvailablePaymentMethodsQuery,
    AvailablePaymentMethodsQueryVariables
  >(AvailablePaymentMethodsDocument, baseOptions)
}
export function useAvailablePaymentMethodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AvailablePaymentMethodsQuery,
    AvailablePaymentMethodsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    AvailablePaymentMethodsQuery,
    AvailablePaymentMethodsQueryVariables
  >(AvailablePaymentMethodsDocument, baseOptions)
}
export type AvailablePaymentMethodsQueryHookResult = ReturnType<
  typeof useAvailablePaymentMethodsQuery
>
export type AvailablePaymentMethodsLazyQueryHookResult = ReturnType<
  typeof useAvailablePaymentMethodsLazyQuery
>
export type AvailablePaymentMethodsQueryResult = ApolloReactCommon.QueryResult<
  AvailablePaymentMethodsQuery,
  AvailablePaymentMethodsQueryVariables
>
export const ContractsDocument = gql`
  query Contracts {
    contracts {
      id
      typeOfContract
    }
  }
`

/**
 * __useContractsQuery__
 *
 * To run a query within a React component, call `useContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContractsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ContractsQuery,
    ContractsQueryVariables
  >,
) {
  return Apollo.useQuery<ContractsQuery, ContractsQueryVariables>(
    ContractsDocument,
    baseOptions,
  )
}
export function useContractsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContractsQuery,
    ContractsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<ContractsQuery, ContractsQueryVariables>(
    ContractsDocument,
    baseOptions,
  )
}
export type ContractsQueryHookResult = ReturnType<typeof useContractsQuery>
export type ContractsLazyQueryHookResult = ReturnType<
  typeof useContractsLazyQuery
>
export type ContractsQueryResult = ApolloReactCommon.QueryResult<
  ContractsQuery,
  ContractsQueryVariables
>
export const CreateDanishHomeAccidentQuoteDocument = gql`
  mutation CreateDanishHomeAccidentQuote(
    $homeInput: CreateQuoteInput!
    $accidentInput: CreateQuoteInput!
  ) {
    createHomeContents: createQuote(input: $homeInput) {
      __typename
      ... on CompleteQuote {
        id
        quoteDetails {
          __typename
        }
      }
    }
    createAccident: createQuote(input: $accidentInput) {
      __typename
      ... on CompleteQuote {
        id
        quoteDetails {
          __typename
        }
      }
    }
  }
`
export type CreateDanishHomeAccidentQuoteMutationFn = ApolloReactCommon.MutationFunction<
  CreateDanishHomeAccidentQuoteMutation,
  CreateDanishHomeAccidentQuoteMutationVariables
>

/**
 * __useCreateDanishHomeAccidentQuoteMutation__
 *
 * To run a mutation, you first call `useCreateDanishHomeAccidentQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDanishHomeAccidentQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDanishHomeAccidentQuoteMutation, { data, loading, error }] = useCreateDanishHomeAccidentQuoteMutation({
 *   variables: {
 *      homeInput: // value for 'homeInput'
 *      accidentInput: // value for 'accidentInput'
 *   },
 * });
 */
export function useCreateDanishHomeAccidentQuoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDanishHomeAccidentQuoteMutation,
    CreateDanishHomeAccidentQuoteMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateDanishHomeAccidentQuoteMutation,
    CreateDanishHomeAccidentQuoteMutationVariables
  >(CreateDanishHomeAccidentQuoteDocument, baseOptions)
}
export type CreateDanishHomeAccidentQuoteMutationHookResult = ReturnType<
  typeof useCreateDanishHomeAccidentQuoteMutation
>
export type CreateDanishHomeAccidentQuoteMutationResult = ApolloReactCommon.MutationResult<
  CreateDanishHomeAccidentQuoteMutation
>
export type CreateDanishHomeAccidentQuoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateDanishHomeAccidentQuoteMutation,
  CreateDanishHomeAccidentQuoteMutationVariables
>
export const CreateDanishHomeAccidentTravelQuoteDocument = gql`
  mutation CreateDanishHomeAccidentTravelQuote(
    $homeInput: CreateQuoteInput!
    $accidentInput: CreateQuoteInput!
    $travelInput: CreateQuoteInput!
  ) {
    createHomeContents: createQuote(input: $homeInput) {
      __typename
      ... on CompleteQuote {
        id
        quoteDetails {
          __typename
        }
      }
    }
    createAccident: createQuote(input: $accidentInput) {
      __typename
      ... on CompleteQuote {
        id
        quoteDetails {
          __typename
        }
      }
    }
    createTravel: createQuote(input: $travelInput) {
      __typename
      ... on CompleteQuote {
        id
        quoteDetails {
          __typename
        }
      }
    }
  }
`
export type CreateDanishHomeAccidentTravelQuoteMutationFn = ApolloReactCommon.MutationFunction<
  CreateDanishHomeAccidentTravelQuoteMutation,
  CreateDanishHomeAccidentTravelQuoteMutationVariables
>

/**
 * __useCreateDanishHomeAccidentTravelQuoteMutation__
 *
 * To run a mutation, you first call `useCreateDanishHomeAccidentTravelQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDanishHomeAccidentTravelQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDanishHomeAccidentTravelQuoteMutation, { data, loading, error }] = useCreateDanishHomeAccidentTravelQuoteMutation({
 *   variables: {
 *      homeInput: // value for 'homeInput'
 *      accidentInput: // value for 'accidentInput'
 *      travelInput: // value for 'travelInput'
 *   },
 * });
 */
export function useCreateDanishHomeAccidentTravelQuoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDanishHomeAccidentTravelQuoteMutation,
    CreateDanishHomeAccidentTravelQuoteMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateDanishHomeAccidentTravelQuoteMutation,
    CreateDanishHomeAccidentTravelQuoteMutationVariables
  >(CreateDanishHomeAccidentTravelQuoteDocument, baseOptions)
}
export type CreateDanishHomeAccidentTravelQuoteMutationHookResult = ReturnType<
  typeof useCreateDanishHomeAccidentTravelQuoteMutation
>
export type CreateDanishHomeAccidentTravelQuoteMutationResult = ApolloReactCommon.MutationResult<
  CreateDanishHomeAccidentTravelQuoteMutation
>
export type CreateDanishHomeAccidentTravelQuoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateDanishHomeAccidentTravelQuoteMutation,
  CreateDanishHomeAccidentTravelQuoteMutationVariables
>
export const EditQuoteDocument = gql`
  mutation EditQuote($input: EditQuoteInput!) {
    editQuote(input: $input) {
      ... on CompleteQuote {
        id
      }
      ... on UnderwritingLimitsHit {
        limits {
          description
          code
        }
      }
    }
  }
`
export type EditQuoteMutationFn = ApolloReactCommon.MutationFunction<
  EditQuoteMutation,
  EditQuoteMutationVariables
>

/**
 * __useEditQuoteMutation__
 *
 * To run a mutation, you first call `useEditQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editQuoteMutation, { data, loading, error }] = useEditQuoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditQuoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditQuoteMutation,
    EditQuoteMutationVariables
  >,
) {
  return Apollo.useMutation<EditQuoteMutation, EditQuoteMutationVariables>(
    EditQuoteDocument,
    baseOptions,
  )
}
export type EditQuoteMutationHookResult = ReturnType<
  typeof useEditQuoteMutation
>
export type EditQuoteMutationResult = ApolloReactCommon.MutationResult<
  EditQuoteMutation
>
export type EditQuoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditQuoteMutation,
  EditQuoteMutationVariables
>
export const ExchangeTokenDocument = gql`
  mutation ExchangeToken($exchangeToken: String!) {
    exchangeToken(input: { exchangeToken: $exchangeToken }) {
      __typename
      ... on ExchangeTokenExpiredResponse {
        _
      }
      ... on ExchangeTokenInvalidResponse {
        _
      }
      ... on ExchangeTokenSuccessResponse {
        token
      }
    }
  }
`
export type ExchangeTokenMutationFn = ApolloReactCommon.MutationFunction<
  ExchangeTokenMutation,
  ExchangeTokenMutationVariables
>

/**
 * __useExchangeTokenMutation__
 *
 * To run a mutation, you first call `useExchangeTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExchangeTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exchangeTokenMutation, { data, loading, error }] = useExchangeTokenMutation({
 *   variables: {
 *      exchangeToken: // value for 'exchangeToken'
 *   },
 * });
 */
export function useExchangeTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ExchangeTokenMutation,
    ExchangeTokenMutationVariables
  >,
) {
  return Apollo.useMutation<
    ExchangeTokenMutation,
    ExchangeTokenMutationVariables
  >(ExchangeTokenDocument, baseOptions)
}
export type ExchangeTokenMutationHookResult = ReturnType<
  typeof useExchangeTokenMutation
>
export type ExchangeTokenMutationResult = ApolloReactCommon.MutationResult<
  ExchangeTokenMutation
>
export type ExchangeTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ExchangeTokenMutation,
  ExchangeTokenMutationVariables
>
export const ExternalInsuranceDataDocument = gql`
  query ExternalInsuranceData($reference: ID!) {
    externalInsuranceProvider {
      dataCollection(reference: $reference) {
        renewalDate
        insuranceProvider
        monthlyPremium {
          currency
          amount
        }
      }
    }
  }
`

/**
 * __useExternalInsuranceDataQuery__
 *
 * To run a query within a React component, call `useExternalInsuranceDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalInsuranceDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalInsuranceDataQuery({
 *   variables: {
 *      reference: // value for 'reference'
 *   },
 * });
 */
export function useExternalInsuranceDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    ExternalInsuranceDataQuery,
    ExternalInsuranceDataQueryVariables
  >,
) {
  return Apollo.useQuery<
    ExternalInsuranceDataQuery,
    ExternalInsuranceDataQueryVariables
  >(ExternalInsuranceDataDocument, baseOptions)
}
export function useExternalInsuranceDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExternalInsuranceDataQuery,
    ExternalInsuranceDataQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    ExternalInsuranceDataQuery,
    ExternalInsuranceDataQueryVariables
  >(ExternalInsuranceDataDocument, baseOptions)
}
export type ExternalInsuranceDataQueryHookResult = ReturnType<
  typeof useExternalInsuranceDataQuery
>
export type ExternalInsuranceDataLazyQueryHookResult = ReturnType<
  typeof useExternalInsuranceDataLazyQuery
>
export type ExternalInsuranceDataQueryResult = ApolloReactCommon.QueryResult<
  ExternalInsuranceDataQuery,
  ExternalInsuranceDataQueryVariables
>
export const ExternalInsuranceDataStatusDocument = gql`
  subscription ExternalInsuranceDataStatus($reference: ID!) {
    dataCollectionStatus(reference: $reference) {
      status
    }
  }
`

/**
 * __useExternalInsuranceDataStatusSubscription__
 *
 * To run a query within a React component, call `useExternalInsuranceDataStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useExternalInsuranceDataStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalInsuranceDataStatusSubscription({
 *   variables: {
 *      reference: // value for 'reference'
 *   },
 * });
 */
export function useExternalInsuranceDataStatusSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    ExternalInsuranceDataStatusSubscription,
    ExternalInsuranceDataStatusSubscriptionVariables
  >,
) {
  return Apollo.useSubscription<
    ExternalInsuranceDataStatusSubscription,
    ExternalInsuranceDataStatusSubscriptionVariables
  >(ExternalInsuranceDataStatusDocument, baseOptions)
}
export type ExternalInsuranceDataStatusSubscriptionHookResult = ReturnType<
  typeof useExternalInsuranceDataStatusSubscription
>
export type ExternalInsuranceDataStatusSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  ExternalInsuranceDataStatusSubscription
>
export const FaqsDocument = gql`
  query Faqs($language: String!) {
    languages(where: { code: $language }) {
      faqs {
        id
        headline
        body
      }
    }
  }
`

/**
 * __useFaqsQuery__
 *
 * To run a query within a React component, call `useFaqsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFaqsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFaqsQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useFaqsQuery(
  baseOptions: Apollo.QueryHookOptions<FaqsQuery, FaqsQueryVariables>,
) {
  return Apollo.useQuery<FaqsQuery, FaqsQueryVariables>(
    FaqsDocument,
    baseOptions,
  )
}
export function useFaqsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FaqsQuery, FaqsQueryVariables>,
) {
  return Apollo.useLazyQuery<FaqsQuery, FaqsQueryVariables>(
    FaqsDocument,
    baseOptions,
  )
}
export type FaqsQueryHookResult = ReturnType<typeof useFaqsQuery>
export type FaqsLazyQueryHookResult = ReturnType<typeof useFaqsLazyQuery>
export type FaqsQueryResult = ApolloReactCommon.QueryResult<
  FaqsQuery,
  FaqsQueryVariables
>
export const MemberDocument = gql`
  query Member {
    member {
      id
      firstName
      lastName
    }
  }
`

/**
 * __useMemberQuery__
 *
 * To run a query within a React component, call `useMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberQuery({
 *   variables: {
 *   },
 * });
 */
export function useMemberQuery(
  baseOptions?: Apollo.QueryHookOptions<MemberQuery, MemberQueryVariables>,
) {
  return Apollo.useQuery<MemberQuery, MemberQueryVariables>(
    MemberDocument,
    baseOptions,
  )
}
export function useMemberLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MemberQuery, MemberQueryVariables>,
) {
  return Apollo.useLazyQuery<MemberQuery, MemberQueryVariables>(
    MemberDocument,
    baseOptions,
  )
}
export type MemberQueryHookResult = ReturnType<typeof useMemberQuery>
export type MemberLazyQueryHookResult = ReturnType<typeof useMemberLazyQuery>
export type MemberQueryResult = ApolloReactCommon.QueryResult<
  MemberQuery,
  MemberQueryVariables
>
export const MemberOfferDocument = gql`
  query MemberOffer {
    lastQuoteOfMember {
      ... on CompleteQuote {
        id
        dataCollectionId
        ssn
        email
        firstName
        lastName
        startDate
        currentInsurer {
          id
          displayName
          switchable
        }
        insuranceCost {
          freeUntil
          monthlyDiscount {
            amount
            currency
          }
          monthlyGross {
            amount
            currency
          }
          monthlyNet {
            amount
            currency
          }
        }
        details {
          ... on CompleteApartmentQuoteDetails {
            street
            zipCode
            householdSize
            livingSpace
            type
          }
          ... on CompleteHouseQuoteDetails {
            street
            zipCode
            householdSize
            livingSpace
            ancillarySpace
            numberOfBathrooms
            yearOfConstruction
            isSubleted
            extraBuildings {
              ... on ExtraBuildingCore {
                area
                displayName
                hasWaterConnected
              }
            }
          }
        }
      }
      ... on IncompleteQuote {
        id
      }
    }
    redeemedCampaigns {
      incentive {
        ... on FreeMonths {
          quantity
        }
        ... on MonthlyCostDeduction {
          amount {
            amount
            currency
          }
        }
        ... on PercentageDiscountMonths {
          percentageDiscount
          quantityMonths: quantity
        }
      }
      code
      owner {
        displayName
      }
    }
    member {
      id
      firstName
      lastName
      email
    }
  }
`

/**
 * __useMemberOfferQuery__
 *
 * To run a query within a React component, call `useMemberOfferQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberOfferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberOfferQuery({
 *   variables: {
 *   },
 * });
 */
export function useMemberOfferQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MemberOfferQuery,
    MemberOfferQueryVariables
  >,
) {
  return Apollo.useQuery<MemberOfferQuery, MemberOfferQueryVariables>(
    MemberOfferDocument,
    baseOptions,
  )
}
export function useMemberOfferLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MemberOfferQuery,
    MemberOfferQueryVariables
  >,
) {
  return Apollo.useLazyQuery<MemberOfferQuery, MemberOfferQueryVariables>(
    MemberOfferDocument,
    baseOptions,
  )
}
export type MemberOfferQueryHookResult = ReturnType<typeof useMemberOfferQuery>
export type MemberOfferLazyQueryHookResult = ReturnType<
  typeof useMemberOfferLazyQuery
>
export type MemberOfferQueryResult = ApolloReactCommon.QueryResult<
  MemberOfferQuery,
  MemberOfferQueryVariables
>
export const NorwegianBankIdAuthDocument = gql`
  mutation NorwegianBankIdAuth($personalNumber: String!) {
    norwegianBankIdAuth(personalNumber: $personalNumber) {
      redirectUrl
    }
  }
`
export type NorwegianBankIdAuthMutationFn = ApolloReactCommon.MutationFunction<
  NorwegianBankIdAuthMutation,
  NorwegianBankIdAuthMutationVariables
>

/**
 * __useNorwegianBankIdAuthMutation__
 *
 * To run a mutation, you first call `useNorwegianBankIdAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNorwegianBankIdAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [norwegianBankIdAuthMutation, { data, loading, error }] = useNorwegianBankIdAuthMutation({
 *   variables: {
 *      personalNumber: // value for 'personalNumber'
 *   },
 * });
 */
export function useNorwegianBankIdAuthMutation(
  baseOptions?: Apollo.MutationHookOptions<
    NorwegianBankIdAuthMutation,
    NorwegianBankIdAuthMutationVariables
  >,
) {
  return Apollo.useMutation<
    NorwegianBankIdAuthMutation,
    NorwegianBankIdAuthMutationVariables
  >(NorwegianBankIdAuthDocument, baseOptions)
}
export type NorwegianBankIdAuthMutationHookResult = ReturnType<
  typeof useNorwegianBankIdAuthMutation
>
export type NorwegianBankIdAuthMutationResult = ApolloReactCommon.MutationResult<
  NorwegianBankIdAuthMutation
>
export type NorwegianBankIdAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<
  NorwegianBankIdAuthMutation,
  NorwegianBankIdAuthMutationVariables
>
export const QuoteDocument = gql`
  query Quote($id: ID!, $perilsLocale: Locale!) {
    quote(id: $id) {
      ... on CompleteQuote {
        id
        dataCollectionId
        ssn
        email
        firstName
        lastName
        startDate
        currentInsurer {
          id
          displayName
          switchable
        }
        insuranceCost {
          freeUntil
          monthlyDiscount {
            amount
            currency
          }
          monthlyGross {
            amount
            currency
          }
          monthlyNet {
            amount
            currency
          }
        }
        perils(locale: $perilsLocale) {
          title
          description
          covered
          exceptions
          info
          icon {
            variants {
              light {
                svgUrl
              }
            }
          }
        }
        quoteDetails {
          ... on SwedishApartmentQuoteDetails {
            street
            zipCode
            householdSize
            livingSpace
            type
          }
          ... on SwedishHouseQuoteDetails {
            street
            zipCode
            householdSize
            livingSpace
            ancillarySpace
            numberOfBathrooms
            yearOfConstruction
            isSubleted
            extraBuildings {
              ... on ExtraBuildingCore {
                area
                displayName
                hasWaterConnected
              }
            }
          }
          ... on NorwegianHomeContentsDetails {
            coInsured
            livingSpace
            street
            norwegianHomeType: type
            zipCode
            isYouth
          }
          ... on NorwegianTravelDetails {
            coInsured
            isYouth
          }
          ... on DanishHomeContentsDetails {
            coInsured
            livingSpace
            street
            danishHomeType: type
            zipCode
            isStudent
          }
        }
      }
      ... on IncompleteQuote {
        id
      }
    }
  }
`

/**
 * __useQuoteQuery__
 *
 * To run a query within a React component, call `useQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *      perilsLocale: // value for 'perilsLocale'
 *   },
 * });
 */
export function useQuoteQuery(
  baseOptions: Apollo.QueryHookOptions<QuoteQuery, QuoteQueryVariables>,
) {
  return Apollo.useQuery<QuoteQuery, QuoteQueryVariables>(
    QuoteDocument,
    baseOptions,
  )
}
export function useQuoteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<QuoteQuery, QuoteQueryVariables>,
) {
  return Apollo.useLazyQuery<QuoteQuery, QuoteQueryVariables>(
    QuoteDocument,
    baseOptions,
  )
}
export type QuoteQueryHookResult = ReturnType<typeof useQuoteQuery>
export type QuoteLazyQueryHookResult = ReturnType<typeof useQuoteLazyQuery>
export type QuoteQueryResult = ApolloReactCommon.QueryResult<
  QuoteQuery,
  QuoteQueryVariables
>
export const QuoteBundleDocument = gql`
  query QuoteBundle($input: QuoteBundleInput!, $locale: Locale!) {
    quoteBundle(input: $input) {
      quotes {
        id
        dataCollectionId
        currentInsurer {
          id
          displayName
          switchable
        }
        price {
          amount
          currency
        }
        firstName
        lastName
        ssn
        birthDate
        startDate
        expiresAt
        email
        typeOfContract
        perils(locale: $locale) {
          title
          description
          covered
          exceptions
          info
          icon {
            variants {
              light {
                svgUrl
              }
            }
          }
        }
        insurableLimits(locale: $locale) {
          label
          limit
          description
          type
        }
        insuranceTerms(locale: $locale) {
          displayName
          url
          type
        }
        quoteDetails {
          ... on SwedishApartmentQuoteDetails {
            street
            zipCode
            householdSize
            livingSpace
            type
          }
          ... on SwedishHouseQuoteDetails {
            street
            zipCode
            householdSize
            livingSpace
            ancillarySpace
            numberOfBathrooms
            yearOfConstruction
            isSubleted
            extraBuildings {
              ... on ExtraBuildingCore {
                area
                displayName
                hasWaterConnected
              }
            }
          }
          ... on NorwegianHomeContentsDetails {
            coInsured
            livingSpace
            street
            norwegianHomeType: type
            zipCode
            isYouth
          }
          ... on NorwegianTravelDetails {
            coInsured
            isYouth
          }
          ... on DanishHomeContentsDetails {
            street
            zipCode
            livingSpace
            danishHomeType: type
            coInsured
            isStudent
          }
          ... on DanishAccidentDetails {
            street
            zipCode
            coInsured
            isStudent
          }
          ... on DanishTravelDetails {
            street
            zipCode
            coInsured
            isStudent
          }
        }
      }
      bundleCost {
        freeUntil
        monthlyDiscount {
          amount
          currency
        }
        monthlyGross {
          amount
          currency
        }
        monthlyNet {
          amount
          currency
        }
      }
    }
  }
`

/**
 * __useQuoteBundleQuery__
 *
 * To run a query within a React component, call `useQuoteBundleQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuoteBundleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuoteBundleQuery({
 *   variables: {
 *      input: // value for 'input'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useQuoteBundleQuery(
  baseOptions: Apollo.QueryHookOptions<
    QuoteBundleQuery,
    QuoteBundleQueryVariables
  >,
) {
  return Apollo.useQuery<QuoteBundleQuery, QuoteBundleQueryVariables>(
    QuoteBundleDocument,
    baseOptions,
  )
}
export function useQuoteBundleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QuoteBundleQuery,
    QuoteBundleQueryVariables
  >,
) {
  return Apollo.useLazyQuery<QuoteBundleQuery, QuoteBundleQueryVariables>(
    QuoteBundleDocument,
    baseOptions,
  )
}
export type QuoteBundleQueryHookResult = ReturnType<typeof useQuoteBundleQuery>
export type QuoteBundleLazyQueryHookResult = ReturnType<
  typeof useQuoteBundleLazyQuery
>
export type QuoteBundleQueryResult = ApolloReactCommon.QueryResult<
  QuoteBundleQuery,
  QuoteBundleQueryVariables
>
export const RedeemCodeDocument = gql`
  mutation RedeemCode($code: String!) {
    redeemCode(code: $code) {
      campaigns {
        incentive {
          ... on MonthlyCostDeduction {
            amount {
              amount
              currency
            }
          }
          ... on FreeMonths {
            quantity
          }
        }
        owner {
          id
          displayName
        }
      }
      cost {
        monthlyGross {
          amount
          currency
        }
        monthlyNet {
          amount
          currency
        }
      }
    }
  }
`
export type RedeemCodeMutationFn = ApolloReactCommon.MutationFunction<
  RedeemCodeMutation,
  RedeemCodeMutationVariables
>

/**
 * __useRedeemCodeMutation__
 *
 * To run a mutation, you first call `useRedeemCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedeemCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redeemCodeMutation, { data, loading, error }] = useRedeemCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useRedeemCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RedeemCodeMutation,
    RedeemCodeMutationVariables
  >,
) {
  return Apollo.useMutation<RedeemCodeMutation, RedeemCodeMutationVariables>(
    RedeemCodeDocument,
    baseOptions,
  )
}
export type RedeemCodeMutationHookResult = ReturnType<
  typeof useRedeemCodeMutation
>
export type RedeemCodeMutationResult = ApolloReactCommon.MutationResult<
  RedeemCodeMutation
>
export type RedeemCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RedeemCodeMutation,
  RedeemCodeMutationVariables
>
export const RedeemCodeV2Document = gql`
  mutation RedeemCodeV2($code: String!) {
    redeemCodeV2(code: $code) {
      ... on SuccessfulRedeemResult {
        campaigns {
          incentive {
            ... on MonthlyCostDeduction {
              amount {
                amount
                currency
              }
            }
          }
          owner {
            id
            displayName
          }
        }
      }
    }
  }
`
export type RedeemCodeV2MutationFn = ApolloReactCommon.MutationFunction<
  RedeemCodeV2Mutation,
  RedeemCodeV2MutationVariables
>

/**
 * __useRedeemCodeV2Mutation__
 *
 * To run a mutation, you first call `useRedeemCodeV2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedeemCodeV2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redeemCodeV2Mutation, { data, loading, error }] = useRedeemCodeV2Mutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useRedeemCodeV2Mutation(
  baseOptions?: Apollo.MutationHookOptions<
    RedeemCodeV2Mutation,
    RedeemCodeV2MutationVariables
  >,
) {
  return Apollo.useMutation<
    RedeemCodeV2Mutation,
    RedeemCodeV2MutationVariables
  >(RedeemCodeV2Document, baseOptions)
}
export type RedeemCodeV2MutationHookResult = ReturnType<
  typeof useRedeemCodeV2Mutation
>
export type RedeemCodeV2MutationResult = ApolloReactCommon.MutationResult<
  RedeemCodeV2Mutation
>
export type RedeemCodeV2MutationOptions = ApolloReactCommon.BaseMutationOptions<
  RedeemCodeV2Mutation,
  RedeemCodeV2MutationVariables
>
export const RedeemedCampaignsDocument = gql`
  query RedeemedCampaigns {
    redeemedCampaigns {
      incentive {
        ... on FreeMonths {
          quantity
        }
        ... on MonthlyCostDeduction {
          amount {
            amount
            currency
          }
        }
        ... on PercentageDiscountMonths {
          percentageDiscount
          quantityMonths: quantity
        }
        ... on IndefinitePercentageDiscount {
          __typename
          indefinitiePercentageDiscount: percentageDiscount
        }
        ... on NoDiscount {
          __typename
        }
      }
      code
      owner {
        displayName
      }
    }
  }
`

/**
 * __useRedeemedCampaignsQuery__
 *
 * To run a query within a React component, call `useRedeemedCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRedeemedCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRedeemedCampaignsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRedeemedCampaignsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RedeemedCampaignsQuery,
    RedeemedCampaignsQueryVariables
  >,
) {
  return Apollo.useQuery<
    RedeemedCampaignsQuery,
    RedeemedCampaignsQueryVariables
  >(RedeemedCampaignsDocument, baseOptions)
}
export function useRedeemedCampaignsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RedeemedCampaignsQuery,
    RedeemedCampaignsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    RedeemedCampaignsQuery,
    RedeemedCampaignsQueryVariables
  >(RedeemedCampaignsDocument, baseOptions)
}
export type RedeemedCampaignsQueryHookResult = ReturnType<
  typeof useRedeemedCampaignsQuery
>
export type RedeemedCampaignsLazyQueryHookResult = ReturnType<
  typeof useRedeemedCampaignsLazyQuery
>
export type RedeemedCampaignsQueryResult = ApolloReactCommon.QueryResult<
  RedeemedCampaignsQuery,
  RedeemedCampaignsQueryVariables
>
export const ReferrerNameDocument = gql`
  query ReferrerName {
    referralInformation {
      referredBy {
        ... on ActiveReferral {
          name
          discount {
            amount
            currency
          }
        }
        ... on InProgressReferral {
          name
        }
      }
    }
  }
`

/**
 * __useReferrerNameQuery__
 *
 * To run a query within a React component, call `useReferrerNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useReferrerNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReferrerNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useReferrerNameQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ReferrerNameQuery,
    ReferrerNameQueryVariables
  >,
) {
  return Apollo.useQuery<ReferrerNameQuery, ReferrerNameQueryVariables>(
    ReferrerNameDocument,
    baseOptions,
  )
}
export function useReferrerNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ReferrerNameQuery,
    ReferrerNameQueryVariables
  >,
) {
  return Apollo.useLazyQuery<ReferrerNameQuery, ReferrerNameQueryVariables>(
    ReferrerNameDocument,
    baseOptions,
  )
}
export type ReferrerNameQueryHookResult = ReturnType<
  typeof useReferrerNameQuery
>
export type ReferrerNameLazyQueryHookResult = ReturnType<
  typeof useReferrerNameLazyQuery
>
export type ReferrerNameQueryResult = ApolloReactCommon.QueryResult<
  ReferrerNameQuery,
  ReferrerNameQueryVariables
>
export const RemoveDiscountCodeDocument = gql`
  mutation RemoveDiscountCode {
    removeDiscountCode {
      __typename
    }
  }
`
export type RemoveDiscountCodeMutationFn = ApolloReactCommon.MutationFunction<
  RemoveDiscountCodeMutation,
  RemoveDiscountCodeMutationVariables
>

/**
 * __useRemoveDiscountCodeMutation__
 *
 * To run a mutation, you first call `useRemoveDiscountCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDiscountCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDiscountCodeMutation, { data, loading, error }] = useRemoveDiscountCodeMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveDiscountCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveDiscountCodeMutation,
    RemoveDiscountCodeMutationVariables
  >,
) {
  return Apollo.useMutation<
    RemoveDiscountCodeMutation,
    RemoveDiscountCodeMutationVariables
  >(RemoveDiscountCodeDocument, baseOptions)
}
export type RemoveDiscountCodeMutationHookResult = ReturnType<
  typeof useRemoveDiscountCodeMutation
>
export type RemoveDiscountCodeMutationResult = ApolloReactCommon.MutationResult<
  RemoveDiscountCodeMutation
>
export type RemoveDiscountCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveDiscountCodeMutation,
  RemoveDiscountCodeMutationVariables
>
export const RemoveStartDateDocument = gql`
  mutation RemoveStartDate($quoteId: ID!) {
    removeStartDate(input: { id: $quoteId }) {
      ... on CompleteQuote {
        startDate
      }
    }
  }
`
export type RemoveStartDateMutationFn = ApolloReactCommon.MutationFunction<
  RemoveStartDateMutation,
  RemoveStartDateMutationVariables
>

/**
 * __useRemoveStartDateMutation__
 *
 * To run a mutation, you first call `useRemoveStartDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStartDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStartDateMutation, { data, loading, error }] = useRemoveStartDateMutation({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *   },
 * });
 */
export function useRemoveStartDateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveStartDateMutation,
    RemoveStartDateMutationVariables
  >,
) {
  return Apollo.useMutation<
    RemoveStartDateMutation,
    RemoveStartDateMutationVariables
  >(RemoveStartDateDocument, baseOptions)
}
export type RemoveStartDateMutationHookResult = ReturnType<
  typeof useRemoveStartDateMutation
>
export type RemoveStartDateMutationResult = ApolloReactCommon.MutationResult<
  RemoveStartDateMutation
>
export type RemoveStartDateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveStartDateMutation,
  RemoveStartDateMutationVariables
>
export const SignMethodForQuotesDocument = gql`
  query SignMethodForQuotes($input: [ID!]!) {
    signMethodForQuotes(input: $input)
  }
`

/**
 * __useSignMethodForQuotesQuery__
 *
 * To run a query within a React component, call `useSignMethodForQuotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignMethodForQuotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignMethodForQuotesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignMethodForQuotesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SignMethodForQuotesQuery,
    SignMethodForQuotesQueryVariables
  >,
) {
  return Apollo.useQuery<
    SignMethodForQuotesQuery,
    SignMethodForQuotesQueryVariables
  >(SignMethodForQuotesDocument, baseOptions)
}
export function useSignMethodForQuotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SignMethodForQuotesQuery,
    SignMethodForQuotesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    SignMethodForQuotesQuery,
    SignMethodForQuotesQueryVariables
  >(SignMethodForQuotesDocument, baseOptions)
}
export type SignMethodForQuotesQueryHookResult = ReturnType<
  typeof useSignMethodForQuotesQuery
>
export type SignMethodForQuotesLazyQueryHookResult = ReturnType<
  typeof useSignMethodForQuotesLazyQuery
>
export type SignMethodForQuotesQueryResult = ApolloReactCommon.QueryResult<
  SignMethodForQuotesQuery,
  SignMethodForQuotesQueryVariables
>
export const SignQuotesDocument = gql`
  mutation SignQuotes(
    $quoteIds: [ID!]!
    $successUrl: String
    $failUrl: String
  ) {
    signQuotes(
      input: { quoteIds: $quoteIds, successUrl: $successUrl, failUrl: $failUrl }
    ) {
      __typename
      ... on FailedToStartSign {
        errorMessage
      }
      ... on SwedishBankIdSession {
        autoStartToken
      }
      ... on NorwegianBankIdSession {
        redirectUrl
      }
      ... on DanishBankIdSession {
        redirectUrl
      }
    }
  }
`
export type SignQuotesMutationFn = ApolloReactCommon.MutationFunction<
  SignQuotesMutation,
  SignQuotesMutationVariables
>

/**
 * __useSignQuotesMutation__
 *
 * To run a mutation, you first call `useSignQuotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignQuotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signQuotesMutation, { data, loading, error }] = useSignQuotesMutation({
 *   variables: {
 *      quoteIds: // value for 'quoteIds'
 *      successUrl: // value for 'successUrl'
 *      failUrl: // value for 'failUrl'
 *   },
 * });
 */
export function useSignQuotesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignQuotesMutation,
    SignQuotesMutationVariables
  >,
) {
  return Apollo.useMutation<SignQuotesMutation, SignQuotesMutationVariables>(
    SignQuotesDocument,
    baseOptions,
  )
}
export type SignQuotesMutationHookResult = ReturnType<
  typeof useSignQuotesMutation
>
export type SignQuotesMutationResult = ApolloReactCommon.MutationResult<
  SignQuotesMutation
>
export type SignQuotesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignQuotesMutation,
  SignQuotesMutationVariables
>
export const SignStatusDocument = gql`
  query SignStatus {
    signStatus {
      collectStatus {
        status
        code
      }
      signState
    }
  }
`

/**
 * __useSignStatusQuery__
 *
 * To run a query within a React component, call `useSignStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useSignStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SignStatusQuery,
    SignStatusQueryVariables
  >,
) {
  return Apollo.useQuery<SignStatusQuery, SignStatusQueryVariables>(
    SignStatusDocument,
    baseOptions,
  )
}
export function useSignStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SignStatusQuery,
    SignStatusQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SignStatusQuery, SignStatusQueryVariables>(
    SignStatusDocument,
    baseOptions,
  )
}
export type SignStatusQueryHookResult = ReturnType<typeof useSignStatusQuery>
export type SignStatusLazyQueryHookResult = ReturnType<
  typeof useSignStatusLazyQuery
>
export type SignStatusQueryResult = ApolloReactCommon.QueryResult<
  SignStatusQuery,
  SignStatusQueryVariables
>
export const SignStatusListenerDocument = gql`
  subscription SignStatusListener {
    signStatus {
      status {
        signState
        collectStatus {
          status
          code
        }
      }
    }
  }
`

/**
 * __useSignStatusListenerSubscription__
 *
 * To run a query within a React component, call `useSignStatusListenerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSignStatusListenerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignStatusListenerSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSignStatusListenerSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    SignStatusListenerSubscription,
    SignStatusListenerSubscriptionVariables
  >,
) {
  return Apollo.useSubscription<
    SignStatusListenerSubscription,
    SignStatusListenerSubscriptionVariables
  >(SignStatusListenerDocument, baseOptions)
}
export type SignStatusListenerSubscriptionHookResult = ReturnType<
  typeof useSignStatusListenerSubscription
>
export type SignStatusListenerSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  SignStatusListenerSubscription
>
export const StartDateDocument = gql`
  mutation StartDate($quoteId: ID!, $date: LocalDate) {
    editQuote(input: { id: $quoteId, startDate: $date }) {
      ... on CompleteQuote {
        startDate
      }
    }
  }
`
export type StartDateMutationFn = ApolloReactCommon.MutationFunction<
  StartDateMutation,
  StartDateMutationVariables
>

/**
 * __useStartDateMutation__
 *
 * To run a mutation, you first call `useStartDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startDateMutation, { data, loading, error }] = useStartDateMutation({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useStartDateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    StartDateMutation,
    StartDateMutationVariables
  >,
) {
  return Apollo.useMutation<StartDateMutation, StartDateMutationVariables>(
    StartDateDocument,
    baseOptions,
  )
}
export type StartDateMutationHookResult = ReturnType<
  typeof useStartDateMutation
>
export type StartDateMutationResult = ApolloReactCommon.MutationResult<
  StartDateMutation
>
export type StartDateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  StartDateMutation,
  StartDateMutationVariables
>
export const SubmitAdditionalPaymentDetialsDocument = gql`
  mutation SubmitAdditionalPaymentDetials(
    $request: AdditionalPaymentsDetailsRequest!
  ) {
    submitAdditionalPaymentDetails(req: $request) {
      ... on AdditionalPaymentsDetailsResponseAction {
        action
      }
      ... on AdditionalPaymentsDetailsResponseFinished {
        resultCode
      }
    }
  }
`
export type SubmitAdditionalPaymentDetialsMutationFn = ApolloReactCommon.MutationFunction<
  SubmitAdditionalPaymentDetialsMutation,
  SubmitAdditionalPaymentDetialsMutationVariables
>

/**
 * __useSubmitAdditionalPaymentDetialsMutation__
 *
 * To run a mutation, you first call `useSubmitAdditionalPaymentDetialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAdditionalPaymentDetialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAdditionalPaymentDetialsMutation, { data, loading, error }] = useSubmitAdditionalPaymentDetialsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSubmitAdditionalPaymentDetialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitAdditionalPaymentDetialsMutation,
    SubmitAdditionalPaymentDetialsMutationVariables
  >,
) {
  return Apollo.useMutation<
    SubmitAdditionalPaymentDetialsMutation,
    SubmitAdditionalPaymentDetialsMutationVariables
  >(SubmitAdditionalPaymentDetialsDocument, baseOptions)
}
export type SubmitAdditionalPaymentDetialsMutationHookResult = ReturnType<
  typeof useSubmitAdditionalPaymentDetialsMutation
>
export type SubmitAdditionalPaymentDetialsMutationResult = ApolloReactCommon.MutationResult<
  SubmitAdditionalPaymentDetialsMutation
>
export type SubmitAdditionalPaymentDetialsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SubmitAdditionalPaymentDetialsMutation,
  SubmitAdditionalPaymentDetialsMutationVariables
>
export const TokenizePaymentDetailsDocument = gql`
  mutation TokenizePaymentDetails($paymentsRequest: TokenizationRequest!) {
    tokenizePaymentDetails(req: $paymentsRequest) {
      ... on TokenizationResponseAction {
        action
      }
      ... on TokenizationResponseFinished {
        resultCode
      }
    }
  }
`
export type TokenizePaymentDetailsMutationFn = ApolloReactCommon.MutationFunction<
  TokenizePaymentDetailsMutation,
  TokenizePaymentDetailsMutationVariables
>

/**
 * __useTokenizePaymentDetailsMutation__
 *
 * To run a mutation, you first call `useTokenizePaymentDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenizePaymentDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenizePaymentDetailsMutation, { data, loading, error }] = useTokenizePaymentDetailsMutation({
 *   variables: {
 *      paymentsRequest: // value for 'paymentsRequest'
 *   },
 * });
 */
export function useTokenizePaymentDetailsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TokenizePaymentDetailsMutation,
    TokenizePaymentDetailsMutationVariables
  >,
) {
  return Apollo.useMutation<
    TokenizePaymentDetailsMutation,
    TokenizePaymentDetailsMutationVariables
  >(TokenizePaymentDetailsDocument, baseOptions)
}
export type TokenizePaymentDetailsMutationHookResult = ReturnType<
  typeof useTokenizePaymentDetailsMutation
>
export type TokenizePaymentDetailsMutationResult = ApolloReactCommon.MutationResult<
  TokenizePaymentDetailsMutation
>
export type TokenizePaymentDetailsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TokenizePaymentDetailsMutation,
  TokenizePaymentDetailsMutationVariables
>
export const UpdatePickedLocaleDocument = gql`
  mutation UpdatePickedLocale($pickedLocale: Locale!) {
    updatePickedLocale(pickedLocale: $pickedLocale) {
      id
    }
  }
`
export type UpdatePickedLocaleMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePickedLocaleMutation,
  UpdatePickedLocaleMutationVariables
>

/**
 * __useUpdatePickedLocaleMutation__
 *
 * To run a mutation, you first call `useUpdatePickedLocaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePickedLocaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePickedLocaleMutation, { data, loading, error }] = useUpdatePickedLocaleMutation({
 *   variables: {
 *      pickedLocale: // value for 'pickedLocale'
 *   },
 * });
 */
export function useUpdatePickedLocaleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePickedLocaleMutation,
    UpdatePickedLocaleMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdatePickedLocaleMutation,
    UpdatePickedLocaleMutationVariables
  >(UpdatePickedLocaleDocument, baseOptions)
}
export type UpdatePickedLocaleMutationHookResult = ReturnType<
  typeof useUpdatePickedLocaleMutation
>
export type UpdatePickedLocaleMutationResult = ApolloReactCommon.MutationResult<
  UpdatePickedLocaleMutation
>
export type UpdatePickedLocaleMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePickedLocaleMutation,
  UpdatePickedLocaleMutationVariables
>
