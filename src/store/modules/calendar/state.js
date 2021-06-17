import { DateTime } from 'luxon'
import { getCurrentWeekDates } from '@/store/modules/calendar/helper'

export default () => ({
  currentDate: DateTime.now().toISODate(),
  currentWeek: getCurrentWeekDates(DateTime.now().toISODate())
})
