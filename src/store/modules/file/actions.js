import { Actions, Mutations, Getters } from '@/store/modules/file/types'
import { Getters as CalendarGetters } from '@/store/modules/calendar/types'
import { fetchFile, saveFile } from '@/store/modules/file/helper'

export default {
  async [Actions.FETCH_FILE](context, date) {
    const file = await fetchFile(date)

    context.commit(Mutations.SET_CONTENT, file.content)
    context.commit(Mutations.SET_RATING, file.rating)
  },
  [Actions.SET_CONTENT](context, content) {
    context.commit(Mutations.SET_CONTENT, content)
  },
  [Actions.SAVE_FILE](context) {
    saveFile(
      context.rootGetters[`calendar/${CalendarGetters.GET_CURRENT_DATE}`],
      context.getters[Getters.GET_FILE]
    )
  }
}
