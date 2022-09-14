import { differenceInDays, startOfDay, parseISO } from 'date-fns'

export const isStartDateValidForCarSwitching = (
  date: Date | string | null | undefined,
): boolean => {
  if (!date) return false
  if (typeof date == 'string') {
    date = parseISO(date)
  }

  return differenceInDays(startOfDay(date), startOfDay(new Date())) >= 7
}
