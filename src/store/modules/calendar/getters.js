import { Getters } from './types'

export default {
  [Getters.GET_CURRENT_DATE](state) {
    return state.currentDate
  },
  [Getters.GET_CURRENT_WEEK](state) {
    return state.currentWeek
  }
}
