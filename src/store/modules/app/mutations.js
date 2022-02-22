import { Mutations } from './types'

export default {
  [Mutations.SET_LANGUAGE](state, language) {
    state.language = language
  },

  [Mutations.SET_THEME](state, theme) {
    state.theme = theme
  },

  [Mutations.SET_UPDATE_INTERVAL](state, interval) {
    state.updateInterval = interval
  },

  [Mutations.SET_DATA_PATH](state, path) {
    state.dataPath = path
  },

  [Mutations.SET_ALLOW_PRERELEASE](state, allowPrerelease) {
    state.allowPrerelease = allowPrerelease
  }
}
