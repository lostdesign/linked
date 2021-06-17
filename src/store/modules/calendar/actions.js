import { Actions, Mutations, Getters } from '@/store/modules/calendar/types'
import {
  shiftDate,
  setDate,
  getToday,
  getCurrentWeekDates
} from '@/store/modules/calendar/helper'

export default {
  [Actions.SET_DATE](context, date = setDate(getToday())) {
    context.commit(Mutations.SET_DATE, setDate(date))
  },
  [Actions.SET_DAY_TO](context, days) {
    context.commit(
      Mutations.SET_DATE,
      shiftDate(context.getters[Getters.GET_CURRENT_DATE], days)
    )
  },
  [Actions.SET_CURRENT_WEEK](context) {
    context.commit(
      Mutations.SET_CURRENT_WEEK,
      getCurrentWeekDates(context.getters[Getters.GET_CURRENT_DATE])
    )
  }
}
