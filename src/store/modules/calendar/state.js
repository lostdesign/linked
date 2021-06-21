import { DateTime } from 'luxon'
import {
  getCurrentMonthDates,
  getCurrentWeekDates
} from '@/store/modules/calendar/helper'

const today = DateTime.now().toISODate()

export default () => ({
  currentDate: today,
  currentWeek: getCurrentWeekDates(today),
  currentMonth: getCurrentMonthDates(today)
})
