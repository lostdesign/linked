import { Mutations } from './types'

export default {
  [Mutations.SET_LANGUAGE](state, language) {
    state.language = language
  },

  [Mutations.SET_THEME](state, theme) {
    state.theme = theme
  }
}
