<template>
  <div class="flex justify-between items-center align-center pt-6 px-10 mb-2">
    <span class="text-center text-3xl font-black">{{
      formatDate(getCurrentDate, 'MMMM yyyy')
    }}</span>
    <!-- Week switcher -->
    <span
      class="
        text-black
        dark:text-white
        select-none
        flex
        justify-center
        items-center
        align-center
        space-x-1
      "
    >
      <span
        class="text-red-800 hover:text-red-400 cursor-pointer"
        @click="setDayTo(-7)"
      >
        <ArrowLeftIcon />
      </span>
      <span>
        <span class="mr-1 text-gray-400 dark:text-gray-700">
          {{ $t('home.calendarWeek') }}
        </span>
        {{ formatDate(getCurrentDate, 'WW') }}</span
      >
      <span
        class="text-red-800 hover:text-red-400 cursor-pointer"
        @click="setDayTo(7)"
      >
        <ArrowRightIcon />
      </span>
    </span>
  </div>
</template>

<script>
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'

import { formatDate } from '@/store/modules/calendar/helper'
import { mapActions, mapGetters } from 'vuex'
import {
  Actions as CalendarActions,
  Getters as CalendarGetters
} from '@/store/modules/calendar/types'

export default {
  components: {
    ArrowLeftIcon,
    ArrowRightIcon
  },
  methods: {
    formatDate,
    ...mapActions('calendar', [CalendarActions.SET_DAY_TO])
  },
  computed: {
    ...mapGetters('calendar', [CalendarGetters.GET_CURRENT_DATE])
  }
}
</script>
