import { Market, LocalePath } from 'src/client/components/utils/CurrentLocale'

const LANGUAGE_TITLES = {
  english: 'English',
  swedish: 'Svenska',
  norwegian: 'Norsk',
  danish: 'Dansk',
}

type Options = {
  linkTo: LocalePath
  title: string
}[]

type LanguagePickerData = Record<Market, Options>

export const languagePickerData: LanguagePickerData = {
  SE: [
    { linkTo: 'se', title: LANGUAGE_TITLES.swedish },
    { linkTo: 'se-en', title: LANGUAGE_TITLES.english },
  ],
  NO: [
    { linkTo: 'no', title: LANGUAGE_TITLES.norwegian },
    { linkTo: 'no-en', title: LANGUAGE_TITLES.english },
  ],
  DK: [
    { linkTo: 'dk', title: LANGUAGE_TITLES.danish },
    { linkTo: 'dk-en', title: LANGUAGE_TITLES.english },
  ],
}
