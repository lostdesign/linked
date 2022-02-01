import { Getters } from './types'

export default {
  [Getters.GET_LANGUAGE](state) {
    return state.language
  },

  [Getters.GET_THEME](state) {
    return state.theme
  },

  [Getters.GET_UPDATE_INTERVAL](state) {
    return state.updateInterval
  },

  [Getters.GET_DATA_PATH](state) {
    return state.dataPath
  }
}
