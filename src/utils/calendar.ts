import { DateTime } from 'luxon'

const getToday = () => {
  return DateTime.now().toISODate()
}

/**
 * Get the year from a date string
 */
const getYearFromDate = (date: string): string => {
  return DateTime.fromISO(date).toFormat('y') as string
}

/**
 * Takes in any integer and shifts the date by the value of the integer. Returns a normal date string.
 */
const shiftDateByDays = (date: string, days: number): string => {
  return DateTime.fromISO(date).plus({ days: days }).toISODate() as string
}

/**
 * Set the current day by click.
 * @returns
 */
const setDate = (date: string): string => {
  return DateTime.fromISO(date).toISODate() as string
}

/**
 * Format a date into any string.
 */
const formatDate = (date: string, format: string): string => {
  return DateTime.fromISO(date)
    .setLocale(localStorage.lang ?? 'en-US')
    .toFormat(format)
}

/**
 * Returns an array of date strings in YYYY-mm-dd for the current active week
 */
const getCurrentWeekDates = (date: string): Array<{
  isoDate: string,
  day: string,
  weekDay: string
}> => {
  let week = []
  const startOfWeek = DateTime.fromISO(date).startOf('week')

  for (let i = 0; i <= 6; i++) {
    let day = startOfWeek
      .plus({ days: i })
      .setLocale(localStorage.lang ?? 'en-US')
    week.push({
      isoDate: day.toISODate() as string,
      day: day.toFormat('d'),
      weekDay: day.toFormat('EEE')
    })
  }
  return week
}

export {getToday, setDate, shiftDateByDays, formatDate,getCurrentWeekDates, getYearFromDate}