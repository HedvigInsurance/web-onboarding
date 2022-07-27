export enum SeBundleTypes {
  SeHomeAccidentBundleStudentBrf = 'SE_ACCIDENT_BUNDLE_STUDENT_BRF',
  SeHomeAccidentBundleBrf = 'SE_ACCIDENT_BUNDLE_BRF',
  SeHomeAccidentBundleStudentRent = 'SE_ACCIDENT_BUNDLE_STUDENT_RENT',
  SeHomeAccidentBundleRent = 'SE_ACCIDENT_BUNDLE_RENT',
  SeHomeAccidentBundleHouse = 'SE_ACCIDENT_BUNDLE_HOUSE',
}

export enum NoBundleTypes {
  NoHomeTravelBundle = 'NO_HOME_TRAVEL_BUNDLE',
  NoHomeTravelBundleYouth = 'NO_HOME_TRAVEL_BUNDLE_YOUTH',
  NoHomeAccidentBundle = 'NO_HOME_ACCIDENT_BUNDLE',
  NoHomeAccidentBundleYouth = 'NO_HOME_ACCIDENT_BUNDLE_YOUTH',
  NoHomeTravelAccidentBundle = 'NO_HOME_TRAVEL_ACCIDENT_BUNDLE',
  NoHomeTravelAccidentBundleYouth = 'NO_HOME_TRAVEL_ACCIDENT_BUNDLE_YOUTH',
}

export enum DkBundleTypes {
  DkAccidentBundle = 'DK_ACCIDENT_BUNDLE',
  DkAccidentBundleStudent = 'DK_ACCIDENT_BUNDLE_STUDENT',
  DkTravelBundle = 'DK_TRAVEL_BUNDLE',
  DkTravelBundleStudent = 'DK_TRAVEL_BUNDLE_STUDENT',
}

export enum TrackableContractCategory {
  Home = 'home',
  Travel = 'travel',
  HomeTravel = 'home_travel',
  HomeAccident = 'home_accident',
  HomeAccidentTravel = 'home_accident_travel',
}

export enum EventName {
  OfferCreated = 'offer_created',
  SignedCustomer = 'signed_customer',
  InsuranceSelectionToggle = 'insurance_selection_toggle',
  ClickCallNumber = 'click_call_number',
  OfferCrossSell = 'offer_cross_sell',
  CheckoutOpen = 'checkout_open',
  ContactInformationPageOpen = 'contact_information_page_open',
  CheckoutOpenGoBack = 'checkout_open_go_back',
  ContactInformationPageGoBack = 'contact_information_page_go_back',
  ButtonClick = 'button_click',
  SignError = 'sign_error',
  PaymentDetailsConfirmed = 'payment_details_confirmed',
  PaymentConnectedFailed = 'payment_connected_failed',
}

export enum ErrorEventType {
  PaymentTokenMutation = 'payment_token_mutation',
  PaymentTokenIDMissing = 'payment_token_id_missing',
  BasicError = 'basic_error',
  ManualReviewRequired = 'manual_review_required',
  CheckoutStart = 'manual_checkout_start',
  PaymentError = 'payment_error',
  Adyen = 'adyen',
  QuoteCartSetup = 'quote_cart_setup',
  threeDS = '3ds_payment',
}
