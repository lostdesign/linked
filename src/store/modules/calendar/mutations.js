import { Mutations } from './types'

export default {
  [Mutations.SET_DATE](state, date) {
    state.currentDate = date
  },
  [Mutations.SET_CURRENT_WEEK](state, week) {
    state.currentWeek = week
  }
}
