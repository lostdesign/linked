import { Getters } from '@/store/modules/file/types'

export default {
  [Getters.GET_CONTENT](state) {
    return state.file.content
  },
  [Getters.GET_RATING](state) {
    return state.file.rating
  },
  [Getters.GET_FILE](state) {
    return {
      content: state.file.content,
      rating: state.file.rating
    }
  }
}
