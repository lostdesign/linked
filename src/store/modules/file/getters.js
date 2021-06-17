import { Getters } from '@/store/modules/file/types'

export default {
  [Getters.GET_CONTENT](state) {
    return state.content
  },
  [Getters.GET_RATING](state) {
    return state.rating
  },
  [Getters.GET_FILE](state) {
    return {
      content: state.content,
      rating: state.rating
    }
  }
}
