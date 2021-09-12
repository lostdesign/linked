import { Mutations } from '@/store/modules/file/types'

export default {
  [Mutations.SET_CONTENT](state, content) {
    state.file.content = content
  },
  [Mutations.SET_RATING](state, rating) {
    state.file.rating = rating
  },
  [Mutations.SET_FILE](state, file) {
    state.file = file
  }
}
