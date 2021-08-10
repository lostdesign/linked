import { Getters } from './types'

export default {
  [Getters.GET_LANGUAGE](state) {
    return state.language
  },

  [Getters.GET_THEME](state) {
    return state.theme
  }
}
