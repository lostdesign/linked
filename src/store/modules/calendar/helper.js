import { DateTime } from 'luxon'
const { ipcRenderer } = require('electron')

const getToday = () => {
  return DateTime.now().toISODate()
}

/**
 * Set the current day by click.
 * @param {*} date
 * @returns
 */
const setDate = (date) => {
  return DateTime.fromISO(date).toISODate()
}

/**
 * Takes in any integer and shifts the date by the value of the integer. Returns a normal date string.
 * @param {number} date
 * @param {string} days
 * @returns {string} date
 */
const shiftDate = (date, days) => {
  return DateTime.fromISO(date).plus({ days: days }).toISODate()
}

/**
 * Format a date into any string.
 * @param {string} date
 * @param {string} format
 * @returns {string}
 */
const formatDate = (date, format) => {
  return DateTime.fromISO(date)
    .setLocale(localStorage.lang ?? 'en-US')
    .toFormat(format)
}

/**
 * Returns an array of date strings in YYYY-mm-dd for the current active week
 */
const getCurrentWeekDates = (date) => {
  let week = []
  const startOfWeek = DateTime.fromISO(date).startOf('week')
  const daysPerWeek = localStorage.daysPerWeek || 7

  for (let i = 0; i <= daysPerWeek-1; i++) {
    let day = startOfWeek
      .plus({ days: i })
      .setLocale(localStorage.lang ?? 'en-US')
    week.push({
      isoDate: day.toISODate(),
      day: day.toFormat('d'),
      weekDay: day.toFormat('EEE')
    })
  }
  return week
}

const getDaysPerWeek = async () => {
  return ipcRenderer.invoke('GET_STORAGE_VALUE', 'daysPerWeek')
}

const setDaysPerWeek = async (daysPerWeek) => {
  localStorage.daysPerWeek = daysPerWeek
  return ipcRenderer.invoke('SET_STORAGE_VALUE', 'daysPerWeek', daysPerWeek)
}

export { getToday, setDate, shiftDate, formatDate, getCurrentWeekDates, getDaysPerWeek, setDaysPerWeek }
