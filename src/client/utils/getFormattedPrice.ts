import { LocaleData } from 'l10n/locales'

type FormatCurrencyParams = {
  locale: LocaleData['currencyLocale']
  amount: string
  currency: string
}

export const getFormattedPrice = ({
  locale,
  amount,
  currency,
}: FormatCurrencyParams) => {
  const amountAsNumber = Number(amount)

  if (isNaN(amountAsNumber)) {
    return '?'
  }

  const roundedAmount = Math.round(amountAsNumber)

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(roundedAmount)
}
