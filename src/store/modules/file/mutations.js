import { Mutations } from './types'

export default {
  [Mutations.SET_CONTENT](state, content) {
    state.content = content
  },
  [Mutations.SET_RATING](state, rating) {
    state.rating = rating
  }
}
