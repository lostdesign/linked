<template>
  <div
    class="
      flex
      dark:bg-black
      justify-center
      space-x-4
      z-50
      border-b border-gray-400
      dark:border-gray-800
      py-4
    "
  >
    <template v-for="date in getCurrentWeek">
      <div
        :key="date.day"
        class="flex-col justify-center items-center self-center text-center"
      >
        <span
          class="block mb-1 text-xs text-gray-400 dark:text-gray-700"
          :class="{
            'text-red-400 dark:text-red-500': date.isoDate === getCurrentDate
          }"
        >
          {{ date.weekDay }}
        </span>
        <span
          class="
            flex
            justify-center
            items-center
            self-center
            text-center
            w-10
            h-10
            rounded-full
            font-black
            text-xs
            hover:bg-gray-200
            dark:hover:bg-gray-800
            cursor-pointer
            ring-red-600
            dark:ring-red-900
          "
          :class="{
            'ring-4 text-sm': date.isoDate === getCurrentDate
          }"
          :key="date.day"
          @click="setDate(date.isoDate)"
        >
          {{ date.day }}
        </span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  Getters as CalendarGetters,
  Actions as CalendarActions
} from '@/store/modules/calendar/types'

export default {
  methods: {
    ...mapActions('calendar', [CalendarActions.SET_DATE])
  },
  computed: {
    ...mapGetters('calendar', [
      CalendarGetters.GET_CURRENT_DATE,
      CalendarGetters.GET_CURRENT_WEEK
    ])
  }
}
</script>
